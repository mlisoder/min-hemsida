const slides = [
  "images/01.jpg",
  "images/02.jpg",
  "images/03.jpg",
  "images/04.jpg",
  "images/05.jpg",
  "images/06.jpg"
];

const lightbox = document.getElementById("lightbox");
const img = document.getElementById("lightboxImage");
let index = 0;

document.getElementById("galleryGrid").addEventListener("click", e => {
  const btn = e.target.closest(".thumb");
  if (!btn) return;
  index = Number(btn.dataset.index);
  open();
});

function open() {
  img.src = slides[index];
  lightbox.classList.add("open");
}

function close() {
  lightbox.classList.remove("open");
}

function next() {
  index = (index + 1) % slides.length;
  open();
}

function prev() {
  index = (index - 1 + slides.length) % slides.length;
  open();
}

document.querySelector(".next").onclick = next;
document.querySelector(".prev").onclick = prev;

lightbox.addEventListener("click", e => {
  if (e.target.dataset.close) close();
});

document.addEventListener("keydown", e => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape") close();
  if (e.key === "ArrowRight") next();
  if (e.key === "ArrowLeft") prev();
});
