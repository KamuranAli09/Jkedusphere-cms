// Pure helpers for search + AI visibility (no imports, so any file can use them without import cycles).

/** Profiles that prove the brand is one real entity. Add every official profile you own (YouTube, Instagram, LinkedIn, Facebook page, Google Business Profile...). */
export const SAME_AS: string[] = [
  'https://t.me/JKEdusphere',
  'https://www.jkedusphere.com',
];

export const KNOWS_ABOUT = ['JKSSB', 'JKPSC', 'JKPSI', 'JKBOSE', 'NTA exams', 'Jammu and Kashmir history', 'Jammu and Kashmir geography', 'Current affairs', 'Government jobs in Jammu and Kashmir'];

/** Crawlers worth knowing about. [pattern in User-Agent, label shown in the admin, group]. */
export const CRAWLERS: [RegExp, string, 'AI' | 'Search'][] = [
  [/oai-searchbot/i, 'OAI-SearchBot (ChatGPT search)', 'AI'], [/chatgpt-user/i, 'ChatGPT-User (live answers)', 'AI'], [/gptbot/i, 'GPTBot (OpenAI)', 'AI'],
  [/claude-searchbot/i, 'Claude-SearchBot', 'AI'], [/claude-user/i, 'Claude-User (live answers)', 'AI'], [/claudebot|anthropic-ai/i, 'ClaudeBot (Anthropic)', 'AI'],
  [/perplexity-user/i, 'Perplexity-User (live answers)', 'AI'], [/perplexitybot/i, 'PerplexityBot', 'AI'],
  [/google-extended|googleother|google-cloudvertexbot/i, 'Google AI crawler', 'AI'], [/applebot/i, 'Applebot (Siri / Apple)', 'AI'],
  [/meta-externalagent|meta-externalfetcher|facebookbot/i, 'Meta AI', 'AI'], [/duckassistbot/i, 'DuckAssist', 'AI'], [/mistralai-user/i, 'Mistral Le Chat', 'AI'],
  [/amazonbot/i, 'Amazonbot (Alexa)', 'AI'], [/bytespider/i, 'Bytespider (ByteDance)', 'AI'], [/ccbot/i, 'CCBot (Common Crawl)', 'AI'], [/youbot/i, 'You.com', 'AI'],
  [/googlebot/i, 'Googlebot', 'Search'], [/bingbot|msnbot/i, 'Bingbot (also feeds ChatGPT + Copilot)', 'Search'], [/duckduckbot/i, 'DuckDuckBot', 'Search'], [/yandex/i, 'YandexBot', 'Search'],
];
export const crawlerOf = (ua: string): { name: string; group: 'AI' | 'Search' } | null => {
  for (const [re, name, group] of CRAWLERS) if (re.test(ua)) return { name, group };
  return null;
};

/** User-agent tokens written into robots.txt so AI answer engines are explicitly welcome. */
export const ROBOTS_AI_AGENTS = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-User', 'Claude-SearchBot', 'anthropic-ai', 'PerplexityBot', 'Perplexity-User',
  'Google-Extended', 'Applebot-Extended', 'Meta-ExternalAgent', 'DuckAssistBot', 'MistralAI-User', 'CCBot', 'Amazonbot', 'cohere-ai'];

/** Visits that arrive from an AI assistant (the person clicked a citation). [host regex, label] */
export const AI_REFERRERS: [RegExp, string][] = [
  [/^(chatgpt\.com|chat\.openai\.com)$/, 'ChatGPT'], [/(^|\.)perplexity\.ai$/, 'Perplexity'], [/^gemini\.google\.com$|^bard\.google\.com$/, 'Gemini'],
  [/^copilot\.microsoft\.com$|^copilot\.cloud\.microsoft$/, 'Copilot'], [/^claude\.ai$/, 'Claude'], [/^(you|phind)\.com$/, 'You.com / Phind'], [/^meta\.ai$/, 'Meta AI'],
  [/^chat\.deepseek\.com$/, 'DeepSeek'], [/^(grok\.com|x\.ai)$/, 'Grok'], [/^chat\.mistral\.ai$/, 'Mistral'], [/^kagi\.com$/, 'Kagi'],
];

const decode = (s: string) => s.replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'").replace(/&amp;/g, '&');
export const stripTags = (h: string) => decode(String(h ?? '').replace(/<(script|style|svg)[\s\S]*?<\/\1>/gi, ' ').replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
export const wordCount = (h: string) => { const t = stripTags(h); return t ? t.split(' ').length : 0; };

/**
 * Finds question-and-answer pairs already written in a post: a heading ending in "?" followed by its answer,
 * or a <details><summary>Question?</summary>answer</details>. Returns [] unless there are at least two,
 * so FAQPage markup only appears where a real FAQ exists.
 */
export function faqFromHtml(h: string): { q: string; a: string }[] {
  const out: { q: string; a: string }[] = [], src = String(h ?? '');
  const hd = /<h([2-4])[^>]*>([\s\S]*?)<\/h\1>/gi;
  const marks: { i: number; end: number; text: string }[] = [];
  let m: RegExpExecArray | null;
  while ((m = hd.exec(src))) marks.push({ i: m.index, end: m.index + m[0].length, text: stripTags(m[2]) });
  marks.forEach((mk, k) => {
    if (!/\?\s*$/.test(mk.text) || mk.text.length < 12 || mk.text.length > 200) return;
    const seg = src.slice(mk.end, marks[k + 1]?.i ?? src.length), ps = [...seg.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map((x) => stripTags(x[1])).filter(Boolean);
    const a = (ps.length ? ps.slice(0, 2).join(' ') : stripTags(seg)).slice(0, 700);
    if (a.length >= 40) out.push({ q: mk.text, a });
  });
  const dt = /<details[^>]*>\s*<summary[^>]*>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/gi;
  while ((m = dt.exec(src))) {
    const q = stripTags(m[1]), a = stripTags(m[2]).slice(0, 700);
    if (q.length >= 8 && a.length >= 20 && !out.some((x) => x.q === q)) out.push({ q, a });
  }
  return out.length >= 2 ? out.slice(0, 12) : [];
}

/** Small, safe HTML -> Markdown converter so every post has a clean text twin (/slug.md) that AI tools read easily. */
export function htmlToMarkdown(h: string): string {
  let s = String(h ?? '').replace(/<(script|style|svg|noscript)[\s\S]*?<\/\1>/gi, '');
  s = s.replace(/<table[\s\S]*?<\/table>/gi, (t) => {
    const rows = [...t.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)].map((r) => [...r[1].matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/gi)].map((c) => stripTags(c[1]).replace(/\|/g, '/')));
    if (!rows.length) return '';
    const w = Math.max(...rows.map((r) => r.length)), pad = (r: string[]) => '| ' + Array.from({ length: w }, (_, i) => r[i] ?? '').join(' | ') + ' |';
    return '\n\n' + [pad(rows[0]), '|' + ' --- |'.repeat(w), ...rows.slice(1).map(pad)].join('\n') + '\n\n';
  });
  s = s.replace(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi, (_, n, t) => `\n\n${'#'.repeat(Math.min(6, +n + (+n === 1 ? 0 : 0)))} ${stripTags(t)}\n\n`)
    .replace(/<a\s[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, (_, u, t) => { const x = stripTags(t); return x ? `[${x}](${u})` : ''; })
    .replace(/<(strong|b)[^>]*>([\s\S]*?)<\/\1>/gi, (_, __, t) => `**${stripTags(t)}**`)
    .replace(/<(em|i)[^>]*>([\s\S]*?)<\/\1>/gi, (_, __, t) => `*${stripTags(t)}*`)
    .replace(/<li[^>]*>/gi, '\n- ').replace(/<\/(ul|ol)>/gi, '\n\n').replace(/<br\s*\/?>/gi, '\n').replace(/<\/(p|div|section|article|blockquote)>/gi, '\n\n')
    .replace(/<img[^>]*alt=["']([^"']*)["'][^>]*>/gi, (_, a) => (a ? `\n\n[Image: ${a}]\n\n` : ''));
  return decode(s.replace(/<[^>]*>/g, '')).replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
}
