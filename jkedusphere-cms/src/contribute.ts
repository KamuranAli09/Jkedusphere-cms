// Reader contributions: no login. A reader submits an article and gets a tracking ID (JK-XXXXXXXX).
// You review it in Admin > Submissions, turn it into a draft post, edit it in the normal editor and publish.
// When the linked post is published, the author's name, photo and details appear on the post.
import type { Hono } from 'hono';
import { html } from 'hono/html';
import type { Env } from './types';
import { siteOrigin } from './types';
import { adminPage } from './layout';
import { sha256Hex } from './auth';
import { slugify, RESERVED } from './content';
import { getCats } from './categories';
import { esc, shell } from './homepage';

const IST = 5.5 * 3600 * 1000;
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const now = () => Math.floor(Date.now() / 1000);
const day = (ts: number) => { const d = new Date(ts * 1000 + IST); return `${d.getUTCDate()} ${MON[d.getUTCMonth()]} ${d.getUTCFullYear()}`; };
const fmt = (ts: number | null) => (ts ? new Date(ts * 1000 + IST).toISOString().slice(0, 16).replace('T', ' ') : '-');

type Row = Record<string, any>;

// ---------- Status wording (what the author sees) ----------
const STATUS: Record<string, [string, string]> = {
  pending: ['Received', 'Your article is in the queue and has not been reviewed yet.'],
  review: ['Under review', 'We are reading and checking your article.'],
  changes: ['Changes requested', 'Please read the note below, fix the points mentioned and send the corrected article again.'],
  accepted: ['Accepted', 'Your article passed our checks and is being prepared for publishing.'],
  published: ['Published', 'Your article is live on the site.'],
  rejected: ['Not accepted', 'We could not publish this article this time.'],
};
const SETTABLE = ['pending', 'review', 'changes', 'accepted', 'rejected'];

// "published" is worked out from the linked post, so you never have to set it by hand
function effStatus(r: Row): string {
  if (r.post_id && r.pstatus === 'published' && r.published_at <= now()) return 'published';
  return r.status;
}

// ---------- Helpers ----------
const ALPHA = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no 0/O/1/I so the ID is easy to read out
function newCode() {
  const b = crypto.getRandomValues(new Uint8Array(8));
  return 'JK-' + [...b].map((x) => ALPHA[x % 32]).join('');
}
function normCode(raw: string) {
  const s = raw.toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (!s) return '';
  return 'JK-' + (s.startsWith('JK') ? s.slice(2) : s);
}

// Plain text -> safe HTML. A blank line starts a new paragraph; a line starting with "## " is a heading.
export function textToHtml(t: string) {
  const out: string[] = [];
  for (const block of t.replace(/\r/g, '').split(/\n{2,}/)) {
    const lines = block.split('\n').map((l) => l.trim()).filter(Boolean);
    while (lines.length && /^##\s+/.test(lines[0])) out.push(`<h2>${esc(lines.shift()!.replace(/^##\s+/, ''))}</h2>`);
    if (lines.length) out.push(`<p>${lines.map((l) => esc(l)).join('<br>')}</p>`);
  }
  return out.join('\n');
}

// Photo arrives as a small data URL made in the browser (WebP, or JPEG on browsers that cannot make WebP)
function readPhoto(v: string): { mime: string; b64: string } | null | 'bad' {
  if (!v) return null;
  const i = v.indexOf(',');
  if (i < 0) return 'bad';
  const head = v.slice(0, i), b64 = v.slice(i + 1);
  const mime = head === 'data:image/webp;base64' ? 'image/webp' : head === 'data:image/jpeg;base64' ? 'image/jpeg' : '';
  if (!mime || !/^[A-Za-z0-9+/=]+$/.test(b64)) return 'bad';
  let bytes: Uint8Array;
  try { bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0)); } catch { return 'bad'; }
  if (bytes.length < 12 || bytes.length > 120000) return 'bad';
  const tag = (a: number, b: number) => String.fromCharCode(...bytes.slice(a, b));
  const ok = mime === 'image/webp' ? tag(0, 4) === 'RIFF' && tag(8, 12) === 'WEBP' : bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  return ok ? { mime, b64 } : 'bad';
}

const crumbs = (items: [string, string][]) => `<nav class="crumb w" aria-label="Breadcrumb">${items.map(([n, u], i) => (i < items.length - 1 ? `<a href="${esc(u)}">${esc(n)}</a><span>/</span>` : `<span>${esc(n)}</span>`)).join('')}</nav>`;

// ---------- Author box shown on a contributed post ----------
export type Author = { name: string; qualification: string | null; age: number | null; email: string | null; show_age: number; show_email: number; photo_url: string | null };

export async function authorFor(db: D1Database, postId: number): Promise<Author | null> {
  try { return await db.prepare('SELECT name, qualification, age, email, show_age, show_email, photo_url FROM submissions WHERE post_id = ?').bind(postId).first<Author>(); }
  catch { return null; } // table missing (migration not run yet): posts keep working
}

export const AUTHOR_CSS = `<style>
.ab{display:flex;gap:16px;align-items:flex-start;margin:30px 0 6px;padding:20px;border:1px solid var(--line);border-radius:18px;background:var(--soft)}
.ab img,.ab .av{flex:none;width:72px;height:72px;border-radius:50%;object-fit:cover;background:var(--navy);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:28px}
.ab span.k{font-size:12.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--mut)}
.ab h3{margin:2px 0 4px;font-size:19px}
.ab p{margin:0 0 4px;color:var(--mut);font-size:14.5px}
.ab small{display:block;margin-top:8px;color:var(--mut);font-size:13px}
</style>`;

export function authorBox(a: Author) {
  const meta = [a.qualification, a.show_age && a.age ? `Age ${a.age}` : ''].filter(Boolean).map((x) => esc(x)).join(' &middot; ');
  const photo = a.photo_url ? `<img src="${esc(a.photo_url)}" alt="Photo of ${esc(a.name)}" width="72" height="72" loading="lazy">` : `<div class="av" aria-hidden="true">${esc(a.name.trim().charAt(0).toUpperCase())}</div>`;
  return `<aside class="ab" aria-label="About the author">${photo}<div><span class="k">Contributed by</span><h3>${esc(a.name)}</h3>${meta ? `<p>${meta}</p>` : ''}${a.show_email && a.email ? `<p><a href="mailto:${esc(a.email)}">${esc(a.email)}</a></p>` : ''}<small>This article was written by a reader and checked by the JKEdusphere team before publishing. The views are the author's own.</small></div></aside>`;
}

// ---------- Public pages ----------
const CSS = `.jc{max-width:720px;margin:0 auto;text-align:left}
.jc .s2{margin:10px 0 0;max-width:none}
.jc label{display:block;font-weight:600;font-size:14.5px;margin:18px 0 6px;color:var(--ink)}
.jc label small{font-weight:500;color:var(--mut)}
.jc input[type=text],.jc input[type=number],.jc input[type=email],.jc select,.jc textarea{display:block;width:100%;padding:12px 14px;border:1px solid var(--line2);border-radius:10px;font:inherit;font-size:16px;line-height:1.5;color:var(--ink);background:#fff;box-shadow:none;outline:0}
.jc input:focus,.jc select:focus,.jc textarea:focus{border-color:var(--blue);box-shadow:0 0 0 3px rgba(43,76,196,.14)}
.jc textarea{min-height:100px;resize:vertical;line-height:1.65}
.jc input[type=file]{font:inherit;font-size:14.5px;max-width:100%}
.jc .jc-body{min-height:360px}
.jc-two{display:grid;grid-template-columns:1fr 1fr;gap:0 16px}
.jc-hint{font-size:13.5px;line-height:1.5;color:var(--mut);margin:6px 0 0}
.jc label.jc-chk{display:flex;gap:10px;align-items:flex-start;font-weight:400;font-size:14.5px;line-height:1.5;margin:12px 0 0;color:var(--ink)}
.jc-chk input{flex:none;width:18px;height:18px;margin:2px 0 0;accent-color:var(--navy)}
.jc-box{border:1px solid var(--line);border-radius:16px;padding:26px;background:#fff;margin-top:20px}
.jc-box h2{font-size:20px;margin:0 0 4px}
.jc-err{background:#fef2f2;color:#b91c1c;border:1px solid #fecaca;padding:12px 16px;border-radius:10px;margin:18px 0 0;font-size:15px}
.jc-pv{display:none;width:96px;height:96px;border-radius:50%;object-fit:cover;margin-top:12px;border:1px solid var(--line)}
.jc-go{margin-top:26px;padding:13px 28px;cursor:pointer;font-size:15px}
.jc-code{font-size:clamp(26px,6vw,38px);font-weight:900;letter-spacing:.08em;color:var(--navy);background:var(--soft);border:1px dashed var(--line2);border-radius:14px;padding:16px 20px;text-align:center;margin:18px 0;user-select:all}
.jc-st{display:inline-block;padding:5px 14px;border-radius:99px;font-weight:800;font-size:14px;background:var(--soft);color:var(--navy)}
.jc-st.published{background:#dcfce7;color:#166534}.jc-st.rejected{background:#fee2e2;color:#991b1b}.jc-st.changes{background:#fef3c7;color:#92400e}
.jc-note{background:var(--soft);border-left:4px solid var(--navy);border-radius:8px;padding:14px 16px;margin:16px 0;white-space:pre-wrap}
.jc-hp{position:absolute;left:-9999px;top:-9999px;height:0;overflow:hidden}
.jc .search{margin:18px 0 8px}
.jc-kinds{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin:26px 0 6px}
.jc-kinds>div{border:1px solid var(--line);border-radius:14px;padding:16px 18px;background:var(--soft)}
.jc-kinds h3{font-size:16px;margin:0 0 6px;color:var(--navy)}
.jc-kinds p{margin:0;font-size:14px;line-height:1.55;color:var(--mut)}
.jc-how{margin:18px 0 0;font-size:15px;line-height:1.65;color:var(--mut)}
.jc-links{margin-top:22px}
@media(max-width:760px){.jc-kinds{grid-template-columns:1fr}}
@media(max-width:620px){.jc-two{grid-template-columns:1fr}.jc-box{padding:18px}}`;

const PHOTO_JS = `(function(){
var f=document.getElementById('pf'),h=document.getElementById('photo'),pv=document.getElementById('pv'),rm=document.getElementById('pr');
if(!f)return;
function setv(u){h.value=u||'';if(u){pv.src=u;pv.style.display='block';rm.style.display='inline-flex';}else{pv.style.display='none';rm.style.display='none';f.value='';}}
if(h.value){pv.src=h.value;pv.style.display='block';rm.style.display='inline-flex';}
rm.onclick=function(){setv('');};
function enc(c,cb){c.toBlob(function(b){if(b&&b.type==='image/webp')return cb(b);c.toBlob(function(j){cb(j);},'image/jpeg',0.8);},'image/webp',0.8);}
f.addEventListener('change',function(){
  var file=f.files&&f.files[0];if(!file)return;
  var img=new Image(),u=URL.createObjectURL(file);
  img.onload=function(){
    var w=img.naturalWidth,hh=img.naturalHeight,s=Math.min(w,hh),c=document.createElement('canvas');
    c.width=c.height=320;c.getContext('2d').drawImage(img,(w-s)/2,(hh-s)/2,s,s,0,0,320,320);URL.revokeObjectURL(u);
    enc(c,function(b){if(!b){alert('Could not process that photo.');return;}var r=new FileReader();r.onload=function(){setv(r.result);};r.readAsDataURL(b);});
  };
  img.onerror=function(){alert('Could not read that photo. Please use a JPG, PNG or WebP image.');setv('');};
  img.src=u;
});
})();`;

type V = Record<string, string>;

function formPage(cats: string[], v: V, err = '') {
  const val = (k: string) => esc(v[k] ?? '');
  const chk = (k: string) => (v[k] ? ' checked' : '');
  return `<style>${CSS}</style>${crumbs([['Home', '/'], ['Contribute', '/contribute']])}
<div class="w lp"><div class="jc"><h1>Write for JKEdusphere</h1>
<p class="s2">Every useful exam note, every sharp analysis and every honest "this is what actually worked for me" began with someone who sat down and wrote it. If you have cleared an exam, cracked a tough topic, followed a recruitment closely, or have a view on how things work in J&amp;K, this page is for you.</p>
<div class="jc-kinds">
<div><h3>Notes and explainers</h3><p>A topic you understand well enough to teach, in simple words.</p></div>
<div><h3>Experience and strategy</h3><p>How you prepared, what worked, and what you would do differently.</p></div>
<div><h3>Opinion and analysis</h3><p>Your view on a policy, a recruitment process or an education issue. Opinions are welcome. Back them with facts and argue the point, not the person.</p></div>
</div>
<p class="jc-how">Here is how it works. You submit, and we read and check every article by hand. You get a tracking ID to follow its progress. If it passes, it goes live under your name. Opinion pieces are published as the author's own view.</p>
${err ? `<div class="jc-err" role="alert">${esc(err)}</div>` : ''}
<form method="post" action="/contribute">
<div class="jc-hp" aria-hidden="true"><label>Leave this empty<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>

<div class="jc-box"><h2>About you</h2><p class="jc-hint">Shown with your article once it is published.</p>
<label for="name">Full name</label><input id="name" type="text" name="name" value="${val('name')}" required maxlength="60" autocomplete="name">
<div class="jc-two"><div><label for="age">Age</label><input id="age" type="number" name="age" value="${val('age')}" required min="10" max="99" inputmode="numeric"></div>
<div><label for="qual">Qualification</label><input id="qual" type="text" name="qualification" value="${val('qualification')}" required maxlength="100" placeholder="e.g. B.Sc, JKSSB aspirant"></div></div>
<label for="email">Email <small>(optional)</small></label><input id="email" type="email" name="email" value="${val('email')}" maxlength="120" autocomplete="email">
<p class="jc-hint">Only used if we need to contact you.</p>
<label for="pf">Your photo <small>(optional)</small></label>
<input id="pf" type="file" accept="image/*"><input type="hidden" id="photo" name="photo" value="${val('photo')}">
<img id="pv" class="jc-pv" alt="Your photo preview"><button type="button" id="pr" class="btn o" style="display:none;margin-top:10px;padding:7px 16px">Remove photo</button>
<label class="jc-chk"><input type="checkbox" name="show_age" value="1"${chk('show_age')}> Show my age on my article</label>
<label class="jc-chk"><input type="checkbox" name="show_email" value="1"${chk('show_email')}> Show my email on my article</label>
<p class="jc-hint">Your name, qualification and photo are shown. Age and email are shown only if you tick the boxes above.</p></div>

<div class="jc-box"><h2>Your article</h2>
<label for="title">Title</label><input id="title" type="text" name="title" value="${val('title')}" required minlength="8" maxlength="150">
<label for="cat">Category</label><select id="cat" name="category" required><option value="">Choose a category</option>${cats.map((c) => `<option value="${esc(c)}"${v.category === c ? ' selected' : ''}>${esc(c)}</option>`).join('')}</select>
<label for="sum">Short summary <small>(optional, 1 or 2 lines)</small></label><textarea id="sum" name="excerpt" maxlength="300">${val('excerpt')}</textarea>
<label for="body">Article</label><textarea id="body" class="jc-body" name="body" required minlength="400" maxlength="20000" rows="16">${val('body')}</textarea>
<p class="jc-hint">Plain text. Leave a blank line between paragraphs. Start a line with ## to make a heading. Minimum 400 characters.</p>
<label class="jc-chk"><input type="checkbox" name="consent" value="1" required${chk('consent')}> I wrote this article myself and it is not copied from anywhere. I agree that JKEdusphere may edit it and publish it with my name and details as chosen above. If I am under 18, my parent or guardian knows about this.</label>
<button class="btn jc-go" type="submit">Submit article</button></div>
</form>
<p class="jc-links">Already submitted? <a href="/contribute/status">Check your article's progress</a></p>
</div></div><script>${PHOTO_JS}</script>`;
}

function donePage(code: string) {
  return `<style>${CSS}</style>${crumbs([['Home', '/'], ['Contribute', '/contribute']])}
<div class="w lp"><div class="jc"><h1>Thank you, article received</h1>
<p class="s2">Your tracking ID is:</p><div class="jc-code" id="code">${esc(code)}</div>
<p><b>Save this ID now.</b> There is no login, so this ID is the only way to check your article's progress, and we cannot look it up for you later. Take a screenshot or copy it.</p>
<p style="margin-top:18px"><a class="btn" href="/contribute/status?id=${encodeURIComponent(code)}">Check progress</a> <a class="btn o" href="/">Back to home</a></p></div></div>`;
}

function statusPage(q: string, r: Row | null, msg = '') {
  const form = `<form method="get" action="/contribute/status" class="search"><input type="search" name="id" value="${esc(q)}" placeholder="Enter your ID, e.g. JK-7F3K9Q2M" aria-label="Tracking ID" autocomplete="off" required><button type="submit">Check</button></form>`;
  let main = '';
  if (msg) main = `<div class="jc-err" role="alert">${esc(msg)}</div>`;
  else if (r) {
    const s = effStatus(r), [label, text] = STATUS[s] ?? STATUS.pending;
    main = `<div class="jc-box"><p class="jc-hint" style="margin:0">Article</p><h2 style="margin-bottom:10px">${esc(r.title)}</h2>
<p><span class="jc-st ${esc(s)}">${esc(label)}</span></p><p>${esc(text)}</p>
${r.admin_note ? `<div class="jc-note"><b>Note from the team</b>\n${esc(r.admin_note)}</div>` : ''}
${s === 'published' && r.slug ? `<p style="margin-top:14px"><a class="btn" href="/${esc(r.slug)}">Read your article</a></p>` : ''}
<p class="jc-hint" style="margin-top:14px">ID ${esc(r.code)} &middot; Submitted ${day(r.created_at)} &middot; Last update ${day(r.updated_at)}</p></div>`;
  } else if (q) main = `<div class="jc-err" role="alert">No article found for that ID. Check it and try again.</div>`;
  return `<style>${CSS}</style>${crumbs([['Home', '/'], ['Contribute', '/contribute'], ['Track article', '/contribute/status']])}
<div class="w lp"><div class="jc"><h1>Track your article</h1><p class="s2">Enter the ID you received when you submitted.</p>${form}${main}
<p class="jc-links"><a href="/contribute">Write another article</a></p></div></div>`;
}

// ---------- Routes ----------
export function registerContribute(app: Hono<Env>) {
  const page = async (c: any, title: string, body: string, status = 200) =>
    c.html(await shell(c.env.DB, siteOrigin(c.req.url), { title: `${title} | JKEdusphere`, description: 'Write for JKEdusphere: share an article for J&K exam aspirants.', canonical: siteOrigin(c.req.url) + '/contribute', noindex: title !== 'Contribute an article', body }), status, { 'Cache-Control': 'no-store' });

  app.get('/contribute', async (c) => page(c, 'Contribute an article', formPage(await getCats(c.env.DB), {})));

  app.post('/contribute', async (c) => {
    const f = await c.req.formData();
    const g = (k: string) => String(f.get(k) ?? '').trim();
    if (g('website')) return c.redirect('/contribute'); // honeypot: bots fill hidden fields
    const v: V = { name: g('name'), age: g('age'), qualification: g('qualification'), email: g('email'), photo: g('photo'), title: g('title'), category: g('category'), excerpt: g('excerpt'), body: g('body').replace(/\r/g, ''), consent: g('consent'), show_age: g('show_age'), show_email: g('show_email') };
    const cats = await getCats(c.env.DB);
    const back = async (msg: string, status = 400) => page(c, 'Contribute an article', formPage(cats, v, msg), status);

    const age = parseInt(v.age, 10);
    if (v.name.length < 2) return back('Please enter your full name.');
    if (!(age >= 10 && age <= 99)) return back('Please enter a valid age.');
    if (v.qualification.length < 2) return back('Please enter your qualification.');
    if (v.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) return back('That email address does not look right.');
    if (v.title.length < 8) return back('Please give your article a proper title (at least 8 characters).');
    if (!cats.includes(v.category)) return back('Please choose a category.');
    if (v.body.length < 400) return back('The article is too short. Please write at least 400 characters.');
    if (v.body.length > 20000) return back('The article is too long. The limit is 20,000 characters.');
    if ((v.body.match(/https?:\/\//gi) ?? []).length > 5) return back('Too many links. Please keep at most 5 links in an article.');
    if (!v.consent) return back('Please tick the box to confirm the article is your own work.');
    const photo = readPhoto(v.photo);
    if (photo === 'bad') return back('That photo could not be used. Please choose a different one, or remove it.');

    const ip = c.req.header('CF-Connecting-IP') ?? 'local';
    const ipHash = await sha256Hex('jk-contribute:' + ip);
    const recent = await c.env.DB.prepare('SELECT COUNT(*) AS n FROM submissions WHERE ip_hash = ? AND created_at > ?').bind(ipHash, now() - 86400).first<{ n: number }>();
    if (recent && recent.n >= 3) return back('You have sent several articles today. Please try again tomorrow.', 429);

    let code = '';
    for (let i = 0; i < 4 && !code; i++) {
      const try_ = newCode();
      try {
        await c.env.DB.prepare('INSERT INTO submissions (code,title,category,excerpt,body,name,age,qualification,email,show_age,show_email,photo,photo_mime,status,ip_hash,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)')
          .bind(try_, v.title, v.category, v.excerpt.slice(0, 300), v.body, v.name, age, v.qualification, v.email || null, v.show_age ? 1 : 0, v.show_email ? 1 : 0, photo ? photo.b64 : null, photo ? photo.mime : null, 'pending', ipHash, now(), now()).run();
        code = try_;
      } catch { /* ID collision (extremely rare): try a new one */ }
    }
    if (!code) return back('Something went wrong on our side. Please try again.', 500);
    return page(c, 'Article received', donePage(code));
  });

  app.get('/contribute/status', async (c) => {
    const q = normCode((c.req.query('id') ?? '').slice(0, 30));
    if (!q) return page(c, 'Track your article', statusPage('', null));
    const ip = 'st:' + (c.req.header('CF-Connecting-IP') ?? 'local');
    const misses = await c.env.DB.prepare('SELECT COUNT(*) AS n FROM login_attempts WHERE ip = ? AND at > ?').bind(ip, now() - 900).first<{ n: number }>();
    if (misses && misses.n >= 15) return page(c, 'Track your article', statusPage(q, null, 'Too many wrong IDs. Please wait 15 minutes and try again.'), 429);
    const r = await c.env.DB.prepare('SELECT s.code, s.title, s.status, s.admin_note, s.created_at, s.updated_at, s.post_id, p.slug AS slug, p.status AS pstatus, p.published_at AS published_at FROM submissions s LEFT JOIN posts p ON p.id = s.post_id WHERE s.code = ?').bind(q).first<Row>();
    if (!r) await c.env.DB.prepare('INSERT INTO login_attempts (ip, at) VALUES (?,?)').bind(ip, now()).run();
    return page(c, 'Track your article', statusPage(q, r ?? null));
  });

  // ---------- Admin: review queue ----------
  const badge = (s: string) => html`<span class="badge ${s === 'published' ? 'pub' : s === 'pending' || s === 'review' ? '' : 'sch'}">${(STATUS[s] ?? STATUS.pending)[0]}</span>`;
  const opt = (v: string, cur: string, label = v) => (v === cur ? html`<option value="${v}" selected>${label}</option>` : html`<option value="${v}">${label}</option>`);

  app.get('/admin/submissions', async (c) => {
    const st = c.req.query('status') ?? '';
    const all = (await c.env.DB.prepare('SELECT s.id, s.code, s.title, s.category, s.name, s.status, s.created_at, s.post_id, p.status AS pstatus, p.published_at AS published_at FROM submissions s LEFT JOIN posts p ON p.id = s.post_id ORDER BY s.created_at DESC LIMIT 300').all()).results as Row[];
    const rows: Row[] = all.map((r) => ({ ...r, eff: effStatus(r) }));
    const counts: Record<string, number> = {};
    rows.forEach((r) => { counts[r.eff] = (counts[r.eff] ?? 0) + 1; });
    const shown = st ? rows.filter((r) => r.eff === st) : rows;
    return c.html(adminPage('Submissions', html`
      <div class="bar"><h2 style="margin:0;flex:1">Submissions</h2><a class="btn light" href="/contribute" target="_blank" rel="noopener">View public form</a></div>
      <div class="bar" style="align-items:center"><a class="btn ${st ? 'light' : ''}" style="margin:0" href="/admin/submissions">All (${rows.length})</a>
        ${Object.keys(STATUS).map((k) => html`<a class="btn ${st === k ? '' : 'light'}" style="margin:0" href="/admin/submissions?status=${k}">${STATUS[k][0]} (${counts[k] ?? 0})</a>`)}</div>
      <div class="card" style="padding:6px 14px;overflow:auto"><table><tr><th>Article</th><th>Author</th><th>Category</th><th>Status</th><th>Submitted (IST)</th></tr>
      ${shown.length ? shown.map((r) => html`<tr><td><a href="/admin/submissions/${r.id}">${r.title}</a><div class="muted">${r.code}</div></td><td>${r.name}</td><td>${r.category}</td><td>${badge(r.eff)}</td><td>${fmt(r.created_at)}</td></tr>`) : html`<tr><td colspan="5" class="muted">No submissions here yet.</td></tr>`}
      </table></div>`, true));
  });

  const detail = async (c: any, id: number, msg = '', ok = true, code = 200) => {
    const s = await c.env.DB.prepare('SELECT s.*, p.slug AS slug, p.status AS pstatus, p.published_at AS published_at FROM submissions s LEFT JOIN posts p ON p.id = s.post_id WHERE s.id = ?').bind(id).first() as Row | null;
    if (!s) return c.text('Not found', 404);
    const eff = effStatus(s);
    const hasPost = !!(s.post_id && s.slug);
    return c.html(adminPage(`Submission ${s.code}`, html`
      <div class="bar"><h2 style="margin:0;flex:1">${s.title}</h2><a class="btn light" href="/admin/submissions">Back to submissions</a></div>
      ${msg ? html`<div class="${ok ? 'ok' : 'err'}">${msg}</div>` : ''}
      <p class="muted">ID <b>${s.code}</b> &middot; submitted ${fmt(s.created_at)} IST &middot; ${badge(eff)} &middot; category: ${s.category}</p>

      <form method="post" action="/admin/submissions/${s.id}/author" class="card"><h3 style="margin-top:0">Author details (shown on the post)</h3>
        ${s.photo ? html`<img class="thumb" style="width:96px;height:96px;border-radius:50%" src="data:${s.photo_mime};base64,${s.photo}" alt="Author photo"><label style="font-weight:500"><input type="checkbox" name="remove_photo" value="1" style="width:auto"> Remove photo</label>` : html`<p class="muted">No photo was added.</p>`}
        <div class="row"><div><label>Name</label><input name="name" value="${s.name}" required maxlength="60"></div><div><label>Qualification</label><input name="qualification" value="${s.qualification ?? ''}" maxlength="100"></div></div>
        <div class="row"><div><label>Age</label><input name="age" type="number" value="${s.age ?? ''}" min="0" max="120"></div><div><label>Email</label><input name="email" value="${s.email ?? ''}" maxlength="120"></div></div>
        <label style="font-weight:500"><input type="checkbox" name="show_age" value="1" style="width:auto" ${s.show_age ? 'checked' : ''}> Show age on the post</label>
        <label style="font-weight:500"><input type="checkbox" name="show_email" value="1" style="width:auto" ${s.show_email ? 'checked' : ''}> Show email on the post</label>
        <button>Save author details</button></form>

      <div class="card"><h3 style="margin-top:0">Article text</h3>${s.excerpt ? html`<p class="muted">Summary: ${s.excerpt}</p>` : ''}<div style="white-space:pre-wrap;line-height:1.75">${s.body}</div></div>

      <form method="post" action="/admin/submissions/${s.id}/status" class="card"><h3 style="margin-top:0">Progress shown to the author</h3>
        <label>Status</label><select name="status">${SETTABLE.map((k) => opt(k, s.status, STATUS[k][0]))}</select>
        <label>Note to the author (optional, they see this on the tracking page)</label><textarea name="admin_note" maxlength="1000">${s.admin_note ?? ''}</textarea>
        <button>Save status</button> ${eff === 'published' ? html`<span class="muted">Shows as Published automatically while the linked post is live.</span>` : ''}</form>

      <div class="card"><h3 style="margin-top:0">Publish</h3>
        ${hasPost ? html`<p>A post was created from this article.</p><a class="btn" href="/admin/posts/${s.post_id}/edit">Edit the post</a> ${s.pstatus === 'published' ? html`<a class="btn light" href="/${s.slug}" target="_blank" rel="noopener">View live</a>` : ''}`
          : html`<p class="muted">Passed your checks? This creates a draft post with the author attached, and opens it in the normal editor so you can edit and publish.</p><form method="post" action="/admin/submissions/${s.id}/draft"><button>Create draft post and edit</button></form>`}</div>

      <form method="post" action="/admin/submissions/${s.id}/delete" data-confirm="Delete this submission and the author's details permanently? A post made from it stays, but loses the author box."><button class="danger">Delete submission</button></form>`, true), code);
  };

  app.get('/admin/submissions/:id', (c) => detail(c, Number(c.req.param('id')), c.req.query('saved') ? 'Saved.' : ''));

  app.post('/admin/submissions/:id/status', async (c) => {
    const id = Number(c.req.param('id')), f = await c.req.formData();
    const st = String(f.get('status') ?? ''), note = String(f.get('admin_note') ?? '').trim().slice(0, 1000);
    if (!SETTABLE.includes(st)) return detail(c, id, 'Invalid status.', false, 400);
    await c.env.DB.prepare('UPDATE submissions SET status = ?, admin_note = ?, updated_at = ? WHERE id = ?').bind(st, note, now(), id).run();
    return c.redirect(`/admin/submissions/${id}?saved=1`);
  });

  app.post('/admin/submissions/:id/author', async (c) => {
    const id = Number(c.req.param('id')), f = await c.req.formData();
    const g = (k: string) => String(f.get(k) ?? '').trim();
    if (g('name').length < 2) return detail(c, id, 'Name is required.', false, 400);
    const age = parseInt(g('age'), 10);
    await c.env.DB.prepare('UPDATE submissions SET name=?, qualification=?, age=?, email=?, show_age=?, show_email=?, updated_at=? WHERE id=?')
      .bind(g('name').slice(0, 60), g('qualification').slice(0, 100), Number.isFinite(age) ? age : null, g('email').slice(0, 120) || null, g('show_age') ? 1 : 0, g('show_email') ? 1 : 0, now(), id).run();
    if (g('remove_photo')) await c.env.DB.prepare('UPDATE submissions SET photo = NULL, photo_mime = NULL, photo_url = NULL WHERE id = ?').bind(id).run();
    return c.redirect(`/admin/submissions/${id}?saved=1`);
  });

  app.post('/admin/submissions/:id/draft', async (c) => {
    const id = Number(c.req.param('id')), db = c.env.DB;
    const s = await db.prepare('SELECT * FROM submissions WHERE id = ?').bind(id).first<Row>();
    if (!s) return c.text('Not found', 404);
    if (s.post_id && await db.prepare('SELECT 1 AS x FROM posts WHERE id = ?').bind(s.post_id).first()) return c.redirect(`/admin/posts/${s.post_id}/edit`);

    let base = slugify(s.title) || 'article';
    if (RESERVED.has(base)) base += '-article';
    let slug = base, n = 2;
    while (await db.prepare('SELECT 1 AS x FROM posts WHERE slug = ? UNION SELECT 1 FROM pages WHERE slug = ?').bind(slug, slug).first()) slug = `${base.slice(0, 94)}-${n++}`;

    let photoUrl: string | null = s.photo_url ?? null;
    if (s.photo && !photoUrl) {
      const m = await db.prepare('INSERT INTO media (mime, data, size, created_at) VALUES (?,?,?,?)').bind(s.photo_mime || 'image/webp', s.photo, Math.floor(String(s.photo).length * 3 / 4), now()).run();
      photoUrl = `/img/${m.meta.last_row_id}`;
    }
    const cats = await getCats(db);
    const excerpt = (s.excerpt || String(s.body).replace(/\s+/g, ' ').slice(0, 200)).slice(0, 400);
    const r = await db.prepare('INSERT INTO posts (title,slug,body,excerpt,category,tags,image,image_alt,seo_title,seo_description,important_dates,status,published_at,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)')
      .bind(s.title, slug, textToHtml(s.body), excerpt, cats.includes(s.category) ? s.category : '', '', '', '', '', '', '[]', 'draft', now(), now(), now()).run();
    const postId = r.meta.last_row_id;
    await db.prepare("UPDATE submissions SET post_id = ?, photo_url = ?, status = 'accepted', updated_at = ? WHERE id = ?").bind(postId, photoUrl, now(), id).run();
    return c.redirect(`/admin/posts/${postId}/edit`);
  });

  app.post('/admin/submissions/:id/delete', async (c) => {
    await c.env.DB.prepare('DELETE FROM submissions WHERE id = ?').bind(Number(c.req.param('id'))).run();
    return c.redirect('/admin/submissions');
  });
}
