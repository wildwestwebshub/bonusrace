(function(){
  // mobile menu
  var b=document.querySelector('.menu'),l=document.getElementById('navlinks');
  if(b&&l)b.addEventListener('click',function(){var o=l.classList.toggle('open');b.setAttribute('aria-expanded',o)});
  // slideshow: load photos one at a time, only fade once the next photo is ready
  var s=[].slice.call(document.querySelectorAll('.slide')),d=document.querySelector('.dots');
  if(s.length>1&&d){
    var i=0,t,rm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function load(n,cb){var im=s[n].querySelector('img');if(!im.getAttribute('src')&&im.dataset.src){im.onload=im.onerror=function(){cb&&cb()};im.src=im.dataset.src}else{cb&&cb()}}
    s.forEach(function(_,n){var x=document.createElement('button');x.setAttribute('aria-label','Photo '+(n+1));x.onclick=function(){go(n,true)};d.appendChild(x)});
    function go(n,u){load(n,function(){s[i].classList.remove('on');d.children[i].classList.remove('on');i=n;s[i].classList.add('on');d.children[i].classList.add('on');load((i+1)%s.length);if(u)reset()})}
    function reset(){clearInterval(t);if(!rm&&!document.hidden)t=setInterval(function(){go((i+1)%s.length)},6000)}
    document.addEventListener('visibilitychange',reset);
    d.children[0].classList.add('on');
    window.addEventListener('load',function(){load(1);reset()});
  }
  // sponsor marquee: wait for every banner to load, then scroll at a steady speed
  var m=document.querySelector('.marquee');
  if(m&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    var imgs=[].slice.call(m.querySelectorAll('img')),left=imgs.length,started=false;
    function startM(){if(started)return;started=true;m.innerHTML+=m.innerHTML;var w=m.scrollWidth/2;m.style.setProperty('--dur',Math.max(30,Math.round(w/55))+'s');m.classList.add('run')}
    imgs.forEach(function(im){if(im.complete){left--}else{var f=function(){if(--left<=0)startM()};im.addEventListener('load',f);im.addEventListener('error',f)}});
    if(left<=0)startM();
    setTimeout(startM,6000);
  }
  // countdown
  var c=document.getElementById('count');
  if(c){var T=new Date(c.dataset.target).getTime();
    function tick(){var ms=T-Date.now();if(ms<0){c.style.display='none';return}
      var m=Math.floor(ms/60000);document.getElementById('cd').textContent=Math.floor(m/1440);
      document.getElementById('ch').textContent=Math.floor(m%1440/60);document.getElementById('cm').textContent=m%60}
    tick();setInterval(tick,30000)}
})();
// replay the animated logo whenever it scrolls into view (or is tapped)
(function(){var im=document.querySelector('.logo-panel img');if(!im)return;var base=im.getAttribute('src'),n=0;
function replay(){im.src=base+'?r='+(++n)}
if('IntersectionObserver' in window){var seen=false;new IntersectionObserver(function(e){e.forEach(function(x){if(x.isIntersecting&&!seen){seen=true;replay()}if(!x.isIntersecting)seen=false})},{threshold:.6}).observe(im)}
im.addEventListener('click',replay)})();
