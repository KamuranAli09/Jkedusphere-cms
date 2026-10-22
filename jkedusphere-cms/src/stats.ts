// Date ranges and data queries for the analytics screens (first-party data in D1).
import { notesCatalog } from './notes';
import { istDay } from './track';

const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const today = () => istDay();
export const addDays = (d: string, n: number) => new Date(Date.parse(d + 'T00:00:00Z') + n * 864e5).toISOString().slice(0, 10);
export const diff = (a: string, b: string) => Math.round((Date.parse(b) - Date.parse(a)) / 864e5);
export const fd = (d: string) => `${+d.slice(8)} ${MON[+d.slice(5, 7) - 1]} ${d.slice(0, 4)}`;
export const fdShort = (d: string) => `${+d.slice(8)} ${MON[+d.slice(5, 7) - 1]}`;
export const dow = (d: string) => (new Date(d + 'T00:00:00Z').getUTCDay() + 6) % 7; // Mon=0
export const monthStart = (d: string) => d.slice(0, 8) + '01';
export const prevMonthStart = (d: string) => { const y = +d.slice(0, 4), m = +d.slice(5, 7); return m === 1 ? `${y - 1}-12-01` : `${y}-${String(m - 1).padStart(2, '0')}-01`; };
const nextMonthStart = (d: string) => { const y = +d.slice(0, 4), m = +d.slice(5, 7); return m === 12 ? `${y + 1}-01-01` : `${y}-${String(m + 1).padStart(2, '0')}-01`; };
export const monthEnd = (d: string) => addDays(nextMonthStart(d), -1);
export const weekStart = (d: string) => addDays(d, -dow(d));
const minD = (a: string, b: string) => (a < b ? a : b);
export const days = (from: string, to: string) => { const o: string[] = []; for (let d = from; d <= to; d = addDays(d, 1)) o.push(d); return o; };

export type Range = { key: string; label: string; from: string; to: string; pf: string; pt: string };
export const PRESETS: [string, string][] = [['today', 'Today'], ['yesterday', 'Yesterday'], ['7d', '7 days'], ['30d', '30 days'], ['90d', '90 days'], ['mtd', 'This month'], ['lmonth', 'Last month'], ['llmonth', 'Last-to-last month'], ['365d', '365 days'], ['ytd', 'This year']];

export function mkRange(key: string, cf?: string, ct?: string): Range {
  const T = today(), last = (n: number, label: string): Range => { const from = addDays(T, -(n - 1)); return { key, label, from, to: T, pf: addDays(from, -n), pt: addDays(from, -1) }; };
  const ok = (s?: string) => !!s && /^\d{4}-\d{2}-\d{2}$/.test(s);
  switch (key) {
    case 'today': return { key, label: 'Today', from: T, to: T, pf: addDays(T, -1), pt: addDays(T, -1) };
    case 'yesterday': { const y = addDays(T, -1); return { key, label: 'Yesterday', from: y, to: y, pf: addDays(y, -1), pt: addDays(y, -1) }; }
    case '7d': return last(7, 'Last 7 days');
    case '90d': return last(90, 'Last 90 days');
    case '365d': return last(365, 'Last 365 days');
    case 'mtd': { const from = monthStart(T), pms = prevMonthStart(T); return { key, label: 'This month so far', from, to: T, pf: pms, pt: minD(addDays(pms, diff(from, T)), monthEnd(pms)) }; }
    case 'lmonth': { const from = prevMonthStart(T); return { key, label: 'Last month', from, to: addDays(monthStart(T), -1), pf: prevMonthStart(from), pt: addDays(from, -1) }; }
    case 'llmonth': { const from = prevMonthStart(prevMonthStart(T)); return { key, label: 'Last-to-last month', from, to: addDays(prevMonthStart(T), -1), pf: prevMonthStart(from), pt: addDays(from, -1) }; }
    case 'ytd': { const y = +T.slice(0, 4); return { key, label: 'This year so far', from: `${y}-01-01`, to: T, pf: `${y - 1}-01-01`, pt: `${y - 1}${T.slice(4)}` }; }
    case 'custom': if (ok(cf) && ok(ct) && cf! <= ct! && diff(cf!, ct!) < 800) { const n = diff(cf!, ct!) + 1; return { key, label: `${fd(cf!)} to ${fd(ct!)}`, from: cf!, to: ct!, pf: addDays(cf!, -n), pt: addDays(cf!, -1) }; }
    // falls through
    default: return last(30, 'Last 30 days');
  }
}

export type Q = { db: D1Database };
export const sum = (a: number[]) => a.reduce((x, y) => x + y, 0);

// Daily site totals: [views[], visits[]] aligned to days(from,to)
export async function daily(db: D1Database, from: string, to: string) {
  const rows = (await db.prepare("SELECT dim, day, n FROM a_dim WHERE dim IN ('views','visits') AND day BETWEEN ? AND ?").bind(from, to).all()).results as { dim: string; day: string; n: number }[];
  const v = new Map<string, number>(), u = new Map<string, number>();
  for (const r of rows) (r.dim === 'views' ? v : u).set(r.day, r.n);
  const ds = days(from, to);
  return { days: ds, views: ds.map((d) => v.get(d) ?? 0), visits: ds.map((d) => u.get(d) ?? 0) };
}

export async function dimTop(db: D1Database, dim: string, from: string, to: string, limit = 12) {
  return (await db.prepare('SELECT k, SUM(n) AS n FROM a_dim WHERE dim = ? AND day BETWEEN ? AND ? GROUP BY k ORDER BY n DESC LIMIT ?').bind(dim, from, to, limit).all()).results as { k: string; n: number }[];
}

export async function pagesTop(db: D1Database, from: string, to: string, limit = 100) {
  return (await db.prepare('SELECT path, SUM(views) AS v FROM a_page WHERE day BETWEEN ? AND ? GROUP BY path ORDER BY v DESC LIMIT ?').bind(from, to, limit).all()).results as { path: string; v: number }[];
}

const chunk = <T,>(a: T[], n: number) => { const o: T[][] = []; for (let i = 0; i < a.length; i += n) o.push(a.slice(i, i + n)); return o; };

// Views per path for a period (used for "previous period" columns)
export async function pathViews(db: D1Database, paths: string[], from: string, to: string) {
  const m = new Map<string, number>();
  for (const part of chunk(paths, 80)) {
    const r = (await db.prepare(`SELECT path, SUM(views) AS v FROM a_page WHERE path IN (${part.map(() => '?').join(',')}) AND day BETWEEN ? AND ? GROUP BY path`).bind(...part, from, to).all()).results as { path: string; v: number }[];
    r.forEach((x) => m.set(x.path, x.v));
  }
  return m;
}

// Per-path daily series bucketed into at most `buckets` points, for sparklines
export async function pathSeries(db: D1Database, paths: string[], from: string, to: string, buckets = 20) {
  const ds = days(from, to), size = Math.max(1, Math.ceil(ds.length / buckets)), idx = new Map(ds.map((d, i) => [d, Math.floor(i / size)]));
  const nb = Math.ceil(ds.length / size), out = new Map<string, number[]>();
  for (const part of chunk(paths, 80)) {
    const r = (await db.prepare(`SELECT path, day, views FROM a_page WHERE path IN (${part.map(() => '?').join(',')}) AND day BETWEEN ? AND ?`).bind(...part, from, to).all()).results as { path: string; day: string; views: number }[];
    for (const x of r) { const a = out.get(x.path) ?? new Array(nb).fill(0); a[idx.get(x.day) ?? 0] += x.views; out.set(x.path, a); }
  }
  return out;
}

export async function pathDaily(db: D1Database, path: string, from: string, to: string) {
  const r = (await db.prepare('SELECT day, views FROM a_page WHERE path = ? AND day BETWEEN ? AND ?').bind(path, from, to).all()).results as { day: string; views: number }[];
  const m = new Map(r.map((x) => [x.day, x.views]));
  return days(from, to).map((d) => m.get(d) ?? 0);
}

// ---------- Page names ----------
export type Info = { title: string; kind: 'Home' | 'Post' | 'Page' | 'Notes' | 'Category' | 'Other'; sub?: string };
let NOTE_MAP: Map<string, Info> | null = null;
const noteMap = () => {
  if (!NOTE_MAP) { NOTE_MAP = new Map(); for (const s of notesCatalog()) s.topics.forEach((t, i) => NOTE_MAP!.set(t.path, { title: i === 0 ? `${s.short} notes (main page)` : t.title, kind: 'Notes', sub: s.short })); }
  return NOTE_MAP;
};
export async function labels(db: D1Database, paths: string[]) {
  const out = new Map<string, Info>(), slugs: string[] = [], nm = noteMap();
  for (const p of paths) {
    if (p === '/') out.set(p, { title: 'Homepage', kind: 'Home' });
    else if (nm.has(p)) out.set(p, nm.get(p)!);
    else if (p.startsWith('/category/')) out.set(p, { title: 'Category: ' + p.slice(10), kind: 'Category' });
    else if (/^\/[^/]+$/.test(p)) slugs.push(p.slice(1));
    else out.set(p, { title: p, kind: 'Other' });
  }
  for (const part of chunk(slugs, 90)) {
    const ph = part.map(() => '?').join(',');
    const a = (await db.prepare(`SELECT slug, title FROM posts WHERE slug IN (${ph})`).bind(...part).all()).results as { slug: string; title: string }[];
    const b = (await db.prepare(`SELECT slug, title FROM pages WHERE slug IN (${ph})`).bind(...part).all()).results as { slug: string; title: string }[];
    a.forEach((x) => out.set('/' + x.slug, { title: x.title, kind: 'Post' }));
    b.forEach((x) => { if (!out.has('/' + x.slug)) out.set('/' + x.slug, { title: x.title, kind: 'Page' }); });
  }
  for (const p of paths) if (!out.has(p)) out.set(p, { title: p, kind: 'Other' });
  return out;
}

export const countryName = (cc: string) => { try { return new Intl.DisplayNames(['en'], { type: 'region' }).of(cc) ?? cc; } catch { return cc; } };
export const flag = (cc: string) => (/^[A-Z]{2}$/.test(cc) ? String.fromCodePoint(...[...cc].map((c) => 0x1f1a5 + c.charCodeAt(0))) : '');
