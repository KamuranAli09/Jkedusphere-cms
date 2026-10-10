// Served at /admin/assets/app.js (external file so the strict CSP stays intact)
export const APP_JS = `(function(){
document.addEventListener('submit',function(e){var m=e.target.getAttribute&&e.target.getAttribute('data-confirm');if(m&&!confirm(m))e.preventDefault();});

function compress(file,cb){
  var img=new Image(),url=URL.createObjectURL(file);
  img.onload=function(){
    var w=Math.min(img.width,1200),h=Math.round(img.height*w/img.width);
    var c=document.createElement('canvas');c.width=w;c.height=h;c.getContext('2d').drawImage(img,0,0,w,h);
    var q=0.82;
    (function go(){c.toBlob(function(b){if(b&&b.size>400000&&q>0.4){q-=0.12;go();}else cb(b);},'image/webp',q);})();
    URL.revokeObjectURL(url);
  };
  img.onerror=function(){alert('Could not read that image file.');};
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
