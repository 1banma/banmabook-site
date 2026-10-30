
// 封面图还没下来的时候先亮一块底色，到了再淡进来。脚本不跑也不影响，图片照常显示
function covFade(root){(root||document).querySelectorAll('.bcov img').forEach(function(im){if(im.complete)return;var box=im.parentNode;box.classList.add('ld');im.style.opacity='0';function done(){box.classList.remove('ld');im.style.opacity='';}im.addEventListener('load',done,{once:true});im.addEventListener('error',done,{once:true});});}
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
(function(){
function getSyn(){return document.getElementById('synModal');}
function openSyn(){var m=getSyn();if(!m)return;if(m.parentNode!==document.body)document.body.appendChild(m);m.classList.add('on');document.body.style.overflow='hidden';}
function closeSyn(){var m=getSyn();if(m&&m.classList.contains('on')){m.classList.remove('on');document.body.style.overflow='';}}
document.addEventListener('click',function(e){
  if(e.target.closest('.syn-more')){openSyn();return;}
  var m=getSyn();if(!m||!m.classList.contains('on'))return;
  if(e.target===m||e.target.closest('.syn-sheet-x'))closeSyn();
});
document.addEventListener('keydown',function(e){if(e.key==='Escape')closeSyn();});
// 简介没被截就藏掉展开按钮，不然点了弹出一个一模一样的东西
function fitSyn(){var box=document.querySelector('.syn-box'),btn=document.querySelector('.syn-more');
  if(!box||!btn)return;if(box.scrollHeight<=box.clientHeight+2)btn.style.display='none';}
if(document.readyState==='complete')fitSyn();
else window.addEventListener('load',fitSyn);
})();
var navq=document.getElementById('navq');
if(navq){navq.addEventListener('keydown',function(e){if(e.key==='Enter'){location.href='/search.html?q='+encodeURIComponent(navq.value.trim());}});}
// 窄屏顶栏放不下输入框，先收成一枚放大镜，点开再铺满整条
(function(){var ns=document.getElementById('navSearch');if(!ns||!navq)return;
var mq=window.matchMedia('(max-width:768px)'),cancel=ns.querySelector('.q-cancel');
function qopen(){document.body.classList.add('q-on');navq.focus();}
function qshut(){document.body.classList.remove('q-on');navq.blur();}
ns.addEventListener('click',function(e){if(!mq.matches||document.body.classList.contains('q-on'))return;e.preventDefault();qopen();});
if(cancel)cancel.addEventListener('click',function(e){e.stopPropagation();qshut();});
document.addEventListener('click',function(e){if(document.body.classList.contains('q-on')&&!ns.contains(e.target))qshut();});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&document.body.classList.contains('q-on'))qshut();});
})();
(function(){var box=document.getElementById('results');if(!box)return;
var DATA=null,sq=document.getElementById('sq'),inp=sq||navq;
function esc(s){return (s||'').replace(/[&<>]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;'}[c];});}
function render(list){if(!list.length){box.innerHTML='<div class="bgrid"><div class="empty-state"><p>没有匹配的书名或作者</p></div></div>';return;}box.innerHTML='<div class="bgrid">'+list.slice(0,300).map(function(b){var cv=b.s?'<div class="bcov"><img src="/covers/'+b.s+'.webp" alt="" loading="lazy" decoding="async"></div>':'<div class="bcov ph" style="--sc:#4A6741"><span class="ch">'+esc(b.title)+'</span></div>';var no=b.s?'<span class="bno">NO.'+esc(b.s)+'</span>':'';return '<a class="bcard" href="/book/'+b.id+'.html">'+cv+'<div class="bmain"><div class="bt">'+esc(b.title)+'</div><div class="bsub">'+esc(b.author)+'</div><div class="btags"><span class="tg">'+esc(b.category)+'</span><span class="tg pale">TXT</span></div><div class="bfoot">'+no+'<span class="bmore">查看详情 <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="12" x2="19" y2="12"></line><polyline points="13 6 19 12 13 18"></polyline></svg></span></div></div></a>';}).join('')+'</div>';covFade(box);}
function go(k){if(!DATA)return;k=(k||'').toLowerCase();var h=document.getElementById('shint');if(h)h.style.display=k?'none':'';if(!k){box.innerHTML='';return;}render(DATA.filter(function(b){return (b.title||'').toLowerCase().indexOf(k)>=0||(b.author||'').toLowerCase().indexOf(k)>=0;}));}
fetch('/search.json').then(function(r){return r.json();}).then(function(d){DATA=d;var p=(new URLSearchParams(location.search)).get('q')||'';if(inp){inp.value=p;if(navq&&sq)navq.value=p;inp.focus();}go(p);});
if(inp){inp.addEventListener('input',function(){if(navq&&sq)navq.value=inp.value;go(inp.value);});}
(function(){var gb=document.getElementById('sgo');if(!gb||!inp)return;gb.addEventListener('click',function(){go(inp.value);inp.blur();});})();
})();
(function(){
function getPkg(){return document.getElementById('pkgModal');}
function getZoom(){return document.getElementById('pkgZoom');}
function openPkg(){var m=getPkg();if(!m)return;if(m.parentNode!==document.body)document.body.appendChild(m);m.classList.add('on');document.body.style.overflow='hidden';}
function closePkg(){var m=getPkg();if(m&&m.classList.contains('on')){m.classList.remove('on');document.body.style.overflow='';}}
function openZoom(){var z=getZoom();if(!z)return;if(z.parentNode!==document.body)document.body.appendChild(z);z.classList.add('on');}
function closeZoom(){var z=getZoom();if(z)z.classList.remove('on');}
document.addEventListener('click',function(e){
  var z=getZoom();if(z&&z.classList.contains('on')){closeZoom();return;}
  var t=e.target.closest('a[href="#pkg"],[data-pkg-open]');
  if(t){e.preventDefault();openPkg();return;}
  if(e.target.closest('[data-pkg-zoom]')){openZoom();return;}
  if(e.target.closest('[data-pkg-close]')){closePkg();return;}
  var m=getPkg();if(!m||!m.classList.contains('on'))return;
  if(e.target===m)closePkg();
});
document.addEventListener('keydown',function(e){if(e.key==='Escape'){var z=getZoom();if(z&&z.classList.contains('on')){closeZoom();return;}closePkg();}});
})();
covFade();
