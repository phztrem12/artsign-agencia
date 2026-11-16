const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuButton.addEventListener("click", () => {
  const opened = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(opened));
});
nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
}));

const glow = document.querySelector(".cursor-glow");
window.addEventListener("pointermove", (event) => {
  if (glow) {
    glow.style.left = event.clientX + "px";
    glow.style.top = event.clientY + "px";
  }
}, { passive: true });

document.querySelector("#quote-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const name = data.get("nome").trim();
  const project = data.get("projeto");
  const message = data.get("mensagem").trim();
  const text = "Olá, ARTSIGN! Meu nome é " + name + ". Tenho interesse em: " + project + "." +
    (message ? "\n\nSobre o projeto: " + message : "") +
    "\n\nGostaria de solicitar um orçamento.";
  window.open("https://wa.me/5516981047886?text=" + encodeURIComponent(text), "_blank", "noopener");
});
document.querySelector("#year").textContent = new Date().getFullYear();