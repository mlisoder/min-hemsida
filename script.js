const grid = document.getElementById("galleryGrid");
let activeBtn = null;

function setPoster(btn) {
  const poster = btn.dataset.poster || "";
  btn.dataset.open = "false";
  btn.innerHTML = `<img src="${poster}" alt="">`;
}

function openMedia(btn) {
  // om någon annan är öppen: stäng den
  if (activeBtn && activeBtn !== btn) {
    setPoster(activeBtn);
    activeBtn = null;
  }

  // toggle: om samma knapp redan är öppen -> stäng
  if (btn.dataset.open === "true") {
    setPoster(btn);
    activeBtn = null;
    return;
  }

  const type = btn.dataset.type;   // "video" eller "gif"
  const src = btn.dataset.src;

  btn.dataset.open = "true";
  activeBtn = btn;

  if (type === "gif") {
    btn.innerHTML = `<img src="${src}" alt="">`;
    return;
  }

  // video: autoplay + loop + muted + playsinline (mobilvänligt)
  btn.innerHTML = `
    <video
      src="${src}"
      autoplay
      muted
      loop
      playsinline
      preload="metadata"
    ></video>
  `;
}

grid?.addEventListener("click", (e) => {
  const btn = e.target.closest(".thumb");
  if (!btn) return;
  openMedia(btn);
});
