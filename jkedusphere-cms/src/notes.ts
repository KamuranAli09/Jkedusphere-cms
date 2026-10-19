// Subject notes pages (e.g. /polity): one long page, sidebar of topics, #anchors for every topic.
// To add a subject: create src/notes-<subject>.ts (copy notes-polity.ts), then add it to SUBJECTS below.
import type { Hono } from 'hono';
import type { Env } from './types';
import { siteOrigin } from './types';
import { esc, shell } from './homepage';
import { POLITY } from './notes-polity';
import { JKGEO } from './notes-jkgeo';
import { MAPS } from './notes-maps';

export type Subject = {
  slug: string;        // address, e.g. 'polity' -> /polity
  short: string;       // breadcrumb name, e.g. 'Polity'
  h1: string;          // page heading
  title: string;       // browser / Google title
  description: string; // Google description (about 150 characters)
  intro: string;       // line under the heading
  published: string;   // YYYY-MM-DD
  updated: string;     // YYYY-MM-DD (change when notes change)
  source: string;      // the notes, in the simple format described in notes-polity.ts
};

const SUBJECTS: Subject[] = [POLITY, JKGEO];

// Buttons and footnote at the end of each page (default: free mock tests + Telegram)
const CTA: Record<string, [string, string][]> = {
  polity: [['Free mock tests', 'https://jkedusphere.com'], ['Polity mock test', '/polity-foundation-mock-test-jkpsc'], ['Join Telegram', 'https://t.me/jkedusphere']],
};
const CTA_DEFAULT: [string, string][] = [['Free mock tests', 'https://jkedusphere.com'], ['Join Telegram', 'https://t.me/jkedusphere']];
const NOTE: Record<string, string> = {
  polity: 'Prepared for exam revision from the Constitution of India and standard sources. Office-holders and recent developments change, so check official sources before relying on them.',
};
const NOTE_DEFAULT = 'Prepared for exam revision from standard sources, official publications and the Census. Figures and recent developments change, so check official sources before relying on them.';

type Topic = { id: string; title: string; unit: string; html: string; mins: number };
type Unit = { title: string; topics: Topic[] };

const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const fmtDate = (iso: string) => { const [y, m, d] = iso.split('-').map(Number); return `${d} ${MON[m - 1]} ${y}`; };
const slugify = (s: string) => s.toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60);
const safeUrl = (u: string) => (/^(https?:\/\/|\/|#|mailto:)/i.test(u) ? u : '#');

// ---------- Notes format -> HTML ----------
function inline(raw: string): string {
  let s = esc(raw);
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, t: string, u: string) => {
    const url = safeUrl(u.replace(/&amp;/g, '&'));
    return `<a href="${esc(url)}"${/^https?:\/\//i.test(url) ? ' target="_blank" rel="noopener"' : ''}>${t}</a>`;
  });
  s = s.replace(/\*\*([^*]+?)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|[^*\w])\*([^*\s][^*]*?)\*(?![*\w])/g, '$1<em>$2</em>');
  s = s.replace(/==([^=]+?)==/g, '<mark>$1</mark>');
  return s.replace(/&lt;br&gt;/g, '<br>');
}

const BOX: Record<string, string> = { tip: 'Exam tip', key: 'Key facts', jk: 'J&K corner', mem: 'Memory trick', new: 'Recent update', note: 'Note' };
const LIST = /^(\s*)([-*]|\d+[.)])\s+(.*)$/;
const isList = (l: string) => LIST.test(l);
const special = (l: string) => /^(@map\s|#{3,4}\s|\||:::|>\s?|---+\s*$)/.test(l) || isList(l);

function cells(line: string): string[] {
  let t = line.trim();
  if (t.startsWith('|')) t = t.slice(1);
  if (t.endsWith('|')) t = t.slice(0, -1);
  return t.split('|').map((c) => c.trim());
}

function list(lines: string[], start: number): [string, number] {
  const items: { indent: number; ord: boolean; text: string }[] = [];
  let i = start;
  while (i < lines.length) {
    const l = lines[i];
    if (!l.trim()) break;
    const m = l.match(LIST);
    if (m) { items.push({ indent: m[1].length, ord: /\d/.test(m[2]), text: m[3] }); i++; }
    else if (/^\s{2,}\S/.test(l) && items.length) { items[items.length - 1].text += ' ' + l.trim(); i++; }
    else break;
  }
  let p = 0;
  const build = (indent: number): string => {
    const ord = items[p].ord;
    let h = ord ? '<ol>' : '<ul>';
    while (p < items.length && items[p].indent === indent) {
      h += `<li>${inline(items[p].text)}`;
      p++;
      if (p < items.length && items[p].indent > indent) h += build(items[p].indent);
      h += '</li>';
    }
    return h + (ord ? '</ol>' : '</ul>');
  };
  return [build(items[0].indent), i];
}

function render(lines: string[], tid: string): string {
  const out: string[] = [];
  let i = 0;
  while (i < lines.length) {
    const ln = lines[i];
    if (!ln.trim()) { i++; continue; }

    const box = ln.match(/^:::(\w+)\s*(.*)$/);
    if (box) {
      const inner: string[] = [];
      i++;
      while (i < lines.length && lines[i].trim() !== ':::') inner.push(lines[i++]);
      i++;
      const kind = BOX[box[1]] ? box[1] : 'note';
      out.push(`<aside class="bx ${kind}"><div class="bx-t">${esc(box[2] || BOX[kind])}</div>${render(inner, tid)}</aside>`);
      continue;
    }
    const mp = ln.match(/^@map\s+([\w-]+)\s*(?:\|\s*(.*))?$/);
    if (mp) { const svg = MAPS[mp[1]]; if (!svg) throw new Error('Unknown map: ' + mp[1]); out.push(`<figure class="nm">${svg}<figcaption>${inline(mp[2] || '')}</figcaption></figure>`); i++; continue; }
    const h = ln.match(/^(#{3,4})\s+(.+)$/);
    if (h) { out.push(`<h${h[1].length} id="${tid}-${slugify(h[2])}">${inline(h[2])}</h${h[1].length}>`); i++; continue; }

    if (ln.startsWith('|')) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].startsWith('|')) rows.push(cells(lines[i++]));
      const sep = rows.length > 1 && rows[1].every((c) => /^:?-{2,}:?$/.test(c));
      const head = sep ? rows[0] : null;
      const body = rows.slice(sep ? 2 : 0);
      out.push(`<div class="tw"><table>${head ? `<thead><tr>${head.map((c) => `<th>${inline(c)}</th>`).join('')}</tr></thead>` : ''}<tbody>${body.map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`);
      continue;
    }
    if (/^>\s?/.test(ln)) {
      const q: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) q.push(lines[i++].replace(/^>\s?/, '').trim());
      out.push(`<blockquote>${inline(q.join(' '))}</blockquote>`);
      continue;
    }
    if (/^---+\s*$/.test(ln)) { out.push('<hr>'); i++; continue; }
    if (isList(ln)) { const [html, next] = list(lines, i); out.push(html); i = next; continue; }

    const buf = [ln.trim()];
    i++;
    while (i < lines.length && lines[i].trim() && !special(lines[i])) buf.push(lines[i++].trim());
    out.push(`<p>${inline(buf.join(' '))}</p>`);
  }
  return out.join('\n');
}

export function parseNotes(src: string): Unit[] {
  const units: Unit[] = [];
  const seen = new Set<string>();
  const cur: { unit: Unit | null; id: string; title: string; lines: string[] | null } = { unit: null, id: '', title: '', lines: null };
  const flush = () => {
    if (cur.unit && cur.lines) {
      if (seen.has(cur.id)) throw new Error('Duplicate topic id: ' + cur.id);
      seen.add(cur.id);
      const words = cur.lines.join(' ').split(/\s+/).filter(Boolean).length;
      cur.unit.topics.push({ id: cur.id, title: cur.title, unit: cur.unit.title, html: render(cur.lines, cur.id), mins: Math.max(1, Math.round(words / 200)) });
    }
    cur.lines = null;
  };
  for (const raw of src.split('\n')) {
    const line = raw.replace(/\s+$/, '');
    const u = line.match(/^@unit\s+(.+)$/);
    if (u) { flush(); cur.unit = { title: u[1].trim(), topics: [] }; units.push(cur.unit); continue; }
    const t = line.match(/^##\s+(.+?)(?:\s*\{#([\w-]+)\})?$/);
    if (t && cur.unit) { flush(); cur.id = t[2] || slugify(t[1]); cur.title = t[1].trim(); cur.lines = []; continue; }
    if (cur.lines) cur.lines.push(line);
  }
  flush();
  return units;
}

// ---------- Page ----------
const CSS = `
.nt-head{padding-top:6px;padding-bottom:18px}
.nt-head h1{font-size:clamp(28px,4.6vw,44px);letter-spacing:-.02em}
.nt-stats{display:flex;flex-wrap:wrap;gap:8px 22px;margin-top:14px;font-size:14.5px;color:var(--mut)}
.nt-stats b{color:var(--navy)}
.nt{display:grid;grid-template-columns:290px minmax(0,1fr);gap:40px;align-items:start;padding-top:6px;padding-bottom:56px}
.nt-side{position:sticky;top:calc(var(--hh,76px) + 12px);max-height:calc(100vh - var(--hh,76px) - 28px);overflow:auto;border:1px solid var(--line);border-radius:12px;background:#fff;padding:12px 8px 14px;scrollbar-width:thin}
.nt-sh{display:flex;gap:8px;align-items:center;padding:0 6px 10px}
.nt-sh input{flex:1;min-width:0;border:1px solid #cdd6e4;border-radius:8px;padding:9px 12px;font:inherit;font-size:14.5px;background:var(--soft);color:var(--ink)}
.nt-x{display:none;border:0;background:transparent;font-size:30px;line-height:1;color:var(--mut);cursor:pointer;padding:0 6px}
.nt-side details{border:0;border-radius:0;margin:0;padding:0}
.nt-side summary{list-style:none;cursor:pointer;display:flex;justify-content:space-between;align-items:center;padding:11px 10px 6px;font-size:11.5px;font-weight:900;letter-spacing:.07em;text-transform:uppercase;color:var(--mut)}
.nt-side summary::-webkit-details-marker{display:none}
.nt-side summary::after{content:"\\25BE";font-size:12px;transition:transform .15s}
.nt-side details:not([open]) summary::after{transform:rotate(-90deg)}
.nt-side a{display:block;padding:7px 10px;margin:1px 0;border-left:3px solid transparent;border-radius:0 8px 8px 0;font-size:14.5px;line-height:1.35;color:var(--ink);text-decoration:none}
.nt-side a:hover{background:var(--soft)}
.nt-side a.on{border-left-color:var(--blue);background:var(--soft);color:var(--navy);font-weight:700}
.nt-bar{display:none}
.nt-scrim{display:none}
.nt-main{min-width:0;max-width:820px}
.nt-topic{scroll-margin-top:calc(var(--hh,76px) + 18px);padding:4px 0 34px;margin-bottom:34px;border-bottom:1px solid var(--line)}
.nt-topic>.nt-t{font-size:clamp(25px,3.6vw,34px);letter-spacing:-.02em;line-height:1.18}
.nt-anchor{color:var(--sky);text-decoration:none;margin-right:6px;font-weight:700;opacity:.0;transition:opacity .15s}
.nm{margin:18px 0 24px;overflow-x:auto;-webkit-overflow-scrolling:touch}.nm svg{display:block;width:100%;min-width:640px;height:auto;border:1px solid var(--line);border-radius:12px;background:#f4f9fd}.nm figcaption{font-size:13px;color:var(--mut);margin-top:8px;line-height:1.5}
.nt-meta{font-size:13.5px;color:var(--mut);margin:6px 0 18px}
.nt-body{font-size:17px;line-height:1.75}
.nt-body h3,.nt-body h4{scroll-margin-top:calc(var(--hh,76px) + 18px)}
.nt-body h3{font-size:21px;margin:30px 0 8px;color:var(--navy)}
.nt-body h4{font-size:17.5px;margin:22px 0 6px}
.nt-body p{margin:0 0 14px}
.nt-body a{color:var(--blue);text-decoration:underline;text-underline-offset:2px}
.nt-body ul,.nt-body ol{margin:0 0 16px;padding-left:22px}
.nt-body li{margin:5px 0}
.nt-body li>ul,.nt-body li>ol{margin:4px 0 6px}
.nt-body mark{background:#fff1b8;padding:0 3px;border-radius:3px;color:inherit}
.nt-body blockquote{margin:18px 0;padding:6px 18px;border-left:4px solid var(--sky);color:var(--mut);font-style:italic}
.nt-body hr{border:0;border-top:1px solid var(--line);margin:24px 0}
.tw{overflow-x:auto;margin:0 0 20px;border:1px solid var(--line);border-radius:10px;-webkit-overflow-scrolling:touch}
.tw table{width:100%;min-width:560px;border-collapse:collapse;font-size:15px;line-height:1.5}
.tw th,.tw td{overflow-wrap:normal;word-break:normal;hyphens:none}
.tw td:first-child{min-width:96px}
.tw th,.tw td{text-align:left;vertical-align:top;padding:9px 13px;border-top:1px solid var(--line)}
.tw thead th{background:var(--soft);color:var(--navy);border-top:0;font-weight:900;white-space:nowrap}
.tw tbody tr:first-child td{border-top:0}
.tw tbody tr:nth-child(even){background:#fafcff}
.bx{border:1px solid;border-left-width:5px;border-radius:12px;padding:12px 18px 4px;margin:20px 0}
.bx-t{font-size:12px;font-weight:900;letter-spacing:.07em;text-transform:uppercase;margin-bottom:6px}
.bx p,.bx li{font-size:16px;line-height:1.65}
.bx.tip{background:#fff8e6;border-color:#f0d58a}.bx.tip .bx-t{color:#9a6a00}
.bx.key{background:#eef5fd;border-color:#bcd5f0}.bx.key .bx-t{color:var(--navy)}
.bx.jk{background:#e2f4ed;border-color:#9fd6c0}.bx.jk .bx-t{color:var(--green)}
.bx.mem{background:#f1ecfb;border-color:#cbbdea}.bx.mem .bx-t{color:#5b3fa8}
.bx.new{background:#fbe9e6;border-color:#eab4ab}.bx.new .bx-t{color:var(--red)}
.bx.note{background:var(--soft);border-color:var(--line)}.bx.note .bx-t{color:var(--mut)}
.nt-pn{display:flex;justify-content:space-between;gap:12px;margin-top:26px;flex-wrap:wrap}
.nt-pn a{display:block;max-width:49%;padding:11px 15px;border:1px solid var(--line);border-radius:10px;text-decoration:none;font-weight:700;font-size:14.5px;color:var(--navy)}
.nt-pn a:hover{border-color:var(--navy)}
.nt-pn small{display:block;font-weight:400;font-size:12.5px;color:var(--mut)}
.nt-pn .nx{margin-left:auto;text-align:right}
.nt-end{background:var(--soft);border:1px solid var(--line);border-radius:14px;padding:22px 24px;margin-top:8px}
.nt-end h2{font-size:24px}
.nt-end p{margin:8px 0 14px;color:var(--mut)}
.nt-cta{display:flex;flex-wrap:wrap;gap:10px}
.nt-end .nt-small{font-size:13.5px;margin:16px 0 0}
@media(max-width:900px){
 .nt{grid-template-columns:minmax(0,1fr);gap:0}
 .nt-bar{display:flex;align-items:center;gap:12px;position:sticky;top:var(--hh,70px);z-index:8;background:#fff;border-bottom:1px solid var(--line);padding:9px 20px}
 .nt-bar button{flex:none;border:1px solid var(--navy);background:var(--navy);color:#fff;border-radius:8px;padding:8px 14px;font:700 14px Lato,sans-serif;cursor:pointer}
 .nt-bar span{flex:1;min-width:0;font-size:14px;font-weight:700;color:var(--navy);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
 .nt-side{position:fixed;z-index:40;top:0;left:0;bottom:0;width:min(88vw,350px);max-height:none;border-radius:0 14px 14px 0;transform:translateX(-104%);transition:transform .22s ease;box-shadow:0 0 40px rgba(20,34,74,.25);padding-top:14px}
 .nt-side.open{transform:none}
 .nt-x{display:block}
 .nt-scrim{display:block;position:fixed;inset:0;z-index:39;background:rgba(20,34,74,.45);opacity:0;pointer-events:none;transition:opacity .2s}
 .nt-scrim.on{opacity:1;pointer-events:auto}
 .nt-topic{scroll-margin-top:calc(var(--hh,70px) + 64px)}
 .nt-body h3,.nt-body h4{scroll-margin-top:calc(var(--hh,70px) + 64px)}
 .nt-body{font-size:16.5px}
 .nt-pn a{max-width:100%;flex:1 1 100%}
 .nt-pn .nx{margin-left:0}
}
html.nt-lock{overflow:hidden}
@media(prefers-reduced-motion:no-preference){html{scroll-behavior:smooth}}
@media print{.nt-side,.nt-bar,.nt-scrim,.nt-pn,.nt-end,.nt-anchor{display:none!important}.nt{display:block}.nt-topic{break-inside:auto}}
`;

const js = (ids: string[], first: string, base: string) => `
(function(){
var d=document;function $(s,r){return (r||d).querySelector(s)}function $$(s,r){return [].slice.call((r||d).querySelectorAll(s))}
var side=$('#ntside'),scrim=$('#ntscrim'),openB=$('#ntopen'),closeB=$('#ntclose'),q=$('#ntq');
if(!side)return;
var IDS=${JSON.stringify(ids)},FIRST=${JSON.stringify(first)},BASE=${JSON.stringify(base)};
var h=decodeURIComponent(location.hash.slice(1));
if(h&&h!==FIRST&&IDS.indexOf(h)>-1){location.replace(BASE+'/'+h);return}
function hh(){var x=$('header');d.documentElement.style.setProperty('--hh',(x?x.offsetHeight:76)+'px')}
hh();addEventListener('resize',hh);
function setOpen(o){side.classList.toggle('open',o);scrim.classList.toggle('on',o);d.documentElement.classList.toggle('nt-lock',o);openB.setAttribute('aria-expanded',o?'true':'false')}
openB.addEventListener('click',function(){setOpen(!side.classList.contains('open'))});
closeB.addEventListener('click',function(){setOpen(false)});
scrim.addEventListener('click',function(){setOpen(false)});
addEventListener('keydown',function(e){if(e.key==='Escape')setOpen(false)});
var a=$('a.on',side);
if(a){var u=a.closest('details');if(u)u.open=true;side.scrollTop=Math.max(0,a.offsetTop-side.clientHeight/3)}
if(q)q.addEventListener('input',function(){
 var v=q.value.trim().toLowerCase();
 $$('details.nt-u',side).forEach(function(u){
  var any=false;
  $$('a',u).forEach(function(a){var m=!v||a.textContent.toLowerCase().indexOf(v)>-1;a.style.display=m?'':'none';if(m)any=true});
  u.style.display=any?'':'none';if(v&&any)u.open=true;
 });
});
})();
`;

type Built = { units: number; mins: number; flat: Topic[]; pages: Map<string, string> };

const plain = (h: string) => h.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim();
const desc = (t: Topic) => {
  const p = t.html.match(/<p>([\s\S]*?)<\/p>/);
  const x = plain(p ? p[1] : t.html);
  return (x.length > 155 ? x.slice(0, 152).replace(/\s+\S*$/, '') + '...' : x) || t.title;
};

function build(sub: Subject): Built {
  const units = parseNotes(sub.source);
  const flat = units.flatMap((u) => u.topics);
  const base = '/' + sub.slug;
  const url = (t: Topic) => (t === flat[0] ? base : `${base}/${t.id}`);
  const ids = new Set(flat.map((t) => t.id));
  const fix = (h: string) => h.replace(/href="#([\w-]+)"/g, (m, id: string) => (ids.has(id) ? `href="${url(flat.find((t) => t.id === id)!)}"` : m));
  const pages = new Map<string, string>();
  flat.forEach((t, i) => {
    const prev = flat[i - 1], next = flat[i + 1];
    const side = units.map((u) => `<details class="nt-u" open><summary>${esc(u.title)}</summary>${u.topics.map((x) => `<a href="${url(x)}"${x === t ? ' class="on" aria-current="page"' : ''}>${esc(x.title)}</a>`).join('')}</details>`).join('');
    const pn = prev || next
      ? `<div class="nt-pn">${prev ? `<a class="pv" href="${url(prev)}" rel="prev"><small>&larr; Previous</small>${esc(prev.title)}</a>` : ''}${next ? `<a class="nx" href="${url(next)}" rel="next"><small>Next &rarr;</small>${esc(next.title)}</a>` : ''}</div>`
      : '';
    const tag = i === 0 ? 'h2' : 'h1';
    pages.set(t.id, `<section class="nt-topic" id="${t.id}"><${tag} class="nt-t">${esc(t.title)}</${tag}><div class="nt-meta">${esc(t.unit)} &middot; ${t.mins} min read</div><div class="nt-body">${fix(t.html)}</div>${pn}</section>|||${side}`);
  });
  return { units: units.length, mins: flat.reduce((a, t) => a + t.mins, 0), flat, pages };
}

const cache = new Map<string, Built>();
const built = (sub: Subject) => { let b = cache.get(sub.slug); if (!b) { b = build(sub); cache.set(sub.slug, b); } return b; };

// Addresses of every notes page, for the sitemap
export function notesPaths(): { path: string; lastmod: string }[] {
  return SUBJECTS.flatMap((sub) => built(sub).flat.map((t, i) => ({ path: i === 0 ? '/' + sub.slug : `/${sub.slug}/${t.id}`, lastmod: sub.updated })));
}

export function registerNotes(app: Hono<Env>) {
  for (const sub of SUBJECTS) {
    const base = '/' + sub.slug;
    const render = async (c: any, id: string | null) => {
      const b = built(sub);
      const idx = id ? b.flat.findIndex((t) => t.id === id) : 0;
      if (idx < 0) return c.notFound();
      const t = b.flat[idx], first = idx === 0, o = siteOrigin(c.req.url), url = o + (first ? base : `${base}/${t.id}`);
      const [main, side] = (b.pages.get(t.id) as string).split('|||');
      const head = first
        ? `<div class="w nt-head"><h1>${esc(sub.h1)}</h1><p class="s2">${esc(sub.intro)}</p>
<div class="nt-stats"><span><b>${b.flat.length}</b> topics</span><span><b>${b.units}</b> units</span><span>About <b>${Math.round(b.mins / 5) * 5 || b.mins}</b> min of reading</span><span>Updated ${fmtDate(sub.updated)}</span></div></div>`
        : '';
      const crumbs = `<nav class="crumb w" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span>${first ? `<span>${esc(sub.short)}</span>` : `<a href="${base}">${esc(sub.short)}</a><span>/</span><span>${esc(t.title)}</span>`}</nav>`;
      const body = `<style>${CSS}</style>
${crumbs}
${head}
<div class="nt-bar"><button type="button" id="ntopen" aria-expanded="false" aria-controls="ntside">&#9776; Topics</button><span id="ntcur">${esc(t.title)}</span></div>
<div class="w nt">
<div class="nt-side" id="ntside" role="navigation" aria-label="${esc(sub.short)} topics"><div class="nt-sh"><input type="search" id="ntq" placeholder="Search topics" aria-label="Search topics"><button type="button" class="nt-x" id="ntclose" aria-label="Close topics">&times;</button></div>${side}</div>
<div class="nt-scrim" id="ntscrim"></div>
<article class="nt-main">
${main}
<section class="nt-end"><h2>Keep practising</h2><p>Notes are only half the work. Test yourself with questions and discuss doubts with other aspirants.</p>
<div class="nt-cta">${(CTA[sub.slug] || CTA_DEFAULT).map(([l, h], k) => `<a class="btn${k ? ' o' : ''}" href="${esc(h)}">${esc(l)}</a>`).join('')}</div>
<p class="nt-small">${esc(NOTE[sub.slug] || NOTE_DEFAULT)} Found a mistake? <a href="/contact-us">Tell us</a>.</p></section>
</article></div>
<script>${js(b.flat.map((x) => x.id), b.flat[0].id, base)}</script>`;
      const title = first ? sub.title : `${t.title}: ${sub.short} Notes | JKEdusphere`;
      const description = first ? sub.description : desc(t);
      const crumbLd = [{ '@type': 'ListItem', position: 1, name: 'Home', item: o + '/' }, { '@type': 'ListItem', position: 2, name: sub.short, item: o + base }, ...(first ? [] : [{ '@type': 'ListItem', position: 3, name: t.title, item: url }])];
      const ld = { '@context': 'https://schema.org', '@graph': [
        { '@type': 'Article', headline: first ? sub.h1 : t.title, description, inLanguage: 'en-IN', datePublished: sub.published, dateModified: sub.updated, mainEntityOfPage: url,
          author: { '@type': 'Organization', name: 'JKEdusphere' }, publisher: { '@type': 'Organization', name: 'JKEdusphere' } },
        { '@type': 'BreadcrumbList', itemListElement: crumbLd }] };
      return c.html(await shell(c.env.DB, o, { title, description, canonical: url, type: 'article', ld, body }), 200, { 'Cache-Control': 'public, max-age=300' });
    };
    app.get(base, (c) => render(c, null));
    app.get(base + '/', (c) => c.redirect(base, 301));
    app.get(base + '/:topic', (c) => {
      const id = c.req.param('topic');
      const t = built(sub).flat;
      if (id === t[0].id) return c.redirect(base, 301);
      return render(c, id as string);
    });
  }
}
