const menuButton=document.querySelector(".menu-toggle");
const nav=document.querySelector(".nav");
menuButton?.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuButton.setAttribute("aria-expanded",String(open));});
nav?.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{nav.classList.remove("open");menuButton.setAttribute("aria-expanded","false");}));

// Scroll-triggered cinematic reveals: the image and copy animate independently.
const animatedRows=[...document.querySelectorAll(".case-row,.flyer-row")];
const simpleTargets=[...document.querySelectorAll(".manifesto-grid,.section-heading,.service-list article,.contact-copy,.quote-form")];
function revealRow(row){
 const image=row.querySelector(".case-visual,.flyer-image");
 const copy=row.querySelector(".case-copy,.flyer-copy");
 const reverse=row.classList.contains("reverse") || row.classList.contains("reveal-right");
 const fromImage=reverse?55:-55;
 if(image){image.animate([
  {opacity:0,transform:"translateX("+fromImage+"px) scale(.94)",filter:"blur(10px)"},
  {opacity:1,transform:"translateX(0) scale(1)",filter:"blur(0px)"}
 ],{duration:1150,easing:"cubic-bezier(.16,1,.3,1)",fill:"both"});}
 if(copy){copy.animate([
  {opacity:0,transform:"translateX("+(-fromImage*.55)+"px) translateY(24px)",filter:"blur(6px)"},
  {opacity:1,transform:"translateX(0) translateY(0)",filter:"blur(0px)"}
 ],{duration:900,delay:180,easing:"cubic-bezier(.16,1,.3,1)",fill:"both"});}
 row.classList.add("in-view");
}
if("IntersectionObserver" in window){
 const rowObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){revealRow(entry.target);rowObserver.unobserve(entry.target);}}),{threshold:.18,rootMargin:"0px 0px -8% 0px"});
 animatedRows.forEach(row=>rowObserver.observe(row));
 const simpleObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.animate([{opacity:0,transform:"translateY(35px)"},{opacity:1,transform:"translateY(0)"}],{duration:850,easing:"cubic-bezier(.16,1,.3,1)",fill:"both"});simpleObserver.unobserve(entry.target);}}),{threshold:.12});
 simpleTargets.forEach(el=>simpleObserver.observe(el));
}else{[...animatedRows,...simpleTargets].forEach(el=>el.classList.add("in-view"));}
const progress=document.createElement("div");progress.className="scroll-progress";progress.setAttribute("aria-hidden","true");document.body.appendChild(progress);
let scrollTick=false;const updateProgress=()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max>0?(scrollY/max)*100:0)+"%";scrollTick=false;};addEventListener("scroll",()=>{if(!scrollTick){requestAnimationFrame(updateProgress);scrollTick=true;}},{passive:true});updateProgress();
if(matchMedia("(pointer:fine)").matches){const art=document.querySelector(".hero-art");document.querySelector(".hero")?.addEventListener("pointermove",e=>{if(!art)return;const r=e.currentTarget.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5;const y=(e.clientY-r.top)/r.height-.5;art.style.transform="translate3d("+x*9+"px,"+y*8+"px,0)";});}
document.querySelector("#quote-form")?.addEventListener("submit",event=>{event.preventDefault();const data=new FormData(event.currentTarget);const name=String(data.get("nome")||"").trim();const project=data.get("projeto");const message=String(data.get("mensagem")||"").trim();const body="Olá, ARTSIGN! Meu nome é "+name+". Tenho interesse em: "+project+"."+(message?"\n\nMinha ideia: "+message:"");window.location.href="https://wa.me/5516981047886?text="+encodeURIComponent(body);});
const year=document.querySelector("#year");if(year)year.textContent=new Date().getFullYear();