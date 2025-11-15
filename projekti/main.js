// 🌗 THEME TOGGLE
const themeBtn = document.getElementById("themeToggle");
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  themeBtn.textContent = document.body.classList.contains("dark-mode")
    ? "☀️ Light Mode"
    : "🌙 Dark Mode";
});

// ⏱ COUNTDOWN
const matchDate = new Date("December 15, 2025 18:30:00").getTime();

function updateCountdown() {
  const now = Date.now();
  const gap = matchDate - now;

  if (gap < 0) return;

  const day = 1000 * 60 * 60 * 24;
  const hour = 1000 * 60 * 60;
  const minute = 1000 * 60;
  const second = 1000;

  document.getElementById("days").textContent = Math.floor(gap / day);
  document.getElementById("hours").textContent = Math.floor((gap % day) / hour);
  document.getElementById("minutes").textContent = Math.floor((gap % hour) / minute);
  document.getElementById("seconds").textContent = Math.floor((gap % minute) / second);
}

setInterval(updateCountdown, 1000);

// 🎠 CAROUSEL
const track = document.querySelector(".carousel-track");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let index = 0;
const slides = document.querySelectorAll(".carousel-track img");
const slideWidth = slides[0].offsetWidth + 20; // margin included

nextBtn.addEventListener("click", () => {
  index = (index + 1) % slides.length;
  track.style.transform = `translateX(-${index * slideWidth}px)`;
});

prevBtn.addEventListener("click", () => {
  index = (index - 1 + slides.length) % slides.length;
  track.style.transform = `translateX(-${index * slideWidth}px)`;
});

// ⬆️ SCROLL TO TOP
const scrollBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {
  scrollBtn.style.display = window.scrollY > 250 ? "block" : "none";
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
