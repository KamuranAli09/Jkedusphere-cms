// Admin analytics: dashboard, Analytics tabs, page drill-down, Notes manager, CSV export.
import type { Hono } from 'hono';
import { raw } from 'hono/html';
import type { Env } from './types';
import { siteOrigin } from './types';
import { adminPage } from './layout';
import { notesCatalog } from './notes';
import { esc, num, C, CSS, lineChart, legend, columns, spark, barList, delta, type Series } from './charts';
import * as S from './stats';
import * as G from './google';

const enc = encodeURIComponent;
const pct = (n: number, d: number) => (d ? ((n / d) * 100).toFixed(1) + '%' : '-');
const dur = (s: number) => (s >= 60 ? `${Math.floor(s / 60)}m ${Math.round(s % 60)}s` : `${Math.round(s)}s`);
const card = (title: string, inner: string, sub = '') => `<div class="card"><h3>${title}${sub ? `<small>${sub}</small>` : ''}</h3>${inner}</div>`;
const page = (title: string, body: string) => adminPage(title, raw(CSS + body), true);
const table = (head: [string, boolean?][], rows: string[][]) =>
  `<div class="tw"><table><thead><tr>${head.map(([h, r]) => `<th${r ? ' class="num"' : ''}>${h}</th>`).join('')}</tr></thead><tbody>${rows.length ? rows.map((r) => `<tr>${r.map((c, i) => `<td${head[i]?.[1] ? ' class="num"' : ''}>${c}</td>`).join('')}</tr>`).join('') : `<tr><td colspan="${head.length}" class="muted">No data yet.</td></tr>`}</tbody></table></div>`;
const kindPill = (k: string) => `<span class="pill ${k === 'Notes' ? 'n' : k === 'Post' ? 'p' : k === 'Page' ? 'g' : 'h'}">${k}</span>`;
const pageCell = (path: string, i: S.Info | undefined, qs: string) =>
  `<div class="ttl"><a href="/admin/analytics/page?p=${enc(path)}${qs}">${esc(i?.title ?? path)}</a> <a href="${esc(path)}" target="_blank" rel="noopener" title="Open on site" style="text-decoration:none">&#8599;</a><small>${esc(path)}${i?.sub ? ' &middot; ' + esc(i.sub) : ''}</small></div>`;

const TABS: [string, string][] = [['overview', 'Overview'], ['pages', 'Pages'], ['sources', 'Sources'], ['audience', 'Audience'], ['search', 'Search keywords'], ['insights', 'Insights'], ['google', 'Google Analytics'], ['setup', 'Setup']];
const MISSING = `<div class="warn"><b>Analytics tables are not created yet.</b> Open your D1 database &rarr; Console, paste the contents of <code class="k">migrations/0003_analytics.sql</code> and run it. Counting starts right after.</div>`;

type Cx = { c: any; db: D1Database; env: Env['Bindings']; r: S.Range; cmp: boolean; qs: string; origin: string };

const rangeBar = (tab: string, r: S.Range, cmp: boolean, base: string, extra = '') => {
  const q = (k: string) => `${base}?tab=${tab}&r=${k}${extra}${cmp ? '' : '&cmp=0'}`;
  return `<div class="rng">${S.PRESETS.map(([k, l]) => `<a href="${q(k)}" class="${r.key === k ? 'on' : ''}">${l}</a>`).join('')}
<form method="get" action="${base}"><input type="hidden" name="tab" value="${tab}">${extra.replace(/&(\w+)=([^&]*)/g, (_m, k, v) => `<input type="hidden" name="${k}" value="${esc(decodeURIComponent(v))}">`)}<input type="hidden" name="r" value="custom"><input type="date" name="from" value="${r.from}"><span class="muted">to</span><input type="date" name="to" value="${r.to}"><button class="light">Apply</button></form>
<a href="${base}?tab=${tab}&r=${r.key}${r.key === 'custom' ? `&from=${r.from}&to=${r.to}` : ''}${extra}${cmp ? '&cmp=0' : ''}" style="margin-left:auto">${cmp ? 'Hide comparison' : 'Compare with previous period'}</a></div>
<p class="muted" style="margin:-6px 0 16px">Showing <b>${esc(r.label)}</b> (${S.fd(r.from)}${r.from === r.to ? '' : ' to ' + S.fd(r.to)})${cmp ? ` &middot; compared with ${S.fd(r.pf)}${r.pf === r.pt ? '' : ' to ' + S.fd(r.pt)}` : ''}. All dates are Indian Standard Time.</p>`;
};

function getCx(c: any): Cx {
  const q = (k: string) => c.req.query(k) ?? '';
  const r = S.mkRange(q('r') || '30d', q('from'), q('to')), cmp = q('cmp') !== '0';
  const qs = `&r=${r.key}${r.key === 'custom' ? `&from=${r.from}&to=${r.to}` : ''}${cmp ? '' : '&cmp=0'}`;
  return { c, db: c.env.DB, env: c.env, r, cmp, qs, origin: siteOrigin(c.req.url) };
}

// Wrap a D1 query block: if the tables do not exist yet, show the setup note instead of a crash
async function safe(fn: () => Promise<string>) {
  try { return await fn(); } catch (e: any) { return /no such table/i.test(String(e?.message)) ? MISSING : `<div class="err">Could not load this section: ${esc(e?.message ?? e)}</div>`; }
}

// ---------- Comparison table (today vs yesterday, week, month, last-to-last month, year) ----------
async function periodTable(db: D1Database) {
  const T = S.today(), Y = S.addDays(T, -1), ws = S.weekStart(T), lws = S.addDays(ws, -7), ms = S.monthStart(T), pms = S.prevMonthStart(T), ppms = S.prevMonthStart(pms), pppms = S.prevMonthStart(ppms);
  const y0 = T.slice(0, 4) + '-01-01', ly0 = `${+T.slice(0, 4) - 1}-01-01`, mn = S.diff(ms, T);
  type R = [string, string, string, string, string];
  const rows: R[] = [
    ['Today', T, T, 'Yesterday', Y], ['Yesterday', Y, Y, 'Day before', S.addDays(Y, -1)],
    ['This week (Mon to today)', ws, T, 'Last week, same days', S.addDays(T, -7)], ['Last week (full)', lws, S.addDays(ws, -1), 'Week before', S.addDays(lws, -7)],
    ['This month so far', ms, T, 'Last month, same days', pms], ['Last month (full)', pms, S.addDays(ms, -1), 'Month before', ppms],
    ['Last-to-last month (full)', ppms, S.addDays(pms, -1), 'Month before that', pppms],
    ['Last 30 days', S.addDays(T, -29), T, 'Previous 30 days', S.addDays(T, -59)], ['Last 90 days', S.addDays(T, -89), T, 'Previous 90 days', S.addDays(T, -179)],
    ['This year so far', y0, T, 'Same period last year', ly0], ['Last 365 days', S.addDays(T, -364), T, 'Previous 365 days', S.addDays(T, -729)],
  ];
  // Normalise: each row = [label, from, to, prevLabel, prevFrom]; prev length = current length (month rows use real month lengths)
  const spans = rows.map((r) => {
    const [, f, t, , pf] = r; let n = S.diff(f, t) + 1, pt = S.addDays(pf, n - 1);
    if (r[0] === 'This month so far') pt = S.addDays(pms, mn) > S.monthEnd(pms) ? S.monthEnd(pms) : S.addDays(pms, mn);
    if (/^(Last month|Last-to-last)/.test(r[0])) pt = S.addDays(S.monthStart(S.addDays(pf, 40)), -1);
    return { f, t, pf, pt };
  });
  const lo = spans.reduce((a, s) => (s.pf < a ? s.pf : a), T), d = await S.daily(db, lo, T), ix = new Map(d.days.map((x, i) => [x, i]));
  const tot = (f: string, t: string) => { let v = 0, u = 0; for (let x = f; x <= t; x = S.addDays(x, 1)) { const i = ix.get(x); if (i !== undefined) { v += d.views[i]; u += d.visits[i]; } } return [v, u]; };
  return table([['Period'], ['Views', true], ['vs', true], ['Compared with'], ['Their views', true], ['Visits', true], ['vs', true]],
    rows.map((r, i) => { const [v, u] = tot(spans[i].f, spans[i].t), [pv, pu] = tot(spans[i].pf, spans[i].pt);
      return [`<b>${r[0]}</b><div class="muted">${S.fdShort(spans[i].f)}${spans[i].f === spans[i].t ? '' : ' - ' + S.fdShort(spans[i].t)}</div>`, num(v), delta(v, pv), `${r[3]}<div class="muted">${S.fdShort(spans[i].pf)}${spans[i].pf === spans[i].pt ? '' : ' - ' + S.fdShort(spans[i].pt)}</div>`, num(pv), num(u), delta(u, pu)]; }));
}

// ---------- Tabs ----------
async function overview(x: Cx) {
  const { db, r, cmp } = x, [cur, prev] = await Promise.all([S.daily(db, r.from, r.to), cmp ? S.daily(db, r.pf, r.pt) : null]);
  const views = S.sum(cur.views), visits = S.sum(cur.visits), pv = prev ? S.sum(prev.views) : 0, pu = prev ? S.sum(prev.visits) : 0;
  const [chan, pages, src, ctry] = await Promise.all([S.dimTop(db, 'channel', r.from, r.to, 8), S.pagesTop(db, r.from, r.to, 10), S.dimTop(db, 'source', r.from, r.to, 8), S.dimTop(db, 'country', r.from, r.to, 6)]);
  const lab = await S.labels(db, pages.map((p) => p.path)), search = chan.find((c) => c.k === 'Search')?.n ?? 0, chSum = S.sum(chan.map((c) => c.n));
  const pad = (a: number[], n: number) => Array.from({ length: n }, (_, i) => a[i] ?? 0);
  const series: Series[] = [{ name: 'Views', color: C.blue, vals: cur.views, fill: true }, { name: 'Visits', color: C.orange, vals: cur.visits }];
  if (prev) series.push({ name: 'Views (previous period)', color: C.gray, vals: pad(prev.views, cur.days.length), dash: true });
  const kpi = (l: string, v: string, d = '') => `<div class="card"><div class="lbl">${l}</div><div class="stat">${v}</div>${d}</div>`;
  return `<div class="kpi">${kpi('Page views', num(views), prev ? delta(views, pv) : '')}${kpi('Visits', num(visits), prev ? delta(visits, pu) : '')}${kpi('Pages per visit', visits ? (views / visits).toFixed(2) : '-')}${kpi('From Google &amp; search', pct(search, chSum))}</div>
${card('Views and visits', legend([['Views', C.blue], ['Visits', C.orange], ...(prev ? [['Previous period', C.gray, true] as [string, string, boolean]] : [])]) + lineChart(cur.days.map(S.fd), series, { tickLabel: (i) => S.fdShort(cur.days[i]) }), 'Hover the chart for exact numbers. A visit is one unique visitor per day.')}
<div style="height:18px"></div>
${card('How today compares', await periodTable(db), 'Today is still in progress, so it will look lower until the day ends')}
<div style="height:18px"></div>
<div class="two">${card('Top pages', table([['Page'], ['Views', true]], pages.map((p) => [pageCell(p.path, lab.get(p.path), x.qs), num(p.v)])) + `<p style="margin:10px 0 0"><a href="/admin/analytics?tab=pages${x.qs}">All pages &rarr;</a></p>`)}
${card('Where visitors come from', barList(src.map((s) => [esc(s.k), s.n]), C.blue) + `<p style="margin:10px 0 0"><a href="/admin/analytics?tab=sources${x.qs}">Sources in detail &rarr;</a></p>`)}</div>
<div style="height:18px"></div>
${card('Top countries', barList(ctry.map((s) => [`${S.flag(s.k)} ${esc(S.countryName(s.k))}`, s.n]), C.aqua) + `<p style="margin:10px 0 0"><a href="/admin/analytics?tab=audience${x.qs}">Audience in detail &rarr;</a></p>`)}`;
}

async function pagesTab(x: Cx) {
  const { db, r, cmp } = x, kind = x.c.req.query('k') ?? 'all', rows = await S.pagesTop(db, r.from, r.to, 300);
  const lab = await S.labels(db, rows.map((p) => p.path)), shown = rows.filter((p) => kind === 'all' || (lab.get(p.path)?.kind ?? '').toLowerCase() === kind).slice(0, 100);
  const paths = shown.map((p) => p.path), [pm, sp] = await Promise.all([cmp ? S.pathViews(db, paths, r.pf, r.pt) : Promise.resolve(new Map<string, number>()), S.pathSeries(db, paths.slice(0, 80), r.from, r.to)]);
  const total = S.sum(rows.map((p) => p.v)), tabs = ['all', 'post', 'notes', 'page', 'home', 'category'].map((k) => `<a href="/admin/analytics?tab=pages&k=${k}${x.qs}" class="${kind === k ? 'on' : ''}" style="padding:6px 12px;border:1px solid var(--line);border-radius:999px;font-size:13px;font-weight:650;text-decoration:none;color:${kind === k ? '#fff' : '#475569'};background:${kind === k ? '#4f46e5' : '#fff'}">${({ all: 'All pages', post: 'Posts', notes: 'Notes', page: 'Pages', home: 'Homepage', category: 'Categories' } as Record<string, string>)[k]}</a>`).join(' ');
  const mv = shown.filter((p) => (pm.get(p.path) ?? 0) + p.v >= 10).map((p) => ({ p, d: p.v - (pm.get(p.path) ?? 0) }));
  const risers = [...mv].sort((a, b) => b.d - a.d).filter((m) => m.d > 0).slice(0, 6), fallers = [...mv].sort((a, b) => a.d - b.d).filter((m) => m.d < 0).slice(0, 6);
  const land = await S.dimTop(db, 'landing', r.from, r.to, 10), ll = await S.labels(db, land.map((l) => l.k));
  return `<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px">${tabs}<a href="/admin/analytics/export.csv?what=pages${x.qs}" style="margin-left:auto">Download CSV</a></div>
${card('Pages ranked by views', table([['Page'], ['Type'], ['Views', true], ['Share', true], ...(cmp ? [['Before', true] as [string, boolean], ['Change', true] as [string, boolean]] : []), ['Trend']],
    shown.map((p) => [pageCell(p.path, lab.get(p.path), x.qs), kindPill(lab.get(p.path)?.kind ?? ''), num(p.v), pct(p.v, total), ...(cmp ? [num(pm.get(p.path) ?? 0), delta(p.v, pm.get(p.path) ?? 0)] : []), spark(sp.get(p.path) ?? [])])), `${num(total)} views in this period`)}
${cmp ? `<div style="height:18px"></div><div class="two">${card('Rising pages', table([['Page'], ['Gain', true]], risers.map((m) => [pageCell(m.p.path, lab.get(m.p.path), x.qs), `<span class="dl u">+${num(m.d)}</span>`])))}${card('Falling pages', table([['Page'], ['Drop', true]], fallers.map((m) => [pageCell(m.p.path, lab.get(m.p.path), x.qs), `<span class="dl d">${num(m.d)}</span>`])))}</div>` : ''}
<div style="height:18px"></div>${card('Entry pages', table([['Page'], ['Visits that started here', true]], land.map((l) => [pageCell(l.k, ll.get(l.k), x.qs), num(l.n)])), 'The first page each visitor saw that day')}`;
}

async function sourcesTab(x: Cx) {
  const { db, r } = x, [chan, src] = await Promise.all([S.dimTop(db, 'channel', r.from, r.to, 10), S.dimTop(db, 'source', r.from, r.to, 25)]);
  const pick = x.c.req.query('src') ?? 'Google';
  const rows = (await db.prepare('SELECT path, SUM(n) AS n FROM a_psrc WHERE src = ? AND day BETWEEN ? AND ? GROUP BY path ORDER BY n DESC LIMIT 25').bind(pick, r.from, r.to).all()).results as { path: string; n: number }[];
  const lab = await S.labels(db, rows.map((p) => p.path));
  const opts = [...new Set(['Google', 'Telegram', 'WhatsApp', 'YouTube', 'Facebook', 'Instagram', 'Bing', ...src.map((s) => s.k)])].filter((s) => s !== 'Direct / none');
  return `<div class="two">${card('Channels', barList(chan.map((s) => [esc(s.k), s.n]), C.violet))}${card('Sources', barList(src.map((s) => [esc(s.k), s.n]), C.blue))}</div>
<div style="height:18px"></div>${card(`Pages that receive visits from ${esc(pick)}`, `<form method="get" class="bar" style="margin-bottom:10px"><input type="hidden" name="tab" value="sources"><input type="hidden" name="r" value="${r.key}">${r.key === 'custom' ? `<input type="hidden" name="from" value="${r.from}"><input type="hidden" name="to" value="${r.to}">` : ''}<select name="src">${opts.map((o) => `<option${o === pick ? ' selected' : ''}>${esc(o)}</option>`).join('')}</select><button class="light" style="margin:0">Show</button></form>` +
    table([['Page'], ['Views from here', true]], rows.map((p) => [pageCell(p.path, lab.get(p.path), x.qs), num(p.n)])), 'Counted every time the visitor arrived from this source')}
<p class="muted" style="margin-top:14px">Tip: add <code class="k">?utm_source=telegram</code> (or whatsapp, youtube, instagram) to links you post. WhatsApp and Telegram apps often hide where the click came from, so those visits would otherwise show as "Direct". Use <code class="k">?utm_source=telegram&amp;utm_medium=social</code> on every channel post and they are counted correctly.</p>`;
}

async function audienceTab(x: Cx) {
  const { db, r } = x, [ctry, reg, city, dev, br, os, hr, d] = await Promise.all(['country', 'region', 'city', 'device', 'browser', 'os'].map((k, i) => S.dimTop(db, k, r.from, r.to, i < 3 ? 15 : 8)).concat([S.dimTop(db, 'hour', r.from, r.to, 24) as any, S.daily(db, r.from, r.to) as any])) as any;
  const hmap = new Map<string, number>(hr.map((h: any) => [h.k, h.n])), hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
  const wk = [0, 0, 0, 0, 0, 0, 0]; (d.days as string[]).forEach((day, i) => { wk[S.dow(day)] += d.views[i]; });
  const peak = hours.reduce((a, h) => ((hmap.get(h) ?? 0) > (hmap.get(a) ?? 0) ? h : a), '00');
  const pl = (k: string) => { const [a, b, cc] = k.split('|'); return esc([a, cc && cc !== 'IN' ? S.countryName(cc) : b].filter(Boolean).join(', ')); };
  return `<div class="two">${card('Countries', barList(ctry.map((s: any) => [`${S.flag(s.k)} ${esc(S.countryName(s.k))}`, s.n]), C.aqua))}${card('States / regions', barList(reg.map((s: any) => [esc(s.k.split('|')[0]) + (s.k.endsWith('|IN') ? '' : ` <small>${esc(S.countryName(s.k.split('|')[1]))}</small>`), s.n]), C.aqua))}</div>
<div style="height:18px"></div><div class="two">${card('Cities', barList(city.map((s: any) => [esc(s.k.split('|')[0]) + ` <small>${pl(s.k.split('|').slice(1).join('|') ? s.k.split('|').slice(0, 1).concat(s.k.split('|').slice(1)).join('|') : '')}</small>`.replace(/<small>[^<]*<\/small>/, `<small>${esc(s.k.split('|')[1] || '')}</small>`), s.n]), C.aqua), 'Based on the visitor\'s network location, so mobile data users may show the nearest city')}
${card('Devices', barList(dev.map((s: any) => [esc(s.k), s.n]), C.blue) + '<div style="height:14px"></div>' + barList(os.map((s: any) => [esc(s.k), s.n]), C.violet) + '<div style="height:14px"></div>' + barList(br.map((s: any) => [esc(s.k), s.n]), C.orange), 'Device type, operating system, browser')}</div>
<div style="height:18px"></div><div class="two">${card('When visitors arrive (hour, IST)', columns(hours, hours.map((h) => hmap.get(h) ?? 0)), `Busiest hour: ${peak}:00 to ${peak}:59`)}${card('Busiest weekdays', columns(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], wk, C.violet), 'Page views in this period')}</div>`;
}

async function insightsTab(x: Cx) {
  const { db, r } = x, [sq, nf] = await Promise.all([S.dimTop(db, 'search', r.from, r.to, 25), S.dimTop(db, 'notfound', r.from, r.to, 25)]);
  return `<div class="two">${card('What people search for on your site', table([['Search term'], ['Searches', true]], sq.map((s) => [esc(s.k), num(s.n)])), 'If many people search a topic you have not covered, write it')}
${card('Broken links people hit (404)', table([['Address'], ['Hits', true]], nf.map((s) => [esc(s.k), num(s.n)])), 'Fix these with a redirect in your CMS or correct the link')}</div>`;
}

const gscEnd = () => S.addDays(S.today(), -1);
async function searchTab(x: Cx) {
  if (!G.gscReady(x.env)) return `<div class="note"><b>Connect Google Search Console to see keywords.</b> Keywords, rankings (average position), impressions and clicks come from Google itself. Open the <a href="/admin/analytics?tab=setup">Setup tab</a> and follow the 5 steps (about 10 minutes, free).</div>`;
  const { r, env, cmp } = x, end = r.to > gscEnd() ? gscEnd() : r.to, pend = r.pt > gscEnd() ? gscEnd() : r.pt, o = (dims: string[], limit = 50) => ({ start: r.from, end, dims, limit });
  const [byDate, q, qp, pg, co, de] = await Promise.all([G.gsc(env, o(['date'], 800)), G.gsc(env, o(['query'], 100)), cmp ? G.gsc(env, { start: r.pf, end: pend, dims: ['query'], limit: 500 }) : Promise.resolve([]), G.gsc(env, o(['page'], 50)), G.gsc(env, o(['country'], 10)), G.gsc(env, o(['device'], 5))]);
  const T = (a: G.GscRow[]) => ({ clicks: S.sum(a.map((z) => z.clicks)), imp: S.sum(a.map((z) => z.imp)) }), t = T(byDate);
  const avgPos = t.imp ? byDate.reduce((s, z) => s + z.pos * z.imp, 0) / t.imp : 0, prevMap = new Map(qp.map((z) => [z.k[0], z]));
  const ds = S.days(r.from, end), dm = new Map(byDate.map((z) => [z.k[0], z]));
  const kpi = (l: string, v: string) => `<div class="card"><div class="lbl">${l}</div><div class="stat">${v}</div></div>`;
  const qrow = (z: G.GscRow) => { const p = prevMap.get(z.k[0]); return [esc(z.k[0]), num(z.clicks), num(z.imp), (z.ctr * 100).toFixed(1) + '%', z.pos.toFixed(1), ...(cmp ? [p ? (p.pos - z.pos > 0.4 ? `<span class="dl u">&#9650; ${(p.pos - z.pos).toFixed(1)}</span>` : z.pos - p.pos > 0.4 ? `<span class="dl d">&#9660; ${(z.pos - p.pos).toFixed(1)}</span>` : '<span class="dl z">-</span>') : '<span class="dl u">new</span>'] : [])]; };
  const head: [string, boolean?][] = [['Keyword'], ['Clicks', true], ['Impressions', true], ['CTR', true], ['Avg position', true], ...(cmp ? [['Rank change', true] as [string, boolean]] : [])];
  const opp = q.filter((z) => z.imp >= 20 && z.pos > 3.5 && z.pos <= 20).sort((a, b) => b.imp - a.imp).slice(0, 15), lowctr = q.filter((z) => z.pos <= 6 && z.imp >= 20 && z.ctr < 0.03).sort((a, b) => b.imp - a.imp).slice(0, 10);
  const pageRows = pg.map((z) => { const p = z.k[0].replace(/^https?:\/\/[^/]+/, '') || '/'; return [`<div class="ttl"><a href="/admin/analytics/page?p=${enc(p)}${x.qs}">${esc(p)}</a></div>`, num(z.clicks), num(z.imp), (z.ctr * 100).toFixed(1) + '%', z.pos.toFixed(1)]; });
  return `<div class="note">Data from Google Search Console. It runs about 1 to 2 days behind, so the last day or two may be incomplete.${end < r.to ? ` Showing up to ${S.fd(end)}.` : ''}</div>
<div class="kpi">${kpi('Clicks from Google', num(t.clicks))}${kpi('Impressions', num(t.imp))}${kpi('Average CTR', t.imp ? ((t.clicks / t.imp) * 100).toFixed(1) + '%' : '-')}${kpi('Average position', avgPos ? avgPos.toFixed(1) : '-')}</div>
<div class="two">${card('Clicks per day', lineChart(ds.map(S.fd), [{ name: 'Clicks', color: C.blue, vals: ds.map((d) => dm.get(d)?.clicks ?? 0), fill: true }], { h: 220, tickLabel: (i) => S.fdShort(ds[i]) }))}${card('Impressions per day', lineChart(ds.map(S.fd), [{ name: 'Impressions', color: C.violet, vals: ds.map((d) => dm.get(d)?.imp ?? 0), fill: true }], { h: 220, tickLabel: (i) => S.fdShort(ds[i]) }))}</div>
<div style="height:18px"></div>${card('Top keywords', table(head, q.map(qrow)), 'Average position: lower is better (1 = top of page 1)')}
<div style="height:18px"></div><div class="two">${card('Almost ranking: push these up', table([['Keyword'], ['Impressions', true], ['Position', true]], opp.map((z) => [esc(z.k[0]), num(z.imp), z.pos.toFixed(1)])), 'Position 4 to 20 with many impressions: improve the page for these words')}
${card('Ranking well but few clicks', table([['Keyword'], ['Impressions', true], ['CTR', true]], lowctr.map((z) => [esc(z.k[0]), num(z.imp), (z.ctr * 100).toFixed(1) + '%'])), 'Rewrite the SEO title and description of these pages')}</div>
<div style="height:18px"></div>${card('Pages ranked on Google', table([['Page'], ['Clicks', true], ['Impressions', true], ['CTR', true], ['Position', true]], pageRows))}
<div style="height:18px"></div><div class="two">${card('Countries (Google clicks)', barList(co.map((z) => [`${S.flag(z.k[0].slice(0, 2).toUpperCase())} ${esc(z.k[0].toUpperCase())}`, z.clicks]), C.aqua))}${card('Devices (Google clicks)', barList(de.map((z) => [esc(z.k[0].toLowerCase()), z.clicks]), C.orange))}</div>`;
}

const gd = (d: string) => `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}`;
async function googleTab(x: Cx) {
  if (!G.gaReady(x.env)) return `<div class="note"><b>Connect Google Analytics 4</b> to add sessions, engagement time, new vs returning users, events and live visitors from Google. Open the <a href="/admin/analytics?tab=setup">Setup tab</a>.</div>`;
  const { r, env, cmp } = x, ranges: [string, string][] = cmp ? [[r.from, r.to], [r.pf, r.pt]] : [[r.from, r.to]];
  const rep = (dims: string[], mets: string[], limit = 12, order = mets[0]) => G.ga(env, { ranges: [[r.from, r.to]], dims, mets, limit, order });
  const [tot, daily, pg, chan, sm, ctry, city, dev, nvr, land, ev, live, livePg] = await Promise.all([
    G.ga(env, { ranges, mets: ['activeUsers', 'sessions', 'screenPageViews', 'engagementRate', 'averageSessionDuration', 'newUsers'] }),
    G.ga(env, { ranges: [[r.from, r.to]], dims: ['date'], mets: ['screenPageViews', 'activeUsers'], limit: 800 }), rep(['pagePath'], ['screenPageViews', 'activeUsers', 'userEngagementDuration'], 25),
    rep(['sessionDefaultChannelGroup'], ['sessions']), rep(['sessionSourceMedium'], ['sessions'], 15), rep(['country'], ['activeUsers']), rep(['city'], ['activeUsers'], 15), rep(['deviceCategory'], ['activeUsers']),
    rep(['newVsReturning'], ['activeUsers']), rep(['landingPage'], ['sessions', 'engagementRate'], 15), rep(['eventName'], ['eventCount'], 12), G.gaRealtime(env, '', 1), G.gaRealtime(env, 'unifiedScreenName', 8),
  ]);
  const a = tot[0][0]?.m ?? [0, 0, 0, 0, 0, 0], b = cmp ? tot[1][0]?.m ?? [0, 0, 0, 0, 0, 0] : null;
  const kpi = (l: string, v: string, d = '') => `<div class="card"><div class="lbl">${l}</div><div class="stat">${v}</div>${d}</div>`;
  const dd = daily[0].map((z) => ({ d: gd(z.d[0]), v: z.m[0], u: z.m[1] })).sort((p, q) => (p.d < q.d ? -1 : 1)), ds = S.days(r.from, r.to), dmap = new Map(dd.map((z) => [z.d, z]));
  const one = (rows: G.GaRow[][], f: (z: G.GaRow) => [string, number]) => barList(rows[0].map(f) as [string, number][]);
  return `<div class="note">Data from Google Analytics 4, which can also include visitors who have JavaScript but whose browser blocks the first-party counter. Numbers differ slightly from the Overview tab because the two tools count differently.</div>
<div class="kpi">${kpi('Live users now', num(live[0]?.m[0] ?? 0))}${kpi('Users', num(a[0]), b ? delta(a[0], b[0]) : '')}${kpi('Sessions', num(a[1]), b ? delta(a[1], b[1]) : '')}${kpi('Page views', num(a[2]), b ? delta(a[2], b[2]) : '')}${kpi('Engagement rate', (a[3] * 100).toFixed(1) + '%', b ? delta(a[3], b[3]) : '')}${kpi('Avg session time', dur(a[4]), b ? delta(a[4], b[4]) : '')}${kpi('New users', num(a[5]), b ? delta(a[5], b[5]) : '')}</div>
${card('Views and users (Google Analytics)', legend([['Page views', C.blue], ['Users', C.orange]]) + lineChart(ds.map(S.fd), [{ name: 'Page views', color: C.blue, vals: ds.map((d) => dmap.get(d)?.v ?? 0), fill: true }, { name: 'Users', color: C.orange, vals: ds.map((d) => dmap.get(d)?.u ?? 0) }], { tickLabel: (i) => S.fdShort(ds[i]) }))}
<div style="height:18px"></div><div class="two">${card('Reading right now', table([['Page'], ['Users', true]], livePg.map((z) => [esc(z.d[0]), num(z.m[0])])))}${card('Top pages (Google Analytics)', table([['Page'], ['Views', true], ['Users', true], ['Avg time', true]], pg[0].map((z) => [`<div class="ttl"><a href="/admin/analytics/page?p=${enc(z.d[0])}${x.qs}">${esc(z.d[0])}</a></div>`, num(z.m[0]), num(z.m[1]), z.m[1] ? dur(z.m[2] / z.m[1]) : '-'])))}</div>
<div style="height:18px"></div><div class="two">${card('Channels', one(chan, (z) => [esc(z.d[0]), z.m[0]]))}${card('Source / medium', one(sm, (z) => [esc(z.d[0]), z.m[0]]))}</div>
<div style="height:18px"></div><div class="two">${card('Countries', one(ctry, (z) => [esc(z.d[0]), z.m[0]]))}${card('Cities', one(city, (z) => [esc(z.d[0]), z.m[0]]))}</div>
<div style="height:18px"></div><div class="two">${card('New vs returning users', one(nvr, (z) => [esc(z.d[0]), z.m[0]]))}${card('Devices', one(dev, (z) => [esc(z.d[0]), z.m[0]]))}</div>
<div style="height:18px"></div><div class="two">${card('Landing pages', table([['Page'], ['Sessions', true], ['Engaged', true]], land[0].map((z) => [esc(z.d[0]), num(z.m[0]), (z.m[1] * 100).toFixed(0) + '%'])))}${card('Events', table([['Event'], ['Count', true]], ev[0].map((z) => [esc(z.d[0]), num(z.m[0])])))}</div>`;
}

function setupTab(x: Cx, results?: { name: string; ok: boolean; msg: string }[]) {
  const e = x.env, st = (ok: boolean) => (ok ? '<span class="pill p">set</span>' : '<span class="pill g">not set</span>');
  return `<div class="card"><h3>Built-in analytics</h3><p>Already working, nothing to connect. Every page view on the public site (posts, pages, notes, homepage, categories) is counted on the server: views, visitors, country, state, city, device, browser, source, entry pages, site searches and broken links. No IP address or cookie is stored. Your own visits are not counted while you are logged in to the admin. Bots are filtered out.</p>
<p class="muted">Counting began the day you ran the 0003 migration. For older history, use the Google tabs once connected (they include data from before).</p></div>
<div class="card"><h3>Connect Google (adds keywords, rankings, history, live users)</h3>
<p>Status: GOOGLE_SERVICE_ACCOUNT ${st(!!e.GOOGLE_SERVICE_ACCOUNT)} &nbsp; GA4_PROPERTY_ID ${st(!!e.GA4_PROPERTY_ID)} &nbsp; GSC_SITE ${st(!!e.GSC_SITE)} &nbsp; GA4_HOSTNAME ${e.GA4_HOSTNAME ? '<span class="pill p">set</span>' : '<span class="pill">optional</span>'}</p>
<ol style="line-height:1.9;padding-left:20px">
<li>Go to <b>console.cloud.google.com</b>, create a project (or use one), then <b>APIs &amp; Services &rarr; Library</b> and enable <b>Google Analytics Data API</b> and <b>Google Search Console API</b>.</li>
<li><b>IAM &amp; Admin &rarr; Service Accounts &rarr; Create</b>. Open it, <b>Keys &rarr; Add key &rarr; JSON</b>. A file downloads. Copy the service account's email address (looks like <code class="k">name@project.iam.gserviceaccount.com</code>).</li>
<li><b>Google Analytics</b> &rarr; Admin &rarr; Property access management &rarr; add that email as <b>Viewer</b>. Then Admin &rarr; Property details and copy the numeric <b>Property ID</b> (not the G-V15TG71Q95 measurement ID).</li>
<li><b>Search Console</b> &rarr; Settings &rarr; Users and permissions &rarr; Add user &rarr; the same email, permission <b>Restricted</b> (read only). Note your property type: a Domain property is written <code class="k">sc-domain:jkedusphere.online</code>, a URL-prefix property <code class="k">https://www.jkedusphere.online/</code> (copy it exactly).</li>
<li>Cloudflare &rarr; your Worker &rarr; Settings &rarr; Variables and Secrets &rarr; add <b>Secrets</b>: <code class="k">GOOGLE_SERVICE_ACCOUNT</code> = the full contents of the JSON file, <code class="k">GA4_PROPERTY_ID</code> = the number, <code class="k">GSC_SITE</code> = the value from step 4. Deploy, then press the button below.</li></ol>
<p class="muted">Your GA tag G-V15TG71Q95 may also be installed on jkedusphere.com or other sites. If so, add a secret <code class="k">GA4_HOSTNAME</code> = <code class="k">www.jkedusphere.online</code> so reports show only this website.</p>
<form method="post" action="/admin/analytics/test"><button>Test the Google connection</button></form>
${results ? `<div style="margin-top:14px">${results.map((z) => `<div class="${z.ok ? 'ok' : 'err'}"><b>${esc(z.name)}:</b> ${esc(z.msg)}</div>`).join('')}</div>` : ''}</div>`;
}

// ---------- Routes ----------
export function registerAnalytics(app: Hono<Env>) {
  app.get('/admin', async (c) => {
    const db = c.env.DB, nowS = Math.floor(Date.now() / 1000), one = (sql: string) => db.prepare(sql).first<{ n: number }>().then((r) => r?.n ?? 0);
    const [published, drafts, pages, legacy] = await Promise.all([one(`SELECT COUNT(*) AS n FROM posts WHERE status='published' AND published_at <= ${nowS}`), one("SELECT COUNT(*) AS n FROM posts WHERE status='draft'"), one('SELECT COUNT(*) AS n FROM pages'), one('SELECT COALESCE(SUM(views),0) AS n FROM posts')]);
    const T = S.today(), from = S.addDays(T, -13);
    const body = await safe(async () => {
      const [d, top] = await Promise.all([S.daily(db, from, T), S.pagesTop(db, S.addDays(T, -6), T, 6)]), lab = await S.labels(db, top.map((p) => p.path));
      const ti = d.days.length - 1, live = G.gaReady(c.env) ? await G.gaRealtime(c.env, '', 1).catch(() => null) : null;
      const k = (l: string, v: string, dl = '') => `<div class="card"><div class="lbl">${l}</div><div class="stat">${v}</div>${dl}</div>`;
      return `<div class="kpi">${k('Views today', num(d.views[ti]), delta(d.views[ti], d.views[ti - 1]))}${k('Views yesterday', num(d.views[ti - 1]))}${k('Views, last 7 days', num(S.sum(d.views.slice(-7))), delta(S.sum(d.views.slice(-7)), S.sum(d.views.slice(0, 7))))}${live ? k('Live users now', num(live[0]?.m[0] ?? 0)) : ''}</div>
${card('Last 14 days', lineChart(d.days.map(S.fd), [{ name: 'Views', color: C.blue, vals: d.views, fill: true }, { name: 'Visits', color: C.orange, vals: d.visits }], { h: 220, tickLabel: (i) => S.fdShort(d.days[i]) }), `<a href="/admin/analytics">Full analytics &rarr;</a>`)}
<div style="height:18px"></div>${card('Top pages this week', table([['Page'], ['Views', true]], top.map((p) => [pageCell(p.path, lab.get(p.path), ''), num(p.v)])))}`;
    });
    return c.html(page('Dashboard', `<div class="card"><h2 style="margin-top:0">Welcome, ${esc(c.get('user').email)}</h2><p class="muted" style="margin:0">Posts, pages, notes, layout and full analytics in one place.</p></div>
<div class="kpi"><div class="card"><div class="lbl">Published posts</div><div class="stat">${published}</div></div><div class="card"><div class="lbl">Drafts</div><div class="stat">${drafts}</div></div><div class="card"><div class="lbl">Pages</div><div class="stat">${pages}</div></div><div class="card"><div class="lbl">Post views (old counter)</div><div class="stat">${num(legacy)}</div></div></div>${body}`));
  });

  const render = async (c: any, results?: { name: string; ok: boolean; msg: string }[]) => {
    const x = getCx(c), tab = TABS.some(([k]) => k === (c.req.query('tab') ?? 'overview')) ? (c.req.query('tab') ?? 'overview') : 'overview';
    if (results) return c.html(page('Analytics', head(x, 'setup') + setupTab(x, results)));
    const ex = tab === 'pages' && c.req.query('k') ? `&k=${enc(c.req.query('k'))}` : tab === 'sources' && c.req.query('src') ? `&src=${enc(c.req.query('src'))}` : '';
    const body = tab === 'setup' ? setupTab(x) : await safe(async () => {
      const fn = { overview, pages: pagesTab, sources: sourcesTab, audience: audienceTab, insights: insightsTab, search: searchTab, google: googleTab }[tab as 'overview']!;
      return await fn(x);
    }).catch((e) => `<div class="err">${esc(e.message)}</div>`);
    return c.html(page('Analytics', head(x, tab, ex) + body));
  };
  const head = (x: Cx, tab: string, ex = '') => `<div class="bar"><h2 style="margin:0;flex:1">Analytics</h2><a class="btn light" href="/admin/notes" style="margin:0">Notes manager</a></div>
<div class="tabs">${TABS.map(([k, l]) => `<a href="/admin/analytics?tab=${k}${x.qs}" class="${k === tab ? 'on' : ''}">${l}</a>`).join('')}</div>${tab === 'setup' ? '' : rangeBar(tab, x.r, x.cmp, '/admin/analytics', ex)}`;
  app.get('/admin/analytics', (c) => render(c));
  app.post('/admin/analytics/test', async (c) => render(c, await G.testGoogle(c.env)));

  // ----- one page / one note: trend, sources, keywords -----
  app.get('/admin/analytics/page', async (c) => {
    const x = getCx(c), p = (c.req.query('p') ?? '/').slice(0, 200), { db, r, cmp } = x;
    const body = await safe(async () => {
      const [cur, prev, srcs, lab] = await Promise.all([S.pathDaily(db, p, r.from, r.to), cmp ? S.pathDaily(db, p, r.pf, r.pt) : Promise.resolve([]), db.prepare('SELECT src, SUM(n) AS n FROM a_psrc WHERE path = ? AND day BETWEEN ? AND ? GROUP BY src ORDER BY n DESC LIMIT 12').bind(p, r.from, r.to).all(), S.labels(db, [p])]);
      const ds = S.days(r.from, r.to), v = S.sum(cur), pv = S.sum(prev), allTime = (await db.prepare('SELECT COALESCE(SUM(views),0) AS n FROM a_page WHERE path = ?').bind(p).first<{ n: number }>())?.n ?? 0;
      const series = [{ name: 'Views', color: C.blue, vals: cur, fill: true }, ...(cmp ? [{ name: 'Previous period', color: C.gray, vals: ds.map((_, i) => prev[i] ?? 0), dash: true }] : [])];
      let extra = '';
      if (G.gscReady(x.env)) {
        const end = r.to > gscEnd() ? gscEnd() : r.to;
        try { const q = await G.gsc(x.env, { start: r.from, end, dims: ['query'], limit: 25, page: x.origin + p }), alt = q.length ? q : p.length > 1 ? await G.gsc(x.env, { start: r.from, end, dims: ['query'], limit: 25, page: x.origin + p + '/' }) : [];
          extra += card('Keywords this page ranks for', table([['Keyword'], ['Clicks', true], ['Impressions', true], ['CTR', true], ['Position', true]], alt.map((z) => [esc(z.k[0]), num(z.clicks), num(z.imp), (z.ctr * 100).toFixed(1) + '%', z.pos.toFixed(1)])), 'Google Search Console'); } catch (e: any) { extra += `<div class="err">Search Console: ${esc(e.message)}</div>`; }
      }
      if (G.gaReady(x.env)) {
        try { const g = await G.ga(x.env, { ranges: [[r.from, r.to]], mets: ['screenPageViews', 'activeUsers', 'userEngagementDuration', 'bounceRate'], filter: { field: 'pagePath', value: p } }), m = g[0][0]?.m ?? [0, 0, 0, 0];
          extra += card('Google Analytics for this page', `<div class="kpi" style="margin:0"><div class="card"><div class="lbl">Views</div><div class="stat">${num(m[0])}</div></div><div class="card"><div class="lbl">Users</div><div class="stat">${num(m[1])}</div></div><div class="card"><div class="lbl">Avg time on page</div><div class="stat">${m[1] ? dur(m[2] / m[1]) : '-'}</div></div><div class="card"><div class="lbl">Bounce rate</div><div class="stat">${(m[3] * 100).toFixed(0)}%</div></div></div>`); } catch (e: any) { extra += `<div class="err">Google Analytics: ${esc(e.message)}</div>`; }
      }
      const info = lab.get(p);
      return `<p><a href="/admin/analytics?tab=pages${x.qs}">&larr; All pages</a></p><div class="bar"><h2 style="margin:0;flex:1">${esc(info?.title ?? p)}</h2><a class="btn light" href="${esc(p)}" target="_blank" rel="noopener" style="margin:0">Open page &#8599;</a></div><p class="muted">${kindPill(info?.kind ?? 'Other')} ${esc(p)}</p>
<div class="kpi"><div class="card"><div class="lbl">Views in period</div><div class="stat">${num(v)}</div>${cmp ? delta(v, pv) : ''}</div><div class="card"><div class="lbl">Best day</div><div class="stat">${num(Math.max(0, ...cur))}</div><div class="muted">${cur.length ? S.fd(ds[cur.indexOf(Math.max(...cur))]) : ''}</div></div><div class="card"><div class="lbl">Daily average</div><div class="stat">${(v / Math.max(1, ds.length)).toFixed(1)}</div></div><div class="card"><div class="lbl">All time (tracked)</div><div class="stat">${num(allTime)}</div></div></div>
${card('Views per day', legend([['Views', C.blue], ...(cmp ? [['Previous period', C.gray, true] as [string, string, boolean]] : [])]) + lineChart(ds.map(S.fd), series, { h: 240, tickLabel: (i) => S.fdShort(ds[i]) }))}
<div style="height:18px"></div>${card('Where its visitors arrive from', barList((srcs.results as any[]).map((s) => [esc(s.src), s.n]), C.violet), 'Only external sources are counted (search, social, other sites). Typed or app visits are not listed.')}<div style="height:18px"></div>${extra}`;
    });
    return c.html(page('Page analytics', body));
  });

  // ----- CSV export -----
  app.get('/admin/analytics/export.csv', async (c) => {
    const x = getCx(c), what = c.req.query('what') ?? 'pages', q = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`;
    let lines: string[] = [];
    try {
      if (what === 'daily') { const d = await S.daily(x.db, x.r.from, x.r.to); lines = ['Date,Views,Visits', ...d.days.map((day, i) => `${day},${d.views[i]},${d.visits[i]}`)]; }
      else if (what === 'pages') { const rows = await S.pagesTop(x.db, x.r.from, x.r.to, 1000), lab = await S.labels(x.db, rows.map((p) => p.path)), pm = await S.pathViews(x.db, rows.map((p) => p.path), x.r.pf, x.r.pt);
        lines = ['Path,Title,Type,Views,Views in previous period', ...rows.map((p) => [q(p.path), q(lab.get(p.path)?.title), lab.get(p.path)?.kind, p.v, pm.get(p.path) ?? 0].join(','))]; }
      else { const rows = await S.dimTop(x.db, what, x.r.from, x.r.to, 1000); lines = ['Name,Visits', ...rows.map((z) => `${q(z.k)},${z.n}`)]; }
    } catch (e: any) { return c.text('Export failed: ' + e.message, 500); }
    return c.body('﻿' + lines.join('\n'), 200, { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': `attachment; filename="jkedusphere-${what}-${x.r.from}-to-${x.r.to}.csv"` });
  });

  // ----- Notes manager: every notes subject and topic, with its numbers -----
  const notesNums = async (db: D1Database, base: string) => {
    const T = S.today(), d7 = S.addDays(T, -6), d30 = S.addDays(T, -29);
    const r = (await db.prepare('SELECT path, SUM(views) AS al, SUM(CASE WHEN day >= ? THEN views ELSE 0 END) AS m, SUM(CASE WHEN day >= ? THEN views ELSE 0 END) AS w, SUM(CASE WHEN day = ? THEN views ELSE 0 END) AS t FROM a_page WHERE path = ? OR (path >= ? AND path < ?) GROUP BY path')
      .bind(d30, d7, T, base, base + '/', base + '0').all()).results as { path: string; al: number; m: number; w: number; t: number }[];
    return new Map(r.map((z) => [z.path, z]));
  };
  app.get('/admin/notes', async (c) => {
    const db = c.env.DB, cat = notesCatalog();
    const body = await safe(async () => {
      const rows = await Promise.all(cat.map(async (s) => { const m = await notesNums(db, '/' + s.slug), tot = { al: 0, m: 0, w: 0, t: 0 }; m.forEach((z) => { tot.al += z.al; tot.m += z.m; tot.w += z.w; tot.t += z.t; }); return { s, tot }; }));
      return `<div class="note">These notes live in the code (<code class="k">src/notes-*.ts</code>), not the database, so their text is edited there. This screen lists every notes page and shows how it performs. Click a subject to see each topic.</div>
${card('Notes subjects', table([['Subject'], ['Topics', true], ['Today', true], ['7 days', true], ['30 days', true], ['Total tracked', true], ['Updated']], rows.map(({ s, tot }) =>
        [`<div class="ttl"><a href="/admin/notes/${esc(s.slug)}"><b>${esc(s.short)}</b></a> <a href="/${esc(s.slug)}" target="_blank" rel="noopener" style="text-decoration:none">&#8599;</a><small>/${esc(s.slug)}</small></div>`, String(s.topics.length), num(tot.t), num(tot.w), num(tot.m), num(tot.al), esc(s.updated)])))}`;
    });
    return c.html(page('Notes', `<div class="bar"><h2 style="margin:0;flex:1">Notes</h2><a class="btn light" href="/admin/analytics?tab=pages&k=notes" style="margin:0">Notes in analytics</a></div>${body}`));
  });
  app.get('/admin/notes/:slug', async (c) => {
    const s = notesCatalog().find((z) => z.slug === c.req.param('slug'));
    if (!s) return c.text('Not found', 404);
    const body = await safe(async () => {
      const m = await notesNums(c.env.DB, '/' + s.slug), T = S.today(), d = await Promise.all(s.topics.map((t) => 0)).then(() => S.pathSeries(c.env.DB, s.topics.map((t) => t.path), S.addDays(T, -29), T, 15));
      const rows = [...s.topics].sort((a, b) => (m.get(b.path)?.m ?? 0) - (m.get(a.path)?.m ?? 0));
      return card(esc(s.h1), table([['Topic'], ['Unit'], ['Read', true], ['Today', true], ['7 days', true], ['30 days', true], ['Total', true], ['30-day trend']], rows.map((t) => { const z = m.get(t.path);
        return [`<div class="ttl"><a href="/admin/analytics/page?p=${enc(t.path)}">${esc(t.title)}</a> <a href="${esc(t.path)}" target="_blank" rel="noopener" style="text-decoration:none">&#8599;</a><small>${esc(t.path)}</small></div>`, esc(t.unit), `${t.mins} min`, num(z?.t ?? 0), num(z?.w ?? 0), num(z?.m ?? 0), num(z?.al ?? 0), spark(d.get(t.path) ?? [])]; })), `${s.topics.length} topics, last updated ${esc(s.updated)}`);
    });
    return c.html(page(s.short + ' notes', `<p><a href="/admin/notes">&larr; All notes</a></p><div class="bar"><h2 style="margin:0;flex:1">${esc(s.short)}</h2><a class="btn light" href="/${esc(s.slug)}" target="_blank" rel="noopener" style="margin:0">Open on site &#8599;</a></div>${body}`));
  });
}
