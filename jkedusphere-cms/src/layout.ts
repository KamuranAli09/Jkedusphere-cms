import { html } from 'hono/html';

export const adminPage = (title: string, body: unknown, nav = false) => html`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow"><title>${title} - JKEdusphere Admin</title>
<style>
:root{--navy:#0b3a6e;--sky:#1e90d6;--bg:#f4f6fa;--line:#dde3ec}
*{box-sizing:border-box}body{margin:0;font-family:system-ui,Segoe UI,Roboto,sans-serif;background:var(--bg);color:#1c2430}
header{background:var(--navy);color:#fff;padding:10px 20px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px}
header b{font-size:18px;margin-right:18px}header nav{display:inline}header nav a{color:#cfe3f7;text-decoration:none;margin-right:14px;font-size:15px}header nav a:hover{color:#fff}header form{margin:0}
main{max-width:1000px;margin:24px auto;padding:0 16px}
.card{background:#fff;border:1px solid var(--line);border-radius:10px;padding:20px;margin-bottom:16px}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px}
.stat{font-size:30px;font-weight:700;color:var(--navy)}.muted{color:#667085;font-size:14px}
label{display:block;margin:14px 0 4px;font-weight:600;font-size:14px}
input,select,textarea{width:100%;padding:10px;border:1px solid #c4ccd8;border-radius:8px;font-size:15px;font-family:inherit;background:#fff}
textarea{min-height:80px}
button,.btn{background:var(--sky);color:#fff;border:0;border-radius:8px;padding:9px 16px;font-size:15px;cursor:pointer;margin-top:14px;text-decoration:none;display:inline-block}
button.ghost{background:transparent;border:1px solid #fff;margin:0;padding:6px 12px}
button.danger{background:#c0392b}button.light,.btn.light{background:#e8eef6;color:var(--navy);margin-top:0}
.err{background:#fde8e8;color:#9b1c1c;padding:10px;border-radius:8px;margin-bottom:10px}
.ok{background:#e6f6ec;color:#1e6b3a;padding:10px;border-radius:8px;margin-bottom:10px}
.box{max-width:400px;margin:60px auto}
.row{display:flex;gap:12px;flex-wrap:wrap}.row>div{flex:1;min-width:200px}
table{width:100%;border-collapse:collapse}th,td{text-align:left;padding:10px 8px;border-bottom:1px solid var(--line);font-size:14px}
.badge{padding:2px 8px;border-radius:99px;font-size:12px;background:#e8eef6;color:var(--navy)}
.badge.pub{background:#e6f6ec;color:#1e6b3a}.badge.sch{background:#fff4d6;color:#8a5a00}
.bar{display:flex;gap:10px;flex-wrap:wrap;align-items:end;margin-bottom:14px}.bar input,.bar select{width:auto}
.toolbar{display:flex;flex-wrap:wrap;gap:4px;border:1px solid #c4ccd8;border-bottom:0;border-radius:8px 8px 0 0;padding:6px;background:#f0f4f9}
.toolbar button{margin:0;padding:5px 10px;font-size:13px;background:#fff;color:#1c2430;border:1px solid #c4ccd8}
.editor{min-height:340px;border:1px solid #c4ccd8;border-radius:0 0 8px 8px;padding:14px;background:#fff;line-height:1.6;overflow:auto}
.editor img{max-width:100%;height:auto}.editor table{border:1px solid #bbb}.editor td,.editor th{border:1px solid #bbb;padding:6px}
.source{min-height:340px;font-family:ui-monospace,Consolas,monospace;font-size:13px;border-radius:0 0 8px 8px}
.thumb{max-height:90px;margin-top:8px;border-radius:6px;border:1px solid var(--line)}
</style></head><body>
${nav ? html`<header><div><b>JKEdusphere Admin</b><nav><a href="/admin">Dashboard</a><a href="/admin/posts">Posts</a><a href="/admin/pages">Pages</a><a href="/admin/layout">Layout</a><a href="/admin/import">Import</a></nav></div><form method="post" action="/admin/logout"><button class="ghost">Log out</button></form></header>` : ''}
<main>${body}</main>
${nav ? html`<script src="/admin/assets/app.js" defer></script>` : ''}
</body></html>`;
