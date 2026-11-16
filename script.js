const menuButton=document.querySelector(".menu-toggle");
const nav=document.querySelector(".nav");
menuButton?.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuButton.setAttribute("aria-expanded",String(open));});
nav?.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{nav.classList.remove("open");menuButton.setAttribute("aria-expanded","false");}));
document.querySelectorAll(".eyebrow,.intro-layout h2,.intro-layout>div,.project-card,.flyer-grid article,.flyer-cta,.service-list article,.contact-copy,.quote-form").forEach(el=>el.classList.add("reveal"));
if("IntersectionObserver" in window){
 document.documentElement.classList.add("reveal-ready");
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("in-view");observer.unobserve(entry.target);}}),{threshold:.12});
 document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
}else{document.querySelectorAll(".reveal").forEach(el=>el.classList.add("in-view"));}
document.querySelector("#quote-form")?.addEventListener("submit",event=>{event.preventDefault();const data=new FormData(event.currentTarget);const name=String(data.get("nome")||"").trim();const project=data.get("projeto");const message=String(data.get("mensagem")||"").trim();const body="Olá, ARTSIGN! Meu nome é "+name+". Tenho interesse em: "+project+"."+(message?"\n\nMinha ideia: "+message:"");window.location.href="https://wa.me/5516981047886?text="+encodeURIComponent(body);});
const year=document.querySelector("#year");if(year)year.textContent=new Date().getFullYear();