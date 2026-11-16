const preloader=document.querySelector(".preloader");
const prefersReduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
window.addEventListener("load",()=>window.setTimeout(()=>preloader?.classList.add("done"),prefersReduced?0:1500));
const menuButton=document.querySelector(".menu-toggle"),nav=document.querySelector(".nav");
menuButton?.addEventListener("click",()=>{const opened=nav.classList.toggle("open");menuButton.setAttribute("aria-expanded",String(opened));});
nav?.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{nav.classList.remove("open");menuButton.setAttribute("aria-expanded","false");}));
const glow=document.querySelector(".cursor-glow");
window.addEventListener("pointermove",event=>{if(glow&&event.pointerType!=="touch"){glow.style.left=event.clientX+"px";glow.style.top=event.clientY+"px";}},{passive:true});

// Reveal major content blocks with directional 3D entrances.
const revealTargets=document.querySelectorAll(".manifesto-grid h2,.manifesto-grid p,.work-intro h2,.work-intro>p,.flyers-heading h2,.flyers-heading p,.services-head h2,.services-head p,.service-row,.contact-grid>div,.quote-form,.section-kicker,.flyer-benefit,.flyer-callout,.footer-brand");
revealTargets.forEach((el,index)=>{if(!el.hasAttribute("data-reveal"))el.setAttribute("data-reveal",el.matches("p,.service-row")?(index%2?"right":"left"):"up");});
const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("revealed");revealObserver.unobserve(entry.target);}}),{threshold:.12,rootMargin:"0px 0px -7% 0px"});
document.querySelectorAll("[data-reveal]").forEach(el=>revealObserver.observe(el));
const header=document.querySelector(".header"),hero=document.querySelector(".hero");
if(hero){const headerObserver=new IntersectionObserver(([entry])=>header?.classList.toggle("scrolled",!entry.isIntersecting),{threshold:.08});headerObserver.observe(hero);}

// Scroll-driven scenes: each project image flies in, tilts and settles.
const scenes=[...document.querySelectorAll(".project-scene")];let ticking=false;
function updateScenes(){const vh=window.innerHeight;scenes.forEach(scene=>{const rect=scene.getBoundingClientRect(),travel=Math.max(1,scene.offsetHeight-vh),p=Math.min(1,Math.max(0,-rect.top/travel)),mobile=window.matchMedia("(max-width:650px)").matches,enter=mobile?65:82;
scene.style.setProperty("--progress",p.toFixed(4));scene.style.setProperty("--media-x",((1-p)*enter)+"vw");scene.style.setProperty("--media-y",((.5-p)*(mobile?30:45))+"px");scene.style.setProperty("--media-ry",((1-p)*(mobile?-24:-32))+"deg");scene.style.setProperty("--media-rz",((1-p)*5)+"deg");scene.style.setProperty("--media-scale",(.72+p*.28).toFixed(3));scene.style.setProperty("--media-opacity",Math.min(1,p*2.8).toFixed(3));scene.style.setProperty("--copy-x",((mobile?0:-90)*(1-p))+"px");scene.style.setProperty("--copy-y",((1-p)*35)+"px");scene.style.setProperty("--copy-opacity",Math.min(1,.15+p*1.5).toFixed(3));scene.classList.toggle("scene-active",p>.08&&p<.94);});ticking=false;}
function requestSceneUpdate(){if(!ticking){requestAnimationFrame(updateScenes);ticking=true;}}
window.addEventListener("scroll",requestSceneUpdate,{passive:true});window.addEventListener("resize",requestSceneUpdate);updateScenes();

// Pointer-only tilt; touch scrolling stays native.
if(!prefersReduced&&!matchMedia("(pointer:coarse)").matches){document.querySelectorAll(".flyer-benefit,.quote-form").forEach(card=>{card.addEventListener("pointermove",event=>{const r=card.getBoundingClientRect(),x=(event.clientX-r.left)/r.width-.5,y=(event.clientY-r.top)/r.height-.5;card.style.transform="perspective(900px) rotateX("+(-y*5)+"deg) rotateY("+(x*6)+"deg) translateY(-5px)";});card.addEventListener("pointerleave",()=>card.style.removeProperty("transform"));});}
document.querySelector("#quote-form")?.addEventListener("submit",event=>{event.preventDefault();const data=new FormData(event.currentTarget),name=String(data.get("nome")||"").trim(),project=data.get("projeto"),message=String(data.get("mensagem")||"").trim(),text="Olá, ARTSIGN! Meu nome é "+name+". Tenho interesse em: "+project+"."+(message?"\n\nSobre o projeto: "+message:"")+"\n\nGostaria de solicitar um orçamento.";window.open("https://wa.me/5516981047886?text="+encodeURIComponent(text),"_blank","noopener");});
const year=document.querySelector("#year");if(year)year.textContent=new Date().getFullYear();