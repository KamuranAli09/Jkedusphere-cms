import type { Hono } from 'hono';
import { html } from 'hono/html';
import type { Env } from './types';
import { adminPage } from './layout';
import { APP_JS } from './editor';
import { getCats, addCat, removeCat, cleanCat } from './categories';

const IST_MS = 5.5 * 3600 * 1000; // admin times are entered/shown in Indian Standard Time
const RESERVED = new Set(['admin', 'img', 'api', 'assets', 'static', 'robots.txt', 'sitemap.xml', 'favicon.ico', 'rss.xml', 'search', 'logo.png', 'og-default.png', 'llms.txt', 'favicon.svg', 'vacancies']);
const now = () => Math.floor(Date.now() / 1000);

export const slugify = (s: string) =>
  s.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 100);

const toLocal = (ts: number | null) => new Date((ts ?? now()) * 1000 + IST_MS).toISOString().slice(0, 16);
const fromLocal = (v: string) => { const t = Date.parse(v + ':00Z'); return Number.isNaN(t) ? now() : Math.floor((t - IST_MS) / 1000); };
const fmt = (ts: number | null) => (ts ? new Date(ts * 1000 + IST_MS).toISOString().slice(0, 16).replace('T', ' ') : '-');

// Defence in depth: remove script-type tags, inline event handlers and javascript: links from saved HTML
export function cleanHtml(s: string) {
  const bad = 'script|style|iframe|object|embed|link|meta|form|base';
  return s
    .replace(new RegExp(`<\\s*(${bad})\\b[^>]*>[\\s\\S]*?<\\s*/\\s*\\1\\s*>`, 'gi'), '')
    .replace(new RegExp(`<\\s*/?\\s*(${bad})\\b[^>]*>`, 'gi'), '')
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/(href|src)\s*=\s*(["'])\s*javascript:[^"']*\2/gi, '$1=$2#$2');
}

async function slugTaken(db: D1Database, slug: string, table: 'posts' | 'pages', id: number | null) {
  const a = await db.prepare('SELECT id FROM posts WHERE slug = ?').bind(slug).first<{ id: number }>();
  if (a && !(table === 'posts' && a.id === id)) return true;
  const b = await db.prepare('SELECT id FROM pages WHERE slug = ?').bind(slug).first<{ id: number }>();
  return !!b && !(table === 'pages' && b.id === id);
}

const opt = (v: string, cur: string, label = v) =>
  v === cur ? html`<option value="${v}" selected>${label}</option>` : html`<option value="${v}">${label}</option>`;

const bodyEditor = (body: string) => html`
  <label>Content</label><div class="toolbar" id="toolbar"></div>
  <div class="editor" id="editor" contenteditable="true"></div>
  <textarea id="source" name="body" class="source" hidden>${body}</textarea>`;

type P = Record<string, any>;

const postForm = (p: P, action: string, cats: string[], msg = '', ok = false) => adminPage(p.id ? 'Edit post' : 'New post', html`
  <h2>${p.id ? 'Edit post' : 'New post'}</h2>
  ${msg ? html`<div class="${ok ? 'ok' : 'err'}">${msg}</div>` : ''}
  <form method="post" action="${action}" class="card">
    <label>Title</label><input name="title" value="${p.title ?? ''}" required maxlength="200">
    <div class="row">
      <div><label>Custom link (slug)</label><input name="slug" value="${p.slug ?? ''}" placeholder="auto from title" maxlength="100"></div>
      <div><label>Category</label><select name="category" id="category"><option value="">- choose -</option>${(p.category && !cats.includes(p.category) ? [...cats, p.category] : cats).map((c) => opt(c, p.category ?? ''))}<option value="__new__">+ Add new category...</option></select>
        <input name="new_category" id="newCategory" placeholder="New category name, e.g. Opinion" maxlength="40" style="display:none;margin-top:8px"></div>
    </div>
    <div class="row">
      <div><label>Status</label><select name="status">${opt('draft', p.status ?? 'draft', 'Draft')}${opt('published', p.status ?? 'draft', 'Published')}</select></div>
      <div><label>Publish date &amp; time (IST). A future time schedules the post.</label><input type="datetime-local" name="published_at" value="${toLocal(p.published_at ?? null)}"></div>
    </div>
    <label>Tags (comma separated)</label><input name="tags" value="${p.tags ?? ''}">
    <label>Short summary (excerpt)</label><textarea name="excerpt" maxlength="400">${p.excerpt ?? ''}</textarea>
    ${bodyEditor(p.body ?? '')}
    <label>Featured image</label>
    <div class="row"><div><input id="image" name="image" value="${p.image ?? ''}" placeholder="/img/12 or a link"></div><div><button type="button" id="pickFeatured" class="light">Upload image</button></div></div>
    <img id="thumb" class="thumb" src="${p.image ?? ''}" style="${p.image ? '' : 'display:none'}" alt="">
    <label>Image alt text</label><input name="image_alt" value="${p.image_alt ?? ''}">
    <div class="row">
      <div><label>SEO title (about 60 characters)</label><input name="seo_title" value="${p.seo_title ?? ''}" maxlength="120"></div>
    </div>
    <label>SEO description (about 160 characters)</label><textarea name="seo_description" maxlength="320">${p.seo_description ?? ''}</textarea>
    <label>Important dates - one per line as: Event | Date</label>
    <textarea name="important_dates" placeholder="Last date to apply | 25 Oct 2026">${p.important_dates_text ?? ''}</textarea>
    <button>Save post</button> <a class="btn light" href="/admin/posts">Back to posts</a>
  </form>
  ${p.id ? html`<form method="post" action="/admin/posts/${p.id}/delete" data-confirm="Delete this post permanently?"><button class="danger">Delete post</button></form>` : ''}`, true);

function readPost(f: FormData) {
  const g = (k: string) => String(f.get(k) ?? '').trim();
  const dates = g('important_dates').split('\n').map((l) => l.split('|'))
    .map((a) => ({ event: (a[0] ?? '').trim(), date: (a.slice(1).join('|') ?? '').trim() })).filter((d) => d.event);
  return {
    title: g('title'), slug: slugify(g('slug') || g('title')), body: cleanHtml(String(f.get('body') ?? '')),
    excerpt: g('excerpt'), category: g('category'), newCategory: g('new_category'), status: g('status') === 'published' ? 'published' : 'draft',
    tags: g('tags').split(',').map((s) => s.trim()).filter(Boolean).join(', '),
    image: g('image'), image_alt: g('image_alt'), seo_title: g('seo_title'), seo_description: g('seo_description'),
    important_dates: JSON.stringify(dates), important_dates_text: dates.map((d) => `${d.event} | ${d.date}`).join('\n'),
    published_at: fromLocal(g('published_at')),
  };
}

export function registerContent(app: Hono<Env>) {
  app.get('/admin/assets/app.js', (c) => c.body(APP_JS, 200, { 'Content-Type': 'application/javascript; charset=utf-8' }));

  // ---------- Images ----------
  app.post('/admin/upload', async (c) => {
    const buf = new Uint8Array(await c.req.arrayBuffer());
    if (buf.length < 12 || buf.length > 450000) return c.json({ error: 'Image must be under 450 KB after compression.' }, 413);
    const tag = (a: number, b: number) => String.fromCharCode(...buf.slice(a, b));
    if (tag(0, 4) !== 'RIFF' || tag(8, 12) !== 'WEBP') return c.json({ error: 'Only WebP images are accepted.' }, 415);
    let bin = '';
    for (let i = 0; i < buf.length; i += 0x8000) bin += String.fromCharCode(...buf.subarray(i, i + 0x8000));
    const r = await c.env.DB.prepare('INSERT INTO media (mime, data, size, created_at) VALUES (?,?,?,?)')
      .bind('image/webp', btoa(bin), buf.length, now()).run();
    return c.json({ url: `/img/${r.meta.last_row_id}` });
  });

  app.get('/img/:id', async (c) => {
    const id = Number(c.req.param('id'));
    if (!Number.isInteger(id)) return c.text('Not found', 404);
    const row = await c.env.DB.prepare('SELECT data FROM media WHERE id = ?').bind(id).first<{ data: string }>();
    if (!row) return c.text('Not found', 404);
    const bytes = Uint8Array.from(atob(row.data), (ch) => ch.charCodeAt(0));
    return new Response(bytes, { headers: { 'Content-Type': 'image/webp', 'Cache-Control': 'public, max-age=31536000, immutable' } });
  });

  // ---------- Posts ----------
  app.get('/admin/posts', async (c) => {
    const q = (c.req.query('q') ?? '').trim(), st = c.req.query('status') ?? '', t = now();
    const where: string[] = [], binds: any[] = [];
    if (q) { where.push('title LIKE ?'); binds.push(`%${q}%`); }
    if (st === 'draft') where.push("status='draft'");
    if (st === 'published') { where.push("status='published' AND published_at <= ?"); binds.push(t); }
    if (st === 'scheduled') { where.push("status='published' AND published_at > ?"); binds.push(t); }
    const sql = 'SELECT id,title,slug,category,status,published_at,views FROM posts' + (where.length ? ' WHERE ' + where.join(' AND ') : '') + ' ORDER BY COALESCE(published_at,created_at) DESC LIMIT 200';
    const rows = (await c.env.DB.prepare(sql).bind(...binds).all()).results as P[];
    const badge = (r: P) => r.status === 'draft' ? html`<span class="badge">Draft</span>`
      : r.published_at > t ? html`<span class="badge sch">Scheduled</span>` : html`<span class="badge pub">Published</span>`;
    return c.html(adminPage('Posts', html`
      <div class="bar"><h2 style="margin:0;flex:1">Posts</h2><a class="btn" href="/admin/posts/new" style="margin:0">+ New post</a></div>
      <form class="bar" method="get"><input name="q" value="${q}" placeholder="Search title">
        <select name="status"><option value="">All</option>${opt('published', st, 'Published')}${opt('scheduled', st, 'Scheduled')}${opt('draft', st, 'Drafts')}</select>
        <button class="light" style="margin:0">Filter</button></form>
      <div class="card" style="padding:6px 14px;overflow:auto"><table><tr><th>Title</th><th>Category</th><th>Status</th><th>Date (IST)</th><th>Views</th></tr>
      ${rows.length ? rows.map((r) => html`<tr><td><a href="/admin/posts/${r.id}/edit">${r.title}</a><div class="muted">/${r.slug}/</div></td><td>${r.category ?? ''}</td><td>${badge(r)}</td><td>${fmt(r.published_at)}</td><td>${r.views}</td></tr>`) : html`<tr><td colspan="5" class="muted">No posts yet.</td></tr>`}
      </table></div>`, true));
  });

  app.get('/admin/posts/new', async (c) => c.html(postForm({ status: 'draft' }, '/admin/posts', await getCats(c.env.DB))));

  async function savePost(c: any, id: number | null) {
    const p = readPost(await c.req.formData());
    let cats = await getCats(c.env.DB);
    const back = (msg: string, status: number) => c.html(postForm({ ...p, id, category: p.category === '__new__' ? '' : p.category }, id ? `/admin/posts/${id}` : '/admin/posts', cats, msg), status);
    if (!p.title) return back('Title is required.', 400);
    if (p.category === '__new__') {
      const r = await addCat(c.env.DB, p.newCategory);
      if ('error' in r) return back(r.error, 400);
      p.category = r.name; cats = await getCats(c.env.DB);
    } else if (!cats.includes(p.category)) {
      p.category = '';
    }
    if (!p.slug || RESERVED.has(p.slug)) return back('That custom link is not allowed. Try a different one.', 400);
    if (await slugTaken(c.env.DB, p.slug, 'posts', id)) return back('Another post or page already uses this custom link.', 409);
    const vals = [p.title, p.slug, p.body, p.excerpt, p.category, p.tags, p.image, p.image_alt, p.seo_title, p.seo_description, p.important_dates, p.status, p.published_at];
    if (id) {
      await c.env.DB.prepare('UPDATE posts SET title=?,slug=?,body=?,excerpt=?,category=?,tags=?,image=?,image_alt=?,seo_title=?,seo_description=?,important_dates=?,status=?,published_at=?,updated_at=? WHERE id=?')
        .bind(...vals, now(), id).run();
      return c.redirect(`/admin/posts/${id}/edit?saved=1`);
    }
    const r = await c.env.DB.prepare('INSERT INTO posts (title,slug,body,excerpt,category,tags,image,image_alt,seo_title,seo_description,important_dates,status,published_at,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)')
      .bind(...vals, now(), now()).run();
    return c.redirect(`/admin/posts/${r.meta.last_row_id}/edit?saved=1`);
  }
  app.post('/admin/posts', (c) => savePost(c, null));

  app.get('/admin/posts/:id/edit', async (c) => {
    const id = Number(c.req.param('id'));
    const p = await c.env.DB.prepare('SELECT * FROM posts WHERE id = ?').bind(id).first<P>();
    if (!p) return c.text('Not found', 404);
    try { p.important_dates_text = (JSON.parse(p.important_dates || '[]') as P[]).map((d) => `${d.event} | ${d.date}`).join('\n'); } catch { p.important_dates_text = ''; }
    return c.html(postForm(p, `/admin/posts/${id}`, await getCats(c.env.DB), c.req.query('saved') ? 'Saved.' : '', true));
  });
  app.post('/admin/posts/:id', (c) => savePost(c, Number(c.req.param('id'))));
  app.post('/admin/posts/:id/delete', async (c) => {
    await c.env.DB.prepare('DELETE FROM posts WHERE id = ?').bind(Number(c.req.param('id'))).run();
    return c.redirect('/admin/posts');
  });

  // ---------- Categories ----------
  const catsPage = async (c: any, msg = '', ok = false) => {
    const cats = await getCats(c.env.DB);
    const counts = new Map<string, number>(((await c.env.DB.prepare('SELECT category, COUNT(*) AS n FROM posts GROUP BY category').all()).results as P[]).map((r) => [r.category, r.n]));
    return adminPage('Categories', html`
      <h2>Categories</h2>
      ${msg ? html`<div class="${ok ? 'ok' : 'err'}">${msg}</div>` : ''}
      <form method="post" action="/admin/categories" class="card">
        <label>Add a category</label>
        <div class="row"><div><input name="name" placeholder="e.g. Opinion, Editorial" maxlength="40" required></div><div><button style="margin:0">Add category</button></div></div>
        <p class="muted">It appears straight away in the post category list. Its public page is /category/&lt;name&gt;.</p>
      </form>
      <div class="card" style="padding:6px 14px;overflow:auto"><table><tr><th>Category</th><th>Posts</th><th></th></tr>
      ${cats.map((x) => html`<tr><td>${x}</td><td>${counts.get(x) ?? 0}</td><td><form method="post" action="/admin/categories/delete" data-confirm="Delete the category ${x}? Homepage sections that use it will show no posts."><input type="hidden" name="name" value="${x}"><button class="danger" style="margin:0;padding:6px 10px">Delete</button></form></td></tr>`)}
      </table></div>`, true);
  };
  app.get('/admin/categories', (c) => catsPage(c).then((r) => c.html(r)));
  app.post('/admin/categories', async (c) => {
    const f = await c.req.formData();
    const r = await addCat(c.env.DB, cleanCat(String(f.get('name') ?? '')));
    return c.html(await catsPage(c, 'error' in r ? r.error : `Added "${r.name}".`, !('error' in r)), 'error' in r ? 400 : 200);
  });
  app.post('/admin/categories/delete', async (c) => {
    const f = await c.req.formData();
    const r = await removeCat(c.env.DB, String(f.get('name') ?? ''));
    return c.html(await catsPage(c, 'error' in r ? r.error : 'Category deleted.', !('error' in r)), 'error' in r ? 400 : 200);
  });

  // ---------- Pages ----------
  const pageForm = (p: P, action: string, msg = '', ok = false) => adminPage(p.id ? 'Edit page' : 'New page', html`
    <h2>${p.id ? 'Edit page' : 'New page'}</h2>
    ${msg ? html`<div class="${ok ? 'ok' : 'err'}">${msg}</div>` : ''}
    <form method="post" action="${action}" class="card">
      <label>Title</label><input name="title" value="${p.title ?? ''}" required maxlength="200">
      <label>Custom link (slug)</label><input name="slug" value="${p.slug ?? ''}" placeholder="about-us" maxlength="100">
      ${bodyEditor(p.body ?? '')}
      <label>SEO description</label><textarea name="seo_description" maxlength="320">${p.seo_description ?? ''}</textarea>
      <button>Save page</button> <a class="btn light" href="/admin/pages">Back to pages</a>
    </form>
    ${p.id ? html`<form method="post" action="/admin/pages/${p.id}/delete" data-confirm="Delete this page permanently?"><button class="danger">Delete page</button></form>` : ''}`, true);

  app.get('/admin/pages', async (c) => {
    const rows = (await c.env.DB.prepare('SELECT id,title,slug,updated_at FROM pages ORDER BY title').all()).results as P[];
    return c.html(adminPage('Pages', html`
      <div class="bar"><h2 style="margin:0;flex:1">Pages</h2><a class="btn" href="/admin/pages/new" style="margin:0">+ New page</a></div>
      <div class="card" style="padding:6px 14px"><table><tr><th>Title</th><th>Link</th><th>Updated (IST)</th></tr>
      ${rows.length ? rows.map((r) => html`<tr><td><a href="/admin/pages/${r.id}/edit">${r.title}</a></td><td>/${r.slug}/</td><td>${fmt(r.updated_at)}</td></tr>`) : html`<tr><td colspan="3" class="muted">No pages yet. Add About, Contact, Privacy Policy and Disclaimer.</td></tr>`}
      </table></div>`, true));
  });
  app.get('/admin/pages/new', (c) => c.html(pageForm({}, '/admin/pages')));

  async function savePage(c: any, id: number | null) {
    const f = await c.req.formData();
    const g = (k: string) => String(f.get(k) ?? '').trim();
    const p = { title: g('title'), slug: slugify(g('slug') || g('title')), body: cleanHtml(String(f.get('body') ?? '')), seo_description: g('seo_description') };
    const back = (msg: string, s: number) => c.html(pageForm({ ...p, id }, id ? `/admin/pages/${id}` : '/admin/pages', msg), s);
    if (!p.title) return back('Title is required.', 400);
    if (!p.slug || RESERVED.has(p.slug)) return back('That custom link is not allowed.', 400);
    if (await slugTaken(c.env.DB, p.slug, 'pages', id)) return back('Another post or page already uses this custom link.', 409);
    if (id) {
      await c.env.DB.prepare('UPDATE pages SET title=?,slug=?,body=?,seo_description=?,updated_at=? WHERE id=?').bind(p.title, p.slug, p.body, p.seo_description, now(), id).run();
      return c.redirect(`/admin/pages/${id}/edit?saved=1`);
    }
    const r = await c.env.DB.prepare('INSERT INTO pages (title,slug,body,seo_description,updated_at) VALUES (?,?,?,?,?)').bind(p.title, p.slug, p.body, p.seo_description, now()).run();
    return c.redirect(`/admin/pages/${r.meta.last_row_id}/edit?saved=1`);
  }
  app.post('/admin/pages', (c) => savePage(c, null));
  app.get('/admin/pages/:id/edit', async (c) => {
    const id = Number(c.req.param('id'));
    const p = await c.env.DB.prepare('SELECT * FROM pages WHERE id = ?').bind(id).first<P>();
    if (!p) return c.text('Not found', 404);
    return c.html(pageForm(p, `/admin/pages/${id}`, c.req.query('saved') ? 'Saved.' : '', true));
  });
  app.post('/admin/pages/:id', (c) => savePage(c, Number(c.req.param('id'))));
  app.post('/admin/pages/:id/delete', async (c) => {
    await c.env.DB.prepare('DELETE FROM pages WHERE id = ?').bind(Number(c.req.param('id'))).run();
    return c.redirect('/admin/pages');
  });
}
