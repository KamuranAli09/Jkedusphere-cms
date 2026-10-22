import { Hono } from 'hono';
import { getCookie, setCookie, deleteCookie } from 'hono/cookie';
import { html } from 'hono/html';
import { hashPassword, verifyPassword, sha256Hex, newToken, safeEqual } from './auth';
import { adminPage } from './layout';
import type { Env } from './types';
import { siteOrigin } from './types';
import { registerContent } from './content';
import { registerHomepage } from './homepage';
import { registerPublic } from './posts';
import { registerImporter } from './importer';
import { registerNotes } from './notes';

const app = new Hono<Env>();

const COOKIE = 'jk_session';
const SESSION_SECONDS = 60 * 60 * 24 * 7;
const now = () => Math.floor(Date.now() / 1000);

// Security headers on every response
app.use('*', async (c, next) => {
  await next();
  c.header('X-Content-Type-Options', 'nosniff');
  c.header('X-Frame-Options', 'DENY');
  c.header('Referrer-Policy', 'strict-origin-when-cross-origin');
  if (new URL(c.req.url).pathname.startsWith('/admin')) {
    c.header('Content-Security-Policy', "default-src 'self'; img-src 'self' blob: data:; style-src 'self' 'unsafe-inline'; form-action 'self'; frame-ancestors 'none'");
    c.header('Cache-Control', 'no-store');
  }
});

// Block cross-site form posts
app.use('*', async (c, next) => {
  if (c.req.method === 'POST') {
    const origin = c.req.header('Origin');
    if (origin && new URL(origin).host !== new URL(c.req.url).host) return c.text('Forbidden', 403);
  }
  await next();
});

const secure = (url: string) => url.startsWith('https://');

async function startSession(c: any, userId: number) {
  const token = newToken();
  await c.env.DB.prepare('INSERT INTO sessions (token_hash, user_id, expires_at) VALUES (?,?,?)')
    .bind(await sha256Hex(token), userId, now() + SESSION_SECONDS).run();
  setCookie(c, COOKIE, token, { httpOnly: true, secure: secure(c.req.url), sameSite: 'Strict', path: '/', maxAge: SESSION_SECONDS });
}

// Auth guard for the admin area
app.use('/admin/*', async (c, next) => {
  const p = new URL(c.req.url).pathname;
  if (p === '/admin/login' || p === '/admin/setup') return next();
  const token = getCookie(c, COOKIE);
  if (token) {
    const row = await c.env.DB.prepare(
      'SELECT u.id, u.email FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.token_hash = ? AND s.expires_at > ?'
    ).bind(await sha256Hex(token), now()).first<{ id: number; email: string }>();
    if (row) { c.set('user', row); return next(); }
  }
  return c.redirect('/admin/login');
});

// ---------- First-time setup ----------
app.get('/admin/setup', async (c) => {
  const n = await c.env.DB.prepare('SELECT COUNT(*) AS n FROM users').first<{ n: number }>();
  if (n!.n > 0 || !c.env.SETUP_KEY) return c.redirect('/admin/login');
  return c.html(adminPage('Setup', html`<div class="card box"><h2>Create admin account</h2>
    <form method="post"><label>Setup key</label><input type="password" name="key" required>
    <label>Email</label><input type="email" name="email" required>
    <label>Password (12+ characters)</label><input type="password" name="password" minlength="12" required>
    <button>Create admin</button></form></div>`));
});

app.post('/admin/setup', async (c) => {
  const n = await c.env.DB.prepare('SELECT COUNT(*) AS n FROM users').first<{ n: number }>();
  if (n!.n > 0 || !c.env.SETUP_KEY) return c.redirect('/admin/login');
  const f = await c.req.formData();
  const key = String(f.get('key') ?? ''), email = String(f.get('email') ?? '').trim().toLowerCase(), pw = String(f.get('password') ?? '');
  if (!safeEqual(key, c.env.SETUP_KEY) || !email.includes('@') || pw.length < 12) return c.text('Invalid setup details', 400);
  await c.env.DB.prepare('INSERT INTO users (email, password_hash, role, created_at) VALUES (?,?,?,?)')
    .bind(email, await hashPassword(pw), 'admin', now()).run();
  return c.redirect('/admin/login');
});

// ---------- Login / logout ----------
const loginForm = (error = '') => adminPage('Log in', html`<div class="card box"><h2>Admin login</h2>
  ${error ? html`<div class="err">${error}</div>` : ''}
  <form method="post"><label>Email</label><input type="email" name="email" required autofocus>
  <label>Password</label><input type="password" name="password" required><button>Log in</button></form></div>`);

app.get('/admin/login', (c) => c.html(loginForm()));

app.post('/admin/login', async (c) => {
  const ip = c.req.header('CF-Connecting-IP') ?? 'local';
  const recent = await c.env.DB.prepare('SELECT COUNT(*) AS n FROM login_attempts WHERE ip = ? AND at > ?')
    .bind(ip, now() - 900).first<{ n: number }>();
  if (recent!.n >= 5) return c.html(loginForm('Too many attempts. Try again in 15 minutes.'), 429);

  const f = await c.req.formData();
  const email = String(f.get('email') ?? '').trim().toLowerCase(), pw = String(f.get('password') ?? '');
  const u = await c.env.DB.prepare('SELECT id, password_hash FROM users WHERE email = ?').bind(email).first<{ id: number; password_hash: string }>();
  // Always run a hash comparison so timing doesn't reveal whether the email exists
  const ok = u ? await verifyPassword(pw, u.password_hash) : (await hashPassword(pw), false);
  if (!ok || !u) {
    await c.env.DB.prepare('INSERT INTO login_attempts (ip, at) VALUES (?,?)').bind(ip, now()).run();
    return c.html(loginForm('Wrong email or password.'), 401);
  }
  await c.env.DB.prepare('DELETE FROM login_attempts WHERE ip = ?').bind(ip).run();
  await c.env.DB.prepare('DELETE FROM sessions WHERE expires_at < ?').bind(now()).run();
  await startSession(c, u.id);
  return c.redirect('/admin');
});

app.post('/admin/logout', async (c) => {
  const token = getCookie(c, COOKIE);
  if (token) await c.env.DB.prepare('DELETE FROM sessions WHERE token_hash = ?').bind(await sha256Hex(token)).run();
  deleteCookie(c, COOKIE, { path: '/' });
  return c.redirect('/admin/login');
});

// ---------- Dashboard (shell) ----------
app.get('/admin', async (c) => {
  const q = (sql: string) => c.env.DB.prepare(sql).first<{ n: number }>().then((r) => r?.n ?? 0);
  const [published, drafts, pages, views] = await Promise.all([
    q(`SELECT COUNT(*) AS n FROM posts WHERE status='published' AND published_at <= ${now()}`),
    q("SELECT COUNT(*) AS n FROM posts WHERE status='draft'"),
    q('SELECT COUNT(*) AS n FROM pages'),
    q('SELECT COALESCE(SUM(views),0) AS n FROM posts'),
  ]);
  return c.html(adminPage('Dashboard', html`
    <div class="card"><h2>Welcome, ${c.get('user').email}</h2><p class="muted">Stage 2 is live: post editor, pages manager and image uploads. Analytics and the public theme come next.</p></div>
    <div class="grid">
      <div class="card"><div class="stat">${published}</div><div class="muted">Published posts</div></div>
      <div class="card"><div class="stat">${drafts}</div><div class="muted">Drafts</div></div>
      <div class="card"><div class="stat">${pages}</div><div class="muted">Pages</div></div>
      <div class="card"><div class="stat">${views}</div><div class="muted">Total views</div></div>
    </div>`, true));
});

registerContent(app);
registerHomepage(app);
registerImporter(app);

app.get('/robots.txt', (c) => c.text('User-agent: *\nDisallow: /admin\nAllow: /\nSitemap: ' + siteOrigin(c.req.url) + '/sitemap.xml\n'));
registerNotes(app);
registerPublic(app);


export default app;
