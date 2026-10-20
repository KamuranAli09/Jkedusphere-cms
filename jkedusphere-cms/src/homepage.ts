import type { Hono } from 'hono';
import { html } from 'hono/html';
import type { Env } from './types';
import { siteOrigin } from './types';
import { adminPage } from './layout';
import { THEME_CSS } from './theme';

// ---------------------------------------------------------------------------------------------
// 1. Sections and their editable fields. The admin form AND the public homepage both read this.
//    "lines" fields are edited one item per line, columns separated by  |
// ---------------------------------------------------------------------------------------------
type Field = { t: 'text' | 'area' | 'number' | 'select' | 'lines'; l: string; opts?: string[]; cols?: string[] };
type Section = { label: string; hint: string; fields: Record<string, Field> };

const ICON = `<link rel="icon" href="/favicon.svg" type="image/svg+xml">`;
const FAVICON = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#1b2a6b"/><stop offset="1" stop-color="#63b7ea"/></linearGradient></defs><rect width="64" height="64" rx="14" fill="url(#g)"/><text x="32" y="43" font-family="Arial,Helvetica,sans-serif" font-size="30" font-weight="800" text-anchor="middle" fill="#fff">JK</text></svg>';
const GA = ICON + `<script async src="https://www.googletagmanager.com/gtag/js?id=G-V15TG71Q95"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-V15TG71Q95');</script>`;
const CATS = ['Vacancies', 'Current Affairs', 'Govt Schemes', 'Reports', 'Updates', 'Study Material'];
const T = (l: string): Field => ({ t: 'text', l });
const A = (l: string): Field => ({ t: 'area', l });
const LN = (l: string, cols: string[]): Field => ({ t: 'lines', l, cols });
const LINK = ['label', 'url'];
const FEED: Record<string, Field> = {
  title: T('Heading'), subtitle: T('Subheading'), linkText: T('Link text'), linkUrl: T('Link'),
  source: { t: 'select', l: 'Cards come from', opts: ['auto', 'manual'] },
  category: { t: 'select', l: 'Post category (auto)', opts: CATS }, limit: { t: 'number', l: 'How many cards (auto)' },
  items: LN('Manual cards', ['body', 'date', 'title', 'note', 'url']),
};

const SECTIONS: Record<string, Section> = {
  seo: { label: 'SEO and meta', hint: 'Homepage title, description and share image shown on Google and WhatsApp.', fields: {
    title: T('Page title (about 60 characters)'), description: A('Meta description (about 150 characters)'),
    ogImage: T('Share image link (1200x630, e.g. /img/12)'), siteName: T('Site name') } },
  header: { label: 'Header and menu', hint: 'Top bar links, the button at the top right, the dark subject bar under the header and the hamburger menu (it lists all of these).', fields: {
    nav: LN('Menu links', LINK), ctaText: T('Button text'), ctaUrl: T('Button link'),
    strip: LN('Subject bar under the header (empty hides it)', LINK) } },
  hero: { label: 'Hero (top banner)', hint: 'Dark banner: headline, tagline, search, checklist and a swipeable card on the right. Leave any field empty to hide that part.', fields: {
    badge: T('Small badge above the headline'), title: T('Headline (H1)'), tagline: T('Tagline (highlighted line under the headline)'), text: A('Extra intro text'),
    searchPlaceholder: T('Search box hint'), chips: LN('Quick links under the search box', LINK),
    btn1Text: T('Main button text'), btn1Url: T('Main button link'), btn2Text: T('Second button text'), btn2Url: T('Second button link'),
    featuresTitle: T('Checklist heading'), features: LN('Checklist points', ['text']),
    memberText: T('Line under the checklist (text)'), memberLinkText: T('Line under the checklist (link text)'), memberLinkUrl: T('Line under the checklist (link)'),
    cards: LN('Swipeable cards (tag is the big word on the picture; image is optional, e.g. /img/12)', ['title', 'text', 'button', 'url', 'tag', 'image']),
    panelMode: { t: 'select', l: 'Show the notice panel instead of the cards', opts: ['off', 'auto', 'manual'] }, panelTitle: T('Notice panel title'),
    panelItems: LN('Manual notices (used when set to manual)', ['tag', 'title', 'note', 'url']) } },
  trust: { label: 'Trust strip', hint: 'Short promises under the hero.', fields: { items: LN('Points', ['text']) } },
  subjects: { label: 'Library (browse by subject)', hint: 'The coloured library panel. Each row opens a search for that subject, so tag your posts with the subject name. The last word of the heading is highlighted.', fields: {
    title: T('Heading'), subtitle: T('Subheading'),
    counts: { t: 'select', l: 'Show post count on each row', opts: ['auto', 'off'] },
    items: LN('Subject rows', ['badge', 'name', 'note', 'url']) } },
  study: { label: 'Study material and research', hint: 'Newest posts from one category, or cards you write by hand.', fields: FEED },
  reports: { label: 'Reports and analysis', hint: 'Newest posts from one category, or cards you write by hand.', fields: FEED },
  exams: { label: 'Browse by exam', hint: 'A swipeable row of exam cards. The last word of the heading is highlighted. Tags are separated by commas.', fields: {
    title: T('Heading'), subtitle: T('Subheading'), btn: T('Card button text'),
    items: LN('Exam cards', ['name', 'note', 'url', 'text', 'tags']) } },
  vacancies: { label: 'Latest vacancies', hint: 'Cards from your newest posts, or cards you write by hand.', fields: FEED },
  affairs: { label: 'Current affairs', hint: 'Magazine card and quick links.', fields: {
    title: T('Heading'), subtitle: T('Subheading'), linkText: T('Link text'), linkUrl: T('Link'),
    magTag: T('Magazine tag'), magTitle: T('Magazine title'), magText: A('Magazine text'), magBtn: T('Magazine button text'), magUrl: T('Magazine button link (empty hides the button)'),
    links: LN('List links', ['title', 'note', 'url']) } },
  schemes: { label: 'Schemes and reports', hint: 'Four guide cards.', fields: {
    title: T('Heading'), subtitle: T('Subheading'), items: LN('Cards', ['badge', 'title', 'text', 'url']) } },
  prep: { label: 'jkedusphere.com band', hint: 'Promotes mock tests, notes, courses and books. Leave the link empty to show Coming soon.', fields: {
    title: T('Heading'), subtitle: T('Subheading'), linkText: T('Link text'), linkUrl: T('Link'),
    items: LN('Products', ['title', 'text', 'button', 'url']) } },
  how: { label: 'How we publish', hint: 'Trust section explaining your process.', fields: {
    title: T('Heading'), subtitle: T('Subheading'), items: LN('Steps', ['title', 'text']) } },
  join: { label: 'Telegram call to action', hint: 'Coloured strip near the bottom.', fields: {
    title: T('Heading'), text: T('Text'), btn: T('Button text'), url: T('Button link') } },
  faq: { label: 'FAQ', hint: 'Questions and answers.', fields: { title: T('Heading'), items: LN('Questions', ['q', 'a']) } },
  post: { label: 'Post and page template', hint: 'Controls every post page: dates box, share buttons, related posts, call to action and disclaimer.', fields: {
    authorLine: T('Byline'), showDates: { t: 'select', l: 'Show important dates box', opts: ['yes', 'no'] },
    showShare: { t: 'select', l: 'Show share buttons', opts: ['yes', 'no'] }, showRelated: { t: 'select', l: 'Show related posts', opts: ['yes', 'no'] },
    relatedTitle: T('Related posts heading'), ctaTitle: T('Call to action heading'), ctaText: T('Call to action text'),
    ctaBtn: T('Call to action button (empty hides the box)'), ctaUrl: T('Call to action link'), disclaimer: A('Note shown under every post') } },
  footer: { label: 'Footer', hint: 'Dark footer: big headline with a button, your disclaimer, two link columns and a copyright line. The last word of the headline is highlighted.', fields: {
    tagline: T('Big headline'), ctaText: T('Button text (empty hides it)'), ctaUrl: T('Button link'),
    text: A('Disclaimer text'), exploreTitle: T('First link column heading'), links2: LN('First column links', LINK),
    linksTitle: T('Second link column heading'), links: LN('Second column links', LINK) } },
};

const FIRST = ['seo', 'header', 'hero'];
const MOVABLE = ['trust', 'subjects', 'study', 'affairs', 'reports', 'exams', 'vacancies', 'schemes', 'prep', 'how', 'join', 'faq'];
const LAST = ['footer'];
const NOT_HIDEABLE = ['seo', 'header', 'footer', 'post'];
const TEMPLATES = ['post'];

const rows = (cols: string[], data: string[][]) => data.map((a) => Object.fromEntries(cols.map((k, i) => [k, a[i] ?? ''])));
const DEFAULTS: Record<string, any> = {
  seo: { title: 'JKEdusphere | Study Material, Current Affairs & Exam Prep for J&K Exams', description: 'Subject-wise notes, research, reports and current affairs for JKSSB, JKPSC, JKPSI, banking and UPSC aspirants in Jammu & Kashmir, with vacancy updates alongside.', ogImage: '', siteName: 'JKEdusphere' },
  header: { ctaText: 'Free mock test', ctaUrl: 'https://jkedusphere.com', nav: rows(LINK, [['Subjects', '/#subjects'], ['Study material', '/#study'], ['Current affairs', '/#affairs'], ['Reports', '/#reports'], ['Vacancies', '/#vacancies']]),
    strip: rows(LINK, ['Polity', 'History', 'Geography', 'Economy', 'Science and Tech', 'J&K GK', 'Reasoning', 'English', 'Current Affairs'].map((x) => [x, '/search?q=' + encodeURIComponent(x)])) },
  hero: { badge: '', title: 'Learn the syllabus. Clear the exam.',
    tagline: 'Free notes, research and current affairs. No sign-up needed, just start reading.',
    text: 'For JKSSB, JKPSC, JKPSI, banking and UPSC aspirants in Jammu & Kashmir.',
    searchPlaceholder: 'Search a topic, subject or exam', chips: [],
    btn1Text: '', btn1Url: '/category/study-material', btn2Text: '', btn2Url: '/category/vacancies',
    featuresTitle: 'Everything you get, free:',
    features: rows(['text'], [['Subject-wise notes'], ['Monthly current affairs PDF'], ['Previous year papers'], ['Research and reports'], ['Free mock tests'], ['Telegram alerts'], ['Plain-language explainers'], ['Official sources linked']]),
    memberText: 'Want to practise?', memberLinkText: 'Take a free mock test', memberLinkUrl: 'https://jkedusphere.com',
    cards: rows(['title', 'text', 'button', 'url', 'tag', 'image'], [
      ['Free mock tests', 'Timed tests with solutions and a live leaderboard.', 'Start free', 'https://jkedusphere.com', 'FREE', ''],
      ['Monthly current affairs', 'A free PDF magazine for JKSSB, JKPSC and UPSC.', 'Read current affairs', '/category/current-affairs', 'PDF', ''],
      ['Subject-wise notes', 'Polity, history, geography and more, in plain language.', 'Start reading', '/category/study-material', 'NOTES', ''],
      ['Telegram alerts', 'Vacancy and result alerts, the moment they are out.', 'Join Telegram', 'https://t.me/jkedusphere', 'ALERTS', '']]),
    panelMode: 'off', panelTitle: 'Latest notifications', panelItems: [] },
  trust: { items: rows(['text'], [['Free to read'], ['Exam-focused notes'], ['Official sources linked'], ['Independent educational platform']]) },
  subjects: { title: 'JKEdusphere Library', subtitle: 'Free subject-wise notes, research and practice material for J&K exams. Pick a subject and start reading.', counts: 'auto',
    items: rows(['badge', 'name', 'note', 'url'], [['PO', 'Polity', 'Constitution, governance'], ['HI', 'History', 'India and J&K'], ['GE', 'Geography', 'India, J&K, world'], ['EC', 'Economy', 'Basics and schemes'], ['ST', 'Science and Tech', 'General science'], ['JK', 'J&K GK', 'Region-specific facts'], ['RM', 'Reasoning and Maths', 'Aptitude practice'], ['EN', 'English', 'Grammar, comprehension']].map((r) => [...r, '/search?q=' + encodeURIComponent(r[1])])) },
  study: { title: 'Study material and research', subtitle: 'Notes and explainers you can read free.', linkText: 'View all', linkUrl: '/category/study-material', source: 'auto', category: 'Study Material', limit: 6, items: [] },
  reports: { title: 'Reports and analysis', subtitle: 'Data-led reading on trends, cut-offs and policy.', linkText: 'View all', linkUrl: '/category/reports', source: 'auto', category: 'Reports', limit: 3, items: [] },
  exams: { title: 'Browse by Exam', subtitle: 'Syllabus, notes and previous papers for every exam you are preparing for.', btn: 'Start preparing',
    items: rows(['name', 'note', 'url', 'text', 'tags'], [
      ['JKSSB', 'Subordinate Services', '/search?q=JKSSB', 'Junior Assistant, Naib Tehsildar, Finance Account Assistant and more. Syllabus, notes and previous papers in one place.', 'Syllabus, PYQs, Notes'],
      ['JKPSC', 'CCE and KAS', '/search?q=JKPSC', 'Combined Competitive Exam and gazetted services. Prelims and mains study material.', 'Prelims, Mains, Essay'],
      ['JKPSI', 'Police Sub-Inspector', '/search?q=JKPSI', 'Telecom, Executive and Armed. Law, reasoning and general knowledge preparation.', 'Law, Reasoning, GK'],
      ['Banking', 'J&K Bank and IBPS', '/search?q=Banking', 'Quantitative aptitude, reasoning, English and banking awareness.', 'Aptitude, English, Awareness'],
      ['SSC', 'CGL and CHSL', '/search?q=SSC', 'Central exams with a common core of maths, reasoning, English and general studies.', 'Maths, Reasoning, GS'],
      ['UPSC', 'Civil Services', '/search?q=UPSC', 'Concept-first notes on polity, history, geography, economy and current affairs.', 'Prelims, Mains, Notes'],
      ['NEET', 'Medical entrance', '/search?q=NEET', 'Biology, chemistry and physics notes with practice questions.', 'Biology, Chemistry, Physics']]) },
  vacancies: { title: 'Latest vacancies', subtitle: 'Each post lists last date, eligibility and how to apply.', linkText: 'View all', linkUrl: '/search?q=vacancy', source: 'auto', category: 'Vacancies', limit: 6, items: [] },
  affairs: { title: 'Current affairs', subtitle: 'Daily notes, a weekly digest and a free monthly magazine.', linkText: 'Open hub', linkUrl: '/search?q=current+affairs',
    magTag: 'Free PDF', magTitle: 'Monthly Current Affairs Magazine', magText: 'Curated for JKSSB, JKPSC, UPSC and SSC aspirants.', magBtn: "Get this month's edition", magUrl: '',
    links: rows(['title', 'note', 'url'], [["Today's current affairs", 'Daily', '/search?q=current+affairs'], ['Weekly one-page digest', 'Weekly', '/search?q=weekly+digest'], ['J&K in the news', 'Daily', '/search?q=J%26K+news']]) },
  schemes: { title: 'Schemes and reports', subtitle: 'Plain-language guides and data-led analysis.',
    items: rows(['badge', 'title', 'text', 'url'], [['HS', 'Housing schemes', 'Eligibility and how to apply.', '/search?q=housing+scheme'], ['AG', 'Agriculture schemes', 'Benefits and documents.', '/search?q=agriculture+scheme'], ['RT', 'Recruitment trends', 'Cut-offs and analysis.', '/search?q=recruitment+trends'], ['VT', 'Vacancy tracker', 'By department.', '/search?q=vacancy+tracker']]) },
  prep: { title: 'Ready to prepare? Head to jkedusphere.com', subtitle: 'This site keeps you informed. Our sister site helps you score.', linkText: 'Visit jkedusphere.com', linkUrl: 'https://jkedusphere.com',
    items: rows(['title', 'text', 'button', 'url'], [['Mock tests', 'Timed tests, solutions and a live leaderboard.', 'Start free', 'https://jkedusphere.com'], ['Notes', 'Exam-focused PDF notes for J&K and national exams.', 'Browse notes', 'https://jkedusphere.com'], ['Courses', 'Structured batches for J&K exams.', '', ''], ['Books', 'Study books in print and PDF.', '', '']]) },
  how: { title: 'How we publish', subtitle: 'Every post follows the same three steps.', items: rows(['title', 'text'], [['Start at the official source', "We read the notification on the recruiting body's own site."], ['Summarise in plain language', 'Dates, eligibility and how to apply, without the clutter.'], ['Update when it changes', 'Corrections and new dates go into the same post.']]) },
  join: { title: 'Never miss a notification', text: 'Vacancy and result alerts on Telegram.', btn: 'Join on Telegram', url: 'https://t.me/jkedusphere' },
  faq: { title: 'Frequently asked questions', items: rows(['q', 'a'], [['Are these notifications official?', "We summarise each notification and link to the official source. Confirm dates on the recruiting body's website before applying."], ['Is JKEdusphere free to use?', 'All vacancy, update and scheme posts are free. Some notes and test series on jkedusphere.com are paid.'], ['Is JKEdusphere affiliated with JKSSB or JKPSC?', 'No. We are an independent educational platform.'],
    ['Where should I start as a beginner?', 'Open the JKEdusphere Library, pick one subject such as Polity or History, and read its explainers in order. When a topic feels clear, test yourself with a free mock test on jkedusphere.com.'],
    ['Which exams does JKEdusphere cover?', 'JKSSB, JKPSC, JKPSI, banking, SSC, UPSC and NEET, with subject-wise notes, current affairs and vacancy updates. Use Browse by Exam to jump to the one you are preparing for.'],
    ['Do I need an account to read the notes?', 'No. Everything on this site is free to read with no sign-up. Mock tests and premium notes live on our sister site, jkedusphere.com, where you may be asked to create an account.'],
    ['How do I find notes on a particular subject or topic?', 'Tap a subject in the Library or in the bar under the menu, or use the search box at the top. You can also open a category such as Study Material, Current Affairs or Reports.'],
    ['How often is the content updated?', 'New posts go up regularly. When a date or detail changes, we update the same post, so check the updated date at the top of each post.'],
    ['Are the notes enough to clear the exam?', 'They are a strong starting point built around the syllabus. For best results, combine them with the official syllabus, previous year papers and regular mock tests.'],
    ['How do I check a vacancy before I apply?', "Each vacancy post links to the official notification. Always confirm dates, eligibility and fees on the recruiting body's official website before you apply."],
    ['What is the difference between this site and jkedusphere.com?', 'This site is for free reading: study material, research, reports, current affairs and vacancy updates. jkedusphere.com is our sister site for mock tests, test series and premium notes.'],
    ['Can I suggest a topic or report a mistake?', 'Yes. Use the Contact page to tell us which post needs fixing, or what you would like us to cover next.']]) },
  footer: { tagline: 'Prepare smarter. Clear your exam.', ctaText: 'Join us on Telegram', ctaUrl: 'https://t.me/jkedusphere',
    text: 'JKEdusphere is an independent educational platform and is not affiliated with JKSSB, JKPSC, JKBOSE, NTA or any government body. Verify exam dates and notifications from official websites.',
    exploreTitle: 'Explore', links2: rows(LINK, [['Subjects', '/#subjects'], ['Study material', '/category/study-material'], ['Current affairs', '/category/current-affairs'], ['Reports', '/category/reports'], ['Vacancies', '/category/vacancies']]),
    linksTitle: 'About',
    links: rows(LINK, [['About', '/about-us'], ['Contact', '/contact-us'], ['Privacy policy', '/privacy-policy'], ['Disclaimer', '/disclaimer'], ['jkedusphere.com', 'https://jkedusphere.com']]) },
};

// ---------------------------------------------------------------------------------------------
// 2. Storage: one JSON value in the existing settings table (key: home_layout). No migration needed.
// ---------------------------------------------------------------------------------------------
DEFAULTS.post = { authorLine: 'By JKEdusphere Team', showDates: 'yes', showShare: 'yes', showRelated: 'yes', relatedTitle: 'More from JKEdusphere',
  ctaTitle: 'Practice before the exam', ctaText: 'Take a free mock test with solutions and a live leaderboard.', ctaBtn: 'Start a free test', ctaUrl: 'https://jkedusphere.com',
  disclaimer: 'We summarise official notifications for your convenience. Always confirm dates and eligibility on the official website before applying.' };
DEFAULTS.vacancies.linkUrl = '/category/vacancies';
DEFAULTS.affairs.linkUrl = '/category/current-affairs';

type Stored = { order?: string[]; hidden?: string[]; data?: Record<string, any> };
const KEY = 'home_layout';

export async function load(db: D1Database): Promise<Stored> {
  const r = await db.prepare('SELECT value FROM settings WHERE key = ?').bind(KEY).first<{ value: string }>();
  try { return JSON.parse(r?.value ?? '{}') as Stored; } catch { return {}; }
}
const store = (db: D1Database, s: Stored) =>
  db.prepare('INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value').bind(KEY, JSON.stringify(s)).run();

export function resolve(s: Stored) {
  const order = (s.order ?? []).filter((id) => MOVABLE.includes(id));
  // A section added later slots in at its default position instead of falling to the bottom
  MOVABLE.forEach((id, i) => {
    if (order.includes(id)) return;
    const next = MOVABLE.slice(i + 1).find((x) => order.includes(x));
    order.splice(next ? order.indexOf(next) : order.length, 0, id);
  });
  const hidden = new Set(s.hidden ?? []);
  const data = (id: string) => ({ ...DEFAULTS[id], ...(s.data?.[id] ?? {}) });
  return { order, hidden, data };
}

// ---------------------------------------------------------------------------------------------
// 3. Public homepage
// ---------------------------------------------------------------------------------------------
export const esc = (s: unknown) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
export const href = (u: string) => (/^(https?:\/\/|\/|#|mailto:)/i.test(u || '') ? esc(u) : '#');
const head = (d: any, link = false) => `<div class="sh"><div><h2>${esc(d.title)}</h2>${d.subtitle ? `<p>${esc(d.subtitle)}</p>` : ''}</div>${link && d.linkText ? `<a href="${href(d.linkUrl)}">${esc(d.linkText)}</a>` : ''}</div>`;
// Highlights the last word of a heading, e.g. "JKEdusphere <em>Library</em>"
const hl = (t: unknown) => { const s = String(t ?? '').trim(), i = s.lastIndexOf(' '); return i < 0 ? `<em>${esc(s)}</em>` : `${esc(s.slice(0, i))} <em>${esc(s.slice(i + 1))}</em>`; };
const logo = (dark = false) => `<a class="jk-logo${dark ? ' dk' : ''}" href="/" aria-label="JKEdusphere home"><span class="jk-wm">JKEdusphere</span><span class="jk-tag">Powered by Vision &amp; Knowledge</span></a>`;
const tagCls = (t: string) => (/^new/i.test(t) ? 'n' : /clos|last|urgent/i.test(t) ? 'c' : '');

type Post = { title: string; slug: string; excerpt: string | null; category: string | null; important_dates: string | null };
const lastDate = (j: string | null) => { try { return ((JSON.parse(j || '[]') as any[]).find((d) => /last/i.test(d.event)) ?? {}).date ?? ''; } catch { return ''; } };
async function latest(db: D1Database, category: string | null, limit: number) {
  const t = Math.floor(Date.now() / 1000);
  const sql = `SELECT title, slug, excerpt, category, important_dates FROM posts WHERE status = 'published' AND published_at <= ?${category ? ' AND category = ?' : ''} ORDER BY published_at DESC LIMIT ?`;
  const binds: (string | number)[] = category ? [t, category, limit] : [t, limit];
  return ((await db.prepare(sql).bind(...binds).all()).results as unknown as Post[]).map((p) => ({ ...p, last: lastDate(p.important_dates), url: `/${p.slug}` }));
}

// One query counts published posts per subject, using the same fields the site search looks at (max 20 subjects)
async function subjectCounts(db: D1Database, names: string[]): Promise<Record<string, number>> {
  const list = names.filter(Boolean).slice(0, 20);
  if (!list.length) return {};
  try {
    const one = '(title LIKE ? OR excerpt LIKE ? OR tags LIKE ? OR category LIKE ?)';
    const sql = `SELECT ${list.map((_, i) => `SUM(CASE WHEN ${one} THEN 1 ELSE 0 END) AS c${i}`).join(', ')} FROM posts WHERE status = 'published' AND published_at <= ?`;
    const binds: (string | number)[] = list.flatMap((n) => [`%${n}%`, `%${n}%`, `%${n}%`, `%${n}%`]);
    const row = await db.prepare(sql).bind(...binds, Math.floor(Date.now() / 1000)).first<Record<string, number | null>>();
    return Object.fromEntries(list.map((n, i) => [n, Number(row?.[`c${i}`] ?? 0)]));
  } catch { return {}; }
}

type Ctx = { latest: any[]; feeds: Record<string, any[]>; counts: Record<string, number> };
const CAROUSEL_JS = `<script>(function(){var s=document.currentScript.parentNode,c=s.querySelector('.car'),p=s.querySelector('.pv'),n=s.querySelector('.nx');if(!c||!p||!n)return;function u(){p.disabled=c.scrollLeft<4;n.disabled=c.scrollLeft+c.clientWidth>=c.scrollWidth-4}function g(d){var k=c.querySelector('.xc');c.scrollBy({left:d*(k?k.offsetWidth+18:300),behavior:'smooth'})}p.onclick=function(){g(-1)};n.onclick=function(){g(1)};c.addEventListener('scroll',u,{passive:true});window.addEventListener('resize',u);u()})();</script>`;
const FEEDS = ['vacancies', 'study', 'reports'];
const feed = (id: string) => (d: any, c: Ctx) => {
  const cards = d.source === 'auto' ? (c.feeds[id] ?? []).map((p) => ({ body: p.category ?? '', date: p.last, title: p.title, note: p.excerpt ?? '', url: p.url })) : d.items;
  if (!cards.length) return '';
  const more = id === 'vacancies' ? 'See details' : 'Read more';
  return `<div class="w"><section class="s" id="${id}">${head(d, true)}<div class="vg">${cards.map((i: any) => `<article class="vc"><div class="vt"><span>${esc(i.body)}</span>${esc(i.date)}</div><h3>${esc(i.title)}</h3><p>${esc(i.note)}</p><a href="${href(i.url)}">${more}</a></article>`).join('')}</div></section></div>`;
};
// Hamburger menu: open/close the drawer (Escape and any link inside also close it)
const MENU_JS = `<script>(function(){var b=document.querySelector('.mb'),d=document.getElementById('drawer');if(!b||!d)return;function o(x){d.hidden=!x;b.setAttribute('aria-expanded',x?'true':'false');document.documentElement.style.overflow=x?'hidden':''}b.onclick=function(){o(d.hidden)};d.addEventListener('click',function(e){if(e.target.closest('[data-x]')||e.target.closest('a'))o(false)});document.addEventListener('keydown',function(e){if(e.key==='Escape')o(false)})})();</script>`;
// Hero cards: dots follow the swipe and jump to a card when tapped
const HERO_JS = `<script>(function(){var c=document.querySelector('.hc');if(!c)return;var t=c.querySelector('.ht'),ds=c.querySelectorAll('.hd button'),k=t.children;function s(){return k[1]?k[1].offsetLeft-k[0].offsetLeft:(k[0].offsetWidth||1)}function u(){var i=Math.round(t.scrollLeft/s());ds.forEach(function(b,j){b.className=j===i?'on':''})}ds.forEach(function(b,j){b.onclick=function(){t.scrollTo({left:j*s(),behavior:'smooth'})}});t.addEventListener('scroll',u,{passive:true});u()})();</script>`;
// Live search suggestions under every search box (titles of posts and notes, fetched from /search/suggest)
const SUGGEST_JS = `<script>(function(){var inputs=[].slice.call(document.querySelectorAll('form.search input[name=q]'));if(!inputs.length||!window.fetch)return;var box=document.createElement('div');box.className='sg';box.hidden=true;box.setAttribute('role','listbox');document.body.appendChild(box);var cur=null,items=[],act=-1,t,ctl,cache={};
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function place(){if(!cur)return;var r=cur.closest('form').getBoundingClientRect();box.style.left=r.left+'px';box.style.top=(r.bottom+8)+'px';box.style.width=r.width+'px'}
function hide(){box.hidden=true;act=-1}
function paint(q,list){if(!list.length){hide();return}box.innerHTML=list.map(function(x){return '<a role="option" href="'+esc(x.u)+'"><b>'+esc(x.t)+'</b><small>'+esc(x.k)+'</small></a>'}).join('')+'<a class="all" href="/search?q='+encodeURIComponent(q)+'">See all results for &ldquo;'+esc(q)+'&rdquo;</a>';items=[].slice.call(box.querySelectorAll('a'));act=-1;place();box.hidden=false}
function go(inp){var q=inp.value.trim();if(q.length<2){hide();return}if(cache[q]){paint(q,cache[q]);return}clearTimeout(t);t=setTimeout(function(){if(ctl)ctl.abort();ctl=new AbortController();fetch('/search/suggest?q='+encodeURIComponent(q),{signal:ctl.signal}).then(function(r){return r.json()}).then(function(l){cache[q]=l;if(cur===inp&&inp.value.trim()===q)paint(q,l)}).catch(function(){})},180)}
inputs.forEach(function(inp){inp.setAttribute('autocomplete','off');inp.addEventListener('input',function(){cur=inp;go(inp)});inp.addEventListener('focus',function(){cur=inp;if(inp.value.trim().length>1)go(inp)});inp.addEventListener('keydown',function(e){if(box.hidden)return;var n=items.length;if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();act=e.key==='ArrowDown'?(act+1)%n:(act<=0?n-1:act-1);items.forEach(function(a,i){a.classList.toggle('on',i===act)})}else if(e.key==='Enter'&&act>-1){e.preventDefault();location.href=items[act].href}else if(e.key==='Escape')hide()})});
document.addEventListener('click',function(e){if(!box.contains(e.target)&&!(cur&&cur.contains(e.target)))hide()});addEventListener('resize',place);addEventListener('scroll',function(){if(!box.hidden)place()},{passive:true})})();</script>`;
// Scroll reveal: blocks below the fold fade and slide up the first time they scroll into view
const REVEAL_JS = `<script>(function(){if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches)return;var q='.sh,.sh2,.lib .lh,.ll a,.vc,.gs a,.bc,.how>div,.mag,.lst,.join,.faq details,.ft,.fg,.cta,.glance,.box2,.car,.tr';var els=[].slice.call(document.querySelectorAll(q)).filter(function(e){return e.getBoundingClientRect().top>innerHeight*.92});if(!els.length)return;document.documentElement.classList.add('js');var io=new IntersectionObserver(function(es){es.forEach(function(x){if(!x.isIntersecting)return;var e=x.target;io.unobserve(e);e.classList.add('in');setTimeout(function(){e.classList.remove('rv','in');e.style.removeProperty('--d')},1400)})},{rootMargin:'0px 0px -8% 0px',threshold:.05});els.forEach(function(e){var i=[].indexOf.call(e.parentNode.children,e);e.style.setProperty('--d',Math.min(i,6)*70+'ms');e.classList.add('rv');io.observe(e)})})();</script>`;
const R: Record<string, (d: any, c: Ctx) => string> = {
  header: (d) => {
    const nav = (d.nav ?? []) as any[], strip = (d.strip ?? []) as any[];
    const cta = d.ctaText ? `<a class="btn" href="${href(d.ctaUrl)}">${esc(d.ctaText)}</a>` : '';
    return `<header><div class="w bar"><button type="button" class="mb" aria-label="Open menu" aria-expanded="false" aria-controls="drawer"><span></span><span></span><span></span></button>${logo()}<nav class="m" aria-label="Main">${nav.map((n) => `<a href="${href(n.url)}">${esc(n.label)}</a>`).join('')}</nav>${cta}</div></header>${strip.length ? `<div class="sb"><div class="w"><nav aria-label="Subjects">${strip.map((n) => `<a href="${href(n.url)}">${esc(n.label)}</a>`).join('')}</nav></div></div>` : ''}
<div class="dr" id="drawer" hidden><div class="ov" data-x></div><aside class="dp" aria-label="Menu"><div class="dh"><b>Menu</b><button type="button" class="dx" data-x aria-label="Close menu">&times;</button></div>
<nav aria-label="Menu links">${nav.map((n) => `<a href="${href(n.url)}">${esc(n.label)}</a>`).join('')}</nav>${strip.length ? `<h4>Subjects</h4><nav aria-label="Subjects menu">${strip.map((n) => `<a href="${href(n.url)}">${esc(n.label)}</a>`).join('')}</nav>` : ''}${cta}</aside></div>${MENU_JS}`;
  },

  hero: (d, c) => {
    const panel = d.panelMode === 'auto' || d.panelMode === 'manual';
    const cards = ((d.cards ?? []) as any[]).filter((x) => x.title);
    let side = '';
    if (panel) {
      const items = d.panelMode === 'auto' ? c.latest.map((p) => ({ tag: p.category ?? '', title: p.title, note: p.last ? 'Last date ' + p.last : '', url: p.url })) : d.panelItems;
      const list = items.length ? items.map((i: any) => `<a href="${href(i.url)}">${i.tag ? `<span class="tag ${tagCls(i.tag)}">${esc(i.tag)}</span>` : ''}<b>${esc(i.title)}</b><small>${esc(i.note)}</small></a>`).join('')
        : '<p style="padding:16px 20px;margin:0;color:#56637f">New notifications will appear here.</p>';
      side = `<div class="nb"><h2>${esc(d.panelTitle)}</h2>${list}</div>`;
    } else if (cards.length) {
      side = `<div class="hc"><div class="ht">${cards.map((i, k) => `<article class="hk v${k % 5}"><div class="hv">${i.image ? `<img src="${href(i.image)}" alt="${esc(i.title)}" loading="lazy">` : `<div class="xw"><b>${esc(i.tag || i.title)}</b></div>`}</div><h3>${esc(i.title)}</h3><p>${esc(i.text)}</p>${i.button ? `<a class="btn" href="${href(i.url)}">${esc(i.button)}</a>` : ''}</article>`).join('')}</div>${cards.length > 1 ? `<div class="hd">${cards.map((_, k) => `<button type="button" aria-label="Show card ${k + 1}"></button>`).join('')}</div>` : ''}</div>${HERO_JS}`;
    }
    const feats = ((d.features ?? []) as any[]).filter((x) => x.text);
    const btns = (d.btn1Text ? `<a class="btn" href="${href(d.btn1Url)}">${esc(d.btn1Text)}</a>` : '') + (d.btn2Text ? `<a class="btn o" href="${href(d.btn2Url)}">${esc(d.btn2Text)}</a>` : '');
    const chips = (d.chips ?? []) as any[];
    return `<section class="hero d"><div class="w hg"><div>${d.badge ? `<span class="eyebrow">${esc(d.badge)}</span>` : ''}<h1>${esc(d.title)}</h1>${d.tagline ? `<p class="tg">${esc(d.tagline)}</p>` : ''}${d.text ? `<p class="s">${esc(d.text)}</p>` : ''}
<form class="search" action="/search" role="search"><input type="search" name="q" placeholder="${esc(d.searchPlaceholder)}" aria-label="Search"><button type="submit">Search</button></form>
${chips.length ? `<div class="chips">${chips.map((x) => `<a href="${href(x.url)}">${esc(x.label)}</a>`).join('')}</div>` : ''}${btns ? `<div class="hb">${btns}</div>` : ''}
${feats.length ? `${d.featuresTitle ? `<p class="hl2">${esc(d.featuresTitle)}</p>` : ''}<ul class="hf">${feats.map((x) => `<li>${esc(x.text)}</li>`).join('')}</ul>` : ''}${d.memberLinkText ? `<p class="hm">${esc(d.memberText)} <a href="${href(d.memberLinkUrl)}">${esc(d.memberLinkText)}</a></p>` : ''}</div>
${side}</div></section>`;
  },

  trust: (d) => `<div class="tr"><div class="w">${d.items.map((i: any) => `<span>${esc(i.text)}</span>`).join('')}</div></div>`,
  exams: (d) => {
    const cards = d.items.map((i: any, k: number) => {
      const tags = String(i.tags ?? '').split(',').map((x) => x.trim()).filter(Boolean).slice(0, 4);
      return `<article class="xc v${k % 5}"><div class="xh"><div class="xw"><b>${esc(i.name)}</b></div></div><div class="xb"><h3>${esc(i.note || i.name)}</h3>${i.text ? `<p>${esc(i.text)}</p>` : '<p></p>'}${tags.length ? `<div class="xt">${tags.map((x) => `<span>${esc(x)}</span>`).join('')}</div>` : ''}<a class="btn o" href="${href(i.url)}">${esc(d.btn || 'Start preparing')}</a></div></article>`;
    }).join('');
    return `<div class="w"><section class="s" id="exams"><div class="sh2"><div><h2>${hl(d.title)}</h2>${d.subtitle ? `<p>${esc(d.subtitle)}</p>` : ''}</div><div class="cn"><button type="button" class="pv" aria-label="Previous exams" disabled>&#8249;</button><button type="button" class="nx" aria-label="Next exams">&#8250;</button></div></div><div class="car">${cards}</div>${CAROUSEL_JS}</section></div>`;
  },

  subjects: (d, c) => {
    const rows = d.items.map((i: any) => {
      const n = d.counts === 'off' ? 0 : c.counts[i.name] ?? 0;
      return `<a href="${href(i.url)}"><i>${esc(i.badge)}</i><span class="ln"><b>${esc(i.name)}</b>${i.note ? `<small>${esc(i.note)}</small>` : ''}</span>${n ? `<span class="ct" title="${n} posts">${n}</span>` : ''}</a>`;
    }).join('');
    return `<div class="w"><section class="s" id="subjects"><div class="lib"><div class="lh"><h2>${hl(d.title)}</h2>${d.subtitle ? `<p>${esc(d.subtitle)}</p>` : ''}</div><div class="ll">${rows}</div></div></section></div>`;
  },
  vacancies: feed('vacancies'), study: feed('study'), reports: feed('reports'),

  affairs: (d) => `<div class="w"><section class="s" id="affairs">${head(d, true)}<div class="ca"><div class="mag"><div><small>${esc(d.magTag)}</small><h3>${esc(d.magTitle)}</h3><p>${esc(d.magText)}</p></div>${d.magUrl ? `<div><a class="btn w2" href="${href(d.magUrl)}">${esc(d.magBtn)}</a></div>` : ''}</div>
<div class="lst">${d.links.map((l: any) => `<a href="${href(l.url)}">${esc(l.title)}<small>${esc(l.note)}</small></a>`).join('')}</div></div></section></div>`,

  schemes: (d) => `<div class="w"><section class="s" id="schemes">${head(d)}<div class="gs">${d.items.map((i: any) => `<a href="${href(i.url)}"><i>${esc(i.badge)}</i><h3>${esc(i.title)}</h3><p>${esc(i.text)}</p></a>`).join('')}</div></section></div>`,

  prep: (d) => `<section class="prep" id="prep"><div class="w">${head(d, true)}<div class="bk">${d.items.map((i: any) => `<div class="bc${i.url ? '' : ' g'}"><div><h3>${esc(i.title)}</h3><p>${esc(i.text)}</p></div>${i.url ? `<a class="btn" href="${href(i.url)}">${esc(i.button || 'Open')}</a>` : '<span class="btn">Coming soon</span>'}</div>`).join('')}</div></div></section>`,

  how: (d) => `<div class="w"><section class="s">${head(d)}<div class="how">${d.items.map((i: any) => `<div><h3>${esc(i.title)}</h3><p>${esc(i.text)}</p></div>`).join('')}</div></section></div>`,
  join: (d) => `<div class="w"><section class="s"><div class="join"><div><h2>${esc(d.title)}</h2><p>${esc(d.text)}</p></div><a class="btn" href="${href(d.url)}">${esc(d.btn)}</a></div></section></div>`,
  faq: (d) => `<div class="w"><section class="s faq"><div class="sh"><h2>${esc(d.title)}</h2></div>${d.items.map((i: any) => `<details><summary>${esc(i.q)}</summary><p>${esc(i.a)}</p></details>`).join('')}</section></div>`,
  footer: (d) => {
    const col = (title: string, label: string, list: any[]) => (list.length ? `<nav aria-label="${esc(label)}">${title ? `<h3>${esc(title)}</h3>` : ''}${list.map((l) => `<a href="${href(l.url)}">${esc(l.label)}</a>`).join('')}</nav>` : '');
    return `<footer class="fd"><div class="w">${d.tagline || d.ctaText ? `<div class="ft">${d.tagline ? `<h2>${hl(d.tagline)}</h2>` : '<span></span>'}${d.ctaText ? `<a class="btn" href="${href(d.ctaUrl)}">${esc(d.ctaText)}</a>` : ''}</div>` : ''}
<div class="fg"><div class="fb">${logo(true)}<p>${esc(d.text)}</p></div>${col(d.exploreTitle, 'Explore', d.links2 ?? [])}${col(d.linksTitle, 'About', d.links ?? [])}</div>
<div class="fz"><span>&copy; ${new Date().getFullYear()} JKEdusphere. All rights reserved.</span><a href="#">Back to top &uarr;</a></div></div></footer>`;
  },
};

async function renderHome(db: D1Database, origin: string) {
  const L = resolve(await load(db));
  const seo = L.data('seo');
  const hero = L.data('hero');
  const feeds: Record<string, any[]> = {};
  await Promise.all(FEEDS.map(async (id) => {
    const f = L.data(id);
    if (f.source === 'auto' && !L.hidden.has(id)) feeds[id] = await latest(db, f.category, Math.max(1, Math.min(12, Number(f.limit) || 6)));
  }));
  const sj = L.data('subjects');
  const counts = !L.hidden.has('subjects') && sj.counts !== 'off' ? await subjectCounts(db, (sj.items ?? []).map((i: any) => String(i.name ?? ''))) : {};
  const ctx: Ctx = { latest: hero.panelMode === 'auto' ? await latest(db, null, 4) : [], feeds, counts };
  const ids = ['header', 'hero', ...L.order, 'footer'].filter((id) => !L.hidden.has(id));
  const body = ids.map((id) => R[id](L.data(id), ctx)).join('\n');
  const ld = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'WebSite', name: seo.siteName, url: origin + '/', potentialAction: { '@type': 'SearchAction', target: origin + '/search?q={q}', 'query-input': 'required name=q' } },
    { '@type': 'Organization', name: seo.siteName, url: origin + '/' }] };
  const og = seo.ogImage ? `<meta property="og:image" content="${esc(seo.ogImage.startsWith('/') ? origin + seo.ogImage : seo.ogImage)}"><meta name="twitter:card" content="summary_large_image">` : '';
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(seo.title)}</title><meta name="description" content="${esc(seo.description)}"><link rel="canonical" href="${esc(origin)}/">
<meta property="og:title" content="${esc(seo.title)}"><meta property="og:description" content="${esc(seo.description)}"><meta property="og:type" content="website"><meta property="og:url" content="${esc(origin)}/">${og}
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800&family=Lato:wght@400;700;900&display=swap" rel="stylesheet"><link rel="stylesheet" href="/assets/theme.css">${GA}
<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script></head><body>
${body}
${REVEAL_JS}${SUGGEST_JS}</body></html>`;
}


export async function shell(db: D1Database, origin: string, o: { title: string; description: string; canonical: string; type?: string; image?: string; ld?: unknown; body: string; noindex?: boolean }) {
  const L = resolve(await load(db));
  const ctx: Ctx = { latest: [], feeds: {}, counts: {} };
  const og = o.image ? `<meta property="og:image" content="${esc(o.image)}"><meta name="twitter:card" content="summary_large_image">` : '';
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(o.title)}</title><meta name="description" content="${esc(o.description)}"><link rel="canonical" href="${esc(o.canonical)}">${o.noindex ? '<meta name="robots" content="noindex,follow">' : ''}
<meta property="og:title" content="${esc(o.title)}"><meta property="og:description" content="${esc(o.description)}"><meta property="og:type" content="${o.type ?? 'website'}"><meta property="og:url" content="${esc(o.canonical)}"><meta property="og:site_name" content="${esc(L.data('seo').siteName)}">${og}
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800&family=Lato:wght@400;700;900&display=swap" rel="stylesheet"><link rel="stylesheet" href="/assets/theme.css">${GA}
${o.ld ? `<script type="application/ld+json">${JSON.stringify(o.ld).replace(/</g, '\\u003c')}</script>` : ''}</head><body>
${R.header(L.data('header'), ctx)}
<main>${o.body}</main>
${R.footer(L.data('footer'), ctx)}
${REVEAL_JS}${SUGGEST_JS}</body></html>`;
}

// ---------------------------------------------------------------------------------------------
// 4. Admin: Layout tab
// ---------------------------------------------------------------------------------------------
const toText = (f: Field, v: any) => (f.t === 'lines' ? ((v ?? []) as any[]).map((o) => f.cols!.map((k) => o[k] ?? '').join(' | ').replace(/( \| )+$/, '')).join('\n') : String(v ?? ''));
const cell = (s: string) => s.replace(/[\r\n]+/g, ' ').trim().slice(0, 600);

function fromForm(f: Field, raw: string, current: any) {
  if (f.t === 'lines') {
    return raw.split('\n').map((l) => l.split('|').map(cell)).filter((a) => a.some(Boolean)).slice(0, 40)
      .map((a) => Object.fromEntries(f.cols!.map((k, i) => [k, i === f.cols!.length - 1 ? a.slice(i).join(' | ') : a[i] ?? ''])));
  }
  if (f.t === 'number') return Math.max(1, Math.min(12, parseInt(raw, 10) || 6));
  if (f.t === 'select') return f.opts!.includes(raw) ? raw : current;
  return raw.trim().slice(0, f.t === 'area' ? 1500 : 300);
}

export function registerHomepage(app: Hono<Env>) {
  // Live domain: send jkedusphere.online to www. Test address (workers.dev): hide it from Google so it is never indexed.
  app.use('*', async (c, next) => {
    const u = new URL(c.req.url);
    if (u.hostname === 'jkedusphere.online') { u.hostname = 'www.jkedusphere.online'; return c.redirect(u.toString(), 301); }
    if (u.hostname.endsWith('.workers.dev')) c.header('X-Robots-Tag', 'noindex, nofollow');
    await next();
  });
  app.get('/favicon.svg', (c) => c.body(FAVICON, 200, { 'Content-Type': 'image/svg+xml', 'Cache-Control': 'public, max-age=86400' }));
  app.get('/favicon.ico', (c) => c.redirect('/favicon.svg', 301));
  app.get('/assets/theme.css', (c) => c.body(THEME_CSS, 200, { 'Content-Type': 'text/css; charset=utf-8', 'Cache-Control': 'public, max-age=300' }));

  app.get('/', async (c) => {
        const page = await renderHome(c.env.DB, siteOrigin(c.req.url));
    return c.html(page, 200, { 'Cache-Control': 'public, max-age=60' });
  });

  const post = (action: string, label: string, confirm = '') => confirm
    ? html`<form method="post" action="${action}" data-confirm="${confirm}" style="display:inline;margin:0"><button class="light" style="margin:0;padding:6px 10px">${label}</button></form>`
    : html`<form method="post" action="${action}" style="display:inline;margin:0"><button class="light" style="margin:0;padding:6px 10px">${label}</button></form>`;

  app.get('/admin/layout', async (c) => {
    const L = resolve(await load(c.env.DB));
    const all = [...FIRST, ...L.order, ...LAST, ...TEMPLATES];
    return c.html(adminPage('Layout', html`
      <div class="bar"><h2 style="margin:0;flex:1">Layout</h2><a class="btn" href="/" target="_blank" rel="noopener" style="margin:0">Preview homepage</a></div>
      <p class="muted">Tap a section to edit its text, links and items. Use the arrows to reorder and Hide to remove a section from the homepage. Changes go live within a minute.</p>
      <div class="card" style="padding:6px 14px"><table>
      ${all.map((id) => {
        const s = SECTIONS[id], mv = MOVABLE.includes(id), hid = L.hidden.has(id);
        return html`<tr><td><a href="/admin/layout/${id}"><b>${s.label}</b></a><div class="muted">${s.hint}</div></td>
          <td>${hid ? html`<span class="badge sch">Hidden</span>` : html`<span class="badge pub">Visible</span>`}</td>
          <td style="white-space:nowrap">${mv ? html`${post(`/admin/layout/move/${id}/up`, 'Up')} ${post(`/admin/layout/move/${id}/down`, 'Down')}` : ''}
          ${NOT_HIDEABLE.includes(id) ? '' : post(`/admin/layout/toggle/${id}`, hid ? 'Show' : 'Hide')}
          <a class="btn light" href="/admin/layout/${id}" style="margin:0;padding:6px 10px">Edit</a></td></tr>`;
      })}
      </table></div>`, true));
  });

  app.get('/admin/layout/:id', async (c) => {
    const id = c.req.param('id'), s = SECTIONS[id];
    if (!s) return c.text('Not found', 404);
    const d = resolve(await load(c.env.DB)).data(id);
    return c.html(adminPage(s.label, html`
      <h2>${s.label}</h2>${c.req.query('saved') ? html`<div class="ok">Saved. The homepage updates within a minute.</div>` : ''}
      <form method="post" action="/admin/layout/${id}" class="card">
        ${Object.entries(s.fields).map(([k, f]) => html`<label>${f.l}${f.t === 'lines' ? html` <span class="muted">(one per line: ${f.cols!.join(' | ')})</span>` : ''}</label>
          ${f.t === 'area' ? html`<textarea name="${k}" rows="4">${toText(f, d[k])}</textarea>`
            : f.t === 'lines' ? html`<textarea name="${k}" rows="${Math.max(5, Math.min(14, (d[k] ?? []).length + 2))}" style="font-family:ui-monospace,Consolas,monospace;font-size:14px">${toText(f, d[k])}</textarea>`
            : f.t === 'select' ? html`<select name="${k}">${f.opts!.map((o) => (o === d[k] ? html`<option selected>${o}</option>` : html`<option>${o}</option>`))}</select>`
            : f.t === 'number' ? html`<input type="number" name="${k}" min="1" max="12" value="${toText(f, d[k])}">`
            : html`<input name="${k}" value="${toText(f, d[k])}" maxlength="300">`}`)}
        <button>Save section</button> <a class="btn light" href="/admin/layout">Back to layout</a>
      </form>
      ${post(`/admin/layout/reset/${id}`, 'Reset this section to default', 'Reset this section to its default content?')}`, true));
  });

  app.post('/admin/layout/:id', async (c) => {
    const id = c.req.param('id'), s = SECTIONS[id];
    if (!s) return c.text('Not found', 404);
    const f = await c.req.formData(), st = await load(c.env.DB), cur = resolve(st).data(id), next: Record<string, any> = {};
    for (const [k, fld] of Object.entries(s.fields)) next[k] = fromForm(fld, String(f.get(k) ?? ''), cur[k]);
    st.data = { ...(st.data ?? {}), [id]: next };
    await store(c.env.DB, st);
    return c.redirect(`/admin/layout/${id}?saved=1`);
  });

  app.post('/admin/layout/reset/:id', async (c) => {
    const id = c.req.param('id'), st = await load(c.env.DB);
    if (!SECTIONS[id]) return c.text('Not found', 404);
    if (st.data) delete st.data[id];
    await store(c.env.DB, st);
    return c.redirect(`/admin/layout/${id}`);
  });

  app.post('/admin/layout/toggle/:id', async (c) => {
    const id = c.req.param('id'), st = await load(c.env.DB);
    if (!SECTIONS[id] || NOT_HIDEABLE.includes(id)) return c.text('Not allowed', 400);
    const h = new Set(st.hidden ?? []);
    h.has(id) ? h.delete(id) : h.add(id);
    st.hidden = [...h];
    await store(c.env.DB, st);
    return c.redirect('/admin/layout');
  });

  app.post('/admin/layout/move/:id/:dir', async (c) => {
    const id = c.req.param('id'), dir = c.req.param('dir'), st = await load(c.env.DB);
    const order = resolve(st).order, i = order.indexOf(id), j = dir === 'up' ? i - 1 : i + 1;
    if (i < 0 || j < 0 || j >= order.length) return c.redirect('/admin/layout');
    [order[i], order[j]] = [order[j], order[i]];
    st.order = order;
    await store(c.env.DB, st);
    return c.redirect('/admin/layout');
  });
}
