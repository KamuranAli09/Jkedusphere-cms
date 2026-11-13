// Search + AI visibility: robots.txt, llms.txt, Markdown twins of posts, RSS feed, IndexNow pings,
// and the admin "SEO & AI" page (AI crawler hits, AI referrals, referring sites, content health, backlink tracker).
import type { Hono } from 'hono';
import { raw } from 'hono/html';
import type { Env } from './types';
import { SITE_URL, siteOrigin } from './types';
import { adminPage } from './layout';
import { esc, load, resolve } from './homepage';
import { getCats } from './categories';
import { slugify } from './content';
import { notesCatalog } from './notes';
import { istDay } from './track';
import { ROBOTS_AI_AGENTS, htmlToMarkdown } from './seo-core';

const now = () => Math.floor(Date.now() / 1000);
const isLocal = (u: string) => /^(localhost|127\.0\.0\.1)$/.test(new URL(u).hostname);
const catUrl = (c: string) => `/category/${slugify(c)}`;
const xml = (s: unknown) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[c]!));
type Row = Record<string, any>;

// ---------------------------------------------------------------------------------------------
// IndexNow: tells Bing (and through it ChatGPT search, Copilot, DuckDuckGo) about new pages instantly.
// Google does not use IndexNow; it relies on the sitemap + Search Console.
// ---------------------------------------------------------------------------------------------
async function indexNowKey(db: D1Database): Promise<string> {
  const r = await db.prepare("SELECT value FROM settings WHERE key = 'indexnow_key'").first<{ value: string }>();
  if (r?.value) return r.value;
  const k = [...crypto.getRandomValues(new Uint8Array(16))].map((b) => b.toString(16).padStart(2, '0')).join('');
  await db.prepare("INSERT OR IGNORE INTO settings (key, value) VALUES ('indexnow_key', ?)").bind(k).run();
  return (await db.prepare("SELECT value FROM settings WHERE key = 'indexnow_key'").first<{ value: string }>())?.value ?? k;
}

export async function pingIndexNow(db: D1Database, urls: string[]): Promise<{ ok: boolean; msg: string }> {
  const list = [...new Set(urls)].filter((u) => u.startsWith(SITE_URL)).slice(0, 9000);
  if (!list.length) return { ok: false, msg: 'No URLs to send.' };
  try {
    const key = await indexNowKey(db);
    const r = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host: new URL(SITE_URL).host, key, keyLocation: SITE_URL + '/indexnow-key.txt', urlList: list }),
    });
    return { ok: r.status === 200 || r.status === 202, msg: `IndexNow answered ${r.status} for ${list.length} URL(s).` };
  } catch (e: any) { return { ok: false, msg: 'Could not reach IndexNow: ' + (e?.message ?? e) }; }
}

// ---------------------------------------------------------------------------------------------
// Public routes (must be registered before the /:slug catch-all)
// ---------------------------------------------------------------------------------------------
export function robotsTxt(origin: string): string {
  const block = (agents: string[]) => agents.map((a) => `User-agent: ${a}`).join('\n') + '\nAllow: /\nDisallow: /admin\n';
  return `# JKEdusphere welcomes search engines and AI answer engines.\n# Study notes and updates may be read, summarised and cited. Please link back to the page you use.\n\n${block(['*'])}\n${block(ROBOTS_AI_AGENTS)}\nSitemap: ${origin}/sitemap.xml\n`;
}

export function registerSeo(app: Hono<Env>) {
  app.get('/robots.txt', (c) => c.text(robotsTxt(siteOrigin(c.req.url)), 200, { 'Cache-Control': 'public, max-age=3600' }));

  app.get('/indexnow-key.txt', async (c) => c.text(await indexNowKey(c.env.DB), 200, { 'Cache-Control': 'public, max-age=86400' }));

  // ----- llms.txt: a short, curated map of the site written for AI assistants -----
  app.get('/llms.txt', async (c) => {
    const db = c.env.DB, o = siteOrigin(c.req.url), seo = resolve(await load(db)).data('seo');
    const cats = await getCats(db);
    const posts = (await db.prepare("SELECT title, slug, excerpt, category, published_at FROM posts WHERE status='published' AND published_at <= ? ORDER BY published_at DESC LIMIT 40").bind(now()).all()).results as Row[];
    const pages = (await db.prepare('SELECT title, slug, seo_description FROM pages ORDER BY title').all()).results as Row[];
    const notes = notesCatalog();
    const one = (s: unknown) => String(s ?? '').replace(/\s+/g, ' ').trim().slice(0, 160);
    const out = [
      `# ${seo.siteName || 'JKEdusphere'}`, '',
      `> ${seo.description}`, '',
      'JKEdusphere is an educational platform for competitive-exam aspirants in Jammu & Kashmir. It covers JKSSB, JKPSC, JKPSI, JKBOSE and NTA exams with free subject-wise study notes, daily current affairs, vacancy and exam updates, government scheme explainers and reports. Mock tests and PDF notes are offered on the sister site jkedusphere.com. Content is written in English for the J&K syllabus; always check the official notification for dates, eligibility and fees.', '',
      '## Study notes (subject-wise)', ...notes.map((n) => `- [${n.short} notes](${o}/${n.slug}): ${one(n.h1)} (${n.topics.length} topics)`), '',
      '## Current affairs', `- [Current Affairs hub](${o}/current-affairs): daily and monthly current affairs with International, National and J&K sections`,
      `- [Current Affairs RSS](${o}/current-affairs/feed.xml)`, '',
      '## Categories', ...cats.map((x) => `- [${x}](${o}${catUrl(x)})`), '',
      '## About and policies', ...pages.map((p) => `- [${p.title}](${o}/${p.slug})${p.seo_description ? ': ' + one(p.seo_description) : ''}`), '',
      '## Latest updates', ...posts.map((p) => `- [${p.title}](${o}/${p.slug}.md)${p.excerpt ? ': ' + one(p.excerpt) : ''}`), '',
      '## Optional', `- [Sitemap](${o}/sitemap.xml)`, `- [RSS feed](${o}/feed.xml)`, `- [Telegram channel](https://t.me/JKEdusphere)`, `- [Mock tests and notes (sister site)](https://www.jkedusphere.com)`, '',
    ].join('\n');
    return c.body(out, 200, { 'Content-Type': 'text/markdown; charset=utf-8', 'Cache-Control': 'public, max-age=1800' });
  });

  // ----- /slug.md: clean Markdown twin of each post, for AI tools. Not indexed; points to the real page as canonical. -----
  app.get('/:file{[a-z0-9-]+\\.md}', async (c) => {
    const slug = c.req.param('file').replace(/\.md$/, ''), o = siteOrigin(c.req.url);
    const p = await c.env.DB.prepare("SELECT * FROM posts WHERE slug = ? AND status = 'published' AND published_at <= ?").bind(slug, now()).first<Row>();
    if (!p) return c.text('Not found', 404);
    const url = `${o}/${p.slug}`, d = (t: number) => new Date(t * 1000).toISOString().slice(0, 10);
    const md = [`# ${p.title}`, '', p.excerpt ? `> ${String(p.excerpt).replace(/\s+/g, ' ')}` : '', '',
      `Source: ${url}`, `Published: ${d(p.published_at)}${p.updated_at - p.published_at > 86400 ? ` | Updated: ${d(p.updated_at)}` : ''}${p.category ? ` | Category: ${p.category}` : ''}`, '',
      htmlToMarkdown(p.body).replace(/\]\(\//g, `](${o}/`), '', '---', `Read the full, latest version at ${url} (JKEdusphere, Jammu & Kashmir exam preparation).`, ''].join('\n');
    return c.body(md, 200, { 'Content-Type': 'text/markdown; charset=utf-8', 'X-Robots-Tag': 'noindex', Link: `<${url}>; rel="canonical"`, 'Cache-Control': 'public, max-age=900' });
  });

  // ----- RSS feed of all posts (aggregators, readers and crawlers use it to discover new pages) -----
  app.get('/feed.xml', async (c) => {
    const o = siteOrigin(c.req.url);
    const posts = (await c.env.DB.prepare("SELECT title, slug, excerpt, category, published_at FROM posts WHERE status='published' AND published_at <= ? ORDER BY published_at DESC LIMIT 40").bind(now()).all()).results as Row[];
    const items = posts.map((p) => `<item><title>${xml(p.title)}</title><link>${o}/${xml(p.slug)}</link><guid isPermaLink="true">${o}/${xml(p.slug)}</guid><pubDate>${new Date(p.published_at * 1000).toUTCString()}</pubDate>${p.category ? `<category>${xml(p.category)}</category>` : ''}<description>${xml(p.excerpt || p.title)}</description></item>`).join('');
    return c.body(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>JKEdusphere</title><link>${o}/</link><description>Vacancies, study notes, current affairs and exam updates for Jammu &amp; Kashmir aspirants.</description><language>en-IN</language><atom:link href="${o}/feed.xml" rel="self" type="application/rss+xml"/>${items}</channel></rss>`,
      200, { 'Content-Type': 'application/rss+xml; charset=utf-8', 'Cache-Control': 'public, max-age=900' });
  });
  app.get('/rss.xml', (c) => c.redirect('/feed.xml', 301));

  // ---------------------------------------------------------------------------------------------
  // Admin: SEO & AI page
  // ---------------------------------------------------------------------------------------------
  const days = (n: number) => istDay(Date.now() - n * 86400000);
  const tbl = (head: string[], rows: string[][], empty = 'Nothing yet.') => rows.length
    ? `<div style="overflow-x:auto"><table><thead><tr>${head.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((x) => `<td>${x}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`
    : `<p class="muted">${empty}</p>`;
  const needMigration = `<div class="err">Run <code>migrations/0005_backlinks.sql</code> in the D1 console once to turn on the backlink tracker (same way as the earlier migrations).</div>`;

  async function seoPage(c: any, notice = '') {
    const db: D1Database = c.env.DB, from30 = days(29), from90 = days(89);
    const safe = async <T,>(f: () => Promise<T>, d: T): Promise<T> => { try { return await f(); } catch { return d; } };

    const crawl = await safe(async () => (await db.prepare("SELECT k, SUM(n) AS n, MAX(day) AS last FROM a_dim WHERE dim='aibot' AND day >= ? GROUP BY k ORDER BY n DESC").bind(from30).all()).results as Row[], []);
    const crawlPages = await safe(async () => (await db.prepare("SELECT k, SUM(n) AS n FROM a_dim WHERE dim='aibotp' AND day >= ? GROUP BY k ORDER BY n DESC LIMIT 12").bind(from30).all()).results as Row[], []);
    const aiRef = await safe(async () => (await db.prepare("SELECT k, SUM(n) AS n FROM a_dim WHERE dim='source' AND day >= ? AND k IN ('ChatGPT','Perplexity','Gemini','Copilot','Claude','You.com / Phind','Meta AI','DeepSeek','Grok','Mistral','Kagi') GROUP BY k ORDER BY n DESC").bind(from30).all()).results as Row[], []);
    const refs = await safe(async () => (await db.prepare("SELECT src, SUM(n) AS n FROM a_psrc WHERE day >= ? AND src LIKE '%.%' GROUP BY src ORDER BY n DESC LIMIT 25").bind(from90).all()).results as Row[], []);

    const posts = (await db.prepare("SELECT id, title, slug, seo_title, seo_description, excerpt, image, image_alt, category, length(body) AS bl FROM posts WHERE status='published' AND published_at <= ? ORDER BY published_at DESC LIMIT 800").bind(now()).all()).results as Row[];
    const link = (p: Row) => `<a href="/admin/posts/${p.id}/edit">${esc(p.title).slice(0, 80)}</a>`;
    const checks: [string, string, Row[]][] = [
      ['No meta description', 'Google writes its own snippet and AI tools get no summary. Aim for 120-160 characters.', posts.filter((p) => !String(p.seo_description ?? '').trim())],
      ['Meta description too long (over 165)', 'It gets cut off in results.', posts.filter((p) => String(p.seo_description ?? '').length > 165)],
      ['SEO title over 65 characters', 'Long titles are truncated.', posts.filter((p) => String(p.seo_title ?? '').length > 65)],
      ['Featured image without alt text', 'Hurts image search and accessibility.', posts.filter((p) => p.image && !String(p.image_alt ?? '').trim())],
      ['No category', 'Uncategorised posts are harder to find and link.', posts.filter((p) => !String(p.category ?? '').trim())],
      ['Short posts (under about 2,500 characters of HTML)', 'Thin pages are a common reason for the AdSense "Low-value content" rejection. Expand them, merge them, or noindex them.', posts.filter((p) => p.bl < 2500)],
    ];
    const health = checks.map(([t, why, list]) => `<details style="margin:8px 0"><summary><b>${t}</b> <span class="badge ${list.length ? 'sch' : 'pub'}">${list.length}</span></summary><p class="muted" style="margin:6px 0">${why}</p>${list.length ? '<ul>' + list.slice(0, 25).map((p) => `<li>${link(p)}</li>`).join('') + (list.length > 25 ? `<li class="muted">and ${list.length - 25} more</li>` : '') + '</ul>' : ''}</details>`).join('');

    let bl = '';
    try {
      const rows = (await db.prepare('SELECT * FROM backlinks ORDER BY CASE status WHEN \'live\' THEN 0 WHEN \'submitted\' THEN 1 WHEN \'planned\' THEN 2 ELSE 3 END, created_at DESC LIMIT 300').all()).results as Row[];
      const live = rows.filter((r) => r.status === 'live').length;
      const sel = (r: Row) => `<form method="post" action="/admin/seo/backlinks/${r.id}" style="display:flex;gap:6px;margin:0"><select name="status">${['planned', 'submitted', 'live', 'lost'].map((s) => `<option${s === r.status ? ' selected' : ''}>${s}</option>`).join('')}</select><button class="light">Save</button></form>`;
      bl = `<p class="muted">${rows.length} tracked, ${live} live. Log every link you earn or ask for, so you know what is working.</p>
${tbl(['Where (source page)', 'Anchor / target', 'Type', 'Status', ''], rows.map((r) => [`<a href="${esc(r.source_url)}" rel="noopener" target="_blank">${esc(String(r.source_url).replace(/^https?:\/\//, '')).slice(0, 60)}</a>${r.notes ? `<br><small class="muted">${esc(r.notes)}</small>` : ''}`, `${esc(r.anchor || '')}<br><small class="muted">${esc(r.target_path || '/')}</small>`, esc(r.kind || ''), sel(r), `<form method="post" action="/admin/seo/backlinks/${r.id}/delete" style="margin:0"><button class="danger">Delete</button></form>`]), 'No links logged yet.')}
<form method="post" action="/admin/seo/backlinks" class="box" style="margin-top:12px"><h3 style="margin-top:0">Add a link</h3>
<label>Page that links to you (URL)</label><input name="source_url" placeholder="https://example.com/page" required>
<div class="row"><div><label>Anchor text</label><input name="anchor"></div><div><label>Your page it points to</label><input name="target_path" placeholder="/jk-history-notes"></div></div>
<div class="row"><div><label>Type</label><select name="kind"><option>directory</option><option>profile</option><option>guest post</option><option>mention / citation</option><option>forum / Q&amp;A</option><option>education / news site</option><option>other</option></select></div><div><label>Status</label><select name="status"><option>planned</option><option>submitted</option><option>live</option><option>lost</option></select></div></div>
<label>Notes</label><input name="notes"><button>Add</button></form>`;
    } catch { bl = needMigration; }

    const crawlers = crawl.length ? tbl(['Crawler', 'Hits (30 days)', 'Last seen'], crawl.map((r) => [esc(r.k), String(r.n), esc(r.last)])) : `<p class="muted">No crawler visits recorded yet. Logging starts after you deploy this update; give it a few days.</p>`;
    const body = `<style>.kpi{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;margin-bottom:14px}code{background:#eef2f7;padding:1px 5px;border-radius:5px}details summary{cursor:pointer}</style>
<div class="bar"><h2 style="margin:0;flex:1">SEO &amp; AI visibility</h2></div>${notice ? `<div class="ok">${esc(notice)}</div>` : ''}
<div class="card"><h3 style="margin-top:0">Live files</h3><p style="margin:0">
<a href="/robots.txt" target="_blank">robots.txt</a> &middot; <a href="/llms.txt" target="_blank">llms.txt</a> &middot; <a href="/sitemap.xml" target="_blank">sitemap.xml</a> &middot; <a href="/feed.xml" target="_blank">feed.xml</a> &middot; <a href="/indexnow-key.txt" target="_blank">IndexNow key</a></p>
<form method="post" action="/admin/seo/indexnow" style="margin-top:12px"><button>Send every page to Bing / IndexNow</button> <span class="muted">New posts are sent automatically when you publish. Use this once after deploying.</span></form></div>
<div style="height:14px"></div>
<div class="card"><h3 style="margin-top:0">AI and search crawlers (last 30 days)</h3>${crawlers}${crawlPages.length ? '<h4>Pages they read most</h4>' + tbl(['Crawler | page', 'Hits'], crawlPages.map((r) => [esc(String(r.k).replace('|', '  |  ')), String(r.n)])) : ''}</div>
<div style="height:14px"></div>
<div class="card"><h3 style="margin-top:0">Visits from AI assistants (last 30 days)</h3>${tbl(['Assistant', 'Visits'], aiRef.map((r) => [esc(r.k), String(r.n)]), 'None yet. These appear when someone clicks a link inside ChatGPT, Perplexity, Gemini, Copilot or Claude.')}</div>
<div style="height:14px"></div>
<div class="card"><h3 style="margin-top:0">Websites sending you visitors (last 90 days)</h3><p class="muted">Each of these is a real backlink that people actually click.</p>${tbl(['Site', 'Visits'], refs.map((r) => [esc(r.src), String(r.n)]), 'No referring websites recorded yet.')}</div>
<div style="height:14px"></div>
<div class="card"><h3 style="margin-top:0">Content health (${posts.length} published posts)</h3>${health}</div>
<div style="height:14px"></div>
<div class="card"><h3 style="margin-top:0">Backlink tracker</h3>${bl}</div>`;
    return c.html(adminPage('SEO & AI', raw(body), true));
  }

  app.get('/admin/seo', (c) => seoPage(c));

  app.post('/admin/seo/indexnow', async (c) => {
    if (isLocal(c.req.url)) return seoPage(c, 'IndexNow is skipped on localhost.');
    const o = SITE_URL, db = c.env.DB, t = now();
    const posts = (await db.prepare("SELECT slug FROM posts WHERE status='published' AND published_at <= ? ORDER BY published_at DESC LIMIT 3000").bind(t).all()).results as Row[];
    const pages = (await db.prepare('SELECT slug FROM pages').all()).results as Row[];
    const notes = notesCatalog().flatMap((n) => n.topics.map((x) => x.path));
    const cats = (await getCats(db)).map(catUrl);
    const urls = [o + '/', o + '/current-affairs', ...cats.map((x) => o + x), ...posts.map((p) => `${o}/${p.slug}`), ...pages.map((p) => `${o}/${p.slug}`), ...notes.map((x) => o + x)];
    const r = await pingIndexNow(db, urls);
    return seoPage(c, (r.ok ? 'Sent. ' : 'Problem: ') + r.msg);
  });

  const clean = (v: unknown, n = 300) => String(v ?? '').trim().slice(0, n);
  app.post('/admin/seo/backlinks', async (c) => {
    const f = await c.req.formData(), url = clean(f.get('source_url'), 500);
    if (!/^https?:\/\//i.test(url)) return seoPage(c, 'Enter a full URL starting with http:// or https://');
    try {
      await c.env.DB.prepare('INSERT INTO backlinks (source_url, anchor, target_path, kind, status, notes, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?)')
        .bind(url, clean(f.get('anchor')), clean(f.get('target_path')), clean(f.get('kind'), 40), clean(f.get('status'), 20) || 'planned', clean(f.get('notes')), now(), now()).run();
    } catch { return c.html(adminPage('SEO & AI', raw(needMigration), true)); }
    return c.redirect('/admin/seo#backlinks');
  });
  app.post('/admin/seo/backlinks/:id', async (c) => {
    const st = clean((await c.req.formData()).get('status'), 20);
    if (['planned', 'submitted', 'live', 'lost'].includes(st)) await c.env.DB.prepare('UPDATE backlinks SET status=?, updated_at=? WHERE id=?').bind(st, now(), Number(c.req.param('id'))).run();
    return c.redirect('/admin/seo');
  });
  app.post('/admin/seo/backlinks/:id/delete', async (c) => {
    await c.env.DB.prepare('DELETE FROM backlinks WHERE id=?').bind(Number(c.req.param('id'))).run();
    return c.redirect('/admin/seo');
  });
}
