const reviewsSection=document.querySelector('.review-section');
if(reviewsSection){
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 const button=reviewsSection.querySelector('.review-pause');
 reviewsSection.querySelectorAll('.review-group').forEach(group=>{
  const duplicate=group.cloneNode(true);
  duplicate.setAttribute('aria-hidden','true');
  duplicate.querySelectorAll('a').forEach(a=>a.tabIndex=-1);
  group.parentElement.append(duplicate);
 });
 let paused=false;
 const update=()=>{reviewsSection.classList.toggle('is-animated',!motion.matches);reviewsSection.classList.toggle('is-paused',paused);button.hidden=motion.matches;button.textContent=paused?'Starta rullningen':'Pausa rullningen';button.setAttribute('aria-pressed',String(paused));};
 button.addEventListener('click',()=>{paused=!paused;update();});
 motion.addEventListener('change',update);update();
}
function openReview(){
 if(!location.hash.startsWith('#berattelse-'))return;
 const card=document.getElementById(location.hash.slice(1));
 const details=card?.querySelector('details');
 if(details){details.open=true;requestAnimationFrame(()=>card.scrollIntoView({block:'start',behavior:'instant'}));}
}
window.addEventListener('hashchange',openReview);openReview();
