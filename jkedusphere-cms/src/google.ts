// Optional Google connection (GA4 Data API + Search Console API) using a service account.
// Secrets needed: GOOGLE_SERVICE_ACCOUNT (the downloaded JSON key), GA4_PROPERTY_ID, GSC_SITE. Optional: GA4_HOSTNAME.
import type { Env } from './types';

type B = Env['Bindings'];
const SCOPES = 'https://www.googleapis.com/auth/analytics.readonly https://www.googleapis.com/auth/webmasters.readonly';
const b64u = (b: ArrayBuffer | string) => {
  const bytes = typeof b === 'string' ? new TextEncoder().encode(b) : new Uint8Array(b);
  let s = ''; for (const x of bytes) s += String.fromCharCode(x);
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

export const gaReady = (e: B) => !!(e.GOOGLE_SERVICE_ACCOUNT && e.GA4_PROPERTY_ID);
export const gscReady = (e: B) => !!(e.GOOGLE_SERVICE_ACCOUNT && e.GSC_SITE);

let TOKEN: { v: string; exp: number } | null = null;
async function token(e: B): Promise<string> {
  if (TOKEN && TOKEN.exp > Date.now() + 60000) return TOKEN.v;
  let sa: { client_email: string; private_key: string };
  try { sa = JSON.parse(e.GOOGLE_SERVICE_ACCOUNT!); } catch { throw new Error('GOOGLE_SERVICE_ACCOUNT is not valid JSON. Paste the whole downloaded key file.'); }
  const iat = Math.floor(Date.now() / 1000);
  const head = b64u(JSON.stringify({ alg: 'RS256', typ: 'JWT' })), claim = b64u(JSON.stringify({ iss: sa.client_email, scope: SCOPES, aud: 'https://oauth2.googleapis.com/token', iat, exp: iat + 3600 }));
  const pem = sa.private_key.replace(/-----[A-Z ]+-----/g, '').replace(/\s+/g, '');
  const key = await crypto.subtle.importKey('pkcs8', Uint8Array.from(atob(pem), (c) => c.charCodeAt(0)), { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', key, new TextEncoder().encode(`${head}.${claim}`));
  const r = await fetch('https://oauth2.googleapis.com/token', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: `${head}.${claim}.${b64u(sig)}` }) });
  const j: any = await r.json();
  if (!j.access_token) throw new Error('Google sign-in failed: ' + (j.error_description || j.error || r.status));
  TOKEN = { v: j.access_token, exp: Date.now() + (j.expires_in ?? 3600) * 1000 };
  return TOKEN.v;
}

const CACHE = new Map<string, { at: number; v: any }>();
async function post(e: B, url: string, body: unknown, ttl = 300000): Promise<any> {
  const ck = url + JSON.stringify(body), hit = CACHE.get(ck);
  if (hit && Date.now() - hit.at < ttl) return hit.v;
  const r = await fetch(url, { method: 'POST', headers: { Authorization: 'Bearer ' + (await token(e)), 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const j: any = await r.json();
  if (!r.ok) throw new Error(j?.error?.message || `Google API error ${r.status}`);
  if (CACHE.size > 200) CACHE.clear();
  CACHE.set(ck, { at: Date.now(), v: j });
  return j;
}

// ---------- GA4 ----------
export type GaRow = { d: string[]; m: number[] };
export async function ga(e: B, o: { ranges: [string, string][]; dims?: string[]; mets: string[]; limit?: number; order?: string; filter?: { field: string; value: string } }): Promise<GaRow[][]> {
  const host = e.GA4_HOSTNAME ? { filter: { fieldName: 'hostName', stringFilter: { matchType: 'EXACT', value: e.GA4_HOSTNAME } } } : null;
  const extra = o.filter ? { filter: { fieldName: o.filter.field, stringFilter: { matchType: 'EXACT', value: o.filter.value } } } : null;
  const dimensionFilter = host && extra ? { andGroup: { expressions: [host, extra] } } : host || extra || undefined;
  const j = await post(e, `https://analyticsdata.googleapis.com/v1beta/properties/${encodeURIComponent(e.GA4_PROPERTY_ID!)}:runReport`, {
    dateRanges: o.ranges.map(([startDate, endDate]) => ({ startDate, endDate })), dimensions: (o.dims ?? []).map((name) => ({ name })), metrics: o.mets.map((name) => ({ name })),
    limit: o.limit ?? 25, dimensionFilter, orderBys: o.order ? [{ metric: { metricName: o.order }, desc: true }] : undefined,
  });
  const out: GaRow[][] = o.ranges.map(() => []);
  const nd = (o.dims ?? []).length;
  for (const r of j.rows ?? []) {
    const dv = (r.dimensionValues ?? []).map((x: any) => x.value as string);
    const idx = o.ranges.length > 1 ? Math.max(0, parseInt(String(dv[nd] ?? 'date_range_0').replace('date_range_', ''), 10) || 0) : 0;
    out[idx].push({ d: dv.slice(0, nd), m: (r.metricValues ?? []).map((x: any) => Number(x.value)) });
  }
  return out;
}

export async function gaRealtime(e: B, dim: string, limit = 8): Promise<GaRow[]> {
  const j = await post(e, `https://analyticsdata.googleapis.com/v1beta/properties/${encodeURIComponent(e.GA4_PROPERTY_ID!)}:runRealtimeReport`,
    { dimensions: dim ? [{ name: dim }] : [], metrics: [{ name: 'activeUsers' }], limit }, 30000);
  return (j.rows ?? []).map((r: any) => ({ d: (r.dimensionValues ?? []).map((x: any) => x.value), m: (r.metricValues ?? []).map((x: any) => Number(x.value)) }));
}

// ---------- Search Console ----------
export type GscRow = { k: string[]; clicks: number; imp: number; ctr: number; pos: number };
export async function gsc(e: B, o: { start: string; end: string; dims: string[]; limit?: number; page?: string; query?: string }): Promise<GscRow[]> {
  const filters: any[] = [];
  if (o.page) filters.push({ dimension: 'page', operator: 'equals', expression: o.page });
  if (o.query) filters.push({ dimension: 'query', operator: 'contains', expression: o.query });
  const j = await post(e, `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(e.GSC_SITE!)}/searchAnalytics/query`,
    { startDate: o.start, endDate: o.end, dimensions: o.dims, rowLimit: o.limit ?? 50, dataState: 'all', dimensionFilterGroups: filters.length ? [{ groupType: 'and', filters }] : undefined });
  return (j.rows ?? []).map((r: any) => ({ k: r.keys ?? [], clicks: r.clicks, imp: r.impressions, ctr: r.ctr, pos: r.position }));
}

// Quick check used by the Setup tab
export async function testGoogle(e: B) {
  const out: { name: string; ok: boolean; msg: string }[] = [];
  if (!e.GOOGLE_SERVICE_ACCOUNT) return [{ name: 'Service account', ok: false, msg: 'GOOGLE_SERVICE_ACCOUNT secret is not set.' }];
  try { await token(e); out.push({ name: 'Service account sign-in', ok: true, msg: 'OK' }); } catch (x: any) { return [{ name: 'Service account sign-in', ok: false, msg: x.message }]; }
  if (e.GA4_PROPERTY_ID) { try { await ga(e, { ranges: [['7daysAgo', 'today']], mets: ['screenPageViews'] }); out.push({ name: 'Google Analytics 4', ok: true, msg: 'OK' }); } catch (x: any) { out.push({ name: 'Google Analytics 4', ok: false, msg: x.message }); } }
  else out.push({ name: 'Google Analytics 4', ok: false, msg: 'GA4_PROPERTY_ID is not set.' });
  if (e.GSC_SITE) { try { const d = new Date(Date.now() - 4 * 86400000).toISOString().slice(0, 10); await gsc(e, { start: d, end: d, dims: ['date'], limit: 1 }); out.push({ name: 'Search Console', ok: true, msg: 'OK' }); } catch (x: any) { out.push({ name: 'Search Console', ok: false, msg: x.message }); } }
  else out.push({ name: 'Search Console', ok: false, msg: 'GSC_SITE is not set.' });
  return out;
}
