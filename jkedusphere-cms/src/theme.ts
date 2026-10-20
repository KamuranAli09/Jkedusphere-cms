// Public site stylesheet, served at /assets/theme.css
// Plain CSS inside backticks, so you can edit it directly. Change the colours in :root to restyle the site.
export const THEME_CSS = `/* =====================================================================
   JKEdusphere public theme  -  modern minimal
   One stylesheet, no stacked overrides. Change the colours in :root
   to restyle the whole site. Class names match the existing templates.
   ===================================================================== */
:root{
  --bg:#fff;--soft:#f6f8fc;--soft2:#edf1f8;--ink:#0e1630;--mut:#596580;--line:#e8ecf4;--line2:#d3dbe9;
  --navy:#1b2a6b;--blue:#2c5ba0;--sky:#68bbea;
  --l1:#1b2a6b;--l2:#2c5ba0;--l3:#68bbea;--tg:#8a8f99;
  --red:#b42318;--redbg:#fef0ee;--green:#0f7a56;--greenbg:#e6f6ef;
  --am:#68bbea;--tl:#2c5ba0;--tl2:#1b2a6b;
  --ring:0 0 0 4px rgba(104,187,234,.3);
  --font:Figtree,Lato,system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;
  color-scheme:light;box-sizing:border-box;
  padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)
}
html{-webkit-text-size-adjust:100%;scroll-padding-top:calc(env(safe-area-inset-top,0px) + 84px)}
*,*::before,*::after{box-sizing:inherit}
body{margin:0;background:var(--bg);color:var(--ink);font:400 16px/1.65 var(--font);-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
h1,h2,h3{margin:0;font-weight:700;line-height:1.15;letter-spacing:-.025em;color:var(--ink);text-wrap:balance}
h1 em,h2 em,h3 em{font-style:normal;color:inherit}
.vc h3,.xb h3,.bc h3,.gs h3,.how h3,.hk h3{text-wrap:pretty}
a{color:inherit}
img,video,iframe{max-width:100%}
.w{width:100%;max-width:1120px;margin:0 auto;padding:0 24px}
a:focus-visible,button:focus-visible,summary:focus-visible,input:focus-visible{outline:2px solid var(--blue);outline-offset:3px}

/* ---- Brand logo: unchanged ---- */
.jk-logo{display:inline-flex;flex-direction:column;align-items:flex-start;text-decoration:none;line-height:1}
.jk-wm{font:900 28px/1 Lato,system-ui,sans-serif;letter-spacing:-.025em;background:linear-gradient(90deg,var(--l1) 0%,var(--l2) 48%,var(--l3) 100%);-webkit-background-clip:text;background-clip:text;color:transparent;padding-bottom:2px}
.jk-tag{font:400 10.6px/1 Lato,system-ui,sans-serif;color:var(--tg);margin-top:4px;letter-spacing:.015em}
.jk-logo.dk .jk-wm{background:linear-gradient(90deg,var(--l1) 0%,var(--l2) 48%,var(--l3) 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
.jk-logo.dk .jk-tag{color:var(--tg)}

/* ---- Buttons ---- */
.btn{display:inline-flex;align-items:center;justify-content:center;font:600 14.5px/1.2 var(--font);padding:11px 22px;border-radius:99px;text-decoration:none;white-space:nowrap;background:var(--navy);color:#fff;border:1px solid var(--navy);transition:background .15s,border-color .15s,color .15s}
.btn:hover{background:#26398a;border-color:#26398a}
.btn.o{background:transparent;color:var(--ink);border-color:var(--line2)}
.btn.o:hover{background:var(--soft);border-color:var(--ink)}
.btn.w2{background:var(--navy);border-color:var(--navy);color:#fff}

/* ---- Header ---- */
header{position:sticky;top:env(safe-area-inset-top,0px);z-index:20;background:rgba(255,255,255,.85);-webkit-backdrop-filter:saturate(180%) blur(14px);backdrop-filter:saturate(180%) blur(14px);border-bottom:1px solid var(--line)}
.bar{display:flex;align-items:center;gap:20px;min-height:68px}
nav.m{display:flex;justify-content:center;gap:2px;flex:1;overflow-x:auto;scrollbar-width:none}
nav.m a{padding:8px 14px;border-radius:99px;text-decoration:none;font-weight:500;font-size:14.5px;color:var(--mut);white-space:nowrap;transition:background .15s,color .15s}
nav.m a:hover{background:var(--soft);color:var(--ink)}
.mb{display:none;flex:none;width:42px;height:42px;border:1px solid var(--line);background:#fff;border-radius:99px;flex-direction:column;justify-content:center;align-items:center;gap:4px;cursor:pointer;padding:0}
.mb span{width:16px;height:2px;background:var(--ink);border-radius:2px}
.mb:hover{background:var(--soft)}

/* subject bar */
.sb{background:#fff;border-bottom:1px solid var(--line)}
.sb nav{display:flex;gap:4px;overflow-x:auto;scrollbar-width:none;margin:0 -24px;padding:9px 24px}
.sb nav::-webkit-scrollbar,nav.m::-webkit-scrollbar{display:none}
.sb a{flex:none;padding:6px 14px;border-radius:99px;font-size:13.5px;font-weight:500;color:var(--mut);text-decoration:none;white-space:nowrap;transition:background .15s,color .15s}
.sb a:hover{background:var(--soft2);color:var(--ink)}

/* slide-out menu */
.dr{position:fixed;inset:0;z-index:40;display:flex}
.dr[hidden]{display:none}
.ov{position:absolute;inset:0;background:rgba(14,22,48,.4);-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px)}
.dp{position:relative;width:min(340px,88vw);height:100%;background:#fff;overflow-y:auto;padding:18px 22px 28px;border-radius:0 24px 24px 0;box-shadow:0 0 60px rgba(14,22,48,.18)}
.dh{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}
.dh b{font-size:17px}
.dx{width:38px;height:38px;border:0;background:var(--soft);border-radius:99px;font-size:22px;line-height:1;cursor:pointer;color:var(--ink);padding:0}
.dp h4{margin:26px 0 6px;font-size:13px;font-weight:600;color:var(--mut)}
.dp nav a{display:block;padding:11px 0;text-decoration:none;font-weight:600;font-size:17px;color:var(--ink)}
.dp nav a:hover{color:var(--blue)}
.dp>.btn{display:flex;margin-top:26px}

/* ---- Hero ---- */
.hero.d{position:relative;overflow:hidden;isolation:isolate;background:#fff}
.hero.d::before{content:"";position:absolute;z-index:-1;right:-12%;top:-30%;width:min(760px,90vw);aspect-ratio:1;background:radial-gradient(closest-side,rgba(104,187,234,.26),rgba(104,187,234,0));pointer-events:none}
.hero.d::after{content:"";position:absolute;z-index:-1;left:-14%;bottom:-40%;width:min(620px,80vw);aspect-ratio:1;background:radial-gradient(closest-side,rgba(44,91,160,.1),rgba(44,91,160,0));pointer-events:none}
.hg{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);gap:56px;align-items:center;padding:76px 24px 68px}
.hg>div{min-width:0}
.hero.d h1{font-size:clamp(38px,5.8vw,66px);font-weight:800;line-height:1.03;letter-spacing:-.04em;max-width:11em}
.hero.d .tg{margin:20px 0 0;color:var(--blue);font-weight:600;font-size:clamp(17px,2vw,21px);line-height:1.4;max-width:28em}
.hero.d p.s{margin:12px 0 0;color:var(--mut);font-size:17px;max-width:34em}
.eyebrow{display:inline-block;font-size:13.5px;font-weight:600;color:var(--blue);background:var(--soft);border:1px solid var(--line);border-radius:99px;padding:5px 14px;margin-bottom:20px}
.search{display:flex;align-items:center;max-width:580px;background:#fff;border:1px solid var(--line2);border-radius:99px;padding:5px;box-shadow:0 1px 2px rgba(14,22,48,.04),0 14px 34px -14px rgba(27,42,107,.2);transition:border-color .15s,box-shadow .15s}
.search:focus-within{border-color:var(--blue);box-shadow:var(--ring),0 14px 34px -14px rgba(27,42,107,.2)}
.search input{flex:1;min-width:0;border:0;outline:0;background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='%23596580' stroke-width='2.2' stroke-linecap='round'%3E%3Ccircle cx='11' cy='11' r='7'/%3E%3Cpath d='m20 20-3.5-3.5'/%3E%3C/svg%3E") no-repeat 18px center;padding:13px 14px 13px 46px;font:inherit;font-size:16px;color:var(--ink)}
.search input::placeholder{color:#8590a8}
.search input:focus-visible{outline:0}
.search button{border:0;border-radius:99px;background:var(--navy);color:#fff;font:600 15px var(--font);padding:12px 24px;cursor:pointer;transition:background .15s}
.search button:hover{background:#26398a}
.hero.d .search{margin-top:30px}
.chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}
.chips a{background:var(--soft);padding:6px 14px;border-radius:99px;font-size:13.5px;font-weight:500;text-decoration:none;color:var(--navy);transition:background .15s}
.chips a:hover{background:var(--soft2)}
.hb{display:flex;flex-wrap:wrap;gap:10px;margin-top:24px}
.hl2{margin:34px 0 14px;color:var(--mut);font-weight:600;font-size:15px}
.hf{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px 24px;max-width:560px}
.hf li{position:relative;padding-left:28px;font-size:15.5px;font-weight:500;color:var(--ink);line-height:1.4}
.hf li::before{content:"✓";position:absolute;left:0;top:1px;width:19px;height:19px;border-radius:50%;background:var(--soft2);color:var(--blue);font-size:11px;font-weight:800;display:grid;place-items:center;line-height:1}
.hm{margin:22px 0 0;color:var(--mut);font-weight:500}
.hm a{color:var(--blue);font-weight:600;text-underline-offset:3px}
@keyframes rise{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
@media(prefers-reduced-motion:no-preference){.hero.d .hg>*{animation:rise .7s cubic-bezier(.2,.7,.2,1) both}.hero.d .hg>*:nth-child(2){animation-delay:.12s}html{scroll-behavior:smooth}}

/* hero card carousel */
.hc{min-width:0}
.ht{display:flex;gap:14px;overflow-x:auto;scroll-snap-type:x mandatory;scroll-padding:0 8px;scrollbar-width:none;padding:8px 8px 40px;margin:-8px -8px -24px}
.ht::-webkit-scrollbar,.car::-webkit-scrollbar{display:none}
.hk{flex:0 0 100%;scroll-snap-align:start;display:flex;flex-direction:column;background:#fff;border:1px solid var(--line);border-radius:26px;padding:14px;box-shadow:0 12px 32px -18px rgba(27,42,107,.25)}
.hv{height:210px;border-radius:18px;overflow:hidden;display:grid;place-items:center;background:var(--acb)}
.hv img{width:100%;height:100%;object-fit:cover}
.hk h3{font-size:22px;margin:20px 10px 6px}
.hk p{flex:1;margin:0 10px 20px;color:var(--mut);font-size:15.5px}
.hk .btn{margin:0 10px 8px;padding:13px}
.hd{display:flex;justify-content:center;gap:7px;margin-top:18px}
.hd button{width:8px;height:8px;border-radius:99px;border:0;padding:0;background:var(--line2);cursor:pointer;transition:width .2s,background .2s}
.hd button.on{width:24px;background:var(--navy)}

/* shared card colour variants (hero cards and exam cards) */
.xc,.hk{--ac:#2c5ba0;--acb:#eaf2fc}
.xc.v1,.hk.v1{--ac:#0f766e;--acb:#e3f4f1}
.xc.v2,.hk.v2{--ac:#4f46e5;--acb:#ecedfd}
.xc.v3,.hk.v3{--ac:#b45309;--acb:#fdf0dd}
.xc.v4,.hk.v4{--ac:#0369a1;--acb:#e2f1fa}
.xw{position:relative;border:2px solid var(--ac);border-radius:14px;padding:42px 30px 16px;min-width:150px;text-align:center;background:rgba(255,255,255,.55)}
.xw::before{content:"";position:absolute;left:14px;top:13px;width:6px;height:6px;border-radius:50%;background:var(--ac);box-shadow:11px 0 var(--ac),22px 0 var(--ac)}
.xw::after{content:"";position:absolute;left:0;right:0;top:28px;border-top:2px solid var(--ac)}
.xw b{display:block;color:var(--ac);font-size:30px;font-weight:800;letter-spacing:-.02em;line-height:1.1}

/* notice panel (optional hero mode) */
.nb{background:#fff;border:1px solid var(--line);border-radius:22px;overflow:hidden;box-shadow:0 24px 60px -28px rgba(27,42,107,.28);text-align:left}
.nb h2{font-size:15px;font-weight:600;color:var(--mut);padding:16px 22px;border-bottom:1px solid var(--line);letter-spacing:0}
.nb a{display:block;text-decoration:none;padding:15px 22px;border-bottom:1px solid var(--line);transition:background .15s}
.nb a:last-child{border-bottom:0}
.nb a:hover{background:var(--soft)}
.nb b{display:block;font-size:15.5px;font-weight:600;color:var(--ink)}
.nb small{color:var(--mut);font-size:13.5px}
.tag{display:inline-block;font-size:12.5px;font-weight:600;padding:3px 11px;border-radius:99px;margin-right:8px;background:var(--soft2);color:var(--navy)}
.tag.n{background:var(--greenbg);color:var(--green)}
.tag.c{background:var(--redbg);color:var(--red)}

/* trust strip */
.tr{background:var(--soft);border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.tr .w{display:flex;flex-wrap:wrap;gap:8px 32px;padding-top:16px;padding-bottom:16px;font-weight:500;font-size:14px;color:var(--mut)}
.tr span::before{content:"";display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--sky);margin-right:9px;vertical-align:1px}

/* ---- Sections ---- */
section.s{margin-top:88px}
.sh,.sh2{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-end;gap:12px 16px;margin-bottom:28px}
.sh>div:first-child,.sh2>div:first-child{min-width:0;flex:1 1 280px}
.sh h2,.sh2 h2{font-size:clamp(26px,3.2vw,38px);font-weight:700;letter-spacing:-.03em}
.sh p,.sh2 p{margin:8px 0 0;color:var(--mut);max-width:40em}
.sh>a{font-weight:600;font-size:15px;color:var(--blue);text-decoration:none;white-space:nowrap}
.sh>a:hover{text-decoration:underline;text-underline-offset:4px}

/* library (browse by subject) */
.lib{background:var(--soft);border:1px solid var(--line);border-radius:30px;padding:clamp(28px,5vw,56px)}
.lh h2{font-size:clamp(28px,4vw,42px);font-weight:700;letter-spacing:-.035em}
.lh p{margin:12px 0 0;max-width:36em;color:var(--mut);font-size:17px}
.ll{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:34px}
.ll a{display:flex;align-items:center;gap:14px;background:#fff;border:1px solid var(--line);border-radius:18px;padding:14px 16px;text-decoration:none;color:var(--ink);transition:border-color .15s,transform .15s}
.ll a:hover{border-color:var(--navy)}
.ll i{flex:none;display:grid;place-items:center;width:42px;height:42px;border-radius:13px;background:var(--soft2);color:var(--navy);font:800 13.5px var(--font);font-style:normal}
.ln{flex:1;min-width:0;display:flex;flex-direction:column;line-height:1.3}
.ln b{font-size:16.5px;font-weight:600}
.ln small{color:var(--mut);font-size:13.5px}
.ct{flex:none;min-width:30px;text-align:center;background:var(--soft);border-radius:99px;padding:3px 10px;font-weight:600;font-size:13px;color:var(--mut)}

/* exam carousel */
.cn{display:flex;gap:8px;flex:none}
.cn button{width:44px;height:44px;border-radius:50%;border:1px solid var(--line2);background:#fff;color:var(--ink);font-size:22px;line-height:1;cursor:pointer;padding:0;transition:background .15s,border-color .15s}
.cn button:hover:not(:disabled){background:var(--soft);border-color:var(--ink)}
.cn button:disabled{opacity:.35;cursor:default}
.car{display:flex;gap:16px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;margin:0 -24px;padding:0 24px 6px;scroll-padding:0 24px}
.xc{flex:0 0 min(300px,82%);scroll-snap-align:start;background:#fff;border:1px solid var(--line);border-radius:22px;overflow:hidden;display:flex;flex-direction:column}
.xh{height:150px;display:grid;place-items:center;padding:22px;background:var(--acb)}
.xb{display:flex;flex-direction:column;flex:1;padding:22px}
.xb h3{font-size:19px;font-weight:650}
.xb p{flex:1;margin:8px 0 14px;color:var(--mut);font-size:15px;line-height:1.6}
.xt{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:18px}
.xt span{background:var(--acb);color:var(--ac);border-radius:99px;padding:4px 12px;font-size:12.5px;font-weight:600}
.xc .btn{width:100%;margin-top:auto}

/* post cards (homepage feeds, listings, search) */
.vg{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
.vc{position:relative;display:flex;flex-direction:column;background:#fff;border:1px solid var(--line);border-radius:20px;padding:22px;transition:border-color .15s,box-shadow .15s}
.vc:hover{border-color:var(--line2);box-shadow:0 18px 40px -24px rgba(27,42,107,.3)}
.vt{display:flex;justify-content:space-between;align-items:center;gap:10px;font-size:13px;color:var(--mut);font-weight:500}
.vt span{background:var(--soft2);color:var(--navy);padding:3px 11px;border-radius:99px;font-weight:600}
.vc h3{font-size:18.5px;font-weight:650;line-height:1.35;margin:16px 0 8px;letter-spacing:-.015em}
.vc p{display:none}
.vc h3{margin-bottom:18px}
.vc>a{margin-top:auto;font-weight:600;font-size:14.5px;color:var(--blue);text-decoration:none}
.vc a::after{content:"";position:absolute;inset:0;border-radius:inherit}
.vc a:hover{text-decoration:underline;text-underline-offset:4px}

/* current affairs */
.ca{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.35fr);gap:16px}
.mag{background:linear-gradient(160deg,#f2f7fd 0%,#e6f0fb 100%);border:1px solid var(--line);border-radius:24px;padding:34px;display:flex;flex-direction:column;justify-content:space-between;gap:24px;min-height:280px}
.mag small{display:inline-block;font-weight:600;font-size:13px;color:var(--blue);background:#fff;border-radius:99px;padding:4px 12px}
.mag h3{font-size:clamp(24px,2.6vw,30px);margin:16px 0 0}
.mag p{color:var(--mut);margin:10px 0 0}
.lst{border:1px solid var(--line);border-radius:24px;padding:6px 26px}
.lst a{display:flex;justify-content:space-between;align-items:center;gap:14px;padding:18px 0;border-bottom:1px solid var(--line);text-decoration:none;font-weight:600;transition:color .15s}
.lst a:last-child{border-bottom:0}
.lst a:hover{color:var(--blue)}
.lst small{color:var(--mut);font-weight:500;font-size:13.5px;white-space:nowrap}

/* schemes */
.gs{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}
.gs a{text-decoration:none;border:1px solid var(--line);border-radius:20px;padding:24px;background:#fff;transition:border-color .15s}
.gs a:hover{border-color:var(--navy)}
.gs i{display:grid;place-items:center;width:42px;height:42px;border-radius:13px;background:var(--soft2);color:var(--navy);font:800 13.5px var(--font);font-style:normal;margin-bottom:16px}
.gs h3{font-size:18px;font-weight:650}
.gs p{margin:6px 0 0;color:var(--mut);font-size:15px}

/* jkedusphere.com band */
.prep{margin-top:96px;padding:72px 0;background:var(--soft);border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.bk{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}
.bc{display:flex;flex-direction:column;justify-content:space-between;gap:22px;min-width:0;min-height:210px;background:#fff;border:1px solid var(--line);border-radius:20px;padding:24px}
.bc h3{font-size:20px;font-weight:650}
.bc p{margin:8px 0 0;color:var(--mut);font-size:15px}
.bc .btn{align-self:flex-start}
.bc.g{background:transparent;border:1px dashed var(--line2)}
.bc.g .btn{background:transparent;border-color:var(--line2);color:var(--mut)}

/* how we publish: a real sequence, so numbered */
.how{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:32px;counter-reset:st}
.how>div::before{counter-increment:st;content:counter(st);display:grid;place-items:center;width:34px;height:34px;border-radius:50%;background:var(--navy);color:#fff;font-weight:700;font-size:14px;margin-bottom:16px}
.how h3{font-size:19px;font-weight:650}
.how p{margin:8px 0 0;color:var(--mut)}

/* telegram strip: the one deep-colour block below the hero */
.join{display:flex;flex-wrap:wrap;gap:18px 32px;justify-content:space-between;align-items:center;background:linear-gradient(120deg,#1b2a6b 0%,#2c5ba0 100%);color:#fff;border-radius:28px;padding:clamp(28px,4vw,44px)}
.join h2{color:#fff;font-size:clamp(24px,3vw,32px)}
.join p{margin:8px 0 0;color:#d4def5}
.join .btn{background:#fff;border-color:#fff;color:var(--navy)}
.join .btn:hover{background:var(--soft2);border-color:var(--soft2)}

/* faq */
.faq{max-width:820px}
.faq .sh{margin-bottom:12px}
details{border-bottom:1px solid var(--line)}
summary{list-style:none;cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:16px;font-weight:600;font-size:17px;padding:20px 0}
summary::-webkit-details-marker{display:none}
summary::after{content:"+";flex:none;font-size:24px;font-weight:400;line-height:1;color:var(--mut);transition:transform .2s}
details[open] summary::after{transform:rotate(45deg)}
details p{margin:0 0 20px;color:var(--mut);max-width:44em}

/* ---- Footer ---- */
footer{background:#fff;color:var(--mut);margin-top:96px;padding:48px 0;font-size:14.5px;border-top:1px solid var(--line)}
footer a{color:var(--ink)}
footer.fd{padding:72px 0 28px;background:linear-gradient(180deg,#fff 0%,var(--soft) 100%)}
footer.fd .w{display:block}
.ft{display:flex;flex-wrap:wrap;gap:22px 32px;justify-content:space-between;align-items:center;padding-bottom:48px}
.ft h2{flex:1 1 340px;font-size:clamp(30px,4.6vw,52px);font-weight:800;letter-spacing:-.04em;line-height:1.05;max-width:12em}
.fg{display:grid;grid-template-columns:minmax(0,1.6fr) repeat(2,minmax(0,1fr));gap:40px;padding:44px 0;border-top:1px solid var(--line)}
.fb p{max-width:34em;margin:16px 0 0;color:var(--mut);font-size:14.5px;line-height:1.7}
.fg nav{display:flex;flex-direction:column;gap:0}
.fg h3{color:var(--ink);font-size:14px;font-weight:700;letter-spacing:0;margin:0 0 12px}
footer.fd .fg a{color:var(--mut);text-decoration:none;font-weight:500;padding:6px 0;transition:color .15s}
footer.fd .fg a:hover{color:var(--blue)}
.fz{display:flex;flex-wrap:wrap;justify-content:space-between;gap:10px 20px;padding-top:24px;border-top:1px solid var(--line);font-size:13.5px;color:var(--mut)}
footer.fd .fz a{color:var(--mut);text-decoration:none;font-weight:600}
footer.fd .fz a:hover{color:var(--blue)}

/* ---- Listing, post and page templates ---- */
.crumb{padding-top:22px;padding-bottom:4px;font-size:13.5px;color:var(--mut)}
.crumb a{color:var(--mut);text-decoration:none}
.crumb a:hover{color:var(--ink)}
.crumb span{margin:0 8px;color:var(--line2)}
.crumb span:last-child{color:var(--ink);margin:0}
.lp{padding-top:28px;padding-bottom:56px}
.lp h1{font-size:clamp(30px,4.4vw,46px);font-weight:800;letter-spacing:-.035em}
.s2{color:var(--mut);margin:10px 0 0}
.lp .search{margin:22px 0 30px}
.pager{display:flex;gap:12px;margin-top:30px}
.pg{display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:56px;padding-top:12px;padding-bottom:56px}
.art{min-width:0}
.art h1{font-size:clamp(30px,4.4vw,46px);font-weight:800;line-height:1.1;letter-spacing:-.035em;margin:16px 0 12px}
.art .tag{margin:0}
.meta{color:var(--mut);font-size:14.5px;margin:0 0 24px}
.hero-img{width:100%;height:auto;border-radius:20px;border:1px solid var(--line);margin:0 0 26px}
.glance{border:1px solid var(--line);border-radius:18px;margin:0 0 28px;overflow:hidden}
.glance h2{font-size:14.5px;font-weight:600;color:var(--mut);letter-spacing:0;padding:13px 20px;background:var(--soft)}
.glance table{width:100%;border-collapse:collapse}
.glance th,.glance td{text-align:left;padding:12px 20px;border-top:1px solid var(--line);font-size:15.5px;vertical-align:top;overflow-wrap:anywhere}
.glance th{width:50%;font-weight:600}
.prose{font-size:17.5px;line-height:1.8;overflow-wrap:anywhere;min-width:0}
.prose h2{font-size:27px;margin:1.8em 0 .5em}
.prose h3{font-size:21px;margin:1.5em 0 .4em}
.prose p{margin:0 0 1.15em}
.prose a{color:var(--blue);text-decoration:underline;text-underline-offset:3px}
.prose img{max-width:100%;height:auto;border-radius:14px}
.prose ul,.prose ol{padding-left:1.4em;margin:0 0 1.15em}
.prose li{margin:.35em 0}
.prose blockquote{margin:1.4em 0;padding:.5em 1.3em;border-left:3px solid var(--sky);color:var(--mut);background:var(--soft);border-radius:0 14px 14px 0}
.prose table{display:block;width:100%;max-width:100%;overflow-x:auto;border-collapse:collapse;margin:0 0 1.3em;-webkit-overflow-scrolling:touch}
.prose th,.prose td{border:1px solid var(--line);padding:10px 14px;text-align:left;font-size:16px;vertical-align:top}
.prose th{background:var(--soft);font-weight:600}
.prose .jke-table-wrap,.prose .table-wrap,.prose .table-responsive{display:block;width:100%;overflow-x:auto;margin:1rem 0 1.3rem;border:1px solid var(--line);border-radius:14px;-webkit-overflow-scrolling:touch}
.cta{display:flex;flex-wrap:wrap;gap:14px 24px;justify-content:space-between;align-items:center;background:var(--soft);border:1px solid var(--line);border-radius:22px;padding:26px;margin:34px 0}
.cta h3{font-size:21px}
.cta p{margin:4px 0 0;color:var(--mut)}
.share{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:0 0 22px}
.share b{font-size:14.5px;margin-right:4px}
.share a{border:1px solid var(--line2);border-radius:99px;padding:7px 16px;font-weight:600;font-size:14px;text-decoration:none;color:var(--ink);transition:background .15s}
.share a:hover{background:var(--soft)}
.dnote{font-size:14px;color:var(--mut);border-top:1px solid var(--line);padding-top:18px}
.side{align-self:start;position:sticky;top:92px}
.box2{border:1px solid var(--line);border-radius:20px;overflow:hidden}
.box2 h2{font-size:14.5px;font-weight:600;color:var(--mut);letter-spacing:0;padding:14px 20px;border-bottom:1px solid var(--line);background:var(--soft)}
.box2 a{display:block;padding:14px 20px;border-bottom:1px solid var(--line);text-decoration:none;font-weight:600;font-size:15px;line-height:1.4;transition:color .15s}
.box2 a:last-child{border-bottom:0}
.box2 a:hover{color:var(--blue)}
.box2 small{display:block;font-weight:400;color:var(--mut);margin-top:2px}

/* ---- Styles for imported Blogger posts (kept so old content still looks right) ---- */
.prose .jke-post{max-width:none}
.prose .jke-author{display:flex;align-items:center;gap:12px;background:var(--soft);border:1px solid var(--line);padding:12px 16px;border-radius:16px;margin:0 0 22px}
.prose .jke-avatar{width:42px;height:42px;border-radius:50%;background:var(--navy);color:#fff;display:grid;place-items:center;font-weight:700;flex:none}
.prose .jke-author-name{font-weight:600}
.prose .jke-author-bio{font-size:13px;color:var(--mut)}
.prose .jke-summary,.prose .jke-golden{background:var(--soft);color:var(--ink);border:1px solid var(--line);padding:18px 22px;border-radius:18px;margin:0 0 24px}
.prose .jke-golden{margin:26px 0 0}
.prose .jke-summary-title{font-size:13px;font-weight:700;color:var(--blue)}
.prose .jke-golden-title{font-size:20px;font-weight:700}
.prose .jke-callout,.prose .jke-tip,.prose .jke-warn{padding:14px 18px;border-radius:14px;margin:0 0 20px;font-size:16px;border-left:3px solid var(--blue);background:var(--soft)}
.prose .jke-tip{border-left-color:var(--green);background:var(--greenbg)}
.prose .jke-warn{border-left-color:#d98200;background:#fff6e5}
.prose .jke-h2{border-left:3px solid var(--blue);padding-left:14px}
.prose .jke-table th{background:var(--soft);color:var(--ink)}
.prose .jke-steps,.prose .jke-strategy-grid,.prose .jke-two-col,.prose .jke-date-grid,.prose .jke-formula-grid{display:grid;gap:12px;margin:0 0 22px}
.prose .jke-two-col,.prose .jke-strategy-grid,.prose .jke-date-grid,.prose .jke-formula-grid{grid-template-columns:1fr 1fr}
.prose .jke-step,.prose .jke-strategy-card,.prose .jke-two-col-box,.prose .jke-date-card,.prose .jke-worked,.prose .jke-pyq,.prose .jke-equation-box{border:1px solid var(--line);border-radius:16px;padding:16px 18px;background:#fff}
.prose .jke-formula-card,.prose .jke-mass-card{background:#0f1b33;color:#e8eefb;border-radius:16px;padding:16px 18px}
.prose .jke-step{display:flex;gap:14px}
.prose .jke-step-num{font-weight:800;font-size:24px;color:var(--blue)}
.prose .jke-faq-q{font-weight:600;border-left:3px solid var(--blue);padding-left:12px;margin:16px 0 4px}
.prose .jke-faq-a{padding-left:15px;color:var(--mut)}

/* ---- Scroll reveal (class added by a small script, so no-JS visitors see everything) ---- */
.js .rv{opacity:0;transform:translateY(24px);transition:opacity .7s cubic-bezier(.2,.7,.2,1),transform .7s cubic-bezier(.2,.7,.2,1);transition-delay:var(--d,0s)}
.js .rv.in{opacity:1;transform:none}
@media(prefers-reduced-motion:reduce){.js .rv{opacity:1;transform:none;transition:none}}

/* ---- Responsive ---- */
@media(max-width:980px){
  .vg,.gs,.bk{grid-template-columns:repeat(2,minmax(0,1fr))}
  .ll{grid-template-columns:repeat(2,minmax(0,1fr))}
  .pg{grid-template-columns:minmax(0,1fr);gap:32px}
  .side{position:static}
}
@media(max-width:900px){
  .hg{grid-template-columns:minmax(0,1fr);gap:44px;padding:48px 24px 52px}
  .ca{grid-template-columns:minmax(0,1fr)}
  .how{grid-template-columns:minmax(0,1fr);gap:28px}
}
@media(max-width:860px){
  nav.m{display:none}
  .mb{display:inline-flex}
  .bar{gap:12px}
  .bar>.btn{margin-left:auto}
}
@media(max-width:640px){
  .w{padding-left:20px;padding-right:20px}
  .sb nav{margin:0 -20px;padding:9px 20px}
  .car{margin:0 -20px;padding:0 20px 6px;scroll-padding:0 20px}
  .hg{padding:36px 20px 44px}
  .hf{grid-template-columns:minmax(0,1fr)}
  .search input{padding-left:42px}
  .search button{padding:12px 18px}
  section.s{margin-top:60px}
  .sh,.sh2{align-items:flex-start}
  .vg,.gs,.bk,.ll{grid-template-columns:minmax(0,1fr)}
  .bc{min-height:0}
  .prep{padding:48px 0;margin-top:64px}
  .lib{border-radius:24px}
  .join{border-radius:22px}
  .mag{padding:26px}
  .lst{padding:4px 20px}
  .prose{font-size:17px}
  .prose .jke-two-col,.prose .jke-strategy-grid,.prose .jke-date-grid,.prose .jke-formula-grid{grid-template-columns:1fr}
  .prose th,.prose td,.glance th,.glance td{padding:9px 11px;font-size:14.5px}
  footer.fd{padding:48px 0 22px;margin-top:64px}
  .ft{padding-bottom:32px}
  .ft h2{flex:1 1 100%}
  .fg{grid-template-columns:repeat(2,minmax(0,1fr));gap:28px 20px;padding:32px 0}
  .fb{grid-column:1/-1}
}
@media(max-width:560px){
  .jk-wm{font-size:24px}
  .jk-tag{font-size:9.5px}
  .bar>.btn{padding:9px 14px;font-size:13.5px}
}
@media(max-width:440px){
  .bar>.btn{display:none}
}
`;
