export type Env = {
  Bindings: { DB: D1Database; SETUP_KEY?: string; GOOGLE_SERVICE_ACCOUNT?: string; GA4_PROPERTY_ID?: string; GSC_SITE?: string; GA4_HOSTNAME?: string };
  Variables: { user: { id: number; email: string } };
};
export const SITE_URL = 'https://www.jkedusphere.online';
// Always the real domain, except on localhost so `wrangler dev` still works
export const siteOrigin = (reqUrl: string) => {
  const u = new URL(reqUrl);
  return /^(localhost|127\.0\.0\.1)$/.test(u.hostname) ? u.origin : SITE_URL;
};
