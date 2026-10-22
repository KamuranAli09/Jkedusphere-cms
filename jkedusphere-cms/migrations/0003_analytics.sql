-- First-party analytics (privacy friendly: no IP addresses or cookies are stored).
-- Run this once in the D1 console (same way as 0001_init.sql).
CREATE TABLE IF NOT EXISTS a_seen (
  day TEXT NOT NULL, vh TEXT NOT NULL,
  PRIMARY KEY (day, vh)
) WITHOUT ROWID;
CREATE TABLE IF NOT EXISTS a_page (
  day TEXT NOT NULL, path TEXT NOT NULL, views INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (day, path)
) WITHOUT ROWID;
CREATE INDEX IF NOT EXISTS idx_a_page_path ON a_page(path, day);
CREATE TABLE IF NOT EXISTS a_dim (
  dim TEXT NOT NULL, day TEXT NOT NULL, k TEXT NOT NULL, n INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (dim, day, k)
) WITHOUT ROWID;
CREATE TABLE IF NOT EXISTS a_psrc (
  day TEXT NOT NULL, path TEXT NOT NULL, src TEXT NOT NULL, n INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (day, path, src)
) WITHOUT ROWID;
CREATE INDEX IF NOT EXISTS idx_a_psrc_path ON a_psrc(path, day);
