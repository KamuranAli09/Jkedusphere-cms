import { html } from 'hono/html';

export const adminPage = (title: string, body: unknown, nav = false) => html`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow"><title>${title} - JKEdusphere Admin</title>
<style>

:root {
  --navy: #172554;
  --sky: #4f46e5;
  --bg: #f5f7fb;
  --line: #e2e8f0;
  --surface: #ffffff;
  --text: #172033;
  --muted: #64748b;
  --success: #15803d;
  --radius: 14px;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system,
    "Segoe UI", sans-serif;
  background: var(--bg);
  color: var(--text);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

header {
  background: #ffffff;
  color: var(--text);
  padding: 16px 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 14px;
  border-bottom: 1px solid var(--line);
  box-shadow: 0 2px 10px rgba(15, 23, 42, 0.03);
}

header b {
  font-size: 19px;
  font-weight: 800;
  letter-spacing: -0.5px;
  margin-right: 24px;
  color: var(--navy);
}

header nav {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 6px;
}

header nav a {
  color: #475569;
  text-decoration: none;
  margin-right: 0;
  font-size: 14px;
  font-weight: 600;
  padding: 9px 12px;
  border-radius: 9px;
  transition: background 0.2s, color 0.2s;
}

header nav a:hover,
header nav a:focus-visible {
  color: var(--sky);
  background: #eef2ff;
}

header form {
  margin: 0;
}

main {
  width: 100%;
  max-width: 1180px;
  margin: 32px auto;
  padding: 0 24px;
}

.card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 4px 18px rgba(15, 23, 42, 0.035);
}

.card h1,
.card h2,
.card h3 {
  color: var(--navy);
  line-height: 1.3;
  letter-spacing: -0.4px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 18px;
}

.stat {
  font-size: clamp(28px, 4vw, 36px);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -1px;
  color: var(--sky);
}

.muted {
  color: var(--muted);
  font-size: 14px;
}

label {
  display: block;
  margin: 16px 0 6px;
  font-weight: 650;
  font-size: 14px;
  color: #334155;
}

input,
select,
textarea {
  width: 100%;
  min-width: 0;
  padding: 12px 14px;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  font: inherit;
  font-size: 15px;
  color: var(--text);
  background: #fff;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

input:focus,
select:focus,
textarea:focus {
  border-color: var(--sky);
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.12);
}

textarea {
  min-height: 110px;
  resize: vertical;
}

button,
.btn {
  appearance: none;
  background: var(--sky);
  color: #fff;
  border: 1px solid var(--sky);
  border-radius: 10px;
  padding: 10px 17px;
  font: inherit;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 14px;
  text-decoration: none;
  display: inline-block;
  transition: transform 0.15s, background 0.2s, box-shadow 0.2s;
}

button:hover,
.btn:hover {
  background: #4338ca;
  border-color: #4338ca;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.18);
}

button:active,
.btn:active {
  transform: translateY(1px);
}

button.ghost {
  background: #fff;
  color: #475569;
  border: 1px solid var(--line);
  margin: 0;
  padding: 8px 13px;
}

button.ghost:hover {
  background: #f1f5f9;
  box-shadow: none;
}

button.danger {
  background: #dc2626;
  border-color: #dc2626;
}

button.light,
.btn.light {
  background: #eef2ff;
  color: #3730a3;
  border-color: #e0e7ff;
  margin-top: 0;
  box-shadow: none;
}

.err {
  background: #fef2f2;
  color: #b91c1c;
  border: 1px solid #fecaca;
  padding: 13px 16px;
  border-radius: 11px;
  margin-bottom: 16px;
}

.ok {
  background: #f0fdf4;
  color: #166534;
  border: 1px solid #bbf7d0;
  padding: 13px 16px;
  border-radius: 11px;
  margin-bottom: 16px;
}

.box {
  width: calc(100% - 32px);
  max-width: 440px;
  margin: 64px auto;
  background: #fff;
  padding: 30px;
  border: 1px solid var(--line);
  border-radius: 18px;
  box-shadow: 0 15px 45px rgba(15, 23, 42, 0.07);
}

.row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.row > div {
  flex: 1 1 220px;
  min-width: 0;
}

table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: #fff;
}

th,
td {
  text-align: left;
  padding: 13px 14px;
  border-bottom: 1px solid var(--line);
  font-size: 14px;
  vertical-align: middle;
}

th {
  background: #f8fafc;
  color: #475569;
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

tr:last-child td {
  border-bottom: 0;
}

tbody tr:hover td {
  background: #fafbff;
}

.badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  background: #eef2ff;
  color: #4338ca;
}

.badge.pub {
  background: #dcfce7;
  color: #166534;
}

.badge.sch {
  background: #fef3c7;
  color: #92400e;
}

.bar {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: end;
  margin-bottom: 18px;
}

.bar input,
.bar select {
  width: auto;
  max-width: 100%;
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  border: 1px solid var(--line);
  border-radius: 11px 11px 0 0;
  padding: 10px;
  background: #f8fafc;
}

.toolbar button {
  margin: 0;
  padding: 7px 11px;
  font-size: 13px;
  background: #fff;
  color: #334155;
  border: 1px solid #cbd5e1;
  border-radius: 7px;
  box-shadow: none;
}

.toolbar button:hover {
  background: #eef2ff;
  color: #4338ca;
}

.editor {
  min-height: 340px;
  border: 1px solid var(--line);
  border-radius: 0 0 11px 11px;
  padding: 18px;
  background: #fff;
  line-height: 1.75;
  overflow: auto;
}

.editor img {
  max-width: 100%;
  height: auto;
}

.editor table {
  border: 1px solid #cbd5e1;
}

.editor td,
.editor th {
  border: 1px solid #cbd5e1;
  padding: 7px;
}

.source {
  min-height: 340px;
  font-family: ui-monospace, Consolas, monospace;
  font-size: 13px;
  border-radius: 0 0 11px 11px;
}

.thumb {
  max-width: 100%;
  max-height: 110px;
  margin-top: 10px;
  border-radius: 9px;
  border: 1px solid var(--line);
  object-fit: cover;
}

a:focus-visible,
button:focus-visible {
  outline: 3px solid #a5b4fc;
  outline-offset: 3px;
}

@media (max-width: 760px) {
  header {
    padding: 15px 16px;
    align-items: flex-start;
  }

  header > div {
    width: 100%;
  }

  header b {
    display: block;
    margin: 0 0 12px;
  }

  header nav {
    display: flex;
    gap: 5px;
  }

  header nav a {
    padding: 8px 10px;
    font-size: 13px;
  }

  main {
    margin: 22px auto;
    padding: 0 14px;
  }

  .card {
    padding: 17px;
    overflow-wrap: anywhere;
  }

  .box {
    margin: 30px auto;
    padding: 22px;
  }

  .bar input,
  .bar select {
    flex: 1 1 140px;
    width: 100%;
  }

  .grid {
    grid-template-columns: repeat(auto-fit, minmax(145px, 1fr));
    gap: 12px;
  }

  table {
    font-size: 13px;
  }

  th,
  td {
    padding: 10px 9px;
  }

  .card:has(table) {
    overflow-x: auto;
  }
}

@media (max-width: 420px) {
  .grid {
    grid-template-columns: 1fr;
  }

  button,
  .btn {
    max-width: 100%;
  }
}

</style></head><body>
${nav ? html`<header><div><b>JKEdusphere Admin</b><nav><a href="/admin">Dashboard</a><a href="/admin/posts">Posts</a><a href="/admin/categories">Categories</a><a href="/admin/pages">Pages</a><a href="/admin/layout">Layout</a><a href="/admin/import">Import</a></nav></div><form method="post" action="/admin/logout"><button class="ghost">Log out</button></form></header>` : ''}
<main>${body}</main>
${nav ? html`<script src="/admin/assets/app.js" defer></script>` : ''}
</body></html>`;
