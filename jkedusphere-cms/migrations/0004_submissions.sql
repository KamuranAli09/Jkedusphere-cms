-- Reader contributions (no login). Run once in the D1 console, same way as the other migrations.
CREATE TABLE IF NOT EXISTS submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT NOT NULL UNIQUE,          -- tracking ID shown to the author, e.g. JK-7F3K9Q2M
  title TEXT NOT NULL,
  category TEXT,
  excerpt TEXT,
  body TEXT NOT NULL,                 -- plain text as written by the contributor
  name TEXT NOT NULL,
  age INTEGER,
  qualification TEXT,
  email TEXT,
  show_age INTEGER NOT NULL DEFAULT 0,
  show_email INTEGER NOT NULL DEFAULT 0,
  photo TEXT,                         -- base64, small (320px) image
  photo_mime TEXT,
  photo_url TEXT,                     -- /img/<id> once copied to media when the draft post is created
  status TEXT NOT NULL DEFAULT 'pending',  -- pending | review | changes | accepted | rejected
  admin_note TEXT,                    -- message the author sees on the tracking page
  post_id INTEGER,                    -- the post created from this submission
  ip_hash TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_sub_post ON submissions(post_id);
CREATE INDEX IF NOT EXISTS idx_sub_status ON submissions(status, created_at);
CREATE INDEX IF NOT EXISTS idx_sub_ip ON submissions(ip_hash, created_at);
