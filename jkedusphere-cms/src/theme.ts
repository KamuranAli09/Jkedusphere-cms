// Public site stylesheet, served at /assets/theme.css
// This is plain CSS inside backticks, so you can edit it directly.
export const THEME_CSS = `:root{--bg:#fff;--soft:#f3f8fd;--ink:#14224a;--mut:#56637f;--line:#dfe6f1;--navy:#1b2a6b;--blue:#2f78c4;--sky:#63b7ea;--l1:#1b2a6b;--l2:#2c5ba0;--l3:#68bbea;--tg:#8a8f99;--red:#c0392b;--redbg:#fbe9e6;--green:#12795a;--greenbg:#e2f4ed}
:root{color-scheme:light;box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}
html{scroll-padding-top:env(safe-area-inset-top,0px)}
*,*::before,*::after{box-sizing:inherit}
body{margin:0;background:var(--bg);color:var(--ink);font:400 16px/1.65 Lato,system-ui,"Segoe UI",Arial,sans-serif}
h1,h2,h3{margin:0;line-height:1.2;font-weight:900;color:var(--ink)}
a{color:inherit}
.w{max-width:1180px;margin:0 auto;padding:0 20px}
/* Brand logo: reuse this block on both sites */
.jk-logo{display:inline-flex;flex-direction:column;align-items:flex-start;text-decoration:none;line-height:1}
.jk-wm{font:900 32px/1 Lato,system-ui,sans-serif;letter-spacing:-.025em;background:linear-gradient(90deg,var(--l1) 0%,var(--l2) 48%,var(--l3) 100%);-webkit-background-clip:text;background-clip:text;color:transparent;padding-bottom:2px}
.jk-tag{font:400 10.6px/1 Lato,system-ui,sans-serif;color:var(--tg);margin-top:4px;letter-spacing:.015em}
.jk-logo.dk .jk-wm{background:none;color:#fff}.jk-logo.dk .jk-tag{color:#aab8e0}
header{background:var(--bg);border-bottom:1px solid var(--line);position:sticky;top:env(safe-area-inset-top,0px);z-index:9}
.bar{display:flex;align-items:center;gap:24px;min-height:74px}
nav.m{display:flex;gap:2px;flex:1;overflow-x:auto;scrollbar-width:none}
nav.m a{padding:10px 14px;text-decoration:none;font-weight:700;font-size:15px;color:var(--mut);white-space:nowrap;border-bottom:3px solid transparent}
nav.m a:hover{color:var(--blue);border-bottom-color:var(--blue)}
.btn{display:inline-block;font-weight:700;font-size:15px;padding:11px 22px;border-radius:6px;text-decoration:none;white-space:nowrap;background:var(--navy);color:#fff;border:2px solid var(--navy)}
.btn.o{background:transparent;color:var(--navy)}
.btn.w2{background:#fff;color:#1b2a6b;border-color:#fff}
a:focus-visible,summary:focus-visible,input:focus-visible{outline:3px solid var(--sky);outline-offset:2px}
@media(max-width:860px){nav.m{display:none}.bar{justify-content:space-between}}
.hero{background:#fff;border-bottom:1px solid var(--line)}
.hg{display:grid;grid-template-columns:1.15fr 1fr;gap:48px;padding:56px 20px;align-items:center}
@media(max-width:900px){.hg{grid-template-columns:1fr;padding:36px 20px}}
.hero h1{font-size:clamp(32px,4.8vw,52px);letter-spacing:-.02em;max-width:14em}
.hero p.s{font-size:18px;color:var(--mut);max-width:34em;margin:16px 0 24px}
.search{display:flex;max-width:560px;background:var(--bg);border:2px solid var(--navy);border-radius:8px;overflow:hidden}
.search input{flex:1;min-width:0;border:0;padding:14px 16px;font:inherit;color:var(--ink);background:transparent}
.search button{border:0;background:var(--navy);color:#fff;font:700 15px Lato,sans-serif;padding:0 26px;cursor:pointer}
.chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}
.chips a{border:1px solid var(--line);background:var(--bg);padding:5px 14px;border-radius:99px;font-size:14px;font-weight:700;text-decoration:none;color:var(--navy)}
.chips a:hover{border-color:var(--blue);color:var(--blue)}
.nb{background:var(--bg);border:1px solid var(--line);border-radius:10px;overflow:hidden;box-shadow:0 8px 24px rgba(27,42,107,.08)}
.nb h2{font-size:18px;padding:16px 20px;border-bottom:1px solid var(--line);background:var(--bg)}
.nb a{display:block;text-decoration:none;padding:14px 20px;border-bottom:1px solid var(--line)}
.nb a:last-child{border-bottom:0}.nb a:hover{background:var(--soft)}
.nb b{display:block;font-size:16px}.nb small{color:var(--mut);font-size:13.5px}
.tag{display:inline-block;font-size:12px;font-weight:700;padding:2px 10px;border-radius:4px;margin-right:8px;background:var(--soft);color:var(--blue)}
.tag.n{background:var(--greenbg);color:var(--green)}.tag.c{background:var(--redbg);color:var(--red)}
.tr{border-bottom:1px solid var(--line)}
.tr .w{display:flex;flex-wrap:wrap;justify-content:space-between;gap:10px 28px;padding-top:14px;padding-bottom:14px;font-weight:700;font-size:14.5px;color:var(--mut)}
.tr span::before{content:"";display:inline-block;width:8px;height:8px;border-radius:2px;background:var(--sky);margin-right:8px}
section.s{margin-top:64px}
.sh{display:flex;justify-content:space-between;align-items:end;gap:16px;margin-bottom:24px;border-bottom:2px solid var(--navy);padding-bottom:12px}
.sh h2{font-size:clamp(24px,3vw,32px)}.sh p{margin:4px 0 0;color:var(--mut)}
.sh a{font-weight:700;color:var(--blue);white-space:nowrap}
.cats{display:grid;grid-template-columns:repeat(7,1fr);gap:12px}
@media(max-width:900px){.cats{grid-template-columns:repeat(4,1fr)}}@media(max-width:560px){.cats{grid-template-columns:repeat(2,1fr)}}
.cats a{text-decoration:none;background:var(--bg);border:1px solid var(--line);border-top:4px solid var(--blue);border-radius:6px;padding:16px 14px}
.cats a:hover{border-top-color:var(--navy);box-shadow:0 8px 20px rgba(27,42,107,.1)}
.cats b{display:block;font-size:18px;font-weight:900}.cats small{color:var(--mut);font-size:13.5px}
.vg{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
@media(max-width:900px){.vg{grid-template-columns:1fr 1fr}}@media(max-width:560px){.vg{grid-template-columns:1fr}}
.vc{background:var(--bg);border:1px solid var(--line);border-radius:8px;padding:20px}
.vc:hover{border-color:var(--blue);box-shadow:0 8px 22px rgba(27,42,107,.1)}
.vt{display:flex;justify-content:space-between;align-items:center;font-size:13.5px;color:var(--mut);font-weight:700}
.vt span{color:var(--blue);background:var(--soft);padding:3px 10px;border-radius:4px}
.vc h3{font-size:18px;margin:14px 0 6px}.vc p{margin:0 0 14px;color:var(--mut);font-size:15px}
.vc a{font-weight:700;color:var(--blue);text-decoration:none}.vc a:hover{text-decoration:underline}
.ca{display:grid;grid-template-columns:1fr 1.3fr;gap:24px}
@media(max-width:900px){.ca{grid-template-columns:1fr}}
.mag{background:var(--navy);color:#fff;border-radius:10px;padding:32px;display:flex;flex-direction:column;justify-content:space-between;min-height:300px;border-left:6px solid var(--sky)}
.mag h3{font-size:28px;color:#fff}.mag p{color:#c6d3f3;margin:10px 0 22px}.mag small{font-weight:700;color:var(--sky)}
.lst{border:1px solid var(--line);border-radius:10px;padding:6px 24px}
.lst a{display:flex;justify-content:space-between;gap:14px;padding:16px 0;border-bottom:1px solid var(--line);text-decoration:none;font-weight:700}
.lst a:last-child{border-bottom:0}.lst a:hover{color:var(--blue)}.lst small{color:var(--mut);font-weight:400;white-space:nowrap}
.gs{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}
@media(max-width:900px){.gs{grid-template-columns:1fr 1fr}}@media(max-width:560px){.gs{grid-template-columns:1fr}}
.gs a{text-decoration:none;border:1px solid var(--line);border-radius:8px;padding:22px;background:var(--bg)}
.gs a:hover{border-color:var(--blue)}
.gs i{display:grid;place-items:center;width:42px;height:42px;border-radius:8px;background:var(--soft);color:var(--blue);font:900 15px Lato,sans-serif;font-style:normal;margin-bottom:14px}
.gs h3{font-size:18px}.gs p{margin:6px 0 0;color:var(--mut);font-size:15px}
.prep{margin-top:72px;background:var(--navy);color:#fff;padding:52px 0}
.prep .sh{border-bottom-color:#ffffff40}.prep h2{color:#fff}.prep .sh p{color:#c6d3f3}.prep .sh a{color:var(--sky)}
.bk{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}
@media(max-width:900px){.bk{grid-template-columns:1fr 1fr}}@media(max-width:560px){.bk{grid-template-columns:1fr}}
.bc{background:#fff;color:#14224a;border-radius:8px;padding:22px;min-height:210px;display:flex;flex-direction:column;justify-content:space-between;border-top:5px solid var(--sky)}
.bc h3{font-size:21px;color:#14224a}.bc p{margin:6px 0 16px;color:#56637f;font-size:15px}
.bc .btn{background:#1b2a6b;border-color:#1b2a6b;color:#fff;align-self:flex-start}
.bc.g{background:#ffffff14;color:#fff;border-top-color:#ffffff55}.bc.g h3{color:#fff}.bc.g p{color:#c6d3f3}
.bc.g .btn{background:transparent;border-color:#ffffff66;color:#fff}
.how{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
@media(max-width:900px){.how{grid-template-columns:1fr}}
.how div{border-left:4px solid var(--sky);padding:4px 0 4px 18px}
.how h3{font-size:19px}.how p{margin:6px 0 0;color:var(--mut)}
.join{background:#fff;border:1px solid var(--line);border-radius:10px;padding:32px;display:flex;flex-wrap:wrap;gap:16px 32px;justify-content:space-between;align-items:center}
.join h2{font-size:26px}.join p{margin:6px 0 0;color:var(--mut)}
.faq{max-width:860px}
details{border:1px solid var(--line);border-radius:8px;margin-bottom:10px;padding:0 20px}
summary{cursor:pointer;font-weight:700;padding:16px 0}
details p{margin:0 0 16px;color:var(--mut)}
footer{background:var(--navy);color:#b9c7ee;margin-top:72px;padding:40px 0;font-size:14.5px}
footer .w{display:flex;flex-wrap:wrap;gap:24px 48px;justify-content:space-between}
footer p{max-width:44em;margin:14px 0 0}footer nav{display:flex;flex-wrap:wrap;gap:8px 20px}footer a{color:#fff}
/* ---- Post, page and listing templates ---- */
.crumb{padding-top:18px;padding-bottom:4px;font-size:14px;color:var(--mut)}.crumb a{color:var(--blue);text-decoration:none}.crumb span{margin:0 8px}
.lp{padding-top:20px;padding-bottom:40px}.lp h1{font-size:clamp(28px,4vw,40px)}.s2{color:var(--mut);margin:8px 0 0}
.pager{display:flex;gap:12px;margin-top:26px}
.pg{display:grid;grid-template-columns:minmax(0,1fr) 320px;gap:36px;padding-top:12px;padding-bottom:48px}
@media(max-width:900px){.pg{grid-template-columns:1fr}}
.art h1{font-size:clamp(28px,4.2vw,42px);letter-spacing:-.02em;margin:10px 0 8px}.art .tag{margin:0}
.meta{color:var(--mut);font-size:14.5px;margin:0 0 18px}
.hero-img{width:100%;height:auto;border-radius:8px;border:1px solid var(--line);margin:0 0 20px}
.glance{border:1px solid var(--line);border-left:5px solid var(--blue);border-radius:8px;margin:0 0 24px;overflow:hidden}
.glance h2{font-size:18px;padding:14px 18px;background:var(--soft)}
.glance table{width:100%;border-collapse:collapse}.glance th,.glance td{text-align:left;padding:11px 18px;border-top:1px solid var(--line);font-size:15.5px}.glance th{width:55%;font-weight:700}
.prose{font-size:17.5px;line-height:1.8;overflow-wrap:anywhere}
.prose h2{font-size:26px;margin:1.6em 0 .5em}.prose h3{font-size:21px;margin:1.4em 0 .4em}.prose p{margin:0 0 1.1em}
.prose a{color:var(--blue);text-decoration:underline}.prose img{max-width:100%;height:auto;border-radius:6px}
.prose ul,.prose ol{padding-left:1.4em;margin:0 0 1.1em}.prose li{margin:.3em 0}
.prose blockquote{margin:1.2em 0;padding:.4em 1.2em;border-left:4px solid var(--sky);color:var(--mut);background:var(--soft)}
.prose table{width:100%;border-collapse:collapse;display:block;overflow-x:auto;margin:0 0 1.2em}.prose th,.prose td{border:1px solid var(--line);padding:9px 12px;text-align:left;font-size:16px}.prose th{background:var(--soft)}
.cta{background:var(--navy);color:#fff;border-radius:10px;padding:24px;margin:30px 0;display:flex;flex-wrap:wrap;gap:14px 24px;justify-content:space-between;align-items:center}
.cta h3{color:#fff;font-size:21px}.cta p{margin:4px 0 0;color:#c6d3f3}
.share{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin:0 0 20px}.share a{border:1px solid var(--line);border-radius:6px;padding:7px 16px;font-weight:700;text-decoration:none;color:var(--navy)}.share a:hover{border-color:var(--blue);color:var(--blue)}
.dnote{font-size:14.5px;color:var(--mut);border-top:1px solid var(--line);padding-top:16px}
.side{align-self:start}.box2{border:1px solid var(--line);border-radius:10px;overflow:hidden}
.box2 h2{font-size:18px;padding:14px 18px;border-bottom:2px solid var(--navy)}.box2 a{display:block;padding:13px 18px;border-bottom:1px solid var(--line);text-decoration:none;font-weight:700;font-size:15.5px;line-height:1.4}
.box2 a:last-child{border-bottom:0}.box2 a:hover{color:var(--blue)}.box2 small{display:block;font-weight:400;color:var(--mut)}
/* ---- Styles for older Blogger posts (classes used in imported content) ---- */
.prose .jke-post{max-width:none}.prose .jke-author{display:flex;align-items:center;gap:12px;background:#f3f8fd;border-left:4px solid var(--blue);padding:12px 16px;border-radius:6px;margin:0 0 20px}
.prose .jke-avatar{width:42px;height:42px;border-radius:50%;background:var(--navy);color:#fff;display:grid;place-items:center;font-weight:700;flex:none}.prose .jke-author-name{font-weight:700}.prose .jke-author-bio{font-size:13px;color:var(--mut)}
.prose .jke-summary{background:var(--navy);color:#fff;padding:16px 20px;border-radius:8px;margin:0 0 22px}.prose .jke-summary-title{font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;opacity:.75}
.prose .jke-callout,.prose .jke-tip,.prose .jke-warn{padding:12px 16px;border-radius:6px;margin:0 0 18px;font-size:16px;border-left:4px solid var(--blue);background:#f3f8fd}
.prose .jke-tip{border-left-color:#12795a;background:#e8f6f0}.prose .jke-warn{border-left-color:#d98200;background:#fff6e5}
.prose .jke-h2{border-left:4px solid var(--blue);padding-left:12px}.prose .jke-table-wrap{overflow-x:auto}.prose .jke-table th{background:var(--navy);color:#fff}
.prose .jke-steps,.prose .jke-strategy-grid,.prose .jke-two-col,.prose .jke-date-grid,.prose .jke-formula-grid{display:grid;gap:12px;margin:0 0 20px}
.prose .jke-two-col,.prose .jke-strategy-grid,.prose .jke-date-grid,.prose .jke-formula-grid{grid-template-columns:1fr 1fr}@media(max-width:640px){.prose .jke-two-col,.prose .jke-strategy-grid,.prose .jke-date-grid,.prose .jke-formula-grid{grid-template-columns:1fr}}
.prose .jke-step,.prose .jke-strategy-card,.prose .jke-two-col-box,.prose .jke-date-card,.prose .jke-worked,.prose .jke-pyq,.prose .jke-equation-box{border:1px solid var(--line);border-radius:8px;padding:14px 16px;background:#fff}
.prose .jke-formula-card,.prose .jke-mass-card{background:#0f1b33;color:#e8eefb;border-radius:8px;padding:14px 16px}.prose .jke-step{display:flex;gap:14px}.prose .jke-step-num{font-weight:900;font-size:24px;color:var(--blue)}
.prose .jke-faq-q{font-weight:700;border-left:3px solid var(--blue);padding-left:10px;margin:14px 0 4px}.prose .jke-faq-a{padding-left:13px;color:var(--mut)}
.prose .jke-golden{background:var(--navy);color:#fff;padding:20px;border-radius:8px;margin-top:24px}.prose .jke-golden-title{font-size:20px;font-weight:900}

/* =====================================================================
   MINIMAL SKIN  -  light, quiet, matches jkedusphere.com
   Everything below overrides the rules above. Edit the colours in :root
   to change the whole look.
   ===================================================================== */
:root{--ink:#18213a;--mut:#5d6a84;--line:#e6ebf2;--soft:#f7f9fc;--navy:#1b2a6b;--blue:#2f78c4}
body{line-height:1.7;color:var(--ink)}
h1,h2,h3{letter-spacing:-.015em}
.w{max-width:1120px}

/* header */
header{box-shadow:none;border-bottom:1px solid var(--line)}
.bar{min-height:70px}
.jk-wm{font-size:28px}
nav.m a{border-bottom:0;border-radius:8px;font-weight:600;padding:8px 12px}
nav.m a:hover{background:var(--soft);color:var(--navy);border:0}
.btn{border-radius:8px;padding:10px 20px;font-weight:700}

/* hero */
.hero{background:#fff;border-bottom:0}
.hg{padding:68px 20px 36px;gap:56px}
.hero h1{font-size:clamp(30px,4.4vw,46px);max-width:15em;line-height:1.15}
.hero p.s{font-size:17px;max-width:32em;margin:16px 0 26px}
.search{border:1px solid #cdd6e4;border-radius:10px;box-shadow:none}
.search:focus-within{border-color:var(--blue)}
.search input{padding:13px 16px}
.chips a{border:0;background:var(--soft);color:var(--navy);font-weight:600;padding:6px 14px}
.chips a:hover{background:#eaf1fb;color:var(--blue)}
.nb{box-shadow:none;border-radius:12px}
.nb h2{font-size:15px;font-weight:700;color:var(--mut);background:var(--soft)}
.nb a{padding:14px 20px}
.nb b{font-size:15.5px;font-weight:700}

/* trust strip */
.tr{border:0}
.tr .w{justify-content:flex-start;gap:8px 30px;padding-top:8px;padding-bottom:8px;font-size:14px;font-weight:600}
.tr span::before{width:6px;height:6px;border-radius:50%}

/* section headings */
section.s{margin-top:76px}
.sh{border-bottom:0;padding-bottom:0;margin-bottom:24px}
.sh h2{font-size:clamp(22px,2.6vw,28px)}
.sh a{font-size:15px}

/* cards: thin border, no shadow, same radius everywhere */
.vc,.gs a,.cats a,.how div,.lst,.box2,.glance,.join,.faq details,.cta{box-shadow:none;border-radius:12px}
.cats a{border:1px solid var(--line);padding:16px}
.cats a:hover,.vc:hover,.gs a:hover{border-color:var(--navy);box-shadow:none;transform:none}
.cats b{font-size:17px}
.vc{padding:22px}
.vt{font-size:13px}
.vt span{background:none;padding:0;color:var(--blue);font-weight:700}
.vc h3{font-size:18px;line-height:1.35}
.gs i{border-radius:10px}
.how div{border:0;border-top:2px solid var(--navy);border-radius:0;padding:14px 0 0}

/* current affairs: light card instead of a navy block */
.mag{background:#fff;color:var(--ink);border:1px solid var(--line);border-left:1px solid var(--line);border-radius:12px;min-height:260px}
.mag h3{color:var(--ink)}
.mag p{color:var(--mut)}
.mag small{color:var(--blue)}
.mag .btn.w2{background:var(--navy);border-color:var(--navy);color:#fff}
.lst{padding:4px 24px}

/* jkedusphere.com band: soft grey strip instead of navy */
.prep{background:var(--soft);color:var(--ink);border-top:1px solid var(--line);border-bottom:1px solid var(--line);padding:60px 0;margin-top:80px}
.prep h2{color:var(--ink)}
.prep .sh p{color:var(--mut)}
.prep .sh a{color:var(--blue)}
.prep .sh{border-bottom:0}
.bc{background:#fff;color:var(--ink);border:1px solid var(--line);border-top:1px solid var(--line);border-radius:12px;min-height:200px}
.bc.g{background:transparent;border:1px dashed #c9d3e2;color:var(--mut)}
.bc.g h3{color:var(--ink)}
.bc.g p{color:var(--mut)}
.bc.g .btn{background:transparent;border-color:#c9d3e2;color:var(--mut)}

/* call-to-action strips */
.join{background:var(--soft);border:1px solid var(--line);padding:28px 30px}
.cta{background:var(--soft);color:var(--ink);border:1px solid var(--line)}
.cta h3{color:var(--ink)}
.cta p{color:var(--mut)}
.cta .btn.w2{background:var(--navy);border-color:var(--navy);color:#fff}

/* FAQ: plain list with thin dividers */
.faq details{border:0;border-bottom:1px solid var(--line);border-radius:0;padding:0}
.faq summary{padding:18px 0}
.faq details p{margin:0 0 18px}

/* footer: light, not navy */
footer{background:var(--soft);color:var(--mut);border-top:1px solid var(--line);margin-top:80px}
footer a{color:var(--navy)}
.jk-logo.dk .jk-wm{background:linear-gradient(90deg,#1b2a6b 0%,#2c5ba0 48%,#68bbea 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
.jk-logo.dk .jk-tag{color:#8a8f99}

/* post and page */
.tag{border-radius:6px}
.crumb{padding-top:22px}
.art h1{font-size:clamp(26px,3.8vw,38px)}
.hero-img{border-radius:12px}
.glance{border-left:1px solid var(--line)}
.glance h2{font-size:16px;color:var(--mut);background:var(--soft)}
.prose{font-size:17px}
.prose th,.prose .jke-table th{background:var(--soft);color:var(--ink)}
.prose .jke-summary,.prose .jke-golden{background:var(--soft);color:var(--ink);border:1px solid var(--line)}
.prose .jke-summary-title{color:var(--blue);opacity:1}
.share a{border-radius:8px}
.box2{border-radius:12px}
.box2 h2{font-size:16px;border-bottom:1px solid var(--line);color:var(--mut)}

@media(max-width:640px){
  .hg{padding:36px 20px 20px}
  section.s{margin-top:52px}
  .prep{padding:44px 0;margin-top:56px}
  .join{padding:22px}
}

/* ---- Minimal centred hero + subject tiles ---- */
.eyebrow{display:inline-block;font-size:13px;font-weight:700;color:var(--blue);background:var(--soft);border:1px solid var(--line);border-radius:99px;padding:5px 14px;margin-bottom:18px}
.hb{display:flex;flex-wrap:wrap;gap:10px;margin-top:24px}
.hero.c{background:linear-gradient(180deg,var(--soft) 0%,#fff 100%)}
.hero.c .hg{grid-template-columns:minmax(0,1fr);justify-items:center;text-align:center;padding:84px 20px 52px}
.hero.c .hg>div{width:100%;min-width:0}
.hero.c h1{font-size:clamp(34px,5.4vw,58px);max-width:13em;margin:0 auto;line-height:1.1}
.hero.c p.s{margin:18px auto 30px;max-width:36em}
.hero.c .search{margin:0 auto;max-width:620px;background:#fff;box-shadow:0 6px 24px rgba(27,42,107,.07)}
.hero.c .chips,.hero.c .hb{justify-content:center}
.btn.o{border-color:var(--line);color:var(--navy)}
.btn.o:hover{border-color:var(--navy)}
@media(max-width:640px){.hero.c .hg{padding:48px 20px 28px}}

/* ---- Library panel (subjects). Deep teal + warm amber: sits beside the navy/sky logo without copying it ---- */
:root{--tl:#0d7a85;--tl2:#094f5a;--am:#ffd166}
.lib{position:relative;overflow:hidden;background:linear-gradient(135deg,var(--tl) 0%,var(--tl2) 100%);border-radius:28px;padding:52px 46px;color:#fff}
.lib::after{content:"";position:absolute;right:-110px;top:-110px;width:340px;height:340px;border-radius:50%;background:radial-gradient(circle,rgba(104,187,234,.32),transparent 68%);pointer-events:none}
.lh{position:relative;z-index:1}
.lh h2{color:#fff;font-size:clamp(30px,4.4vw,46px);letter-spacing:-.02em}
.lh h2 em,.sh2 h2 em{font-style:normal}
.lh h2 em{color:var(--am)}
.lh p{margin:12px 0 0;max-width:36em;color:#d2edef;font-size:17px}
.ll{position:relative;z-index:1;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px 14px;margin-top:34px}
.ll a{display:flex;align-items:center;gap:14px;background:rgba(255,255,255,.12);border-radius:16px;padding:14px 16px;text-decoration:none;color:#fff;transition:background .15s}
.ll a:hover{background:rgba(255,255,255,.22)}
.ll i{flex:none;display:grid;place-items:center;width:40px;height:40px;border-radius:12px;background:rgba(255,255,255,.18);font:900 14px Lato,sans-serif;font-style:normal;color:#fff}
.ln{flex:1;min-width:0;display:flex;flex-direction:column;line-height:1.3}
.ln b{font-size:17px}
.ln small{color:#bde2e5;font-size:13.5px}
.ct{flex:none;min-width:34px;text-align:center;background:rgba(255,255,255,.22);border-radius:99px;padding:3px 11px;font-weight:700;font-size:14px}
@media(max-width:900px){.ll{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:600px){.lib{padding:34px 20px;border-radius:22px}.ll{grid-template-columns:minmax(0,1fr)}}

/* ---- Exam cards: swipeable row ---- */
.sh2{display:flex;justify-content:space-between;align-items:flex-end;gap:16px;margin-bottom:22px}
.sh2 h2{font-size:clamp(24px,3.2vw,34px)}
.sh2 h2 em{color:var(--tl)}
.sh2 p{margin:6px 0 0;color:var(--mut)}
.cn{display:flex;gap:10px;flex:none}
.cn button{width:44px;height:44px;border-radius:50%;border:1px solid var(--line);background:#fff;color:var(--navy);font-size:24px;line-height:1;cursor:pointer;padding:0}
.cn button:hover:not(:disabled){border-color:var(--navy)}
.cn button:disabled{opacity:.4;cursor:default}
.car{display:flex;gap:18px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;margin:0 -20px;padding:0 20px 6px;scroll-padding:0 20px}
.car::-webkit-scrollbar{display:none}
.xc{--ac:#2f78c4;--acb:#e8f1fb;flex:0 0 min(300px,82%);scroll-snap-align:start;background:#fff;border:1px solid var(--line);border-radius:20px;overflow:hidden;display:flex;flex-direction:column}
.xc.v1{--ac:#0d7a85;--acb:#e0f3f4}.xc.v2{--ac:#4455c9;--acb:#e9ecfb}.xc.v3{--ac:#b8560f;--acb:#fdf0df}.xc.v4{--ac:#1f6aa8;--acb:#e3f1fa}
.xh{height:170px;display:grid;place-items:center;padding:24px;background:linear-gradient(135deg,#3b86d1,#1b2a6b)}
.xc.v1 .xh{background:linear-gradient(135deg,#17a2a8,#094f5a)}
.xc.v2 .xh{background:linear-gradient(135deg,#6a7bea,#2c3a9a)}
.xc.v3 .xh{background:linear-gradient(135deg,#f3b04a,#c2571a)}
.xc.v4 .xh{background:linear-gradient(135deg,#4cb0e0,#1f6aa8)}
.xw{position:relative;border:3px solid #fff;border-radius:14px;padding:44px 30px 16px;min-width:150px;text-align:center}
.xw::before{content:"";position:absolute;left:14px;top:12px;width:6px;height:6px;border-radius:50%;background:#fff;box-shadow:12px 0 #fff,24px 0 #fff}
.xw::after{content:"";position:absolute;left:0;right:0;top:28px;border-top:3px solid #fff}
.xw b{display:block;color:#fff;font-size:30px;font-weight:900;letter-spacing:-.01em;line-height:1.1}
.xb{display:flex;flex-direction:column;flex:1;padding:22px}
.xb h3{font-size:20px}
.xb p{flex:1;margin:8px 0 14px;color:var(--mut);font-size:15px;line-height:1.6}
.xt{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:18px}
.xt span{background:var(--acb);color:var(--ac);border-radius:99px;padding:4px 12px;font-size:13px;font-weight:700}
.xc .btn{display:block;text-align:center;border-radius:10px;margin-top:auto}

/* ---- Hamburger, slide-out menu and subject bar ---- */
.mb{flex:none;width:42px;height:42px;border:1px solid var(--line);background:#fff;border-radius:10px;display:inline-flex;flex-direction:column;justify-content:center;align-items:center;gap:4px;cursor:pointer;padding:0}
.mb span{width:18px;height:2px;background:var(--navy);border-radius:2px}
.mb:hover{border-color:var(--navy)}
.sb{background:var(--navy)}
.sb nav{display:flex;gap:2px;overflow-x:auto;scrollbar-width:none;margin:0 -20px;padding:0 20px}
.sb nav::-webkit-scrollbar{display:none}
.sb a{flex:none;padding:13px 14px;color:#dbe5ff;text-decoration:none;font-weight:700;font-size:13.5px;letter-spacing:.08em;text-transform:uppercase;white-space:nowrap;border-bottom:3px solid transparent}
.sb a:hover{color:#fff;border-bottom-color:var(--am)}
.dr{position:fixed;inset:0;z-index:30;display:flex}
.dr[hidden]{display:none}
.ov{position:absolute;inset:0;background:rgba(10,16,40,.55)}
.dp{position:relative;width:min(330px,86vw);height:100%;background:#fff;overflow-y:auto;padding:18px 20px 28px;box-shadow:8px 0 30px rgba(0,0,0,.2)}
.dh{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
.dh b{font-size:18px;color:var(--navy)}
.dx{width:38px;height:38px;border:0;background:var(--soft);border-radius:10px;font-size:24px;line-height:1;cursor:pointer;color:var(--navy);padding:0}
.dp h4{margin:24px 0 4px;font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:var(--mut)}
.dp nav a{display:block;padding:12px 4px;text-decoration:none;font-weight:700;color:var(--ink);border-bottom:1px solid var(--line)}
.dp nav a:hover{color:var(--blue)}
.dp>.btn{display:block;text-align:center;margin-top:24px}
@media(max-width:860px){.bar{justify-content:flex-start;gap:12px}.bar>.btn{margin-left:auto}}
@media(max-width:560px){.bar{gap:10px}.bar>.btn{padding:9px 12px;font-size:13.5px}.jk-wm{font-size:24px}.jk-tag{font-size:9.5px}}

/* ---- Dark hero: headline, tagline, search, checklist, swipeable card ---- */
.hero.d{background:linear-gradient(180deg,#0f1840 0%,#17235a 100%);border-bottom:0;color:#fff}
.hero.d .hg{grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:48px;padding:64px 20px 56px;align-items:center}
.hero.d .hg>div{min-width:0}
.hero.d h1{color:#fff;font-size:clamp(34px,5.6vw,60px);line-height:1.08;max-width:12em;letter-spacing:-.02em}
.hero.d .tg{margin:16px 0 0;color:var(--am);font-weight:800;font-size:clamp(18px,2.3vw,24px);line-height:1.35;max-width:26em}
.hero.d p.s{color:#c6d3f3;margin:14px 0 0;max-width:34em}
.hero.d .search{margin:26px 0 0;max-width:560px;background:#fff;border:0}
.hero.d .eyebrow{background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.18);color:#cfe3ff}
.hero.d .chips{margin-top:16px}
.hero.d .chips a{background:rgba(255,255,255,.1);color:#fff}
.hero.d .chips a:hover{background:rgba(255,255,255,.18);color:#fff}
.hero.d .hb{margin-top:22px}
.hero.d .btn{background:var(--am);border-color:var(--am);color:#14204f}
.hero.d .btn.o{background:transparent;color:#fff;border-color:rgba(255,255,255,.35)}
.hl2{margin:30px 0 14px;color:#c6d3f3;font-weight:700;font-size:17px}
.hf{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px 22px;max-width:560px}
.hf li{position:relative;padding-left:28px;font-size:16.5px;font-weight:700;color:#fff;line-height:1.35}
.hf li::before{content:"✓";position:absolute;left:0;top:0;color:#3dd6c8;font-weight:900}
.hm{margin:20px 0 0;color:#aebbe6;font-weight:700}
.hm a{color:#3dd6c8;text-decoration:none}
.hm a:hover{text-decoration:underline}
.hc{min-width:0}
.ht{display:flex;gap:14px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none}
.ht::-webkit-scrollbar{display:none}
.hk{flex:0 0 100%;scroll-snap-align:start;display:flex;flex-direction:column;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:24px;padding:22px;text-align:center}
.hv{height:200px;border-radius:16px;overflow:hidden;display:grid;place-items:center;background:linear-gradient(135deg,#3b86d1,#1b2a6b)}
.hk.v1 .hv{background:linear-gradient(135deg,#17a2a8,#094f5a)}
.hk.v2 .hv{background:linear-gradient(135deg,#6a7bea,#2c3a9a)}
.hk.v3 .hv{background:linear-gradient(135deg,#f3b04a,#c2571a)}
.hk.v4 .hv{background:linear-gradient(135deg,#4cb0e0,#1f6aa8)}
.hv img{width:100%;height:100%;object-fit:cover}
.hk h3{color:#fff;font-size:24px;margin:20px 0 6px}
.hk p{flex:1;margin:0 0 20px;color:#c6d3f3}
.hk .btn{display:block;border-radius:12px;padding:14px}
.hd{display:flex;justify-content:center;gap:8px;margin-top:16px}
.hd button{width:10px;height:10px;border-radius:99px;border:0;padding:0;background:rgba(255,255,255,.3);cursor:pointer;transition:width .2s}
.hd button.on{width:28px;background:var(--am)}
/* The notice panel is a white card inside the dark hero: give it dark text (it used to inherit the hero's white) */
.hero.d .nb{color:var(--ink);text-align:left}
.hero.d .nb b{color:var(--ink)}
.hero.d .nb small{color:var(--mut)}

/* ---- Dark footer: big headline, button, link columns, copyright ---- */
footer.fd{background:linear-gradient(180deg,#17235a 0%,#0f1840 100%);color:#b9c7ee;margin-top:80px;padding:64px 0 26px;border-top:0}
footer.fd .w{display:block}
.ft{display:flex;flex-wrap:wrap;gap:22px 32px;justify-content:space-between;align-items:center;padding-bottom:40px;border-bottom:1px solid rgba(255,255,255,.14)}
.ft h2{color:#fff;font-size:clamp(28px,4.8vw,50px);letter-spacing:-.02em;line-height:1.1;flex:1 1 340px}
.ft h2 em{font-style:normal;color:var(--am)}
footer.fd .btn{background:var(--am);border-color:var(--am);color:#14204f}
.fg{display:grid;grid-template-columns:minmax(0,1.6fr) repeat(2,minmax(0,1fr));gap:40px;padding:40px 0}
.fb p{max-width:34em;margin:16px 0 0;color:#b9c7ee;font-size:15px;line-height:1.7}
.fg nav{display:flex;flex-direction:column;flex-wrap:nowrap;gap:0}
.fg h3{color:#fff;font-size:13px;letter-spacing:.1em;text-transform:uppercase;margin:0 0 12px}
footer.fd .fg a{color:#dbe5ff;text-decoration:none;font-weight:600;padding:6px 0}
footer.fd .fg a:hover{color:var(--am)}
.fz{display:flex;flex-wrap:wrap;justify-content:space-between;gap:10px 20px;padding-top:24px;border-top:1px solid rgba(255,255,255,.14);font-size:14px;color:#8fa0d4}
footer.fd .fz a{color:#dbe5ff;text-decoration:none;font-weight:700}
footer.fd .fz a:hover{color:var(--am)}
footer.fd .jk-logo.dk .jk-wm{background:linear-gradient(90deg,#ffffff 0%,#a9d8f5 55%,#68bbea 100%);-webkit-background-clip:text;background-clip:text;color:transparent;font-size:34px}
footer.fd .jk-logo.dk .jk-tag{color:#aab8e0}
@media(max-width:760px){
  footer.fd{padding:44px 0 22px;margin-top:56px}
  .ft{flex-direction:column;align-items:flex-start}
  .ft h2{flex:none}
  .fg{grid-template-columns:repeat(2,minmax(0,1fr));gap:30px 20px}
  .fb{grid-column:1/-1}
}

@media(max-width:900px){
  .hero.d .hg{grid-template-columns:minmax(0,1fr);gap:36px;padding:44px 20px 40px;text-align:center}
  .hero.d h1,.hero.d .tg,.hero.d p.s{margin-left:auto;margin-right:auto}
  .hero.d .search{margin:26px auto 0}
  .hero.d .chips,.hero.d .hb{justify-content:center}
  .hf{margin:0 auto;text-align:left}
}

/* =========================================
   JKEDUSPHERE — PUBLIC WEBSITE REDESIGN
   ========================================= */

:root {
  --bg: #ffffff;
  --soft: #f5f7ff;
  --ink: #172033;
  --mut: #64748b;
  --line: #e2e8f0;
  --navy: #172554;
  --blue: #4f46e5;
  --sky: #818cf8;
  --l1: #172554;
  --l2: #4f46e5;
  --l3: #818cf8;
  --tg: #64748b;
  --radius: 14px;
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 90px;
}

body {
  background: var(--bg);
  color: var(--ink);
  font-family: Inter, system-ui, -apple-system, "Segoe UI", sans-serif;
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
}

::selection {
  background: #c7d2fe;
  color: #172554;
}

.w {
  max-width: 1200px;
  padding-left: 24px;
  padding-right: 24px;
}

header {
  background: rgba(255, 255, 255, 0.96);
  border-bottom: 1px solid var(--line);
  box-shadow: 0 4px 20px rgba(23, 37, 84, 0.04);
  backdrop-filter: blur(14px);
}

.bar {
  min-height: 78px;
  gap: 24px;
}

.jk-wm {
  letter-spacing: -1.2px;
  background: linear-gradient(120deg, #172554, #4f46e5 65%, #818cf8);
  -webkit-background-clip: text;
  background-clip: text;
}

nav.m {
  gap: 5px;
}

nav.m a {
  padding: 10px 13px;
  border-radius: 9px;
  border-bottom: 0;
  font-size: 14px;
  transition: color .2s, background .2s;
}

nav.m a:hover {
  background: #eef2ff;
  color: #4338ca;
  border-bottom-color: transparent;
}

.btn {
  border-radius: 10px;
  padding: 11px 21px;
  font-weight: 750;
  transition: transform .2s, box-shadow .2s, background .2s;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(79, 70, 229, .18);
}

.btn.o {
  background: #fff;
  border-color: var(--line);
  color: var(--navy);
}

.btn.o:hover {
  background: #f5f7ff;
  border-color: #c7d2fe;
}

.hero {
  background:
    radial-gradient(ellipse at 85% 10%, #eef2ff 0, transparent 44%),
    linear-gradient(180deg, #fff 0%, #fafbff 100%);
  border-bottom: 1px solid var(--line);
}

.hg {
  gap: 54px;
  padding-top: 76px;
  padding-bottom: 76px;
}

.hero h1 {
  font-size: clamp(34px, 5vw, 58px);
  letter-spacing: -2px;
  line-height: 1.12;
  font-weight: 850;
}

.hero p.s {
  font-size: 18px;
  line-height: 1.8;
  color: #64748b;
}

.search {
  border: 1px solid #c7d2fe;
  border-radius: 13px;
  background: #fff;
  box-shadow: 0 8px 28px rgba(23, 37, 84, .07);
}

.search input {
  padding: 16px;
}

.search button {
  background: #4f46e5;
}

.search button:hover {
  background: #4338ca;
}

.chips a {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 7px 14px;
  transition: .2s;
}

.chips a:hover {
  background: #eef2ff;
  border-color: #c7d2fe;
}

.nb {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 16px;
  box-shadow: 0 14px 40px rgba(23, 37, 84, .07);
}

.nb h2 {
  padding: 19px 22px;
  background: #f8faff;
}

.nb a {
  padding: 17px 22px;
  transition: background .2s;
}

.nb a:hover {
  background: #f5f7ff;
}

.tag {
  border-radius: 999px;
  padding: 4px 11px;
  background: #eef2ff;
  color: #4338ca;
}

.tr .w {
  padding-top: 17px;
  padding-bottom: 17px;
}

section.s {
  margin-top: 76px;
}

.sh {
  border-bottom: 1px solid var(--line);
  padding-bottom: 17px;
  margin-bottom: 28px;
}

.sh h2 {
  font-size: clamp(25px, 3vw, 34px);
  letter-spacing: -1px;
  font-weight: 800;
}

.sh a {
  color: #4f46e5;
  text-decoration: none;
}

.sh a:hover {
  text-decoration: underline;
}

.cats {
  gap: 15px;
}

.cats a {
  border: 1px solid var(--line);
  border-top: 3px solid #6366f1;
  border-radius: 13px;
  padding: 20px 16px;
  background: #fff;
  transition: transform .2s, box-shadow .2s, border-color .2s;
}

.cats a:hover {
  transform: translateY(-3px);
  border-top-color: #4338ca;
  box-shadow: 0 12px 25px rgba(23, 37, 84, .08);
}

.cats b {
  font-size: 18px;
  font-weight: 800;
}

.vg {
  gap: 22px;
}

.vc {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 15px;
  padding: 24px;
  transition: transform .2s, box-shadow .2s, border-color .2s;
}

.vc:hover {
  transform: translateY(-4px);
  border-color: #c7d2fe;
  box-shadow: 0 15px 32px rgba(23, 37, 84, .08);
}

.vc h3 {
  line-height: 1.45;
  font-size: 19px;
  letter-spacing: -.3px;
}

.vc p {
  line-height: 1.75;
}

.vt span {
  background: #eef2ff;
  color: #4338ca;
  border-radius: 999px;
  padding: 5px 11px;
}

.ca {
  gap: 28px;
}

.mag {
  border-radius: 17px;
  border-left: 0;
  border-top: 5px solid #818cf8;
  padding: 34px;
}

.lst {
  border: 1px solid var(--line);
  border-radius: 15px;
  padding: 8px 23px;
  background: #fff;
}

.lst a {
  padding: 17px 0;
}

.gs {
  gap: 20px;
}

.gs a {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 15px;
  padding: 25px;
  transition: transform .2s, box-shadow .2s;
}

.gs a:hover {
  transform: translateY(-3px);
  border-color: #c7d2fe;
  box-shadow: 0 12px 26px rgba(23, 37, 84, .07);
}

.gs i {
  background: #eef2ff;
  color: #4338ca;
  border-radius: 12px;
  width: 46px;
  height: 46px;
}

.prep {
  background: linear-gradient(135deg, #172554, #312e81);
  padding: 64px 0;
}

.bc {
  border-radius: 14px;
  border-top: 4px solid #818cf8;
  padding: 25px;
}

.bc .btn {
  margin-top: 10px;
}

.how {
  gap: 28px;
}

.how div {
  border-left-color: #818cf8;
}

.join {
  border-radius: 16px;
  padding: 36px;
  background: linear-gradient(135deg, #fff, #f8faff);
}

.faq details {
  border: 1px solid var(--line);
  border-radius: 12px;
  margin-bottom: 12px;
  padding: 0 20px;
  transition: border-color .2s;
}

.faq details[open] {
  border-color: #c7d2fe;
  background: #fcfcff;
}

summary {
  padding: 18px 0;
}

footer {
  background: #111c3c;
  color: #cbd5e1;
  padding: 52px 0;
}

footer a {
  transition: color .2s;
}

footer a:hover {
  color: #a5b4fc;
}

/* Article and listing pages */

.crumb {
  padding-top: 24px;
  color: #64748b;
}

.lp {
  padding-top: 28px;
  padding-bottom: 48px;
}

.lp h1,
.art h1 {
  letter-spacing: -1.2px;
  line-height: 1.2;
  font-weight: 850;
}

.pg {
  gap: 42px;
  padding-top: 24px;
  padding-bottom: 60px;
}

.art h1 {
  margin-top: 15px;
  margin-bottom: 15px;
}

.meta {
  color: #64748b;
  line-height: 1.7;
}

.hero-img {
  border-radius: 16px;
  border: 1px solid var(--line);
  box-shadow: 0 8px 25px rgba(23, 37, 84, .06);
}

.glance {
  border: 1px solid var(--line);
  border-left: 4px solid #4f46e5;
  border-radius: 13px;
}

.glance h2 {
  background: #f5f7ff;
  padding: 17px 20px;
}

.glance th,
.glance td {
  padding: 13px 20px;
}

.prose {
  font-size: 17px;
  line-height: 1.9;
  color: #334155;
}

.prose h2,
.prose h3 {
  color: #172554;
  letter-spacing: -.5px;
  line-height: 1.35;
}

.prose a {
  color: #4338ca;
  text-underline-offset: 3px;
}

.prose blockquote {
  background: #f5f7ff;
  border-left: 4px solid #6366f1;
  border-radius: 0 12px 12px 0;
  padding: 18px 22px;
}

.prose img {
  border-radius: 12px;
}

.prose th {
  background: #f5f7ff;
}

.cta {
  border-radius: 16px;
  padding: 30px;
  background: linear-gradient(135deg, #172554, #3730a3);
}

.share a {
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 9px 17px;
  transition: .2s;
}

.share a:hover {
  background: #eef2ff;
  border-color: #c7d2fe;
}

.box2 {
  border: 1px solid var(--line);
  border-radius: 14px;
  background: #fff;
}

.box2 h2 {
  background: #f8faff;
  border-bottom: 1px solid var(--line);
  padding: 17px 20px;
}

.pager {
  flex-wrap: wrap;
}

a:focus-visible,
button:focus-visible,
input:focus-visible,
summary:focus-visible {
  outline: 3px solid #a5b4fc;
  outline-offset: 3px;
}

@media (max-width: 860px) {
  .bar {
    min-height: 68px;
    gap: 12px;
  }

  .hg {
    padding-top: 48px;
    padding-bottom: 48px;
    gap: 32px;
  }

  section.s {
    margin-top: 54px;
  }

  .pg {
    gap: 28px;
  }
}

@media (max-width: 560px) {
  .w {
    padding-left: 17px;
    padding-right: 17px;
  }

  .hg {
    padding-top: 36px;
    padding-bottom: 36px;
  }

  .hero h1 {
    font-size: clamp(32px, 9vw, 43px);
    letter-spacing: -1.2px;
  }

  .hero p.s {
    font-size: 16px;
  }

  .search button {
    padding: 0 14px;
  }

  .sh {
    align-items: flex-start;
    flex-direction: column;
    gap: 9px;
  }

  section.s {
    margin-top: 44px;
  }

  .vc,
  .gs a {
    padding: 20px;
  }

  .mag {
    padding: 25px;
  }

  .join {
    padding: 23px;
  }

  .prose {
    font-size: 16px;
    line-height: 1.85;
  }

  .cta {
    padding: 23px;
  }

  .glance th,
  .glance td {
    padding: 11px 12px;
    font-size: 14px;
  }

  .prose table {
    max-width: 100%;
  }

  footer {
    padding: 38px 0;
  }
}

/* ===== JKEdusphere: mobile and contrast fixes ===== */

*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body {
  max-width: 100%;
  overflow-x: clip;
}

img,
video,
iframe {
  max-width: 100%;
}

.prep {
  background: linear-gradient(145deg, #111c3c 0%, #202f70 100%);
  color: #f8fafc;
  padding: clamp(36px, 7vw, 76px) 0;
}

.prep h1,
.prep h2,
.prep h3,
.prep h4,
.prep p,
.prep li,
.prep strong {
  color: #f8fafc;
}

.prep p {
  line-height: 1.75;
}

.prep a:not(.btn) {
  color: #c7d2fe;
}

.prep a:not(.btn):hover {
  color: #ffffff;
}

.prep .bc {
  background: #ffffff;
  color: #172554;
  border: 1px solid #dbe4f0;
  border-top: 5px solid #818cf8;
  border-radius: 18px;
  padding: clamp(22px, 4vw, 40px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
}

.prep .bc h2,
.prep .bc h3,
.prep .bc h4 {
  color: #172554;
}

.prep .bc p,
.prep .bc li {
  color: #52627e;
}

.prep .bc a:not(.btn) {
  color: #4338ca;
}

.prep .bc .btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  background: #202f70;
  color: #ffffff;
  border: 1px solid #202f70;
  border-radius: 10px;
  text-decoration: none;
}

.prep .bc .btn:hover {
  background: #3649a0;
}

.prep .bc .btn.o {
  background: #ffffff;
  color: #202f70;
  border-color: #cbd5e1;
}

.prep .bc .btn.o:hover {
  background: #f1f5ff;
}

.prep .w,
.prep .gs,
.prep .vg,
.prep .ca {
  min-width: 0;
  max-width: 100%;
}

.prep h1,
.prep h2,
.prep h3,
.prep p {
  overflow-wrap: anywhere;
}

@media (max-width: 600px) {
  .prep {
    padding: 36px 0 44px;
  }

  .prep .w {
    padding-left: 18px;
    padding-right: 18px;
  }

  .prep .bc {
    padding: 22px;
    border-radius: 15px;
  }

  .prep .bc h2 {
    font-size: 25px;
    line-height: 1.3;
  }

  .prep .bc p {
    font-size: 16px;
    line-height: 1.7;
  }

  .prep .bc .btn {
    max-width: 100%;
    white-space: normal;
  }

  .prep .gs,
  .prep .vg,
  .prep .ca {
    grid-template-columns: minmax(0, 1fr);
    gap: 16px;
  }

  .prep .gs > *,
  .prep .vg > *,
  .prep .ca > * {
    min-width: 0;
    max-width: 100%;
  }
}


`;
