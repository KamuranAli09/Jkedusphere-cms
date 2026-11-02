// =============================================================================================
// Current Affairs hub  (public: /current-affairs   admin: /admin/current-affairs)
//
//  - Headline bar (scrolling ticker) on top of every current-affairs page
//  - Editable sections: region tabs (International, National, J&K ...) and subject tabs (Polity ...)
//  - Posts come from CATEGORY + TAGS: a section = a category and any of its tags
//  - Daily / monthly archive pages, section pages with pagination, RSS feed, sitemap entries, JSON-LD
//
// No migration needed: all settings live in the existing `settings` table (key: ca_config).
// =============================================================================================
import type { Hono } from 'hono';
import { html } from 'hono/html';
import type { Env } from './types';
import { adminPage } from './layout';
import { getCats } from './categories';
import { slugify } from './content';
import { esc, href, load as loadHome, resolve, shell, orgNode, siteRef } from './homepage';

// ---------------------------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------------------------
const IST = 5.5 * 3600 * 1000;
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTH = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const nowS = () => Math.floor(Date.now() / 1000);
const iso = (ts: number) => new Date(ts * 1000).toISOString();
const ist = (ts: number) => new Date(ts * 1000 + IST);
const fmtDay = (ts: number) => { const d = ist(ts); return `${d.getUTCDate()} ${MON[d.getUTCMonth()]} ${d.getUTCFullYear()}`; };
const longDay = (ymd: string) => { const [y, m, d] = ymd.split('-').map(Number); return `${d} ${MONTH[m - 1]} ${y}`; };
const longMonth = (ym: string) => { const [y, m] = ym.split('-').map(Number); return `${MONTH[m - 1]} ${y}`; };
const istToday = () => ist(nowS()).toISOString().slice(0, 10);
const dayBounds = (ymd: string): [number, number] | null => { const t = Date.parse(ymd + 'T00:00:00Z'); return Number.isNaN(t) ? null : [Math.floor((t - IST) / 1000), Math.floor((t - IST) / 1000) + 86400]; };
const monthBounds = (ym: string): [number, number] | null => {
  const [y, m] = ym.split('-').map(Number); if (!y || !m || m > 12) return null;
  return [Math.floor((Date.UTC(y, m - 1, 1) - IST) / 1000), Math.floor((Date.UTC(y, m, 1) - IST) / 1000)];
};
const abs = (o: string, u: string) => (u && u.startsWith('/') ? o + u : u);
const clip = (v: unknown, n: number) => String(v ?? '').replace(/[\u0000-\u001f]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, n);
const area = (v: unknown, n: number) => String(v ?? '').replace(/\r/g, '').trim().slice(0, n);
const tagList = (v: string | null | undefined) => [...new Set(String(v ?? '').split(',').map((t) => slugify(t)).filter(Boolean))];
const cleanTags = (v: unknown) => [...new Set(String(v ?? '').split(',').map((t) => clip(t, 40)).filter(Boolean))].slice(0, 20).join(', ');
const plural = (n: number, w: string) => `${n} ${w}${n === 1 ? '' : 's'}`;

// ---------------------------------------------------------------------------------------------
// Colours: bright, but built around the site blue/sky so everything still feels like JKEdusphere
// ---------------------------------------------------------------------------------------------
const PALETTE: Record<string, { n: string; a: string; b: string; t: string; d: string }> = {
  blue: { n: 'Blue', a: '#2c5ba0', b: '#68bbea', t: '#eaf4fd', d: '#1b2a6b' },
  sky: { n: 'Sky', a: '#0b8fcb', b: '#7fd6ff', t: '#e6f7ff', d: '#07557a' },
  indigo: { n: 'Indigo', a: '#3b3fd8', b: '#8a8dff', t: '#eceeff', d: '#23258c' },
  violet: { n: 'Violet', a: '#7c3aed', b: '#c19bff', t: '#f3ecff', d: '#4a1f98' },
  pink: { n: 'Pink', a: '#d92f7f', b: '#ff9cc7', t: '#ffedf5', d: '#8f1b53' },
  coral: { n: 'Coral', a: '#e8434f', b: '#ff9a8b', t: '#ffeeee', d: '#92222b' },
  orange: { n: 'Orange', a: '#dd6a00', b: '#ffc046', t: '#fff3e0', d: '#8a4600' },
  amber: { n: 'Amber', a: '#b87700', b: '#ffd43b', t: '#fff8db', d: '#6b4400' },
  green: { n: 'Green', a: '#0f9a69', b: '#6be3b5', t: '#e6f9f1', d: '#0a5c40' },
  teal: { n: 'Teal', a: '#0a8f9c', b: '#5de0e6', t: '#e3f8fa', d: '#065a63' },
};
const cv = (c: string) => { const p = PALETTE[c] ?? PALETTE.blue; return `--ca:${p.a};--cb:${p.b};--ct:${p.t};--cd:${p.d}`; };

// ---------------------------------------------------------------------------------------------
// Settings (defaults + what the admin saved)
// ---------------------------------------------------------------------------------------------
export type Sec = { key: string; label: string; emoji: string; color: string; group: 'main' | 'subject'; category: string; tags: string; desc: string; seoTitle: string; seoDesc: string; show: boolean };
type TickItem = { title: string; url: string; tag: string };
type Cfg = {
  hero: { badge: string; title: string; subtitle: string; searchHint: string };
  seo: { title: string; description: string; baseCategory: string; seoText: string; perPage: number; blockSize: number };
  ticker: { on: boolean; label: string; mode: 'auto' | 'pinned' | 'manual'; tag: string; count: number; speed: 'slow' | 'normal' | 'fast'; items: TickItem[] };
  sections: Sec[];
  faq: { q: string; a: string }[];
};

const S = (key: string, label: string, emoji: string, color: string, group: 'main' | 'subject', tags: string, desc: string): Sec =>
  ({ key, label, emoji, color, group, category: '', tags, desc, seoTitle: '', seoDesc: '', show: true });

const DEFAULT_SECTIONS: Sec[] = [
  S('international', 'International', '🌍', 'coral', 'main', 'international, world, global', 'World affairs, treaties, summits and global organisations that matter for your exam.'),
  S('national', 'National', '🇮🇳', 'orange', 'main', 'national, india', 'Important national news: government decisions, laws, schemes and appointments.'),
  S('jk', 'J&K Specific', '🏔️', 'teal', 'main', 'jk, j-k, jammu-kashmir, jammu-and-kashmir', 'Jammu & Kashmir and Ladakh news, policies, schemes and recruitment updates for JKSSB, JKPSC and JKPSI.'),
  S('polity', 'Polity & Governance', '⚖️', 'indigo', 'subject', 'polity, governance, constitution', 'Constitution, Parliament, judiciary, federalism and governance updates.'),
  S('economy', 'Economy', '📈', 'green', 'subject', 'economy, banking, finance, business', 'Budget, RBI, banking, trade, GDP, inflation and economic indicators.'),
  S('environment', 'Environment & Ecology', '🌿', 'teal', 'subject', 'environment, ecology, climate', 'Climate, biodiversity, protected areas, reports and conventions.'),
  S('science-tech', 'Science & Tech', '🔬', 'violet', 'subject', 'science, technology, science-tech, space', 'Space missions, defence tech, AI, health and new discoveries.'),
  S('history-culture', 'History & Culture', '🏛️', 'amber', 'subject', 'history, culture, art', 'Heritage, festivals, monuments, personalities and art forms in the news.'),
  S('geography', 'Geography', '🗺️', 'sky', 'subject', 'geography, maps, places-in-news', 'Places in the news: rivers, mountains, straits, national parks and maps.'),
  S('defence-security', 'Defence & Security', '🛡️', 'coral', 'subject', 'defence, security, internal-security', 'Defence exercises, weapon systems, border and internal security.'),
  S('schemes', 'Govt Schemes', '📋', 'pink', 'subject', 'schemes, scheme, yojana', 'New and revised schemes of the Centre and J&K: benefits, eligibility and nodal agencies.'),
  S('sports', 'Sports', '🏆', 'orange', 'subject', 'sports, games', 'Tournaments, medals, awards and sporting records.'),
  S('awards-reports', 'Awards, Reports & Indices', '🏅', 'blue', 'subject', 'awards, reports, index, indices, rankings', 'Awards, rankings, global indices and report releases.'),
];

const DEFAULT_CFG: Cfg = {
  hero: {
    badge: 'Updated daily',
    title: 'Current Affairs for JKSSB, JKPSC and UPSC',
    subtitle: 'Crisp daily updates on J&K, national and international events, plus subject-wise notes on polity, economy, environment and more. Free to read.',
    searchHint: 'Search current affairs, e.g. Article 370, RBI, budget',
  },
  seo: {
    title: 'Current Affairs Today: J&K, National & International | JKEdusphere',
    description: "Read today's current affairs for J&K, national and international news, with subject-wise updates on polity, economy, environment and science for JKSSB, JKPSC, JKPSI and UPSC exams.",
    baseCategory: 'Current Affairs', perPage: 15, blockSize: 4,
    seoText: `## Why read current affairs every day?\nCurrent affairs carry a large share of marks in JKSSB, JKPSC, JKPSI, banking, SSC and UPSC exams. Questions are rarely about the news itself. They test the static background behind it, such as the article of the Constitution, the scheme, the place on the map or the organisation involved.\n\n## How JKEdusphere organises current affairs\nEvery update is filed under a region (International, National, J&K Specific) and one or more subjects (Polity, Economy, Environment, Science and Tech and more), so you can revise the way the exam asks the questions. Use the daily and monthly archive to revise a whole month in one sitting.\n\n## How to revise\nRead the headlines first, then open only the stories that match your syllabus. Note the key terms, make a one-line fact for each story, and attempt a mock test at the end of every week.`,
  },
  ticker: { on: true, label: 'Headlines', mode: 'auto', tag: 'headline', count: 10, speed: 'normal', items: [] },
  sections: DEFAULT_SECTIONS,
  faq: [
    { q: 'Where can I read daily current affairs for JKSSB and JKPSC?', a: 'Open the Current Affairs page on JKEdusphere. Each update is sorted into International, National and J&K Specific tabs and into subjects, and the daily archive lets you open any date.' },
    { q: 'Is the current affairs on JKEdusphere free?', a: 'Yes. All current affairs updates are free to read with no sign-up. Mock tests and premium notes are on our sister site, jkedusphere.com.' },
    { q: 'How many months of current affairs should I revise for J&K exams?', a: 'Most aspirants revise the last 8 to 12 months before the exam, giving extra time to J&K-specific news, schemes and appointments. Use the monthly archive to go month by month.' },
    { q: 'Can I read current affairs subject-wise?', a: 'Yes. Pick a subject tab such as Polity, Economy, Environment or Science and Tech to see only those updates.' },
  ],
};

const KEY = 'ca_config';
const RESERVED_KEYS = new Set(['archive', 'feed', 'feed-xml', 'feed.xml', 'date', 'search', 'rss']);

type Stored = Partial<{ hero: Cfg['hero']; seo: Cfg['seo']; ticker: Cfg['ticker']; sections: Sec[]; faq: Cfg['faq'] }>;
async function readStored(db: D1Database): Promise<Stored> {
  try { const r = await db.prepare('SELECT value FROM settings WHERE key = ?').bind(KEY).first<{ value: string }>(); return r?.value ? JSON.parse(r.value) : {}; } catch { return {}; }
}
async function writeStored(db: D1Database, s: Stored) {
  await db.prepare('INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value').bind(KEY, JSON.stringify(s)).run();
}
export async function loadCfg(db: D1Database): Promise<Cfg> {
  const s = await readStored(db);
  const secs = Array.isArray(s.sections) && s.sections.length ? s.sections.map((x) => ({ ...S('', '', '', 'blue', 'main', '', ''), ...x })) : DEFAULT_SECTIONS;
  return {
    hero: { ...DEFAULT_CFG.hero, ...(s.hero ?? {}) },
    seo: { ...DEFAULT_CFG.seo, ...(s.seo ?? {}) },
    ticker: { ...DEFAULT_CFG.ticker, ...(s.ticker ?? {}) },
    sections: secs.filter((x) => x.key && x.label),
    faq: Array.isArray(s.faq) ? s.faq : DEFAULT_CFG.faq,
  };
}

// ---------------------------------------------------------------------------------------------
// Posts
// ---------------------------------------------------------------------------------------------
type Post = { id: number; title: string; slug: string; excerpt: string; category: string | null; tags: string | null; image: string | null; image_alt: string | null; published_at: number; t: Set<string> };

async function pool(db: D1Database, cfg: Cfg): Promise<Post[]> {
  const cats = new Set<string>([cfg.seo.baseCategory]);
  let any = false;
  for (const s of cfg.sections) { if (s.category === '*') any = true; else if (s.category) cats.add(s.category); }
  const where = any ? '' : ` AND category IN (${[...cats].map(() => '?').join(',')})`;
  try {
    const rows = (await db.prepare(`SELECT id, title, slug, substr(COALESCE(excerpt,''),1,220) AS excerpt, category, tags, image, image_alt, published_at FROM posts WHERE status='published' AND published_at <= ?${where} ORDER BY published_at DESC LIMIT 1200`)
      .bind(nowS(), ...(any ? [] : [...cats])).all()).results as any[];
    return rows.map((r) => ({ ...r, t: new Set(tagList(r.tags)) }));
  } catch { return []; }
}
const secCat = (cfg: Cfg, s: Sec) => (s.category === '*' ? null : s.category || cfg.seo.baseCategory);
const inSection = (p: Post, s: Sec, cfg: Cfg) => {
  const c = secCat(cfg, s);
  if (c && p.category !== c) return false;
  const w = tagList(s.tags);
  return !w.length || w.some((t) => p.t.has(t));
};
const forSection = (P: Post[], s: Sec, cfg: Cfg) => P.filter((p) => inSection(p, s, cfg));
const inHub = (P: Post[], cfg: Cfg) => P.filter((p) => p.category === cfg.seo.baseCategory);
const primary = (p: Post, cfg: Cfg): Sec | null => {
  const vis = cfg.sections.filter((s) => s.show);
  return vis.find((s) => s.group === 'subject' && inSection(p, s, cfg)) ?? vis.find((s) => inSection(p, s, cfg)) ?? null;
};
const regionOf = (p: Post, cfg: Cfg): Sec | null => cfg.sections.find((s) => s.show && s.group === 'main' && inSection(p, s, cfg)) ?? null;

async function dayCounts(db: D1Database, cat: string, limit: number) {
  try { return (await db.prepare("SELECT strftime('%Y-%m-%d', published_at + 19800, 'unixepoch') AS d, COUNT(*) AS n FROM posts WHERE status='published' AND published_at <= ? AND category = ? GROUP BY d ORDER BY d DESC LIMIT ?").bind(nowS(), cat, limit).all()).results as { d: string; n: number }[]; } catch { return []; }
}
async function monthCounts(db: D1Database, cat: string, limit: number) {
  try { return (await db.prepare("SELECT strftime('%Y-%m', published_at + 19800, 'unixepoch') AS m, COUNT(*) AS n FROM posts WHERE status='published' AND published_at <= ? AND category = ? GROUP BY m ORDER BY m DESC LIMIT ?").bind(nowS(), cat, limit).all()).results as { m: string; n: number }[]; } catch { return []; }
}

// ---------------------------------------------------------------------------------------------
// Styles + tiny script (scoped with .ca- so nothing else on the site is touched)
// ---------------------------------------------------------------------------------------------
const CSS = `<style>
.ca-tk{display:flex;align-items:stretch;background:#0e1b4d;color:#fff;border-bottom:3px solid #ffcf33;overflow:hidden}
.ca-tkl{flex:none;display:flex;align-items:center;gap:9px;padding:0 18px;background:linear-gradient(135deg,#ff3d6e,#ff8a3d);font-weight:800;font-size:12.5px;letter-spacing:.09em;text-transform:uppercase;position:relative;z-index:1}
.ca-tkl i{width:8px;height:8px;border-radius:50%;background:#fff;animation:ca-p 1.4s ease-in-out infinite}
.ca-tkv{flex:1;min-width:0;overflow:hidden;-webkit-mask-image:linear-gradient(90deg,transparent,#000 22px,#000 calc(100% - 22px),transparent);mask-image:linear-gradient(90deg,transparent,#000 22px,#000 calc(100% - 22px),transparent)}
.ca-tkt{display:flex;width:max-content;animation:ca-mq var(--dur,60s) linear infinite}
.ca-tkv:hover .ca-tkt,.ca-tkv:focus-within .ca-tkt{animation-play-state:paused}
.ca-tkt a{display:inline-flex;align-items:center;gap:9px;padding:13px 0 13px 24px;color:#fff;text-decoration:none;font-size:14px;font-weight:600;white-space:nowrap}
.ca-tkt a:hover{text-decoration:underline;text-underline-offset:3px}
.ca-tkt a b{font-size:10.5px;letter-spacing:.07em;padding:2px 7px;border-radius:5px;background:#ffcf33;color:#2a1f00;text-transform:uppercase}
.ca-tkt a::after{content:"";width:5px;height:5px;border-radius:50%;background:rgba(255,255,255,.4);margin-left:24px}
.ca-tkm{flex:none;display:flex;align-items:center;padding:0 16px;background:rgba(255,255,255,.1);color:#fff;font-weight:700;font-size:13px;text-decoration:none;white-space:nowrap}
.ca-tkm:hover{background:rgba(255,255,255,.2)}
@keyframes ca-mq{to{transform:translateX(-50%)}}
@keyframes ca-p{50%{opacity:.35;transform:scale(.7)}}
@media (prefers-reduced-motion:reduce){.ca-tkt{animation:none}.ca-tkv{overflow-x:auto;-webkit-mask-image:none;mask-image:none}.ca-tkl i{animation:none}}
.ca-hero{position:relative;overflow:hidden;isolation:isolate;color:#fff;border-radius:30px;margin-top:18px;padding:46px 42px 40px;background:linear-gradient(125deg,#1b2a6b 0%,#2c5ba0 52%,#17a2da 100%)}
.ca-hero::before{content:"";position:absolute;z-index:-1;right:-70px;top:-110px;width:420px;aspect-ratio:1;border-radius:50%;background:radial-gradient(closest-side,rgba(255,207,51,.75),rgba(255,207,51,0))}
.ca-hero::after{content:"";position:absolute;z-index:-1;left:-90px;bottom:-150px;width:420px;aspect-ratio:1;border-radius:50%;background:radial-gradient(closest-side,rgba(255,92,150,.55),rgba(255,92,150,0))}
.ca-bd{display:inline-flex;align-items:center;gap:8px;font-size:13px;font-weight:700;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.3);border-radius:99px;padding:5px 14px}
.ca-bd i{width:8px;height:8px;border-radius:50%;background:#5dffb0;box-shadow:0 0 0 4px rgba(93,255,176,.25)}
.ca-hero h1{color:#fff;font-size:clamp(30px,5vw,54px);font-weight:800;line-height:1.06;letter-spacing:-.035em;margin:16px 0 12px;max-width:16em}
.ca-hero h1 em{color:#ffe27a}
.ca-hero p.ca-sub{max-width:44em;margin:0;font-size:17px;color:rgba(255,255,255,.88)}
.ca-hero .search{margin-top:24px;max-width:620px}
.ca-hero .search button{background:linear-gradient(135deg,#ff3d6e,#ff8a3d)}
.ca-hero .search button:hover{background:linear-gradient(135deg,#f02f61,#f57b2c)}
.ca-pills{display:flex;flex-wrap:wrap;gap:10px;margin-top:22px}
.ca-pills span{font-size:13.5px;font-weight:600;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.26);padding:5px 13px;border-radius:99px}
.ca-tabs{position:sticky;top:calc(var(--hh,68px) + env(safe-area-inset-top,0px));z-index:9;background:rgba(255,255,255,.94);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border-bottom:1px solid var(--line);margin-top:18px}
.ca-tin{display:flex;gap:8px;align-items:center;overflow-x:auto;scrollbar-width:none;padding-top:10px;padding-bottom:10px}
.ca-tin::-webkit-scrollbar{display:none}
.ca-tin a{flex:none;display:inline-flex;align-items:center;gap:7px;padding:8px 15px;border-radius:99px;text-decoration:none;font-size:14px;font-weight:650;color:var(--cd);background:var(--ct);border:1px solid transparent;white-space:nowrap;transition:transform .15s,box-shadow .15s}
.ca-tin a:hover{transform:translateY(-1px);box-shadow:0 8px 18px -10px var(--ca)}
.ca-tin a.on{background:linear-gradient(135deg,var(--ca),var(--cb));color:#fff;box-shadow:0 8px 18px -8px var(--ca)}
.ca-tin .ca-sep{flex:none;width:1px;height:22px;background:var(--line2);margin:0 4px}
.ca-sec{margin-top:40px}
.ca-sh{display:flex;align-items:flex-end;justify-content:space-between;gap:14px;flex-wrap:wrap;margin-bottom:16px}
.ca-sh h2{font-size:clamp(22px,2.8vw,30px);display:flex;align-items:center;gap:10px}
.ca-sh h2 .ca-ic{display:inline-grid;place-items:center;width:42px;height:42px;border-radius:13px;font-size:22px;background:linear-gradient(135deg,var(--ca),var(--cb))}
.ca-sh p{margin:4px 0 0;color:var(--mut);font-size:14.5px}
.ca-sh>a{font-weight:700;font-size:14.5px;color:var(--ca);text-decoration:none;white-space:nowrap}
.ca-sh>a:hover{text-decoration:underline;text-underline-offset:4px}
.ca-g{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
.ca-g.two{grid-template-columns:repeat(2,minmax(0,1fr))}
.ca-c{position:relative;display:flex;flex-direction:column;background:#fff;border:1px solid var(--line);border-top:4px solid var(--ca);border-radius:18px;padding:18px 18px 16px;transition:transform .15s,box-shadow .15s,border-color .15s}
.ca-c:hover{transform:translateY(-2px);box-shadow:0 18px 38px -22px var(--ca);border-color:var(--cb)}
.ca-m{display:flex;align-items:center;justify-content:space-between;gap:10px;font-size:12.5px;color:var(--mut)}
.ca-chip{display:inline-flex;align-items:center;gap:5px;font-weight:700;font-size:12px;padding:3px 10px;border-radius:99px;background:var(--ct);color:var(--cd)}
.ca-c h3{font-size:17.5px;font-weight:650;line-height:1.35;margin:12px 0 8px;letter-spacing:-.012em;text-wrap:pretty}
.ca-c h3 a{text-decoration:none}
.ca-c h3 a::after{content:"";position:absolute;inset:0;border-radius:inherit}
.ca-c:hover h3 a{color:var(--ca)}
.ca-c p{margin:0 0 12px;font-size:14.5px;color:var(--mut);display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.ca-tg{margin-top:auto;display:flex;flex-wrap:wrap;gap:6px}
.ca-tg span{font-size:12px;color:var(--cd);background:var(--ct);padding:2px 9px;border-radius:6px;font-weight:600}
.ca-img{display:block;width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:12px;margin:12px 0 0;background:var(--soft2)}
.ca-feat{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,1fr);gap:18px;align-items:stretch}
.ca-feat .ca-c.big{padding:24px;background:linear-gradient(160deg,var(--ct),#fff 70%)}
.ca-feat .ca-c.big h3{font-size:clamp(21px,2.6vw,28px);line-height:1.25}
.ca-feat .ca-c.big p{-webkit-line-clamp:4;font-size:15.5px}
.ca-list{display:flex;flex-direction:column;gap:10px}
.ca-li{position:relative;display:flex;gap:12px;align-items:flex-start;background:#fff;border:1px solid var(--line);border-left:4px solid var(--ca);border-radius:14px;padding:12px 14px;transition:box-shadow .15s}
.ca-li:hover{box-shadow:0 12px 26px -18px var(--ca)}
.ca-li a{font-weight:650;font-size:15px;line-height:1.35;text-decoration:none}
.ca-li a::after{content:"";position:absolute;inset:0}
.ca-li small{display:block;color:var(--mut);font-size:12.5px;margin-top:3px}
.ca-subj{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:14px}
.ca-st{position:relative;overflow:hidden;display:flex;flex-direction:column;gap:4px;padding:18px;border-radius:20px;text-decoration:none;color:#fff;background:linear-gradient(135deg,var(--ca),var(--cb));min-height:128px;transition:transform .15s,box-shadow .15s}
.ca-st:hover{transform:translateY(-3px);box-shadow:0 18px 34px -16px var(--ca)}
.ca-st::after{content:"";position:absolute;right:-26px;bottom:-34px;width:110px;aspect-ratio:1;border-radius:50%;background:rgba(255,255,255,.22)}
.ca-se{font-size:30px;line-height:1}
.ca-st b{font-size:16.5px;margin-top:8px;text-shadow:0 1px 2px rgba(0,0,0,.18)}
.ca-st small{font-size:13px;font-weight:600;opacity:.95;text-shadow:0 1px 2px rgba(0,0,0,.18)}
.ca-chips{display:flex;flex-wrap:wrap;gap:9px}
.ca-chips a{padding:8px 15px;border-radius:12px;text-decoration:none;font-weight:650;font-size:14px;background:var(--soft);border:1px solid var(--line);color:var(--navy);transition:background .15s,border-color .15s}
.ca-chips a:hover{background:#fff;border-color:var(--blue)}
.ca-chips a small{color:var(--mut);font-weight:600;margin-left:4px}
.ca-ban{position:relative;overflow:hidden;isolation:isolate;color:#fff;border-radius:28px;margin-top:18px;padding:36px 38px;background:linear-gradient(125deg,var(--cd),var(--ca) 62%,var(--cb))}
.ca-ban::after{content:"";position:absolute;z-index:-1;right:-60px;top:-90px;width:320px;aspect-ratio:1;border-radius:50%;background:radial-gradient(closest-side,rgba(255,255,255,.35),rgba(255,255,255,0))}
.ca-ban h1{color:#fff;font-size:clamp(28px,4.4vw,46px);font-weight:800;letter-spacing:-.03em;display:flex;align-items:center;gap:12px;flex-wrap:wrap}
.ca-ban h1 .ca-ic{font-size:.85em}
.ca-ban p{margin:10px 0 0;max-width:46em;font-size:16.5px;color:rgba(255,255,255,.92)}
.ca-ban .ca-pills{margin-top:16px}
.ca-pager{display:flex;gap:12px;margin-top:30px;flex-wrap:wrap}
.ca-empty{padding:34px;border:2px dashed var(--line2);border-radius:20px;text-align:center;color:var(--mut)}
.ca-cta{margin-top:44px;display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap;border-radius:26px;padding:28px 32px;color:#fff;background:linear-gradient(120deg,#ff3d6e,#ff8a3d 60%,#ffc046)}
.ca-cta h2{color:#fff;font-size:clamp(21px,2.6vw,28px)}
.ca-cta p{margin:6px 0 0;color:rgba(255,255,255,.95)}
.ca-cta .btn{background:#fff;color:#c2234f;border-color:#fff}
.ca-cta .btn:hover{background:#fff3f0;border-color:#fff3f0}
.ca-faq details{border:1px solid var(--line);border-radius:14px;padding:14px 18px;margin-bottom:10px;background:#fff}
.ca-faq details[open]{border-color:var(--sky);background:var(--soft)}
.ca-faq summary{cursor:pointer;font-weight:700;font-size:16px}
.ca-faq p{margin:10px 0 0;color:var(--mut)}
.ca-seo{margin-top:44px;padding:26px 28px;background:var(--soft);border:1px solid var(--line);border-radius:22px}
.ca-seo h2{font-size:21px;margin:18px 0 6px}.ca-seo h2:first-child{margin-top:0}
.ca-seo p{margin:0 0 8px;color:#36415e}
@media (max-width:900px){.ca-g{grid-template-columns:repeat(2,minmax(0,1fr))}.ca-feat{grid-template-columns:1fr}}
@media (max-width:620px){.ca-g,.ca-g.two{grid-template-columns:1fr}.ca-hero{padding:30px 22px 28px;border-radius:24px}.ca-ban{padding:26px 22px;border-radius:22px}.ca-tkl{padding:0 12px;font-size:11.5px}.ca-tkm{display:none}.ca-cta{padding:22px}.ca-seo{padding:20px}}
</style>`;

const JS = `<script>(function(){var h=document.querySelector('header');if(h){var s=function(){document.documentElement.style.setProperty('--hh',(h.offsetHeight-1)+'px')};s();addEventListener('resize',s)}var a=document.querySelector('.ca-tin a.on');if(a&&a.scrollIntoView&&a.parentNode.scrollWidth>a.parentNode.clientWidth){var p=a.parentNode;p.scrollLeft=a.offsetLeft-(p.clientWidth-a.offsetWidth)/2}})();</script>`;

// ---------------------------------------------------------------------------------------------
// Building blocks
// ---------------------------------------------------------------------------------------------
const crumbs = (items: [string, string][]) => `<nav class="crumb w" aria-label="Breadcrumb">${items.map(([n, u], i) => (i < items.length - 1 ? `<a href="${esc(u)}">${esc(n)}</a><span>/</span>` : `<span>${esc(n)}</span>`)).join('')}</nav>`;
const crumbLd = (o: string, items: [string, string][]) => ({ '@type': 'BreadcrumbList', itemListElement: items.map(([name, u], i) => ({ '@type': 'ListItem', position: i + 1, name, item: abs(o, u) })) });
const hl = (t: string) => { const s = String(t).trim(), i = s.lastIndexOf(' '); return i < 0 ? `<em>${esc(s)}</em>` : `${esc(s.slice(0, i))} <em>${esc(s.slice(i + 1))}</em>`; };

function tickerItems(cfg: Cfg, P: Post[]): TickItem[] {
  const T = cfg.ticker;
  if (T.mode === 'manual') return T.items.filter((i) => i.title && i.url).slice(0, 30);
  const hub = inHub(P, cfg);
  let src = hub;
  if (T.mode === 'pinned') { const w = slugify(T.tag || 'headline'); const pins = hub.filter((p) => p.t.has(w)); if (pins.length) src = pins; }
  return src.slice(0, T.count).map((p) => ({ title: p.title, url: '/' + p.slug, tag: regionOf(p, cfg)?.label.split(' ')[0] ?? '' }));
}
function ticker(cfg: Cfg, P: Post[]): string {
  if (!cfg.ticker.on) return '';
  const items = tickerItems(cfg, P);
  if (!items.length) return '';
  const per = cfg.ticker.speed === 'slow' ? 7 : cfg.ticker.speed === 'fast' ? 3 : 5;
  const one = (dup: boolean) => items.map((i) => `<a href="${href(i.url)}"${dup ? ' tabindex="-1" aria-hidden="true"' : ''}>${i.tag ? `<b>${esc(i.tag)}</b>` : ''}${esc(i.title)}</a>`).join('');
  return `<div class="ca-tk" role="region" aria-label="Top headlines"><div class="ca-tkl"><i></i>${esc(cfg.ticker.label || 'Headlines')}</div><div class="ca-tkv"><div class="ca-tkt" style="--dur:${Math.max(24, items.length * per)}s">${one(false)}${one(true)}</div></div><a class="ca-tkm" href="/current-affairs">All updates &rarr;</a></div>`;
}

function tabs(cfg: Cfg, active: string): string {
  const vis = cfg.sections.filter((s) => s.show);
  const link = (s: Sec) => `<a style="${cv(s.color)}" href="/current-affairs/${esc(s.key)}"${s.key === active ? ' class="on" aria-current="page"' : ''}>${s.emoji ? `<span aria-hidden="true">${esc(s.emoji)}</span>` : ''}${esc(s.label)}</a>`;
  const main = vis.filter((s) => s.group === 'main'), subj = vis.filter((s) => s.group === 'subject');
  return `<nav class="ca-tabs" aria-label="Current affairs sections"><div class="w ca-tin"><a style="${cv('blue')}" href="/current-affairs"${active === '' ? ' class="on" aria-current="page"' : ''}><span aria-hidden="true">🔥</span>All</a>${main.map(link).join('')}${main.length && subj.length ? '<span class="ca-sep" aria-hidden="true"></span>' : ''}${subj.map(link).join('')}<span class="ca-sep" aria-hidden="true"></span><a style="${cv('indigo')}" href="/current-affairs/archive"${active === '#archive' ? ' class="on"' : ''}><span aria-hidden="true">🗓️</span>Archive</a></div></nav>`;
}

function card(p: Post, cfg: Cfg, o: { img?: boolean; big?: boolean } = {}): string {
  const s = primary(p, cfg), tg = [...String(p.tags ?? '').split(',').map((x) => x.trim()).filter(Boolean)].slice(0, 3);
  return `<article class="ca-c${o.big ? ' big' : ''}" style="${cv(s?.color ?? 'blue')}"><div class="ca-m"><span class="ca-chip">${s?.emoji ? esc(s.emoji) + ' ' : ''}${esc(s?.label ?? p.category ?? 'Update')}</span><time datetime="${iso(p.published_at)}">${fmtDay(p.published_at)}</time></div>`
    + `${o.img && p.image ? `<img class="ca-img" src="${href(p.image)}" alt="${esc(p.image_alt || p.title)}" width="640" height="360" loading="${o.big ? 'eager' : 'lazy'}" decoding="async">` : ''}`
    + `<h3><a href="/${esc(p.slug)}">${esc(p.title)}</a></h3>${p.excerpt ? `<p>${esc(p.excerpt)}</p>` : ''}${tg.length ? `<div class="ca-tg">${tg.map((x) => `<span>#${esc(x)}</span>`).join('')}</div>` : ''}</article>`;
}
const li = (p: Post, cfg: Cfg) => { const s = primary(p, cfg); return `<div class="ca-li" style="${cv(s?.color ?? 'blue')}"><div><a href="/${esc(p.slug)}">${esc(p.title)}</a><small>${esc(s?.label ?? 'Update')} &middot; ${fmtDay(p.published_at)}</small></div></div>`; };

const faqHtml = (faq: Cfg['faq']) => (faq.length ? `<section class="ca-sec ca-faq" aria-labelledby="ca-faq-h"><div class="ca-sh"><h2 id="ca-faq-h">Frequently asked questions</h2></div>${faq.map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('')}</section>` : '');
const faqLd = (faq: Cfg['faq']) => (faq.length ? { '@type': 'FAQPage', mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) } : null);
// "## Heading" lines become H2, blank-line separated text becomes paragraphs
const seoBlock = (t: string) => {
  const parts = area(t, 6000).split(/\n{2,}|\n(?=## )/).map((x) => x.trim()).filter(Boolean);
  if (!parts.length) return '';
  return `<section class="ca-seo">${parts.map((x) => (x.startsWith('## ') ? `<h2>${esc(x.slice(3).split('\n')[0])}</h2>${x.split('\n').slice(1).join(' ').trim() ? `<p>${esc(x.split('\n').slice(1).join(' ').trim())}</p>` : ''}` : `<p>${esc(x)}</p>`)).join('')}</section>`;
};
const itemListLd = (o: string, list: Post[]) => ({ '@type': 'ItemList', itemListElement: list.slice(0, 15).map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: `${o}/${p.slug}`, name: p.title })) });

async function ctaBlock(db: D1Database) {
  const j = resolve(await loadHome(db)).data('join') as { title: string; text: string; btn: string; url: string };
  return j?.btn ? `<div class="ca-cta"><div><h2>${esc(j.title)}</h2><p>${esc(j.text)}</p></div><a class="btn" href="${href(j.url)}">${esc(j.btn)}</a></div>` : '';
}

const origin = (c: any) => new URL(c.req.url).origin;
const feedLink = (o: string) => `<link rel="alternate" type="application/rss+xml" title="JKEdusphere Current Affairs" href="${o}/current-affairs/feed.xml">`;
const pager = (base: string, page: number, more: boolean) => `<div class="ca-pager">${page > 1 ? `<a class="btn o" href="${base}${page - 1 > 1 ? `${base.includes('?') ? '&' : '?'}page=${page - 1}` : ''}">&larr; Newer</a>` : ''}${more ? `<a class="btn" href="${base}${base.includes('?') ? '&' : '?'}page=${page + 1}">Older updates &rarr;</a>` : ''}</div>`;
const pageHead = (o: string, base: string, page: number, more: boolean) => feedLink(o) + (page > 1 ? `<link rel="prev" href="${o}${base}${page - 1 > 1 ? '?page=' + (page - 1) : ''}">` : '') + (more ? `<link rel="next" href="${o}${base}?page=${page + 1}">` : '');
const withPage = (u: string, page: number) => (page > 1 ? `${u}?page=${page}` : u);

// ---------------------------------------------------------------------------------------------
// Public routes
// ---------------------------------------------------------------------------------------------
export function registerCurrentAffairs(app: Hono<Env>) {
  const cache = { 'Cache-Control': 'public, max-age=60' };

  // ----- Hub -----
  app.get('/current-affairs', async (c) => {
    const db = c.env.DB, o = origin(c), cfg = await loadCfg(db), P = await pool(db, cfg);
    const q = clip(c.req.query('q') ?? '', 80).toLowerCase();
    const hub = inHub(P, cfg), body: string[] = [];
    const vis = cfg.sections.filter((s) => s.show);

    body.push(ticker(cfg, P));
    body.push(`<div class="w"><header class="ca-hero"><span class="ca-bd"><i></i>${esc(cfg.hero.badge || 'Updated daily')}</span><h1>${hl(cfg.hero.title)}</h1><p class="ca-sub">${esc(cfg.hero.subtitle)}</p>`
      + `<form class="search" action="/current-affairs" role="search"><input type="search" name="q" value="${esc(q)}" placeholder="${esc(cfg.hero.searchHint)}" aria-label="Search current affairs"><button type="submit">Search</button></form>`
      + `<div class="ca-pills"><span>📰 ${plural(hub.length, 'update')}</span>${hub[0] ? `<span>🕒 Last updated ${fmtDay(hub[0].published_at)}</span>` : ''}<span>🆓 Free to read</span></div></header></div>`);
    body.push(tabs(cfg, ''));

    let ld: any, title = cfg.seo.title, desc = cfg.seo.description, noindex = false;
    body.push('<div class="w cax">');

    if (q) {
      noindex = true; title = `Search: ${q} | Current Affairs | JKEdusphere`;
      const terms = q.split(/\s+/).filter(Boolean).slice(0, 6);
      const hits = hub.filter((p) => terms.every((t) => (p.title + ' ' + p.excerpt + ' ' + (p.tags ?? '')).toLowerCase().includes(t))).slice(0, 60);
      body.push(`<section class="ca-sec"><div class="ca-sh" style="${cv('blue')}"><div><h2>Results for “${esc(q)}”</h2><p>${plural(hits.length, 'update')} found in current affairs</p></div><a href="/current-affairs">Clear search</a></div>${hits.length ? `<div class="ca-g">${hits.map((p) => card(p, cfg)).join('')}</div>` : '<div class="ca-empty">Nothing found. Try fewer words or pick a section above.</div>'}</section>`);
    } else if (!hub.length) {
      body.push('<section class="ca-sec"><div class="ca-empty"><h2 style="margin-bottom:8px">Current affairs are coming soon</h2>We are preparing the first updates. Please check back shortly.</div></section>');
    } else {
      // Latest headlines: one big story + a compact list
      const [first, ...rest] = hub;
      body.push(`<section class="ca-sec" aria-labelledby="ca-latest"><div class="ca-sh" style="${cv('coral')}"><div><h2 id="ca-latest"><span class="ca-ic" aria-hidden="true">🔥</span>Latest headlines</h2><p>The newest updates, freshest first.</p></div><a href="/current-affairs/archive/${istToday()}">Today &rarr;</a></div><div class="ca-feat">${card(first, cfg, { img: true, big: true })}<div class="ca-list">${rest.slice(0, 5).map((p) => li(p, cfg)).join('')}</div></div></section>`);

      // Region blocks (International, National, J&K ...)
      for (const s of vis.filter((x) => x.group === 'main')) {
        const list = forSection(P, s, cfg);
        if (!list.length) continue;
        body.push(`<section class="ca-sec" aria-labelledby="ca-b-${esc(s.key)}"><div class="ca-sh" style="${cv(s.color)}"><div><h2 id="ca-b-${esc(s.key)}"><span class="ca-ic" aria-hidden="true">${esc(s.emoji || '📰')}</span>${esc(s.label)}</h2>${s.desc ? `<p>${esc(s.desc)}</p>` : ''}</div><a href="/current-affairs/${esc(s.key)}">View all ${list.length} &rarr;</a></div><div class="ca-g two">${list.slice(0, cfg.seo.blockSize).map((p) => card(p, cfg)).join('')}</div></section>`);
      }

      // Subject-wise tiles
      const subj = vis.filter((x) => x.group === 'subject');
      if (subj.length) body.push(`<section class="ca-sec" aria-labelledby="ca-subj"><div class="ca-sh" style="${cv('indigo')}"><div><h2 id="ca-subj"><span class="ca-ic" aria-hidden="true">🎯</span>Subject-wise current affairs</h2><p>Revise the way the exam asks. Pick a subject.</p></div></div><div class="ca-subj">${subj.map((s) => { const n = forSection(P, s, cfg).length; return `<a class="ca-st" style="${cv(s.color)}" href="/current-affairs/${esc(s.key)}"><span class="ca-se" aria-hidden="true">${esc(s.emoji || '📘')}</span><b>${esc(s.label)}</b><small>${plural(n, 'update')}</small></a>`; }).join('')}</div></section>`);

      // Daily + monthly archive
      const [days, months] = await Promise.all([dayCounts(db, cfg.seo.baseCategory, 10), monthCounts(db, cfg.seo.baseCategory, 12)]);
      if (days.length) body.push(`<section class="ca-sec" aria-labelledby="ca-days"><div class="ca-sh" style="${cv('green')}"><div><h2 id="ca-days"><span class="ca-ic" aria-hidden="true">📅</span>Daily current affairs</h2><p>Open any day to read all its updates in one place.</p></div><a href="/current-affairs/archive">Full archive &rarr;</a></div><div class="ca-chips">${days.map((d) => `<a href="/current-affairs/archive/${d.d}">${longDay(d.d)}<small>${d.n}</small></a>`).join('')}</div>${months.length ? `<div class="ca-chips" style="margin-top:14px">${months.map((m) => `<a href="/current-affairs/archive/${m.m}">🗓️ ${longMonth(m.m)}<small>${m.n}</small></a>`).join('')}</div>` : ''}</section>`);

      body.push(await ctaBlock(db));
      body.push(faqHtml(cfg.faq));
      body.push(seoBlock(cfg.seo.seoText));

      const items: [string, string][] = [['Home', '/'], ['Current Affairs', '/current-affairs']];
      ld = { '@context': 'https://schema.org', '@graph': [orgNode(o, 'JKEdusphere'),
        { '@type': 'CollectionPage', '@id': o + '/current-affairs#webpage', url: o + '/current-affairs', name: title, description: desc, inLanguage: 'en-IN', isPartOf: siteRef(o), publisher: { '@id': o + '/#organization' }, dateModified: iso(hub[0].published_at), mainEntity: itemListLd(o, hub),
          hasPart: vis.map((s) => ({ '@type': 'CollectionPage', name: `${s.label} Current Affairs`, url: `${o}/current-affairs/${s.key}` })) },
        crumbLd(o, items), ...(faqLd(cfg.faq) ? [faqLd(cfg.faq)] : [])] };
    }
    body.push('</div>');
    return c.html(await shell(db, o, { title, description: desc, canonical: o + '/current-affairs', noindex, ld, head: feedLink(o), body: CSS + crumbs([['Home', '/'], ['Current Affairs', '/current-affairs']]) + body.join('') + JS }), 200, cache);
  });

  // ----- RSS feed -----
  app.get('/current-affairs/feed.xml', async (c) => {
    const db = c.env.DB, o = origin(c), cfg = await loadCfg(db), hub = inHub(await pool(db, cfg), cfg).slice(0, 40);
    const x = (s: string) => esc(s);
    const items = hub.map((p) => `<item><title>${x(p.title)}</title><link>${o}/${x(p.slug)}</link><guid isPermaLink="true">${o}/${x(p.slug)}</guid><pubDate>${new Date(p.published_at * 1000).toUTCString()}</pubDate>${p.excerpt ? `<description>${x(p.excerpt)}</description>` : ''}${primary(p, cfg) ? `<category>${x(primary(p, cfg)!.label)}</category>` : ''}</item>`).join('');
    return c.body(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>JKEdusphere Current Affairs</title><link>${o}/current-affairs</link><atom:link href="${o}/current-affairs/feed.xml" rel="self" type="application/rss+xml"/><description>${x(cfg.seo.description)}</description><language>en-in</language>${items}</channel></rss>`, 200, { 'Content-Type': 'application/rss+xml; charset=utf-8', 'Cache-Control': 'public, max-age=300' });
  });

  // ----- Archive index -----
  app.get('/current-affairs/archive', async (c) => {
    const db = c.env.DB, o = origin(c), cfg = await loadCfg(db), P = await pool(db, cfg);
    const [months, days] = await Promise.all([monthCounts(db, cfg.seo.baseCategory, 60), dayCounts(db, cfg.seo.baseCategory, 45)]);
    const years = [...new Set(months.map((m) => m.m.slice(0, 4)))];
    const items: [string, string][] = [['Home', '/'], ['Current Affairs', '/current-affairs'], ['Archive', '/current-affairs/archive']];
    const title = 'Current Affairs Archive: Daily and Monthly | JKEdusphere', desc = 'Browse the JKEdusphere current affairs archive by day and by month. Revise a whole month of J&K, national and international updates for JKSSB, JKPSC and UPSC.';
    const bodyHtml = `<div class="w cax"><header class="ca-ban" style="${cv('indigo')}"><h1><span class="ca-ic" aria-hidden="true">🗓️</span>Current Affairs Archive</h1><p>Pick a month to revise everything from that month, or open a single day.</p></header></div>${tabs(cfg, '#archive')}<div class="w cax">`
      + (months.length ? years.map((y) => `<section class="ca-sec"><div class="ca-sh" style="${cv('indigo')}"><div><h2>${y}</h2></div></div><div class="ca-chips">${months.filter((m) => m.m.startsWith(y)).map((m) => `<a href="/current-affairs/archive/${m.m}">🗓️ ${MONTH[Number(m.m.slice(5)) - 1]}<small>${plural(m.n, 'update')}</small></a>`).join('')}</div></section>`).join('') : '<div class="ca-empty" style="margin-top:30px">No archive yet.</div>')
      + (days.length ? `<section class="ca-sec"><div class="ca-sh" style="${cv('green')}"><div><h2>Recent days</h2></div></div><div class="ca-chips">${days.map((d) => `<a href="/current-affairs/archive/${d.d}">${longDay(d.d)}<small>${d.n}</small></a>`).join('')}</div></section>` : '') + '</div>';
    return c.html(await shell(db, o, { title, description: desc, canonical: o + '/current-affairs/archive', head: feedLink(o), ld: { '@context': 'https://schema.org', '@graph': [orgNode(o, 'JKEdusphere'), { '@type': 'CollectionPage', '@id': o + '/current-affairs/archive#webpage', url: o + '/current-affairs/archive', name: title, description: desc, inLanguage: 'en-IN', isPartOf: siteRef(o) }, crumbLd(o, items)] }, body: CSS + ticker(cfg, P) + crumbs(items) + bodyHtml + JS }), 200, cache);
  });

  // ----- Archive: one month (YYYY-MM) or one day (YYYY-MM-DD) -----
  app.get('/current-affairs/archive/:p{[0-9]{4}-[0-9]{2}(?:-[0-9]{2})?}', async (c) => {
    const db = c.env.DB, o = origin(c), cfg = await loadCfg(db), P = await pool(db, cfg);
    const p = c.req.param('p'), isDay = p.length === 10, b = isDay ? dayBounds(p) : monthBounds(p);
    if (!b) return c.notFound();
    const page = Math.max(1, parseInt(c.req.query('page') ?? '1', 10) || 1), per = isDay ? 60 : cfg.seo.perPage;
    const all = inHub(P, cfg).filter((x) => x.published_at >= b[0] && x.published_at < b[1]);
    if (!all.length) return c.notFound();
    const rows = all.slice((page - 1) * per, page * per), more = all.length > page * per;
    const label = isDay ? longDay(p) : longMonth(p), url = `/current-affairs/archive/${p}`;
    const items: [string, string][] = [['Home', '/'], ['Current Affairs', '/current-affairs'], ['Archive', '/current-affairs/archive'], [label, url]];
    const top = all.slice(0, 3).map((x) => x.title).join('; ');
    const title = isDay ? `Current Affairs ${label}: Daily News Digest | JKEdusphere` : `Current Affairs ${label}: Monthly Digest | JKEdusphere`;
    const desc = `${isDay ? 'Daily' : 'Monthly'} current affairs for ${label}: ${plural(all.length, 'update')} covering J&K, national and international news. Top stories: ${top}`.slice(0, 300);
    const siblings = isDay ? '' : '';
    return c.html(await shell(db, o, { title, description: desc, canonical: o + withPage(url, page), head: pageHead(o, url, page, more),
      ld: { '@context': 'https://schema.org', '@graph': [orgNode(o, 'JKEdusphere'), { '@type': 'CollectionPage', '@id': o + url + '#webpage', url: o + url, name: title, description: desc, inLanguage: 'en-IN', isPartOf: siteRef(o), mainEntity: itemListLd(o, rows) }, crumbLd(o, items)] },
      body: CSS + ticker(cfg, P) + crumbs(items) + `<div class="w cax"><header class="ca-ban" style="${cv('indigo')}"><h1><span class="ca-ic" aria-hidden="true">${isDay ? '📅' : '🗓️'}</span>Current Affairs ${esc(label)}</h1><p>${plural(all.length, 'update')} published${isDay ? ' on this day' : ' this month'}.</p></header></div>${tabs(cfg, '#archive')}<div class="w cax"><section class="ca-sec"><div class="ca-g">${rows.map((x) => card(x, cfg)).join('')}</div>${pager(url, page, more)}${siblings}<p style="margin-top:26px"><a class="btn o" href="/current-affairs/archive">&larr; Back to archive</a></p></section></div>` + JS }), 200, cache);
  });

  // ----- Section / subject page (must come after the fixed routes above) -----
  app.get('/current-affairs/:key', async (c) => {
    const db = c.env.DB, o = origin(c), cfg = await loadCfg(db), key = c.req.param('key');
    const s = cfg.sections.find((x) => x.show && x.key === key);
    if (!s) return c.notFound();
    const P = await pool(db, cfg), all = forSection(P, s, cfg);
    const page = Math.max(1, parseInt(c.req.query('page') ?? '1', 10) || 1), per = cfg.seo.perPage;
    const rows = all.slice((page - 1) * per, page * per), more = all.length > page * per;
    const url = `/current-affairs/${s.key}`;
    const items: [string, string][] = [['Home', '/'], ['Current Affairs', '/current-affairs'], [s.label, url]];
    const title = s.seoTitle || `${s.label} Current Affairs: Latest Updates for J&K Exams | JKEdusphere`;
    const desc = s.seoDesc || `${s.desc ? s.desc + ' ' : ''}Latest ${s.label.toLowerCase()} current affairs for JKSSB, JKPSC, JKPSI and UPSC aspirants.`.slice(0, 300);
    const others = cfg.sections.filter((x) => x.show && x.key !== s.key);
    const body = CSS + ticker(cfg, P) + crumbs(items)
      + `<div class="w cax"><header class="ca-ban" style="${cv(s.color)}"><h1><span class="ca-ic" aria-hidden="true">${esc(s.emoji || '📰')}</span>${esc(s.label)} Current Affairs</h1>${s.desc ? `<p>${esc(s.desc)}</p>` : ''}<div class="ca-pills"><span>📰 ${plural(all.length, 'update')}</span>${all[0] ? `<span>🕒 Latest ${fmtDay(all[0].published_at)}</span>` : ''}</div></header></div>${tabs(cfg, s.key)}`
      + `<div class="w cax"><section class="ca-sec" style="margin-top:28px">${rows.length ? `<div class="ca-g">${rows.map((p, i) => card(p, cfg, { img: page === 1 && i < 3 })).join('')}</div>${pager(url, page, more)}` : '<div class="ca-empty">No updates here yet. Please check back soon.</div>'}</section>`
      + (others.length ? `<section class="ca-sec"><div class="ca-sh" style="${cv('blue')}"><div><h2>More sections</h2></div></div><div class="ca-chips">${others.map((x) => `<a href="/current-affairs/${esc(x.key)}">${esc(x.emoji)} ${esc(x.label)}</a>`).join('')}</div></section>` : '')
      + (page === 1 ? await ctaBlock(db) : '') + '</div>' + JS;
    return c.html(await shell(db, o, { title, description: desc, canonical: o + withPage(url, page), head: pageHead(o, url, page, more),
      ld: { '@context': 'https://schema.org', '@graph': [orgNode(o, 'JKEdusphere'), { '@type': 'CollectionPage', '@id': o + url + '#webpage', url: o + url, name: title, description: desc, inLanguage: 'en-IN', isPartOf: siteRef(o), publisher: { '@id': o + '/#organization' }, ...(rows.length ? { mainEntity: itemListLd(o, rows) } : {}) }, crumbLd(o, items)] }, body }), 200, cache);
  });
  app.get('/current-affairs/', (c) => c.redirect('/current-affairs', 301));

  // ===========================================================================================
  // Admin
  // ===========================================================================================
  const selOpts = (opts: [string, string][], cur: string) => opts.map(([v, l]) => (v === cur ? html`<option value="${v}" selected>${l}</option>` : html`<option value="${v}">${l}</option>`));

  app.get('/admin/current-affairs', async (c) => {
    const db = c.env.DB, cfg = await loadCfg(db), cats = await getCats(db), P = await pool(db, cfg);
    const saved = c.req.query('saved'), err = c.req.query('err');
    const hub = inHub(P, cfg);
    const tagCount = new Map<string, { label: string; n: number }>();
    for (const p of hub) for (const raw of String(p.tags ?? '').split(',')) { const l = raw.trim(), k = slugify(l); if (!k) continue; const e = tagCount.get(k); if (e) e.n++; else tagCount.set(k, { label: l, n: 1 }); }
    const popular = [...tagCount.values()].sort((a, b) => b.n - a.n).slice(0, 60);
    const catOpts = (cur: string, withAny: boolean): [string, string][] => {
      const list: [string, string][] = [['', `Use the hub category (${cfg.seo.baseCategory})`]];
      if (withAny) list.push(['*', 'Any category']);
      for (const x of cats) list.push([x, x]);
      if (cur && cur !== '*' && !cats.includes(cur)) list.push([cur, cur]);
      return list;
    };
    const colorOpts = Object.entries(PALETTE).map(([k, v]) => [k, v.n] as [string, string]);
    const blank: Sec = { key: '', label: '', emoji: '', color: 'blue', group: 'subject', category: '', tags: '', desc: '', seoTitle: '', seoDesc: '', show: true };
    const rowsData: (Sec | null)[] = [...cfg.sections, null, null, null];
    const secCard = (s: Sec | null, i: number) => { const v = s ?? blank; const n = s ? forSection(P, s, cfg).length : 0; return html`
      <div class="card ca-ad" style="border-left:6px solid ${PALETTE[v.color]?.a ?? '#2c5ba0'}">
        <div class="bar" style="margin-bottom:0"><b>${s ? html`${v.emoji} ${v.label}` : 'Add a new section'}</b>${s ? html`<span class="badge ${n ? 'pub' : 'sch'}">${n} matching post${n === 1 ? '' : 's'}</span>` : ''}${s && !v.show ? html`<span class="badge">Hidden</span>` : ''}</div>
        <div class="row">
          <div><label>Name (tab text)${s ? '' : ' - fill this to add'}</label><input name="s_label" value="${v.label}" maxlength="40" placeholder="e.g. Banking"></div>
          <div><label>Emoji</label><input name="s_emoji" value="${v.emoji}" maxlength="8" placeholder="🏦"></div>
          <div><label>Colour</label><select name="s_color">${selOpts(colorOpts, v.color)}</select></div>
          <div><label>Where it shows</label><select name="s_group">${selOpts([['main', 'Top tabs (region: International, National, J&K)'], ['subject', 'Subject-wise']], v.group)}</select></div>
        </div>
        <div class="row">
          <div><label>Post category</label><select name="s_cat">${selOpts(catOpts(v.category, true), v.category)}</select></div>
          <div style="flex:2 1 320px"><label>Tags (comma separated). A post appears here if it has ANY of these tags. Leave empty to show the whole category.</label><input name="s_tags" value="${v.tags}" maxlength="200" placeholder="banking, rbi, finance"></div>
        </div>
        <label>Short description (shown on the page banner and used for SEO)</label><textarea name="s_desc" rows="2" maxlength="220">${v.desc}</textarea>
        <div class="row">
          <div><label>URL name (/current-affairs/<i>name</i>)</label><input name="s_key" value="${v.key}" maxlength="40" placeholder="auto from name"></div>
          <div><label>Visible</label><select name="s_show">${selOpts([['1', 'Yes'], ['0', 'No (hide)']], v.show ? '1' : '0')}</select></div>
          <div><label>Order</label><input type="number" name="s_order" value="${(i + 1) * 10}" min="0" max="9999"></div>
        </div>
        <details style="margin-top:10px"><summary class="muted" style="cursor:pointer">Custom SEO for this section (optional)</summary>
          <label>SEO title (about 60 characters)</label><input name="s_seot" value="${v.seoTitle}" maxlength="120">
          <label>SEO description (about 155 characters)</label><textarea name="s_seod" rows="2" maxlength="320">${v.seoDesc}</textarea></details>
        ${s ? html`<p class="muted" style="margin:10px 0 0">Public page: <a href="/current-affairs/${v.key}" target="_blank" rel="noopener">/current-affairs/${v.key}</a>. To remove this section, empty its Name and save.</p>` : ''}
      </div>`; };

    return c.html(adminPage('Current Affairs', html`
      <div class="bar"><h2 style="margin:0;flex:1">Current Affairs page</h2><a class="btn" href="/current-affairs" target="_blank" rel="noopener" style="margin:0">Open public page</a></div>
      <p class="muted">Edit the headline bar, the top tabs, subject sections and SEO of the page at <b>/current-affairs</b>. Posts are placed automatically: give a post the hub category (<b>${cfg.seo.baseCategory}</b>) and tags such as <b>national</b>, <b>jk</b>, <b>polity</b> in the normal post editor. Changes go live within a minute.</p>
      ${saved ? html`<div class="ok">Saved (${saved}). The public page updates within a minute.</div>` : ''}${err ? html`<div class="err">${err}</div>` : ''}

      <form method="post" action="/admin/current-affairs/general" class="card">
        <h3>Page, hero and SEO</h3>
        <div class="row"><div><label>Hero badge</label><input name="badge" value="${cfg.hero.badge}" maxlength="40"></div>
          <div style="flex:2 1 320px"><label>Hero headline (H1). The last word is highlighted.</label><input name="title" value="${cfg.hero.title}" maxlength="120"></div></div>
        <label>Hero text</label><textarea name="subtitle" rows="3" maxlength="320">${cfg.hero.subtitle}</textarea>
        <label>Search box hint</label><input name="searchHint" value="${cfg.hero.searchHint}" maxlength="100">
        <label>Google title (about 60 characters)</label><input name="seoTitle" value="${cfg.seo.title}" maxlength="120">
        <label>Google description (about 155 characters)</label><textarea name="seoDesc" rows="2" maxlength="320">${cfg.seo.description}</textarea>
        <div class="row">
          <div><label>Hub category (where current affairs posts live)</label><select name="baseCategory">${selOpts(cats.map((x) => [x, x] as [string, string]).concat(cats.includes(cfg.seo.baseCategory) ? [] : [[cfg.seo.baseCategory, cfg.seo.baseCategory]]), cfg.seo.baseCategory)}</select></div>
          <div><label>Posts per page</label><select name="perPage">${selOpts([['9', '9'], ['12', '12'], ['15', '15'], ['21', '21'], ['30', '30']], String(cfg.seo.perPage))}</select></div>
          <div><label>Cards per region block on the hub</label><select name="blockSize">${selOpts([['2', '2'], ['4', '4'], ['6', '6']], String(cfg.seo.blockSize))}</select></div>
        </div>
        <label>SEO text at the bottom of the page. Start a line with ## for a heading; separate paragraphs with a blank line.</label><textarea name="seoText" rows="10" maxlength="6000">${cfg.seo.seoText}</textarea>
        <button>Save page settings</button>
      </form>

      <form method="post" action="/admin/current-affairs/ticker" class="card">
        <h3>Headline bar (scrolling ticker)</h3>
        <p class="muted">The moving bar above the hero. Each headline links to its post. It also appears on every section and archive page.</p>
        <div class="row">
          <div><label>Show the bar</label><select name="on">${selOpts([['1', 'Yes'], ['0', 'No']], cfg.ticker.on ? '1' : '0')}</select></div>
          <div><label>Label</label><input name="label" value="${cfg.ticker.label}" maxlength="24"></div>
          <div><label>Speed</label><select name="speed">${selOpts([['slow', 'Slow'], ['normal', 'Normal'], ['fast', 'Fast']], cfg.ticker.speed)}</select></div>
        </div>
        <div class="row">
          <div><label>Headlines come from</label><select name="mode">${selOpts([['auto', 'Latest current affairs posts (automatic)'], ['pinned', 'Posts with a "pin" tag (falls back to latest)'], ['manual', 'Headlines I type below']], cfg.ticker.mode)}</select></div>
          <div><label>Pin tag (for the pinned option)</label><input name="tag" value="${cfg.ticker.tag}" maxlength="30"></div>
          <div><label>How many headlines</label><input type="number" name="count" min="3" max="20" value="${cfg.ticker.count}"></div>
        </div>
        <label>Manual headlines, one per line: <span class="muted">Headline | link | small label (optional)</span></label>
        <textarea name="items" rows="5" style="font-family:ui-monospace,Consolas,monospace;font-size:14px" placeholder="Union Budget 2026 key highlights | /union-budget-2026 | Budget">${cfg.ticker.items.map((i) => `${i.title} | ${i.url}${i.tag ? ' | ' + i.tag : ''}`).join('\n')}</textarea>
        <button>Save headline bar</button>
      </form>

      <form method="post" action="/admin/current-affairs/sections" class="card" style="background:transparent;border:0;box-shadow:none;padding:0">
        <h3 style="margin-bottom:4px">Sections (top tabs and subjects)</h3>
        <p class="muted">Each section is a <b>category + tags</b> rule. Reorder with the Order number. To add one, fill an empty block at the bottom.</p>
        ${rowsData.map((s, i) => secCard(s, i))}
        <button>Save sections</button>
      </form>

      <div class="card"><h3>Tags in use (hub category)</h3>
        <p class="muted">Use these exact tags in your posts so they land in the right sections. Number = posts using the tag.</p>
        ${popular.length ? html`<div style="display:flex;flex-wrap:wrap;gap:8px">${popular.map((t) => html`<span class="badge">${t.label} · ${t.n}</span>`)}</div>` : html`<p class="muted">No tagged posts yet.</p>`}</div>

      <form method="post" action="/admin/current-affairs/faq" class="card">
        <h3>FAQ (shown on the page and sent to Google as FAQ rich results)</h3>
        <label>One per line: <span class="muted">Question | Answer</span></label>
        <textarea name="faq" rows="9" style="font-family:ui-monospace,Consolas,monospace;font-size:14px">${cfg.faq.map((f) => `${f.q} | ${f.a}`).join('\n')}</textarea>
        <button>Save FAQ</button>
      </form>

      <form method="post" action="/admin/current-affairs/reset" data-confirm="Reset the whole Current Affairs page (hero, headline bar, sections, FAQ) to the defaults?"><button class="light" style="margin:0">Reset everything to defaults</button></form>`, true));
  });

  const back = (c: any, what: string) => c.redirect(`/admin/current-affairs?saved=${encodeURIComponent(what)}`);
  const fail = (c: any, msg: string) => c.redirect(`/admin/current-affairs?err=${encodeURIComponent(msg)}`);

  app.post('/admin/current-affairs/general', async (c) => {
    const db = c.env.DB, f = await c.req.formData(), g = (k: string) => String(f.get(k) ?? ''), st = await readStored(db), cats = await getCats(db), cur = await loadCfg(db);
    const base = cats.includes(g('baseCategory')) ? g('baseCategory') : cur.seo.baseCategory;
    st.hero = { badge: clip(g('badge'), 40), title: clip(g('title'), 120) || DEFAULT_CFG.hero.title, subtitle: clip(g('subtitle'), 320), searchHint: clip(g('searchHint'), 100) };
    st.seo = { title: clip(g('seoTitle'), 120) || DEFAULT_CFG.seo.title, description: clip(g('seoDesc'), 320) || DEFAULT_CFG.seo.description, baseCategory: base,
      perPage: [9, 12, 15, 21, 30].includes(Number(g('perPage'))) ? Number(g('perPage')) : 15, blockSize: [2, 4, 6].includes(Number(g('blockSize'))) ? Number(g('blockSize')) : 4, seoText: area(g('seoText'), 6000) };
    await writeStored(db, st);
    return back(c, 'page settings');
  });

  app.post('/admin/current-affairs/ticker', async (c) => {
    const db = c.env.DB, f = await c.req.formData(), g = (k: string) => String(f.get(k) ?? ''), st = await readStored(db);
    const items = g('items').split('\n').map((l) => l.split('|').map((x) => x.trim())).filter((a) => a[0] && a[1]).slice(0, 30).map((a) => ({ title: clip(a[0], 160), url: clip(a[1], 300), tag: clip(a[2] ?? '', 20) }));
    const mode = ['auto', 'pinned', 'manual'].includes(g('mode')) ? (g('mode') as Cfg['ticker']['mode']) : 'auto';
    if (mode === 'manual' && !items.length) return fail(c, 'Manual mode needs at least one headline line (Headline | link).');
    st.ticker = { on: g('on') !== '0', label: clip(g('label'), 24) || 'Headlines', mode, tag: clip(g('tag'), 30) || 'headline', count: Math.max(3, Math.min(20, parseInt(g('count'), 10) || 10)),
      speed: ['slow', 'normal', 'fast'].includes(g('speed')) ? (g('speed') as Cfg['ticker']['speed']) : 'normal', items };
    await writeStored(db, st);
    return back(c, 'headline bar');
  });

  app.post('/admin/current-affairs/sections', async (c) => {
    const db = c.env.DB, f = await c.req.formData(), st = await readStored(db), cats = await getCats(db);
    const col = (k: string) => f.getAll(k).map((v) => String(v ?? ''));
    const L = col('s_label'), K = col('s_key'), E = col('s_emoji'), C = col('s_color'), G = col('s_group'), CA = col('s_cat'), T = col('s_tags'), D = col('s_desc'), ST = col('s_seot'), SD = col('s_seod'), SH = col('s_show'), O = col('s_order');
    const out: { s: Sec; o: number; i: number }[] = [];
    const used = new Set<string>();
    for (let i = 0; i < L.length; i++) {
      const label = clip(L[i], 40);
      if (!label) continue;
      let key = slugify(K[i] || label).slice(0, 40) || 'section';
      if (RESERVED_KEYS.has(key)) key += '-news';
      let n = 2; const base = key; while (used.has(key)) key = `${base}-${n++}`;
      used.add(key);
      const cat = CA[i] === '' || CA[i] === '*' || cats.includes(CA[i]) ? CA[i] : '';
      out.push({ i, o: Number(O[i]) || (i + 1) * 10, s: { key, label, emoji: clip(E[i], 8), color: PALETTE[C[i]] ? C[i] : 'blue', group: G[i] === 'main' ? 'main' : 'subject', category: cat, tags: cleanTags(T[i]), desc: clip(D[i], 220), seoTitle: clip(ST[i], 120), seoDesc: clip(SD[i], 320), show: SH[i] !== '0' } });
    }
    if (!out.length) return fail(c, 'Keep at least one section.');
    if (out.length > 30) return fail(c, 'You can have at most 30 sections.');
    st.sections = out.sort((a, b) => a.o - b.o || a.i - b.i).map((x) => x.s);
    await writeStored(db, st);
    return back(c, 'sections');
  });

  app.post('/admin/current-affairs/faq', async (c) => {
    const db = c.env.DB, f = await c.req.formData(), st = await readStored(db);
    st.faq = String(f.get('faq') ?? '').split('\n').map((l) => { const i = l.indexOf('|'); return i < 0 ? null : { q: clip(l.slice(0, i), 200), a: clip(l.slice(i + 1), 800) }; }).filter((x): x is { q: string; a: string } => !!x && !!x.q && !!x.a).slice(0, 20);
    await writeStored(db, st);
    return back(c, 'FAQ');
  });

  app.post('/admin/current-affairs/reset', async (c) => {
    await c.env.DB.prepare('DELETE FROM settings WHERE key = ?').bind(KEY).run();
    return back(c, 'reset to defaults');
  });
}

// ---------------------------------------------------------------------------------------------
// Sitemap fragment (called from the main /sitemap.xml)
// ---------------------------------------------------------------------------------------------
export async function caSitemap(db: D1Database, o: string): Promise<string> {
  try {
    const cfg = await loadCfg(db), u = (loc: string, ts?: number) => `<url><loc>${esc(o + loc)}</loc>${ts ? `<lastmod>${iso(ts).slice(0, 10)}</lastmod>` : ''}</url>`;
    const [months, days, last] = await Promise.all([monthCounts(db, cfg.seo.baseCategory, 60), dayCounts(db, cfg.seo.baseCategory, 400),
      db.prepare("SELECT MAX(published_at) AS t FROM posts WHERE status='published' AND published_at <= ? AND category = ?").bind(nowS(), cfg.seo.baseCategory).first<{ t: number | null }>()]);
    return u('/current-affairs', last?.t ?? undefined) + u('/current-affairs/archive') + cfg.sections.filter((s) => s.show).map((s) => u(`/current-affairs/${s.key}`)).join('')
      + months.map((m) => u(`/current-affairs/archive/${m.m}`)).join('') + days.map((d) => u(`/current-affairs/archive/${d.d}`)).join('');
  } catch { return ''; }
}
