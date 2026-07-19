const menu=document.querySelector('.menu-button'),nav=document.querySelector('.nav-list');
menu?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open);document.body.classList.toggle('menu-open',open)});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu?.setAttribute('aria-expanded','false');document.body.classList.remove('menu-open')}));
const header=document.querySelector('.site-header');addEventListener('scroll',()=>header?.classList.toggle('scrolled',scrollY>20),{passive:true});
document.querySelector('#year').textContent=new Date().getFullYear();
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const target=document.querySelector('#type-target');if(target&&!reduced){const words=['full-stack products','reliable APIs','clear experiences','useful software'];let word=0,char=words[0].length,erase=true;const tick=()=>{const text=words[word];target.textContent='"'+text.slice(0,char)+'"';if(erase){char--;if(char<0){erase=false;word=(word+1)%words.length;setTimeout(tick,350);return}}else{char++;if(char>words[word].length){erase=true;setTimeout(tick,1500);return}}setTimeout(tick,erase?45:75)};setTimeout(tick,1200)}
const finePointer=matchMedia('(hover: hover) and (pointer: fine)').matches;
if(finePointer&&!reduced){
  document.querySelectorAll('.project').forEach(card=>card.addEventListener('pointermove',event=>{const box=card.getBoundingClientRect();card.style.setProperty('--mx',`${event.clientX-box.left}px`);card.style.setProperty('--my',`${event.clientY-box.top}px`)}));
  const stage=document.querySelector('.hero-stage');
  stage?.addEventListener('pointermove',event=>{const box=stage.getBoundingClientRect(),x=(event.clientX-box.left)/box.width-.5,y=(event.clientY-box.top)/box.height-.5;stage.style.setProperty('--rx',`${-y*3}deg`);stage.style.setProperty('--ry',`${x*4}deg`)});
  stage?.addEventListener('pointerleave',()=>{stage.style.setProperty('--rx','0deg');stage.style.setProperty('--ry','0deg')});
}
