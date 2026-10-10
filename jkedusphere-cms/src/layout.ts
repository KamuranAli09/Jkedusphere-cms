import { html } from 'hono/html';

export const adminPage = (title: string, body: unknown, nav = false) => html`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow"><title>${title} - JKEdusphere Admin</title>
<style>
:root{--navy:#0b3a6e;--sky:#1e90d6;--bg:#f4f6fa;--line:#dde3ec}
*{box-sizing:border-box}body{margin:0;font-family:system-ui,Segoe UI,Roboto,sans-serif;background:var(--bg);color:#1c2430}
header{background:var(--navy);color:#fff;padding:12px 20px;display:flex;justify-content:space-between;align-items:center}
header b{font-size:18px}header form{margin:0}
main{max-width:980px;margin:24px auto;padding:0 16px}
.card{background:#fff;border:1px solid var(--line);border-radius:10px;padding:20px;margin-bottom:16px}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px}
.stat{font-size:30px;font-weight:700;color:var(--navy)}.muted{color:#667085;font-size:14px}
label{display:block;margin:12px 0 4px;font-weight:600;font-size:14px}
input{width:100%;padding:10px;border:1px solid #c4ccd8;border-radius:8px;font-size:15px}
button{background:var(--sky);color:#fff;border:0;border-radius:8px;padding:10px 18px;font-size:15px;cursor:pointer;margin-top:14px}
button.ghost{background:transparent;border:1px solid #fff;margin:0;padding:6px 12px}
.err{background:#fde8e8;color:#9b1c1c;padding:10px;border-radius:8px;margin-bottom:10px}
.box{max-width:400px;margin:60px auto}
</style></head><body>
${nav ? html`<header><b>JKEdusphere Admin</b><form method="post" action="/admin/logout"><button class="ghost">Log out</button></form></header>` : ''}
<main>${body}</main></body></html>`;
