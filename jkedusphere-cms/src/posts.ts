import type { Hono } from 'hono';
import type { Env } from './types';
import { siteOrigin } from './types';
import { slugify } from './content';
import { DEFAULT_OG, esc, href, load, orgNode, resolve, shell, siteRef, stripMicrodata } from './homepage';
import { notesPaths, notesIndex, plainText } from './notes';
import { getCats } from './categories';

const IST = 5.5 * 3600 * 1000;
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
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

// ---------------------------------------------------------------------------------------------
// Site search: looks inside post bodies, page bodies and the subject notes, ranks the results,
// and returns a short snippet around the match. Every word must match somewhere (AND).
// "quoted text" is treated as one exact phrase.
// ---------------------------------------------------------------------------------------------
type Hit = { kind: 'post' | 'page' | 'note'; title: string; url: string; score: number; label: string; when: string; ts: number; snip: string };
const LIKE = (t: string) => '%' + t.replace(/[\\%_]/g, (m) => '\\' + m) + '%';
const ESC = "ESCAPE '\\'";
function queryTerms(q: string): string[] {
  const all: string[] = [];
  for (const m of q.matchAll(/"([^"]+)"|(\S+)/g)) { const t = (m[1] ?? m[2]).trim().toLowerCase(); if (t && !all.includes(t)) all.push(t); }
  const long = all.filter((t) => t.length > 1);
  return (long.length ? long : all).slice(0, 6);
}
const rx = (t: string) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const mark = (text: string, ts: string[]) => {
  if (!ts.length) return esc(text);
  return text.split(new RegExp('(' + ts.map(rx).join('|') + ')', 'gi')).map((p, i) => (i % 2 ? `<mark>${esc(p)}</mark>` : esc(p))).join('');
};
// Cleans a slice of raw HTML (it may start or end in the middle of a tag) into readable text
const clean = (raw: string) => plainText(String(raw ?? '').replace(/^[^<]*>/, ' ').replace(/<[^>]*$/, ' '));
const around = (text: string, ts: string[]) => {
  const low = text.toLowerCase(); let at = -1;
  for (const t of ts) { const i = low.indexOf(t); if (i >= 0 && (at < 0 || i < at)) at = i; }
  if (at < 0) return text.slice(0, 220) + (text.length > 220 ? '...' : '');
  const a = Math.max(0, at - 80), b = Math.min(text.length, at + 200);
  return (a > 0 ? '...' : '') + text.slice(a, b).trim() + (b < text.length ? '...' : '');
};

async function searchAll(db: D1Database, q: string): Promise<{ hits: Hit[]; ts: string[] }> {
  const ts = queryTerms(q), hits: Hit[] = [];
  if (!ts.length) return { hits, ts };
  const phrase = ts.length > 1 ? q.toLowerCase().replace(/"/g, '').trim() : '';
  const run = async <T>(sql: string, binds: (string | number)[]) => { try { return ((await db.prepare(sql).bind(...binds).all()).results ?? []) as unknown as T[]; } catch { return [] as T[]; } };

  // Posts: title, excerpt, tags, category and the full body
  {
    const score = ts.map(() => `(CASE WHEN title LIKE ? ${ESC} THEN 10 ELSE 0 END + CASE WHEN tags LIKE ? ${ESC} THEN 5 ELSE 0 END + CASE WHEN category LIKE ? ${ESC} THEN 4 ELSE 0 END + CASE WHEN excerpt LIKE ? ${ESC} THEN 3 ELSE 0 END + CASE WHEN body LIKE ? ${ESC} THEN 1 ELSE 0 END)`).join(' + ')
      + (phrase ? ` + (CASE WHEN title LIKE ? ${ESC} THEN 20 ELSE 0 END)` : '');
    const sBinds: string[] = ts.flatMap((t) => [LIKE(t), LIKE(t), LIKE(t), LIKE(t), LIKE(t)]).concat(phrase ? [LIKE(phrase)] : []);
    const anchors = ts.slice(0, 3);
    const snip = `CASE ${anchors.map(() => 'WHEN instr(lower(body), ?) > 0 THEN substr(body, max(1, instr(lower(body), ?) - 90), 360)').join(' ')} ELSE substr(COALESCE(NULLIF(excerpt, ''), body), 1, 300) END`;
    const snipBinds = anchors.flatMap((t) => [t, t]);
    const where = ts.map(() => `(title LIKE ? ${ESC} OR excerpt LIKE ? ${ESC} OR tags LIKE ? ${ESC} OR category LIKE ? ${ESC} OR body LIKE ? ${ESC})`).join(' AND ');
    const wBinds = ts.flatMap((t) => [LIKE(t), LIKE(t), LIKE(t), LIKE(t), LIKE(t)]);
    const rows = await run<Row>(`SELECT title, slug, category, published_at, (${score}) AS score, ${snip} AS snip FROM posts WHERE status = 'published' AND published_at <= ? AND ${where} ORDER BY score DESC, published_at DESC LIMIT 80`,
      [...sBinds, ...snipBinds, now(), ...wBinds]);
    for (const r of rows) hits.push({ kind: 'post', title: r.title, url: '/' + r.slug, score: Number(r.score) + 1, label: r.category || 'Post', when: day(r.published_at), ts: r.published_at, snip: around(clean(r.snip), ts) });
  }

  // Pages (About, Contact, Privacy and so on)
  {
    const score = ts.map(() => `(CASE WHEN title LIKE ? ${ESC} THEN 10 ELSE 0 END + CASE WHEN seo_description LIKE ? ${ESC} THEN 3 ELSE 0 END + CASE WHEN body LIKE ? ${ESC} THEN 1 ELSE 0 END)`).join(' + ');
    const sBinds = ts.flatMap((t) => [LIKE(t), LIKE(t), LIKE(t)]);
    const anchors = ts.slice(0, 3);
    const snip = `CASE ${anchors.map(() => 'WHEN instr(lower(body), ?) > 0 THEN substr(body, max(1, instr(lower(body), ?) - 90), 360)').join(' ')} ELSE substr(COALESCE(NULLIF(seo_description, ''), body), 1, 300) END`;
    const where = ts.map(() => `(title LIKE ? ${ESC} OR seo_description LIKE ? ${ESC} OR body LIKE ? ${ESC})`).join(' AND ');
    const rows = await run<Row>(`SELECT title, slug, (${score}) AS score, ${snip} AS snip FROM pages WHERE ${where} ORDER BY score DESC LIMIT 20`,
      [...sBinds, ...anchors.flatMap((t) => [t, t]), ...ts.flatMap((t) => [LIKE(t), LIKE(t), LIKE(t)])]);
    for (const r of rows) hits.push({ kind: 'page', title: r.title, url: '/' + r.slug, score: Number(r.score), label: 'Page', when: '', ts: 0, snip: around(clean(r.snip), ts) });
  }

  // Subject notes (Polity, J&K Geography and any you add later)
  try {
    for (const n of notesIndex()) {
      const low = n.text.toLowerCase(), tl = n.title.toLowerCase();
      if (!ts.every((t) => tl.includes(t) || low.includes(t))) continue;
      let score = 1;
      for (const t of ts) { if (tl.includes(t)) score += 10; const c = low.split(t).length - 1; score += Math.min(c, 5) * 0.4; }
      if (phrase && tl.includes(phrase)) score += 20;
      hits.push({ kind: 'note', title: n.title, url: n.url, score, label: n.where, when: '', ts: 0, snip: around(n.text, ts) });
    }
  } catch { /* notes are optional */ }

  hits.sort((a, b) => b.score - a.score || b.ts - a.ts);
  return { hits: hits.slice(0, 120), ts };
}

const KINDS: [string, string][] = [['', 'All'], ['post', 'Posts'], ['note', 'Notes'], ['page', 'Pages']];
function searchBody(q: string, type: string, hits: Hit[], ts: string[], page: number, CATS: string[]) {
  const counts: Record<string, number> = { '': hits.length, post: 0, note: 0, page: 0 };
  hits.forEach((h) => { counts[h.kind]++; });
  const shown = type ? hits.filter((h) => h.kind === type) : hits;
  const rows = shown.slice((page - 1) * PER, page * PER), more = shown.length > page * PER;
  const base = `/search?q=${encodeURIComponent(q)}${type ? '&type=' + type : ''}`;
  const form = `<form class="search" action="/search" role="search" style="margin:20px 0 22px"><input type="search" name="q" value="${esc(q)}" placeholder="Search posts, notes, pages and anything inside them" aria-label="Search" autocomplete="off"><button type="submit">Search</button></form>`;
  const tabs = q && hits.length ? `<div class="st" role="tablist">${KINDS.filter(([k]) => !k || counts[k]).map(([k, l]) => `<a href="/search?q=${encodeURIComponent(q)}${k ? '&type=' + k : ''}"${k === type ? ' class="on" aria-current="true"' : ''}>${l} <span>${counts[k]}</span></a>`).join('')}</div>` : '';
  const item = (h: Hit) => `<article class="sr"><div class="sr-m"><span class="tag">${esc(h.label)}</span>${h.when ? `<span>${esc(h.when)}</span>` : ''}</div><h3><a href="${esc(h.url)}">${mark(h.title, ts)}</a></h3>${h.snip ? `<p>${mark(h.snip, ts)}</p>` : ''}<small>${esc(h.url)}</small></article>`;
  let main: string;
  if (!q) main = `<p class="s2">Type a word or phrase. We search titles, full post text, notes and pages. Use "quotes" for an exact phrase.</p><div class="chips" style="margin-top:18px">${CATS.map((x) => `<a href="${catUrl(x)}">${esc(x)}</a>`).join('')}</div>`;
  else if (!shown.length) main = `<div class="sr-none"><h2>No results for "${esc(q)}"</h2><p class="s2">Try fewer or different words, check the spelling, or browse a category.</p><div class="chips" style="margin-top:16px">${CATS.map((x) => `<a href="${catUrl(x)}">${esc(x)}</a>`).join('')}</div></div>`;
  else main = `<p class="s2" style="margin-bottom:6px">${shown.length}${hits.length >= 120 ? '+' : ''} result${shown.length === 1 ? '' : 's'} for "${esc(q)}"</p>${tabs}<div class="srl">${rows.map(item).join('')}</div>`;
  const pager = `<div class="pager">${page > 1 ? `<a class="btn o" href="${base}&page=${page - 1}">Previous</a>` : ''}${more ? `<a class="btn" href="${base}&page=${page + 1}">More results</a>` : ''}</div>`;
  return crumbs([['Home', '/'], ['Search', '/search']]) + `<div class="w lp"><h1>${q ? 'Search results' : 'Search'}</h1>${form}${main}${shown.length ? pager : ''}</div>`;
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
    const legacy: [RegExp, string][] = [[/^\/p\/premium-notes-store/, 'https://jkedusphere.com'], [/^\/p\/vacanc/, '/category/vacancies'], [/^\/vacancies$/, '/category/vacancies'], [/^\/p\/current-affairs/, '/category/current-affairs']];
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
    const CATS = await getCats(db);
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
  // ---------- Search (full text) ----------
  app.get('/search', async (c) => {
    const q = (c.req.query('q') ?? '').trim().slice(0, 80), page = Math.max(1, parseInt(c.req.query('page') ?? '1', 10) || 1);
    const t = c.req.query('type') ?? '', type = ['post', 'page', 'note'].includes(t) ? t : '';
    const { hits, ts } = q ? await searchAll(c.env.DB, q) : { hits: [] as Hit[], ts: [] as string[] };
    const body = searchBody(q, type, hits, ts, page, await getCats(c.env.DB));
    return c.html(await shell(c.env.DB, origin(c), { title: `Search${q ? ': ' + q : ''} | JKEdusphere`, description: 'Search vacancies, study notes, updates, schemes and current affairs.', canonical: origin(c) + '/search', noindex: true, body }));
  });

  // Live suggestions for the search box (titles only, so it stays fast)
  app.get('/search/suggest', async (c) => {
    const q = (c.req.query('q') ?? '').trim().slice(0, 60), ts = queryTerms(q), out: { t: string; u: string; k: string }[] = [];
    const json = (v: unknown) => c.json(v, 200, { 'Cache-Control': 'public, max-age=60' });
    if (q.length < 2 || !ts.length) return json([]);
    try {
      const one = `(title LIKE ? ${ESC} OR tags LIKE ? ${ESC} OR category LIKE ? ${ESC})`;
      const rows = (await c.env.DB.prepare(`SELECT title, slug, category FROM posts WHERE status = 'published' AND published_at <= ? AND ${ts.map(() => one).join(' AND ')} ORDER BY (CASE WHEN title LIKE ? ${ESC} THEN 0 ELSE 1 END), published_at DESC LIMIT 5`)
        .bind(now(), ...ts.flatMap((t) => [LIKE(t), LIKE(t), LIKE(t)]), LIKE(ts[0]).slice(1)).all()).results as Row[];
      rows.forEach((r) => out.push({ t: r.title, u: '/' + r.slug, k: r.category || 'Post' }));
    } catch { /* ignore */ }
    try { notesIndex().filter((n) => ts.every((t) => n.title.toLowerCase().includes(t))).slice(0, 4).forEach((n) => out.push({ t: n.title, u: n.url, k: n.where })); } catch { /* ignore */ }
    return json(out.slice(0, 8));
  });

  // ---------- Category ----------
  app.get('/category/:cat', async (c) => {
    const cat = (await getCats(c.env.DB)).find((x) => slugify(x) === c.req.param('cat'));
    if (!cat) return notFound(c);
    const page = Math.max(1, parseInt(c.req.query('page') ?? '1', 10) || 1);
    const { rows, more } = await published(c.env.DB, ' AND category = ?', [cat], page);
    const o = origin(c), items: [string, string][] = [['Home', '/'], [cat, catUrl(cat)]];
    return c.html(await shell(c.env.DB, o, { title: `${cat} | JKEdusphere`, description: `Latest ${cat.toLowerCase()} for Jammu & Kashmir aspirants.`, canonical: o + catUrl(cat),
      ld: { '@context': 'https://schema.org', '@graph': [orgNode(o, 'JKEdusphere'), { '@type': 'CollectionPage', '@id': o + catUrl(cat) + '#webpage', url: o + catUrl(cat), name: `${cat} | JKEdusphere`, description: `Latest ${cat.toLowerCase()} for Jammu & Kashmir aspirants.`, inLanguage: 'en-IN', isPartOf: siteRef(o), publisher: { '@id': o + '/#organization' },
        ...(rows.length ? { mainEntity: { '@type': 'ItemList', itemListElement: rows.map((r: Row, i: number) => ({ '@type': 'ListItem', position: i + 1, url: `${o}/${r.slug}`, name: r.title })) } } : {}) }, crumbLd(o, items)] }, body: crumbs(items) + listing(cat, `Latest ${cat.toLowerCase()} for Jammu & Kashmir aspirants.`, rows, '', page, more, catUrl(cat)) }), 200, { 'Cache-Control': 'public, max-age=60' });
  });
  app.get('/category/:cat/', (c) => c.redirect(`/category/${c.req.param('cat')}`, 301));

  // ---------- Sitemap ----------
  app.get('/sitemap.xml', async (c) => {
    const o = origin(c);
    const CATS = await getCats(c.env.DB);
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
<div class="prose">${stripMicrodata(p.body)}</div>${cta}${share}
${T.disclaimer ? `<p class="dnote">${esc(T.disclaimer)}</p>` : ''}</article>
<aside class="side">${related.length ? `<div class="box2"><h2>${esc(T.relatedTitle)}</h2>${related.map((r) => `<a href="/${esc(r.slug)}">${esc(r.title)}<small>${day(r.published_at)}</small></a>`).join('')}</div>` : ''}</aside></div>`;
      const ld = { '@context': 'https://schema.org', '@graph': [
        orgNode(o, site),
        { '@type': 'Article', '@id': url + '#article', headline: String(p.title).slice(0, 110), description: p.seo_description || p.excerpt || `${p.title} on ${site}.`, url, datePublished: iso(p.published_at), dateModified: iso(Math.max(p.updated_at, p.published_at)), mainEntityOfPage: { '@type': 'WebPage', '@id': url },
          image: [p.image ? abs(o, p.image) : o + DEFAULT_OG], inLanguage: 'en-IN', ...(p.category ? { articleSection: p.category } : {}), isPartOf: siteRef(o),
          author: { '@id': o + '/#organization' }, publisher: { '@id': o + '/#organization' } }, crumbLd(o, items)] };
      return c.html(await shell(db, o, { title: p.seo_title || `${p.title} | ${site}`, description: p.seo_description || p.excerpt || `${p.title} on ${site}.`, canonical: url, type: 'article', image: p.image ? abs(o, p.image) : undefined, ld, body }), 200, { 'Cache-Control': 'public, max-age=60' });
    }

    const g = await db.prepare('SELECT * FROM pages WHERE slug = ?').bind(slug).first<Row>();
    if (g) {
      const url = `${o}/${g.slug}`, items: [string, string][] = [['Home', '/'], [g.title, `/${g.slug}`]];
      const body = `${crumbs(items)}<div class="w lp"><article class="art" style="max-width:820px"><h1>${esc(g.title)}</h1><div class="prose">${stripMicrodata(g.body)}</div></article></div>`;
      return c.html(await shell(db, o, { title: `${g.title} | ${site}`, description: g.seo_description || `${g.title} - ${site}`, canonical: url, ld: { '@context': 'https://schema.org', '@graph': [orgNode(o, site), { '@type': g.slug === 'about-us' ? 'AboutPage' : g.slug === 'contact-us' ? 'ContactPage' : 'WebPage', '@id': url + '#webpage', name: g.title, url, description: g.seo_description || `${g.title} - ${site}`, inLanguage: 'en-IN', isPartOf: siteRef(o), publisher: { '@id': o + '/#organization' } }, crumbLd(o, items)] }, body }), 200, { 'Cache-Control': 'public, max-age=60' });
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
