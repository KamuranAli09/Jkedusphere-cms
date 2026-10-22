// First-party page-view tracking. Runs on the server, so ad-blockers cannot hide visits.
// No IP address, cookie or user id is stored: a visitor is a one-way hash of (IP + browser + day) that is deleted after 2 days.
import type { MiddlewareHandler } from 'hono';
import { getCookie } from 'hono/cookie';
import type { Env } from './types';
import { sha256Hex } from './auth';

const IST = 5.5 * 3600 * 1000;
export const istDay = (ms = Date.now()) => new Date(ms + IST).toISOString().slice(0, 10);

const BOT = /bot|crawl|spider|slurp|inspect|preview|headless|lighthouse|pagespeed|gtmetrix|pingdom|uptime|monitor|curl|wget|python|requests|axios|httpclient|go-http|java\/|libwww|scrapy|facebookexternalhit|embedly|semrush|ahrefs|mj12|petalsearch|yandex|baidu|bytespider|ccbot|gptbot|claude|perplexity|amazon|applebot/i;
const SKIP_PATH = /^\/(admin|img|assets|search\/suggest|favicon|robots\.txt|sitemap\.xml)/;
const PROBE = /\.(php\d?|asp|aspx|jsp|env|git|sql|ini|bak|zip|gz|map|js|css|ico|png|jpe?g|gif|webp|svg|woff2?|txt|xml)$|wp-|xmlrpc|\.well-known/i;

const SEARCH: [RegExp, string][] = [[/(^|\.)google\./, 'Google'], [/(^|\.)bing\.com$/, 'Bing'], [/duckduckgo\.com$/, 'DuckDuckGo'], [/(^|\.)yahoo\./, 'Yahoo'], [/ecosia\.org$/, 'Ecosia'], [/yandex\./, 'Yandex'], [/baidu\.com$/, 'Baidu'], [/brave\.com$/, 'Brave']];
const SOCIAL: [RegExp, string][] = [[/(^|\.)facebook\.com$|^fb\.me$|^l\.facebook\.com$/, 'Facebook'], [/instagram\.com$/, 'Instagram'], [/(^|\.)t\.me$|telegram\.(org|me)$/, 'Telegram'], [/whatsapp\.com$|^wa\.me$/, 'WhatsApp'],
  [/youtube\.com$|^youtu\.be$/, 'YouTube'], [/(^|\.)x\.com$|^t\.co$|twitter\.com$/, 'X (Twitter)'], [/linkedin\.com$|^lnkd\.in$/, 'LinkedIn'], [/reddit\.com$/, 'Reddit'], [/pinterest\./, 'Pinterest'], [/quora\.com$/, 'Quora'], [/sharechat\.com$/, 'ShareChat']];
const APPS: Record<string, [string, string]> = {
  'com.google.android.googlequicksearchbox': ['Google', 'Search'], 'com.google.android.gm': ['Gmail', 'Email'], 'org.telegram.messenger': ['Telegram', 'Social'], 'org.telegram.messenger.web': ['Telegram', 'Social'],
  'com.whatsapp': ['WhatsApp', 'Social'], 'com.facebook.katana': ['Facebook', 'Social'], 'com.instagram.android': ['Instagram', 'Social'], 'com.google.android.youtube': ['YouTube', 'Social'], 'com.twitter.android': ['X (Twitter)', 'Social'],
};

// Where did this visit come from? Returns null for internal navigation (not a new source).
export function classify(referer: string, reqHost: string, url: URL): { channel: string; source: string } | null {
  const utmS = (url.searchParams.get('utm_source') ?? '').toLowerCase().slice(0, 40), utmM = (url.searchParams.get('utm_medium') ?? '').toLowerCase();
  if (utmS) {
    const known = [...SOCIAL, ...SEARCH].find(([re]) => re.test(utmS + '.com'));
    const name = known ? known[1] : utmS;
    const ch = /mail|newsletter/.test(utmM) ? 'Email' : SOCIAL.some(([, n]) => n === name) ? 'Social' : SEARCH.some(([, n]) => n === name) ? 'Search' : 'Campaign';
    return { channel: ch, source: name };
  }
  if (!referer) return { channel: 'Direct', source: 'Direct / none' };
  if (referer.startsWith('android-app://')) { const a = APPS[referer.slice(14).split('/')[0]]; return a ? { channel: a[1], source: a[0] } : { channel: 'Referral', source: referer.slice(14).split('/')[0] }; }
  let h = '';
  try { h = new URL(referer).hostname.toLowerCase().replace(/^(www|m|l|lm|mobile)\./, ''); } catch { return { channel: 'Direct', source: 'Direct / none' }; }
  const own = reqHost.toLowerCase().replace(/^www\./, '');
  if (h === own || h === 'jkedusphere.online' || h.endsWith('.workers.dev')) return null;
  if (h === 'mail.google.com') return { channel: 'Email', source: 'Gmail' };
  const s = SEARCH.find(([re]) => re.test(h)); if (s) return { channel: 'Search', source: s[1] };
  const so = SOCIAL.find(([re]) => re.test(h)); if (so) return { channel: 'Social', source: so[1] };
  return { channel: 'Referral', source: h };
}

function ua(u: string) {
  const device = /ipad|tablet|kindle|silk|(android(?!.*mobile))/i.test(u) ? 'Tablet' : /mobi|iphone|ipod|android/i.test(u) ? 'Mobile' : 'Desktop';
  const browser = /edg\//i.test(u) ? 'Edge' : /opr\/|opera/i.test(u) ? 'Opera' : /samsungbrowser/i.test(u) ? 'Samsung Internet' : /fban|fbav/i.test(u) ? 'Facebook app' : /instagram/i.test(u) ? 'Instagram app'
    : /(chrome|crios)\//i.test(u) ? 'Chrome' : /firefox|fxios/i.test(u) ? 'Firefox' : /safari\//i.test(u) ? 'Safari' : 'Other';
  const os = /android/i.test(u) ? 'Android' : /iphone|ipad|ipod/i.test(u) ? 'iOS' : /windows/i.test(u) ? 'Windows' : /mac os/i.test(u) ? 'macOS' : /cros/i.test(u) ? 'ChromeOS' : /linux/i.test(u) ? 'Linux' : 'Other';
  return { device, browser, os };
}

const upDim = (db: D1Database, dim: string, day: string, k: string) =>
  db.prepare('INSERT INTO a_dim (dim, day, k, n) VALUES (?,?,?,1) ON CONFLICT(dim, day, k) DO UPDATE SET n = n + 1').bind(dim, day, k.slice(0, 120));

async function record(c: any, status: number) {
  const db: D1Database = c.env.DB, url = new URL(c.req.url), req = c.req.raw as Request & { cf?: any };
  const day = istDay();
  let path = url.pathname.replace(/\/+$/, '') || '/';
  try { path = decodeURIComponent(path); } catch { /* keep raw */ }
  path = path.slice(0, 200);

  if (status === 404) { // broken links people actually hit
    if (PROBE.test(path)) return;
    await upDim(db, 'notfound', day, path).run();
    return;
  }
  if (path === '/search') { // what people search for on the site
    const q = (url.searchParams.get('q') ?? '').trim().toLowerCase().replace(/\s+/g, ' ').slice(0, 60);
    if (q && !url.searchParams.get('page')) await upDim(db, 'search', day, q).run();
    return;
  }

  const ip = req.headers.get('CF-Connecting-IP') ?? '', agent = req.headers.get('User-Agent') ?? '';
  const vh = (await sha256Hex(`${ip}|${agent}|${day}|jke-v1`)).slice(0, 24);
  const first = await db.prepare('INSERT OR IGNORE INTO a_seen (day, vh) VALUES (?,?)').bind(day, vh).run();
  const isNew = (first.meta?.changes ?? 0) > 0;
  const src = classify(req.headers.get('Referer') ?? '', url.hostname, url);

  const st: D1PreparedStatement[] = [
    db.prepare('INSERT INTO a_page (day, path, views) VALUES (?,?,1) ON CONFLICT(day, path) DO UPDATE SET views = views + 1').bind(day, path),
    upDim(db, 'views', day, 'all'), // site-wide daily totals keep the charts fast
  ];
  if (src && src.channel !== 'Direct') st.push(db.prepare('INSERT INTO a_psrc (day, path, src, n) VALUES (?,?,?,1) ON CONFLICT(day, path, src) DO UPDATE SET n = n + 1').bind(day, path, src.source));
  if (isNew) {
    const cf = req.cf ?? {}, a = ua(agent), hour = new Date(Date.now() + IST).getUTCHours().toString().padStart(2, '0');
    const cc = String(cf.country ?? 'XX'), region = String(cf.region ?? ''), city = String(cf.city ?? '');
    st.push(upDim(db, 'visits', day, 'all'), upDim(db, 'device', day, a.device), upDim(db, 'browser', day, a.browser), upDim(db, 'os', day, a.os), upDim(db, 'hour', day, hour),
      upDim(db, 'country', day, cc), upDim(db, 'landing', day, path));
    if (region) st.push(upDim(db, 'region', day, `${region}|${cc}`));
    if (city) st.push(upDim(db, 'city', day, `${city}|${region}|${cc}`));
    const s = src ?? { channel: 'Direct', source: 'Direct / none' };
    st.push(upDim(db, 'channel', day, s.channel), upDim(db, 'source', day, s.source));
    if (Math.random() < 0.02) st.push(db.prepare('DELETE FROM a_seen WHERE day < ?').bind(istDay(Date.now() - 2 * 86400000)));
  }
  await db.batch(st);
}

export const trackMiddleware: MiddlewareHandler<Env> = async (c, next) => {
  await next();
  try {
    if (c.req.method !== 'GET') return;
    const path = new URL(c.req.url).pathname;
    if (SKIP_PATH.test(path)) return;
    const status = c.res.status;
    if (status !== 200 && status !== 404) return;
    if (status === 200 && !(c.res.headers.get('content-type') ?? '').includes('text/html')) return;
    if (status === 404 && !(c.res.headers.get('content-type') ?? '').includes('text/html')) return;
    const agent = c.req.header('User-Agent') ?? '';
    if (!agent || BOT.test(agent)) return;
    if (/prefetch|prerender/i.test(c.req.header('Sec-Purpose') ?? c.req.header('Purpose') ?? '')) return;
    if (getCookie(c, 'jk_session')) return; // the admin's own visits are not counted
    const job = record(c, status).catch(() => undefined); // never let analytics break a page (e.g. tables not created yet)
    try { c.executionCtx.waitUntil(job); } catch { await job; }
  } catch { /* ignore */ }
};
