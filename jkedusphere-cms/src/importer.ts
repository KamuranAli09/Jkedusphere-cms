import type { Hono } from 'hono';
import { html } from 'hono/html';
import type { Env } from './types';
import { adminPage } from './layout';
import { cleanHtml, slugify } from './content';

const RESERVED = new Set(['admin', 'img', 'api', 'assets', 'static', 'robots.txt', 'sitemap.xml', 'favicon.ico', 'rss.xml', 'search', 'logo.png', 'og-default.png', 'llms.txt', 'favicon.svg', 'vacancies', 'category']);
const BATCH = 5; // kept small so each request stays well inside Worker limits
const SAME = new Set(['about-us', 'contact-us', 'privacy-policy', 'disclaimer']);

type Entry = { title?: { $t: string }; content?: { $t: string }; published?: { $t: string }; updated?: { $t: string }; category?: { term: string }[]; link?: { rel: string; href: string }[]; 'media$thumbnail'?: { url: string } };

const txt = (h: string) => h.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;|&quot;/g, "'").replace(/\s+/g, ' ').trim();
const excerpt = (h: string) => { const t = txt(h); return t.length <= 155 ? t : t.slice(0, 155).replace(/\s+\S*$/, '') + '...'; };

function catFor(labels: string[]) {
  const j = labels.join(' ').toLowerCase();
  if (/vacanc|recruit|\bjobs?\b|notification/.test(j)) return 'Vacancies';
  if (/current affairs|\bca\b/.test(j)) return 'Current Affairs';
  if (/scheme|yojana/.test(j)) return 'Govt Schemes';
  if (/report|analysis|cut.?off|trend/.test(j)) return 'Reports';
  if (/admit|result|answer key|update|exam date|syllabus/.test(j)) return 'Updates';
  return 'Study Material';
}

function datesFrom(h: string) {
  const out: { event: string; date: string }[] = [];
  const re = /<tr[^>]*>\s*<t[dh][^>]*>([\s\S]*?)<\/t[dh]>\s*<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(h)) && out.length < 6) {
    const k = txt(m[1]), v = txt(m[2]);
    if (/last date|appl(y|ication|ying) (start|open|begin)|exam date|admit card|result date|notification date|total vacanc/i.test(k) && v && v.length < 60) out.push({ event: k.slice(0, 60), date: v });
  }
  return out;
}

const fromTitle = (t: string) => { let s = slugify(t); if (s.length > 75) s = s.slice(0, 75).replace(/-[^-]*$/, ''); return s; };
const pathOf = (e: Entry) => { const l = e.link?.find((x) => x.rel === 'alternate')?.href; try { return l ? new URL(l).pathname : ''; } catch { return ''; } };
const ts = (s?: string) => { const t = Date.parse(s ?? ''); return Number.isNaN(t) ? Math.floor(Date.now() / 1000) : Math.floor(t / 1000); };

async function bodyOf(e: Entry, site: string) {
  if (e.content?.$t) return e.content.$t;
  // Feed is set to "short": fall back to reading the live page
  try {
    const r = await fetch(site + pathOf(e), { headers: { 'User-Agent': 'JKEdusphere-Importer' } });
    const m = (await r.text()).match(/id=['"]postBody['"][^>]*>([\s\S]*?)<div id=['"]aChp['"]/i);
    return m ? m[1] : '';
  } catch { return ''; }
}

const IMPORT_JS = `(function(){
var $=function(i){return document.getElementById(i)};
function log(t){var d=$('imp-log');d.textContent+=t+'\\n';d.scrollTop=d.scrollHeight}
async function run(kind){
  var site=$('imp-site').value.trim(),start=1,done=0,skip=0,fail=0,total=0;
  $('imp-posts').disabled=true;$('imp-pages').disabled=true;
  log('Starting '+kind+' import...');
  while(start){
    try{
      var r=await fetch('/admin/import/batch?kind='+kind+'&start='+start+'&slug='+$('imp-slug').value+'&site='+encodeURIComponent(site),{method:'POST'});
      var j=await r.json();
      if(!r.ok||j.error){log('Stopped: '+(j.error||('HTTP '+r.status)));break}
      total=j.total;done+=j.imported.length;skip+=j.skipped.length;fail+=j.failed.length;
      j.imported.forEach(function(t){log('Imported: '+t)});j.skipped.forEach(function(t){log('Skipped: '+t)});j.failed.forEach(function(t){log('FAILED: '+t)});
      $('imp-bar').style.width=(total?Math.min(100,Math.round((start+j.count-1)/total*100)):100)+'%';
      start=j.next
    }catch(e){log('Network error: '+e.message);break}
  }
  log('Finished. Imported '+done+', skipped '+skip+', failed '+fail+' (of '+total+').');
  $('imp-posts').disabled=false;$('imp-pages').disabled=false;
}
$('imp-posts').addEventListener('click',function(){run('posts')});
$('imp-pages').addEventListener('click',function(){run('pages')});
})();`;

export function registerImporter(app: Hono<Env>) {
  app.get('/admin/assets/import.js', (c) => c.body(IMPORT_JS, 200, { 'Content-Type': 'text/javascript; charset=utf-8', 'Cache-Control': 'no-store' }));

  app.get('/admin/import', (c) => c.html(adminPage('Import from Blogger', html`
    <h2>Import from Blogger</h2>
    <p class="muted">Run this <b>before</b> you point your domain at the new site, while Blogger is still live. It is safe to run again: posts already imported are skipped. Each old Blogger address will redirect to its new address.</p>
    <div class="card">
      <label>Blogger site address</label><input id="imp-site" value="https://www.jkedusphere.online">
      <label>Link style for imported posts</label>
      <select id="imp-slug"><option value="keep">Keep the link Blogger already uses (recommended)</option><option value="title">Build the link from the full post title</option></select>
      <button id="imp-posts" type="button">Import all posts</button>
      <button id="imp-pages" type="button" class="light">Import pages</button>
      <div style="height:10px;background:#e4eaf3;border-radius:6px;margin-top:16px;overflow:hidden"><div id="imp-bar" style="height:100%;width:0;background:#2f78c4"></div></div>
      <pre id="imp-log" style="background:#0f1b33;color:#d7e3ff;padding:14px;border-radius:8px;max-height:340px;overflow:auto;font-size:13px;white-space:pre-wrap;margin-top:14px">Ready.
</pre>
    </div>
    <script src="/admin/assets/import.js" defer></script>`, true)));

  app.post('/admin/import/batch', async (c) => {
    const q = c.req.query(), kind = q.kind === 'pages' ? 'pages' : 'posts', start = Math.max(1, parseInt(q.start ?? '1', 10) || 1);
    let site: URL;
    try { site = new URL(q.site ?? ''); } catch { return c.json({ error: 'Enter a valid site address' }, 400); }
    if (!/^(www\.)?jkedusphere\.online$|\.blogspot\.com$|^localhost$/.test(site.hostname)) return c.json({ error: 'Only your own Blogger site can be imported' }, 400);
    const origin = site.origin, db = c.env.DB;

    let feed: any;
    try {
      const r = await fetch(`${origin}/feeds/${kind}/default?alt=json&start-index=${start}&max-results=${BATCH}`, { headers: { 'User-Agent': 'JKEdusphere-Importer' } });
      if (!r.ok) return c.json({ error: `Blogger feed returned ${r.status}` }, 502);
      feed = (await r.json() as any).feed;
    } catch (e: any) { return c.json({ error: 'Could not reach the Blogger feed: ' + (e?.message ?? e) }, 502); }

    const entries: Entry[] = feed?.entry ?? [], total = parseInt(feed?.['openSearch$totalResults']?.$t ?? '0', 10) || entries.length;
    const out = { imported: [] as string[], skipped: [] as string[], failed: [] as string[] };
    const now = Math.floor(Date.now() / 1000);

    for (const e of entries) {
      const title = txt(e.title?.$t ?? '') || 'Untitled', oldPath = pathOf(e);
      try {
        const file = decodeURIComponent(oldPath.split('/').pop() ?? '').replace(/\.html$/, '').replace(/_/g, '-');
        const fileSlug = slugify(file) || slugify(title);
        let slug = q.slug === 'title' ? fromTitle(title) || fileSlug : fileSlug;
        const raw = await bodyOf(e, origin);

        if (kind === 'pages') {
          const alias = [...SAME].find((s) => fileSlug === s || fileSlug.startsWith(s + '-'));
          if (alias) { await db.prepare('INSERT OR IGNORE INTO redirects (from_path,to_path,status) VALUES (?,?,301)').bind(oldPath, `/${alias}`).run(); out.skipped.push(`${title} (kept your new ${alias} page)`); continue; }
          if (/<script/i.test(raw)) { out.skipped.push(`${title} (has scripts or widgets, rebuild it by hand)`); continue; }
          if (RESERVED.has(slug)) slug += '-page';
          const ex = await db.prepare('SELECT id FROM pages WHERE slug = ? UNION SELECT id FROM posts WHERE slug = ?').bind(slug, slug).first();
          if (ex) { out.skipped.push(`${title} (already exists)`); continue; }
          await db.batch([
            db.prepare('INSERT INTO pages (title,slug,body,seo_description,updated_at) VALUES (?,?,?,?,?)').bind(title.slice(0, 200), slug, cleanHtml(raw), excerpt(raw), ts(e.updated?.$t)),
            db.prepare('INSERT OR IGNORE INTO redirects (from_path,to_path,status) VALUES (?,?,301)').bind(oldPath, `/${slug}`)]);
          out.imported.push(title); continue;
        }

        if (RESERVED.has(slug)) slug += '-post';
        const ex = await db.prepare('SELECT id FROM posts WHERE slug = ?').bind(slug).first();
        if (ex) { out.skipped.push(`${title} (already imported)`); continue; }
        if (await db.prepare('SELECT id FROM pages WHERE slug = ?').bind(slug).first()) slug += '-post';

        const labels = (e.category ?? []).map((x) => x.term), body = cleanHtml(raw), dates = datesFrom(body);
        const thumb = e['media$thumbnail']?.url?.replace(/\/s\d+(-c)?\//, '/s1200/') ?? null;
        await db.batch([
          db.prepare(`INSERT INTO posts (title,slug,body,excerpt,category,tags,image,image_alt,seo_title,seo_description,important_dates,status,published_at,views,created_at,updated_at)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,'published',?,0,?,?)`).bind(title.slice(0, 200), slug, body, excerpt(body), catFor(labels), labels.join(', '), thumb, thumb ? title : null, '', '', JSON.stringify(dates), ts(e.published?.$t), now, ts(e.updated?.$t)),
          db.prepare('INSERT OR IGNORE INTO redirects (from_path,to_path,status) VALUES (?,?,301)').bind(oldPath, `/${slug}`)]);
        out.imported.push(title);
      } catch (err: any) { out.failed.push(`${title}: ${err?.message ?? err}`); }
    }
    const next = start + entries.length <= total && entries.length ? start + entries.length : 0;
    return c.json({ ...out, count: entries.length, total, next });
  });
}
