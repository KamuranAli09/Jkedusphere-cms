import type { Hono } from 'hono';
import type { Env } from './types';
import { siteOrigin } from './types';
import { slugify } from './content';
import { esc, href, load, resolve, shell } from './homepage';
import { notesPaths } from './notes';

const IST = 5.5 * 3600 * 1000;
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const CATS = ['Vacancies', 'Current Affairs', 'Govt Schemes', 'Reports', 'Updates', 'Study Material'];
const now = () => Math.floor(Date.now() / 1000);
const day = (ts: number) => { const d = new Date(ts * 1000 + IST); return `${d.getUTCDate()} ${MON[d.getUTCMonth()]} ${d.getUTCFullYear()}`; };
const iso = (ts: number) => new Date(ts * 1000).toISOString();
const catUrl = (c: string) => `/category/${slugify(c)}`;
const abs = (origin: string, u: string) => (u && u.startsWith('/') ? origin + u : u);
const PER = 12;

type Row = Record<string, any>;
const crumbs = (items: [string, string][]) => `<nav class="crumb w" aria-label="Breadcrumb">${items.map(([n, u], i) => (i < items.length - 1 ? `<a href="${esc(u)}">${esc(n)}</a><span>/</span>` : `<span>${esc(n)}</span>`)).join('')}</nav>`;
const crumbLd = (origin: string, items: [string, string][]) => ({ '@type': 'BreadcrumbList', itemListElement: items.map(([name, u], i) => ({ '@type': 'ListItem', position: i + 1, name, item: abs(origin, u) })) });

const card = (p: Row) => `<article class="vc"><div class="vt"><span>${esc(p.category ?? 'Post')}</span>${day(p.published_at)}</div><h3><a href="/${esc(p.slug)}" style="text-decoration:none">${esc(p.title)}</a></h3><p>${esc(p.excerpt ?? '')}</p><a href="/${esc(p.slug)}">Read more</a></article>`;

const listing = (title: string, intro: string, posts: Row[], q: string, page: number, more: boolean, base: string) => `
<div class="w lp"><h1>${esc(title)}</h1>${intro ? `<p class="s2">${esc(intro)}</p>` : ''}
<form class="search" action="/search" role="search" style="margin:18px 0 26px"><input type="search" name="q" value="${esc(q)}" placeholder="Search posts" aria-label="Search"><button type="submit">Search</button></form>
${posts.length ? `<div class="vg">${posts.map(card).join('')}</div>` : '<p class="s2">No posts found yet. Please check back soon.</p>'}
<div class="pager">${page > 1 ? `<a class="btn o" href="${base}${base.includes('?') ? '&' : '?'}page=${page - 1}">Newer</a>` : ''}${more ? `<a class="btn" href="${base}${base.includes('?') ? '&' : '?'}page=${page + 1}">Older posts</a>` : ''}</div></div>`;

async function published(db: D1Database, where: string, binds: (string | number)[], page: number) {
  const sql = `SELECT id,title,slug,excerpt,category,published_at FROM posts WHERE status='published' AND published_at <= ?${where} ORDER BY published_at DESC LIMIT ? OFFSET ?`;
  const rows = (await db.prepare(sql).bind(now(), ...binds, PER + 1, (page - 1) * PER).all()).results as Row[];
  return { rows: rows.slice(0, PER), more: rows.length > PER };
}

export function registerPublic(app: Hono<Env>) {
  // Old Blogger addresses: /2026/10/slug.html and /p/page.html redirect permanently (301) to the new address.
  app.use('*', async (c, next) => {
    const path = new URL(c.req.url).pathname;
    if (path === '/' || path.startsWith('/admin') || path.startsWith('/assets') || path.startsWith('/img/')) return next();
    const db = c.env.DB;
    const m = path.match(/^\/(?:\d{4}\/\d{2}\/|p\/)([^/]+)\.html$/);
    if (m) {
      const base = slugify(decodeURIComponent(m[1]).replace(/_/g, '-'));
      for (const slug of [base, base.replace(/-\d+$/, '')]) {
        if (slug && await db.prepare('SELECT 1 AS x FROM posts WHERE slug = ? UNION SELECT 1 FROM pages WHERE slug = ?').bind(slug, slug).first()) return c.redirect(`/${slug}`, 301);
      }
    }
    const legacy: [RegExp, string][] = [[/^\/p\/premium-notes-store/, 'https://jkedusphere.com'], [/^\/p\/vacanc/, '/category/vacancies'], [/^\/p\/current-affairs/, '/category/current-affairs']];
    const hit = legacy.find(([re]) => re.test(path));
    if (hit) return c.redirect(hit[1], 301);
    const r = await db.prepare('SELECT to_path, status FROM redirects WHERE from_path = ?').bind(path).first<{ to_path: string; status: number }>();
    if (r) return c.redirect(r.to_path, r.status === 302 ? 302 : 301);
    return next();
  });
  app.get('/search/label/:label', (c) => c.redirect(`/search?q=${encodeURIComponent(decodeURIComponent(c.req.param('label')))}`, 301));
    const origin = (c: any) => new URL(c.req.url).origin;

  // ---------- Friendly 404 (used for every URL that matches nothing) ----------
  const SKIP = /\.(php\d?|asp|aspx|jsp|env|git|sql|ini|bak|zip|gz|map|js|css|ico|png|jpe?g|gif|webp|svg|woff2?|txt)$|wp-|xmlrpc|\.well-known/i; // bot probes and missing files: cheap plain 404
  const notFound = async (c: any) => {
    const path = new URL(c.req.url).pathname;
    if (SKIP.test(path)) return c.text('Not found', 404);
    const db = c.env.DB;
    let guess = '';
    try { guess = decodeURIComponent(path.split('/').filter(Boolean).pop() ?? ''); } catch { /* ignore bad encoding */ }
    guess = guess.replace(/\.html?$/i, '').replace(/[^\p{L}\p{N}]+/gu, ' ').trim().slice(0, 60);
    const words = guess.split(' ').filter((w) => w.length > 2).slice(0, 3);
    const [near, latest] = await Promise.all([
      words.length ? published(db, ' AND (' + words.map(() => 'title LIKE ?').join(' OR ') + ')', words.map((w) => `%${w}%`), 1) : Promise.resolve({ rows: [] as Row[] }),
      published(db, '', [], 1),
    ]);
    const maybe = (near.rows as Row[]).slice(0, 3);
    const fresh = (latest.rows as Row[]).filter((r) => !maybe.some((m) => m.id === r.id)).slice(0, 6);
    const body = `<style>
.nf{text-align:center;padding:36px 0 8px}
.nf .big{font-size:clamp(84px,22vw,168px);font-weight:900;line-height:1;letter-spacing:-.04em;background:linear-gradient(135deg,var(--navy),var(--blue) 55%,var(--sky));-webkit-background-clip:text;background-clip:text;color:transparent}
.nf h1{font-size:clamp(24px,4.5vw,36px);margin:6px 0 10px}
.nf .s2{max-width:560px;margin:0 auto 22px}
.nf .search{margin:0 auto 18px}
.nf .chips{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
.nf .chips a{padding:8px 16px;border:1px solid var(--line);border-radius:999px;font-weight:700;font-size:14.5px;text-decoration:none;color:var(--navy);background:var(--soft)}
.nf .chips a:hover{border-color:var(--navy)}
.nf-h{font-size:20px;margin:34px 0 14px}
</style>
<div class="w lp"><div class="nf">
<div class="big" aria-hidden="true">404</div>
<h1>This page took a wrong turn</h1>
<p class="s2">Like a question skipped on the OMR sheet, no harm done. The link may be old, moved or mistyped. Search below or jump to a section.</p>
<form class="search" action="/search" role="search"><input type="search" name="q" value="${esc(guess)}" placeholder="Search vacancies, exams, schemes" aria-label="Search"><button type="submit">Search</button></form>
<div class="chips">${CATS.map((x) => `<a href="${catUrl(x)}">${esc(x)}</a>`).join('')}</div>
<p style="margin-top:22px"><a class="btn" href="/">Back to home</a></p></div>
${maybe.length ? `<h2 class="nf-h">Were you looking for one of these?</h2><div class="vg">${maybe.map(card).join('')}</div>` : ''}
${fresh.length ? `<h2 class="nf-h">Latest updates</h2><div class="vg">${fresh.map(card).join('')}</div>` : ''}
</div>`;
    return c.html(await shell(db, origin(c), { title: 'Page not found | JKEdusphere', description: 'This page could not be found.', canonical: origin(c) + '/', noindex: true, body }), 404);
  };
  app.notFound((c) => notFound(c));
  // ---------- Search ----------
  app.get('/search', async (c) => {
    const q = (c.req.query('q') ?? '').trim().slice(0, 80), page = Math.max(1, parseInt(c.req.query('page') ?? '1', 10) || 1);
    const like = `%${q}%`;
    const { rows, more } = q ? await published(c.env.DB, ' AND (title LIKE ? OR excerpt LIKE ? OR tags LIKE ? OR category LIKE ?)', [like, like, like, like], page) : { rows: [], more: false };
    const body = crumbs([['Home', '/'], ['Search', '/search']]) + listing(q ? `Search results for "${q}"` : 'Search', q ? '' : 'Type a post, exam or scheme name.', rows, q, page, more, `/search?q=${encodeURIComponent(q)}`);
    return c.html(await shell(c.env.DB, origin(c), { title: `Search${q ? ': ' + q : ''} | JKEdusphere`, description: 'Search vacancies, updates, schemes and current affairs.', canonical: origin(c) + '/search', noindex: true, body }));
  });

  // ---------- Category ----------
  app.get('/category/:cat', async (c) => {
    const cat = CATS.find((x) => slugify(x) === c.req.param('cat'));
    if (!cat) return notFound(c);
    const page = Math.max(1, parseInt(c.req.query('page') ?? '1', 10) || 1);
    const { rows, more } = await published(c.env.DB, ' AND category = ?', [cat], page);
    const o = origin(c), items: [string, string][] = [['Home', '/'], [cat, catUrl(cat)]];
    return c.html(await shell(c.env.DB, o, { title: `${cat} | JKEdusphere`, description: `Latest ${cat.toLowerCase()} for Jammu & Kashmir aspirants.`, canonical: o + catUrl(cat),
      ld: { '@context': 'https://schema.org', '@graph': [crumbLd(o, items)] }, body: crumbs(items) + listing(cat, `Latest ${cat.toLowerCase()} for Jammu & Kashmir aspirants.`, rows, '', page, more, catUrl(cat)) }), 200, { 'Cache-Control': 'public, max-age=60' });
  });
  app.get('/category/:cat/', (c) => c.redirect(`/category/${c.req.param('cat')}`, 301));

  // ---------- Sitemap ----------
  app.get('/sitemap.xml', async (c) => {
    const o = origin(c);
    const posts = (await c.env.DB.prepare("SELECT slug, updated_at FROM posts WHERE status='published' AND published_at <= ? ORDER BY published_at DESC LIMIT 2000").bind(now()).all()).results as Row[];
    const pages = (await c.env.DB.prepare('SELECT slug, updated_at FROM pages').all()).results as Row[];
    const notes = notesPaths(), notesSet = new Set(notes.map((n) => n.path));
    const u = (loc: string, ts?: number) => `<url><loc>${esc(o + loc)}</loc>${ts ? `<lastmod>${iso(ts).slice(0, 10)}</lastmod>` : ''}</url>`;
    const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${u('/')}${CATS.map((x) => u(catUrl(x))).join('')}${posts.filter((p) => !notesSet.has('/' + p.slug)).map((p) => u(`/${p.slug}`, p.updated_at)).join('')}${pages.filter((p) => !notesSet.has('/' + p.slug)).map((p) => u(`/${p.slug}`, p.updated_at)).join('')}${notes.map((n) => `<url><loc>${esc(o + n.path)}</loc><lastmod>${n.lastmod}</lastmod></url>`).join('')}</urlset>`;
    return c.body(xml, 200, { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=300' });
  });

  // ---------- Posts and pages: /slug/ ----------
  app.get('/:slug', async (c) => {
    const slug = c.req.param('slug'), db = c.env.DB, o = origin(c);
    const T = resolve(await load(db)).data('post'), site = resolve(await load(db)).data('seo').siteName as string;

    const p = await db.prepare("SELECT * FROM posts WHERE slug = ? AND status = 'published' AND published_at <= ?").bind(slug, now()).first<Row>();
    if (p) {
      c.executionCtx.waitUntil(db.prepare('UPDATE posts SET views = views + 1 WHERE id = ?').bind(p.id).run().then(() => undefined, () => undefined));
      const url = `${o}/${p.slug}`;
      const items: [string, string][] = [['Home', '/'], ...(p.category ? [[p.category, catUrl(p.category)] as [string, string]] : []), [p.title, `/${p.slug}`]];
      let dates: { event: string; date: string }[] = [];
      try { dates = JSON.parse(p.important_dates || '[]'); } catch { /* ignore */ }
      const related = T.showRelated === 'yes'
        ? ((await db.prepare(`SELECT title, slug, category, published_at FROM posts WHERE status='published' AND published_at <= ? AND id <> ?${p.category ? ' AND category = ?' : ''} ORDER BY published_at DESC LIMIT 5`).bind(...(p.category ? [now(), p.id, p.category] : [now(), p.id])).all()).results as Row[]) : [];
      const share = T.showShare === 'yes' ? `<div class="share"><b>Share</b><a href="https://wa.me/?text=${encodeURIComponent(p.title + ' ' + url)}" rel="noopener" target="_blank">WhatsApp</a><a href="https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(p.title)}" rel="noopener" target="_blank">Telegram</a></div>` : '';
      const cta = T.ctaBtn ? `<div class="cta"><div><h3>${esc(T.ctaTitle)}</h3><p>${esc(T.ctaText)}</p></div><a class="btn w2" href="${href(T.ctaUrl)}">${esc(T.ctaBtn)}</a></div>` : '';
      const seg = ((p.image ?? '').split('/').filter(Boolean).pop() ?? '').split('?')[0];
      const showHero = !!p.image && !(seg.length > 6 && String(p.body).includes(seg)); // skip if the article already contains this image
      const body = `${crumbs(items)}<div class="w pg"><article class="art">
<span class="tag">${esc(p.category ?? 'Post')}</span><h1>${esc(p.title)}</h1>
<p class="meta">${esc(T.authorLine)}. Published ${day(p.published_at)}${p.updated_at - p.published_at > 86400 ? `, updated ${day(p.updated_at)}` : ''}</p>
${showHero ? `<img class="hero-img" src="${esc(p.image)}" alt="${esc(p.image_alt || p.title)}" width="1200" height="630">` : ''}
${T.showDates === 'yes' && dates.length ? `<div class="glance"><h2>Important dates</h2><table>${dates.map((d) => `<tr><th>${esc(d.event)}</th><td>${esc(d.date)}</td></tr>`).join('')}</table></div>` : ''}
<div class="prose">${p.body}</div>${cta}${share}
${T.disclaimer ? `<p class="dnote">${esc(T.disclaimer)}</p>` : ''}</article>
<aside class="side">${related.length ? `<div class="box2"><h2>${esc(T.relatedTitle)}</h2>${related.map((r) => `<a href="/${esc(r.slug)}">${esc(r.title)}<small>${day(r.published_at)}</small></a>`).join('')}</div>` : ''}</aside></div>`;
      const ld = { '@context': 'https://schema.org', '@graph': [
        { '@type': 'Article', headline: p.title, description: p.seo_description || p.excerpt || '', datePublished: iso(p.published_at), dateModified: iso(p.updated_at), mainEntityOfPage: url,
          image: p.image ? [abs(o, p.image)] : undefined, author: { '@type': 'Organization', name: site }, publisher: { '@type': 'Organization', name: site } }, crumbLd(o, items)] };
      return c.html(await shell(db, o, { title: p.seo_title || `${p.title} | ${site}`, description: p.seo_description || p.excerpt || `${p.title} on ${site}.`, canonical: url, type: 'article', image: p.image ? abs(o, p.image) : undefined, ld, body }), 200, { 'Cache-Control': 'public, max-age=60' });
    }

    const g = await db.prepare('SELECT * FROM pages WHERE slug = ?').bind(slug).first<Row>();
    if (g) {
      const url = `${o}/${g.slug}`, items: [string, string][] = [['Home', '/'], [g.title, `/${g.slug}`]];
      const body = `${crumbs(items)}<div class="w lp"><article class="art" style="max-width:820px"><h1>${esc(g.title)}</h1><div class="prose">${g.body}</div></article></div>`;
      return c.html(await shell(db, o, { title: `${g.title} | ${site}`, description: g.seo_description || `${g.title} - ${site}`, canonical: url, ld: { '@context': 'https://schema.org', '@graph': [{ '@type': 'WebPage', name: g.title, url }, crumbLd(o, items)] }, body }), 200, { 'Cache-Control': 'public, max-age=60' });
    }
    return notFound(c);
  });
  app.get('/:slug/', async (c) => {
    const slug = c.req.param('slug');
    if (!/^[a-z0-9-]+$/.test(slug)) return c.notFound();
    const hit = await c.env.DB.prepare('SELECT 1 AS x FROM posts WHERE slug = ? UNION SELECT 1 FROM pages WHERE slug = ?').bind(slug, slug).first();
    return hit ? c.redirect(`/${slug}`, 301) : notFound(c);
  });
}
