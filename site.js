const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('#navigation');
toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');}));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){nav?.classList.remove('open');toggle?.setAttribute('aria-expanded','false');}});
const canvas=document.querySelector('#stars');
const glimmerMotion=matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
document.querySelectorAll('.service-tile').forEach(card=>{
  const glimmer=document.createElement('span');
  glimmer.className='cursor-glimmer';
  glimmer.setAttribute('aria-hidden','true');
  glimmer.innerHTML='<i></i><i></i><i></i>';
  card.append(glimmer);
  card.addEventListener('pointermove',event=>{
    if(!glimmerMotion.matches || event.pointerType==='touch')return;
    const bounds=card.getBoundingClientRect();
    card.style.setProperty('--glimmer-x',`${event.clientX-bounds.left}px`);
    card.style.setProperty('--glimmer-y',`${event.clientY-bounds.top}px`);
    card.classList.add('has-glimmer');
  });
  const clear=()=>card.classList.remove('has-glimmer');
  card.addEventListener('pointerleave',clear);
  card.addEventListener('pointercancel',clear);
  glimmerMotion.addEventListener('change',clear);
});
if(canvas){const ctx=canvas.getContext('2d');const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;let w,h,points=[],frame=0;function resize(){w=canvas.clientWidth;h=canvas.clientHeight;const d=Math.min(devicePixelRatio,2);canvas.width=w*d;canvas.height=h*d;ctx.setTransform(d,0,0,d,0,0);points=Array.from({length:Math.min(190,w/7)},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.1+.2,o:Math.random()*.65+.12,p:Math.random()*6.28}));}function draw(){ctx.clearRect(0,0,w,h);for(const p of points){ctx.globalAlpha=p.o*(.8+.2*Math.sin(frame*.012+p.p));ctx.fillStyle='#f3dfba';ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();}frame++;if(!reduce)requestAnimationFrame(draw);}resize();draw();window.addEventListener('resize',()=>{resize();if(reduce)draw();});}
