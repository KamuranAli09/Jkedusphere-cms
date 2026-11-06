// Served at /admin/assets/app.js (external file so the strict CSP stays intact)
export const APP_JS = `(function(){
document.addEventListener('submit',function(e){var m=e.target.getAttribute&&e.target.getAttribute('data-confirm');if(m&&!confirm(m))e.preventDefault();});

function compress(file,cb){
  function draw(srcImg,sw,sh){
    var w=Math.min(sw,1200),h=Math.round(sh*w/sw);
    var c=document.createElement('canvas');c.width=w;c.height=h;c.getContext('2d').drawImage(srcImg,0,0,w,h);
    var q=0.82;
    (function go(){c.toBlob(function(b){if(b&&b.size>400000&&q>0.4){q-=0.12;go();}else cb(b);},'image/webp',q);})();
  }
  var bad=function(){alert('Could not read that image file. Please use a JPG, PNG or WebP image.');};
  if(window.createImageBitmap){
    createImageBitmap(file).then(function(bm){draw(bm,bm.width,bm.height);}).catch(bad);
    return;
  }
  var img=new Image(),url=URL.createObjectURL(file);
  img.onload=function(){draw(img,img.width,img.height);URL.revokeObjectURL(url);};
  img.onerror=bad;
  img.src=url;
}
function upload(file,cb){
  compress(file,function(b){
    if(!b||b.type!=='image/webp'){alert('Your browser could not convert the image to WebP.');return;}
    if(b.size>450000){alert('Image is still too large after compression. Please use a smaller image.');return;}
    fetch('/admin/upload',{method:'POST',headers:{'Content-Type':'image/webp'},body:b})
      .then(function(r){return r.json();})
      .then(function(j){if(j.url)cb(j.url);else alert(j.error||'Upload failed');})
      .catch(function(){alert('Upload failed');});
  });
}
function pick(cb){
  var i=document.createElement('input');i.type='file';i.accept='image/*';
  i.onchange=function(){if(i.files&&i.files[0])upload(i.files[0],cb);};i.click();
}

var fb=document.getElementById('pickFeatured');
if(fb){fb.onclick=function(){pick(function(u){var f=document.getElementById('image');f.value=u;var t=document.getElementById('thumb');if(t){t.src=u;t.style.display='block';}});};}

function jkCard(title,kicker){
  var W=1200,H=630,c=document.createElement('canvas');c.width=W;c.height=H;var x=c.getContext('2d');
  var F='Inter, "Segoe UI", Helvetica, Arial, sans-serif';
  title=String(title||'').replace(/ *[|] *JKEdusphere *$/i,'').split(/[ ]+/).join(' ').trim();
  kicker=String(kicker||'').toUpperCase().trim();
  x.fillStyle='#0d2b52';x.fillRect(0,0,W,H);
  x.fillStyle='#eab308';x.fillRect(80,70,14,14);
  x.textBaseline='alphabetic';x.fillStyle='#ffffff';x.font='700 30px '+F;x.fillText('JKEdusphere',108,87);
  var n=title.length,size=n<=38?80:n<=65?68:n<=100?56:46,lh=Math.round(size*1.14);
  x.font='700 '+size+'px '+F;
  var words=title.split(' '),lines=[],cur='';
  words.forEach(function(w){var t=cur?cur+' '+w:w;if(x.measureText(t).width>1040&&cur){lines.push(cur);cur=w;}else cur=t;});
  if(cur)lines.push(cur);
  if(lines.length>4){lines=lines.slice(0,4);var l=lines[3];while(l.length>1&&x.measureText(l+String.fromCharCode(8230)).width>1040)l=l.slice(0,-1);lines[3]=l.trim()+String.fromCharCode(8230);}
  var blockH=lines.length*lh,top=Math.round(315-blockH/2)+20;
  if(kicker){x.font='500 24px '+F;x.fillStyle='#2fc9a0';if('letterSpacing' in x)x.letterSpacing='4px';x.fillText(kicker,80,top-62);if('letterSpacing' in x)x.letterSpacing='0px';}
  x.fillStyle='#eab308';x.fillRect(80,top-40,72,6);
  x.fillStyle='#ffffff';x.font='700 '+size+'px '+F;
  lines.forEach(function(t,i){x.fillText(t,80,top+size*0.82+i*lh);});
  x.fillStyle='rgba(255,255,255,0.18)';x.fillRect(80,510,1040,1);
  x.fillStyle='#ffffff';x.font='500 24px '+F;x.fillText('jkedusphere.online',80,566);
  x.fillStyle='#8fa6c4';x.font='500 22px '+F;x.textAlign='right';x.fillText(['JKSSB','JKPSC','JKPSI','SSC'].join('  '+String.fromCharCode(183)+'  '),1120,566);x.textAlign='left';
  return c;
}
function cardUpload(title,kicker,cb){
  var c=jkCard(title,kicker),q=0.9;
  (function go(){c.toBlob(function(b){
    if(!b||b.type!=='image/webp'){alert('Your browser could not create the image.');return;}
    if(b.size>440000&&q>0.5){q-=0.2;go();return;}
    fetch('/admin/upload',{method:'POST',headers:{'Content-Type':'image/webp'},body:b})
      .then(function(r){return r.json();})
      .then(function(j){if(j.url)cb(j.url);else alert(j.error||'Upload failed');})
      .catch(function(){alert('Upload failed');});
  },'image/webp',q);})();
}
var gen=document.getElementById('genFeatured');
function formCard(f){
  var cat=f.elements.category?f.elements.category.value:'';
  if(cat==='__new__'&&f.elements.new_category)cat=f.elements.new_category.value;
  return [f.elements.title.value,cat];
}
function setImg(u){var f=document.getElementById('image');f.value=u;var t=document.getElementById('thumb');if(t){t.src=u;t.style.display='block';}}
if(gen){
  gen.onclick=function(){var f=gen.closest('form'),a=formCard(f);if(!a[0].trim()){alert('Type the title first.');return;}gen.disabled=true;cardUpload(a[0],a[1],function(u){setImg(u);gen.disabled=false;});};
  gen.closest('form').addEventListener('submit',function(e){
    var f=e.target;if(f.__gen)return;
    var img=document.getElementById('image');var a=formCard(f);
    if(img&&!img.value.trim()&&a[0].trim()){
      e.preventDefault();
      cardUpload(a[0],a[1],function(u){setImg(u);f.__gen=true;f.submit();});
    }
  });
}
var bulk=document.getElementById('bulkGen');
if(bulk){
  var out=document.getElementById('bulkOut'),list=[];
  Promise.all([fetch('/admin/share-images/list').then(function(r){return r.json();}),fetch('/admin/share-images/notes-list').then(function(r){return r.json();})]).then(function(a){
    a[0].forEach(function(p){list.push({kind:'post',id:p.id,title:p.title,kicker:p.category});});
    a[1].forEach(function(s){list.push({kind:'notes',id:s.slug,title:s.title,kicker:'Free notes'});});
    out.textContent=list.length?list.length+' item(s) have no image ('+a[0].length+' post(s), '+a[1].length+' notes subject(s)).':'Everything already has an image.';bulk.disabled=!list.length;
  });
  bulk.onclick=function(){
    bulk.disabled=true;var i=0;
    (function next(){
      if(i>=list.length){out.textContent='Done. '+list.length+' image(s) created.';return;}
      var p=list[i];out.textContent='Creating '+(i+1)+' of '+list.length+': '+p.title;
      cardUpload(p.title,p.kicker,function(u){
        var url=p.kind==='post'?'/admin/share-images/set':'/admin/share-images/notes-set';
        var body=p.kind==='post'?{id:p.id,url:u}:{slug:p.id,url:u};
        fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}).then(function(){i++;next();});
      });
    })();
  };
}
var cs=document.getElementById('category'),nc=document.getElementById('newCategory');
if(cs&&nc){var tog=function(){var on=cs.value==='__new__';nc.style.display=on?'block':'none';if(on)nc.focus();};cs.addEventListener('change',tog);tog();}

var ed=document.getElementById('editor');if(!ed)return;
var src=document.getElementById('source'),tb=document.getElementById('toolbar'),form=ed.closest('form'),srcMode=false;
ed.innerHTML=src.value;
function cmd(c,v){ed.focus();document.execCommand(c,false,v||null);}
function add(label,fn){var b=document.createElement('button');b.type='button';b.textContent=label;b.onclick=fn;tb.appendChild(b);return b;}
[['Bold','bold'],['Italic','italic'],['Underline','underline'],['H2','formatBlock','h2'],['H3','formatBlock','h3'],['Paragraph','formatBlock','p'],['Bullets','insertUnorderedList'],['Numbers','insertOrderedList'],['Quote','formatBlock','blockquote'],['Line','insertHorizontalRule'],['Clear format','removeFormat']].forEach(function(x){add(x[0],function(){cmd(x[1],x[2]);});});
add('Link',function(){var u=prompt('Link URL (https://...)');if(u)cmd('createLink',u);});
add('Table',function(){var r='<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>';cmd('insertHTML','<table style="width:100%;border-collapse:collapse"><tr><th>Heading</th><th>Heading</th><th>Heading</th></tr>'+r+r+'</table><p></p>');});
add('Image',function(){pick(function(u){var a=prompt('Describe the image (alt text, helps SEO):','')||'';cmd('insertHTML','<img src="'+u+'" alt="'+a.replace(/"/g,'&quot;')+'">');});});
var sb=add('HTML source',function(){
  srcMode=!srcMode;
  if(srcMode){src.value=ed.innerHTML;src.hidden=false;ed.style.display='none';sb.textContent='Visual editor';}
  else{ed.innerHTML=src.value;src.hidden=true;ed.style.display='';sb.textContent='HTML source';}
});
form.addEventListener('submit',function(){if(!srcMode)src.value=ed.innerHTML;});
})();`;
