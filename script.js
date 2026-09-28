const cover = document.getElementById("cover");
const main = document.getElementById("mainContent");
const openBtn = document.getElementById("openInvitation");
const music = document.getElementById("weddingMusic");
const musicBtn = document.getElementById("musicBtn");

function hasMusicSource() {
  if (!music) return false;
  const source = music.querySelector("source");
  if (!source) return false;
  const src = source.getAttribute("src");
  return typeof src === "string" && src.trim() !== "";
}

function syncMusicButton() {
  if (!musicBtn) return;
  musicBtn.textContent = music && !music.paused ? "❚❚" : "♫";
}

if (openBtn) {
  openBtn.addEventListener("click", () => {
    if (cover) {
      cover.style.transition = "opacity .8s ease, transform .8s ease";
      cover.style.opacity = "0";
      cover.style.transform = "scale(1.03)";
    }

    setTimeout(() => {
      if (cover) cover.style.display = "none";
      if (main) main.classList.remove("hidden");
      window.scrollTo(0, 0);
    }, 800);

    if (hasMusicSource()) {
      music.play().catch(() => {});
      syncMusicButton();
    }
  });
}

if (musicBtn) {
  musicBtn.addEventListener("click", () => {
    if (!hasMusicSource()) {
      alert("Tambahkan file musik ke folder project, lalu isi nama filenya di script HTML.");
      return;
    }

    if (music.paused) {
      music.play().catch(() => {});
    } else {
      music.pause();
    }
    syncMusicButton();
  });
}

// Countdown: 25 Oktober 2026, pukul 10.00 WITA
const target = new Date("2026-10-25T10:00:00+08:00").getTime();
function updateCountdown(){
  const now = Date.now();
  const diff = Math.max(0, target-now);
  const d = Math.floor(diff/86400000);
  const h = Math.floor(diff%86400000/3600000);
  const m = Math.floor(diff%3600000/60000);
  const s = Math.floor(diff%60000/1000);

  const days = document.getElementById("days");
  const hours = document.getElementById("hours");
  const minutes = document.getElementById("minutes");
  const seconds = document.getElementById("seconds");

  if (days) days.textContent = String(d).padStart(2, "0");
  if (hours) hours.textContent = String(h).padStart(2, "0");
  if (minutes) minutes.textContent = String(m).padStart(2, "0");
  if (seconds) seconds.textContent = String(s).padStart(2, "0");
}
updateCountdown(); setInterval(updateCountdown, 1000);

// Animasi saat section masuk layar
const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  }, { threshold: .12 });

  revealElements.forEach(el => observer.observe(el));
} else {
  revealElements.forEach(el => el.classList.add("show"));
}
