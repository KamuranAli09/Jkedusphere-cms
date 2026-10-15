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
`;
