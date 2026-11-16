(() => {
const menuButton=document.querySelector(".menu-toggle");
const nav=document.querySelector(".nav");
menuButton?.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuButton.setAttribute("aria-expanded",String(open));});
nav?.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{nav.classList.remove("open");menuButton.setAttribute("aria-expanded","false");}));
const year=document.querySelector("#year");if(year)year.textContent=new Date().getFullYear();
document.querySelector("#quote-form")?.addEventListener("submit",event=>{event.preventDefault();const data=new FormData(event.currentTarget);const name=String(data.get("nome")||"").trim();const project=data.get("projeto");const message=String(data.get("mensagem")||"").trim();const body="Olá, ARTSIGN! Meu nome é "+name+". Tenho interesse em: "+project+"."+(message?"\n\nMinha ideia: "+message:"");window.location.href="https://wa.me/5516981047886?text="+encodeURIComponent(body);});
const progress=document.createElement("div");progress.className="scroll-progress";progress.setAttribute("aria-hidden","true");document.body.appendChild(progress);
const updateProgress=()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max>0?(scrollY/max)*100:0)+"%";};addEventListener("scroll",updateProgress,{passive:true});updateProgress();
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
if(reduce)return;
if(window.gsap&&window.ScrollTrigger){
 gsap.registerPlugin(ScrollTrigger);
 gsap.config({nullTargetWarn:false});
 gsap.from(".hero-copy .eyebrow,.hero-copy .hero-kicker,.hero-copy h1,.hero-copy .hero-description,.hero-copy .hero-actions",{y:45,opacity:0,filter:"blur(8px)",duration:1.05,stagger:.13,ease:"power4.out",delay:.15});
 gsap.from(".hero-image-wrap",{clipPath:"inset(0 0 100% 0)",scale:1.12,rotation:8,duration:1.5,ease:"power4.inOut",delay:.35});
 gsap.to(".hero-image-wrap img",{scale:1.18,yPercent:-5,ease:"none",scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:1}});
 gsap.to(".hero-orbit",{rotation:360,ease:"none",scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:2}});
 gsap.utils.toArray(".case-row,.flyer-row").forEach((row,i)=>{
  const visual=row.querySelector(".case-visual,.flyer-image");
  const copy=row.querySelector(".case-copy,.flyer-copy");
  const reverse=row.classList.contains("reverse")||row.classList.contains("reveal-right");
  const tl=gsap.timeline({scrollTrigger:{trigger:row,start:"top 82%",end:"center 48%",scrub:1.1}});
  tl.fromTo(visual,{x:reverse?110:-110,y:55,rotateY:reverse?-9:9,scale:.88,opacity:0,filter:"blur(12px)",clipPath:reverse?"inset(0 0 0 100%)":"inset(0 100% 0 0)"},{x:0,y:0,rotateY:0,scale:1,opacity:1,filter:"blur(0px)",clipPath:"inset(0 0 0 0)",ease:"power3.out"},0)
    .fromTo(copy,{x:reverse?-85:85,y:35,opacity:0,filter:"blur(8px)"},{x:0,y:0,opacity:1,filter:"blur(0px)",ease:"power3.out"},.12);
  gsap.fromTo(visual.querySelector("img"),{scale:1.18},{scale:1,ease:"none",scrollTrigger:{trigger:row,start:"top bottom",end:"center center",scrub:1}});
 });
 gsap.utils.toArray(".manifesto-grid,.section-heading,.service-list article,.contact-copy,.quote-form,.flyer-banner").forEach((el,i)=>{
  gsap.fromTo(el,{y:55,opacity:0},{y:0,opacity:1,duration:.9,ease:"power3.out",scrollTrigger:{trigger:el,start:"top 90%",toggleActions:"play none none reverse"}});
 });
 gsap.utils.toArray(".section-label").forEach(el=>gsap.fromTo(el,{x:-35,opacity:0},{x:0,opacity:1,duration:.7,scrollTrigger:{trigger:el,start:"top 92%",toggleActions:"play none none reverse"}}));
 ScrollTrigger.refresh();
}else{
 const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in-view");observer.unobserve(e.target);}}),{threshold:.12});
 document.querySelectorAll(".case-row,.flyer-row,.manifesto-grid,.section-heading,.service-list article,.contact-copy,.quote-form").forEach(el=>observer.observe(el));
}
if(matchMedia("(pointer:fine)").matches){const art=document.querySelector(".hero-art");document.querySelector(".hero")?.addEventListener("pointermove",e=>{if(!art)return;const r=e.currentTarget.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5;const y=(e.clientY-r.top)/r.height-.5;window.gsap?.to?window.gsap.to(art,{x:x*13,y:y*11,duration:.7,ease:"power2.out"}):art.style.transform="translate3d("+x*9+"px,"+y*8+"px,0)";});}
})();