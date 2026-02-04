const grid = document.getElementById("galleryGrid");
let activeBtn = null;

function stopMedia(btn) {
  if (!btn) return;

  btn.dataset.open = "false";
  btn.classList.remove("isPlaying");

  const video = btn.querySelector("video");
  if (video) {
    video.pause();
    video.removeAttribute("src");
    video.load();
    video.remove();
  }

  // visa tillbaka bilden om den var dold
  const img = btn.querySelector("img");
  if (img) img.style.opacity = "1";
}

function openMedia(btn) {
  // stäng tidigare om annan
  if (activeBtn && activeBtn !== btn) {
    stopMedia(activeBtn);
    activeBtn = null;
  }

  // toggle stäng
  if (btn.dataset.open === "true") {
    stopMedia(btn);
    activeBtn = null;
    return;
  }

  const type = btn.dataset.type; // "video" eller "gif"
  const src = btn.dataset.src;

  btn.dataset.open = "true";
  activeBtn = btn;

  const img = btn.querySelector("img");

  if (type === "gif") {
    // GIF: byt src på bilden (ingen vit flash)
    if (img) {
      img.style.opacity = "1";
      img.src = src;
    }
    return;
  }

  // VIDEO: lägg video ovanpå bilden och visa först när den kan spela
  const video = document.createElement("video");
  video.src = src;
  video.autoplay = true;
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.preload = "metadata";

  // styling (så videon täcker rutan)
  video.style.position = "absolute";
  video.style.inset = "0";
  video.style.width = "100%";
  video.style.height = "100%";
  video.style.objectFit = "cover";

  // lägg in videon ovanpå
  btn.appendChild(video);

  // när videon är redo: visa den (ingen vit blink)
  const show = () => {
    btn.classList.add("isPlaying");
    // valfritt: dölja bilden bakom (om du vill)
    if (img) img.style.opacity = "0";
  };

  video.addEventListener("canplay", show, { once: true });

  // fallback om canplay tar tid
  setTimeout(() => {
    if (btn.dataset.open === "true") show();
  }, 400);
}

grid?.addEventListener("click", (e) => {
  const btn = e.target.closest(".thumb");
  if (!btn) return;
  openMedia(btn);
});
