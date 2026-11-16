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