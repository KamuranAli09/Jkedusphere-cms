// Categories live in the existing `settings` table (key: categories) as a JSON list.
// No migration needed: until you add one, the original six categories are used.

export const DEFAULT_CATS = ['Vacancies', 'Current Affairs', 'Govt Schemes', 'Reports', 'Updates', 'Study Material'];

const KEY = 'categories';
const MAX_CATS = 40;

// Same rules as slugify() in content.ts, so /category/<slug> URLs always match
const slug = (s: string) =>
  s.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 100);

export const cleanCat = (s: string) => s.replace(/\s+/g, ' ').trim().slice(0, 40);

export async function getCats(db: D1Database): Promise<string[]> {
  try {
    const r = await db.prepare('SELECT value FROM settings WHERE key = ?').bind(KEY).first<{ value: string }>();
    if (r?.value) {
      const list = JSON.parse(r.value);
      if (Array.isArray(list) && list.length) return list.filter((x) => typeof x === 'string' && x.trim());
    }
  } catch { /* fall back to defaults */ }
  return [...DEFAULT_CATS];
}

async function saveCats(db: D1Database, list: string[]) {
  await db.prepare('INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value')
    .bind(KEY, JSON.stringify(list)).run();
}

// Returns the category name to use (an existing one if the name matches), or an error message
export async function addCat(db: D1Database, raw: string): Promise<{ name: string } | { error: string }> {
  const name = cleanCat(raw);
  if (name.length < 2 || !slug(name)) return { error: 'Type a category name (at least 2 letters or numbers).' };
  const list = await getCats(db);
  const same = list.find((x) => slug(x) === slug(name));
  if (same) return { name: same };
  if (list.length >= MAX_CATS) return { error: `You can have at most ${MAX_CATS} categories.` };
  await saveCats(db, [...list, name]);
  return { name };
}

export async function removeCat(db: D1Database, name: string): Promise<{ ok: true } | { error: string }> {
  const used = await db.prepare('SELECT COUNT(*) AS n FROM posts WHERE category = ?').bind(name).first<{ n: number }>();
  if (used && used.n > 0) return { error: `"${name}" still has ${used.n} post${used.n === 1 ? '' : 's'}. Move them to another category first.` };
  const list = await getCats(db);
  if (list.length <= 1) return { error: 'Keep at least one category.' };
  await saveCats(db, list.filter((x) => x !== name));
  return { ok: true };
}
