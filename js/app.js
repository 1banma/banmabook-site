
function toast(m){var t=document.createElement('div');t.className='toast toast-info';t.innerHTML='<span class="toast-message">'+m+'</span>';document.body.appendChild(t);setTimeout(function(){t.remove()},1800);}
function copyText(s,msg){msg=msg||'链接已复制，去网盘转存';if(navigator.clipboard){navigator.clipboard.writeText(s).then(function(){toast(msg)},function(){fb(s,msg)});}else{fb(s,msg);}}
function fb(s,msg){msg=msg||'链接已复制';var i=document.createElement('textarea');i.value=s;document.body.appendChild(i);i.select();try{document.execCommand('copy');toast(msg);}catch(e){toast('复制失败，请手动长按');}i.remove();}
document.addEventListener('click',function(e){
  var b=e.target.closest('.copy-btn');if(b){e.preventDefault();copyText(b.getAttribute('data-copy'),b.getAttribute('data-msg'));return;}
  var x=e.target.closest('.modal-close');if(x&&document.getElementById('mwrap')){e.preventDefault();closeModal();return;}
  var a=e.target.closest('.book-card');if(a){return;}
  var c=e.target.closest('.cta');if(c){e.preventDefault();var t=document.getElementById('dl');if(t)t.scrollIntoView({behavior:'smooth'});return;}
});
function closeModal(){var w=document.getElementById('mwrap');if(w){w.remove();document.body.style.overflow='';}}
function openModal(href){closeModal();fetch(href).then(function(r){return r.text();}).then(function(t){
  var doc=new DOMParser().parseFromString(t,'text/html');var m=doc.querySelector('.modal');if(!m){location.href=href;return;}
  var ov=document.createElement('div');ov.className='modal-overlay';ov.id='mwrap';ov.appendChild(document.importNode(m,true));
  document.body.appendChild(ov);document.body.style.overflow='hidden';
  ov.addEventListener('click',function(e){if(e.target===ov)closeModal();});
}).catch(function(){location.href=href;});}
document.addEventListener('keydown',function(e){if(e.key==='Escape')closeModal();});
var navq=document.getElementById('navq');
if(navq){navq.addEventListener('keydown',function(e){if(e.key==='Enter'){location.href='/search.html?q='+encodeURIComponent(navq.value.trim());}});}
(function(){var box=document.getElementById('results');if(!box)return;var DATA=null,inp=navq;
function esc(s){return (s||'').replace(/[&<>]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;'}[c];});}
function render(list){if(!list.length){box.innerHTML='<div class="book-grid"><div class="empty-state"><p>没有匹配的书名或作者</p></div></div>';return;}box.innerHTML='<div class="book-grid">'+list.slice(0,300).map(function(b){return '<a class="book-card" href="/book/'+b.id+'.html"><div class="book-card-title">'+esc(b.title)+'</div><div class="book-card-meta-line"><span class="book-card-author">'+esc(b.author)+'</span></div><div class="book-card-foot"><span class="book-card-tag">'+esc(b.category)+'</span><span class="book-card-meta">TXT</span></div></a>';}).join('')+'</div>';}
function go(k){if(!DATA)return;k=(k||'').toLowerCase();if(!k){box.innerHTML='';return;}render(DATA.filter(function(b){return (b.title||'').toLowerCase().indexOf(k)>=0||(b.author||'').toLowerCase().indexOf(k)>=0;}));}
fetch('/search.json').then(function(r){return r.json();}).then(function(d){DATA=d;var p=(new URLSearchParams(location.search)).get('q')||'';if(inp){inp.value=p;inp.focus();}go(p);});
if(inp){inp.addEventListener('input',function(){go(inp.value);});}
})();
