-- Backlink tracker for the admin "SEO & AI" page.
-- Run this once in the D1 console (same way as the earlier migrations).
CREATE TABLE IF NOT EXISTS backlinks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  source_url TEXT NOT NULL,
  anchor TEXT,
  target_path TEXT,
  kind TEXT,
  status TEXT NOT NULL DEFAULT 'planned',
  notes TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_backlinks_status ON backlinks(status, created_at);
