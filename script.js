const preloader = document.querySelector(".preloader");
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
window.addEventListener("load", () => {
  window.setTimeout(() => preloader?.classList.add("done"), prefersReduced ? 0 : 2050);
});

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuButton?.addEventListener("click", () => {
  const opened = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(opened));
});
nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
}));

const glow = document.querySelector(".cursor-glow");
window.addEventListener("pointermove", event => {
  if (glow && event.pointerType !== "touch") {
    glow.style.left = event.clientX + "px";
    glow.style.top = event.clientY + "px";
  }
}, { passive: true });

const scenes = [...document.querySelectorAll(".project-scene")];
let ticking = false;
function updateScenes() {
  const vh = window.innerHeight;
  scenes.forEach(scene => {
    const rect = scene.getBoundingClientRect();
    const travel = Math.max(1, scene.offsetHeight - vh);
    const progress = Math.min(1, Math.max(0, -rect.top / travel));
     scene.style.setProperty("--progress", progress.toFixed(4));
 const mobile = window.matchMedia("(max-width: 650px)").matches;
 const enter = mobile ? 65 : 82;
 const copyEnter = mobile ? 35 : -90;
 scene.style.setProperty("--media-x", ((1 - progress) * enter) + "vw");
 scene.style.setProperty("--media-y", ((.5 - progress) * (mobile ? 30 : 45)) + "px");
 scene.style.setProperty("--media-ry", ((1 - progress) * (mobile ? -24 : -32)) + "deg");
 scene.style.setProperty("--media-rz", ((1 - progress) * 5) + "deg");
 scene.style.setProperty("--media-scale", (.72 + progress * .28).toFixed(3));
 scene.style.setProperty("--media-opacity", Math.min(1, progress * 2.8).toFixed(3));
 scene.style.setProperty("--copy-x", (copyEnter * (1 - progress)) + "px");
 scene.style.setProperty("--copy-y", ((1 - progress) * 35) + "px");
 scene.style.setProperty("--copy-opacity", Math.min(1, .15 + progress * 1.5).toFixed(3));
    scene.classList.toggle("scene-active", progress > .08 && progress < .94);
  });
  ticking = false;
}
function requestSceneUpdate() {
  if (!ticking) {
    window.requestAnimationFrame(updateScenes);
    ticking = true;
  }
}
window.addEventListener("scroll", requestSceneUpdate, { passive: true });
window.addEventListener("resize", requestSceneUpdate);
updateScenes();

const flyerObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      flyerObserver.unobserve(entry.target);
    }
  });
}, { threshold: .15 });
document.querySelectorAll(".flyer-card").forEach(card => flyerObserver.observe(card));

document.querySelector("#quote-form")?.addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const name = String(data.get("nome") || "").trim();
  const project = data.get("projeto");
  const message = String(data.get("mensagem") || "").trim();
  const text = "Olá, ARTSIGN! Meu nome é " + name + ". Tenho interesse em: " + project + "." +
    (message ? "\n\nSobre o projeto: " + message : "") +
    "\n\nGostaria de solicitar um orçamento.";
  window.open("https://wa.me/5516981047886?text=" + encodeURIComponent(text), "_blank", "noopener");
});
document.querySelector("#year").textContent = new Date().getFullYear();