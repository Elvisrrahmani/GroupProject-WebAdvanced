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
  const now = new Date().getTime();
  const gap = matchDate - now;

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(gap / day);
  const hours = Math.floor((gap % day) / hour);
  const minutes = Math.floor((gap % hour) / minute);
  const seconds = Math.floor((gap % minute) / second);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}
setInterval(updateCountdown, 1000);

// 🎠 IMAGE CAROUSEL
const track = document.querySelector(".carousel-track");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let index = 0;
const slideWidth = 270; // image + margin

nextBtn.addEventListener("click", () => {
  index++;
  if (index > 3) index = 0;
  track.style.transform = `translateX(-${index * slideWidth}px)`;
});

prevBtn.addEventListener("click", () => {
  index--;
  if (index < 0) index = 3;
  track.style.transform = `translateX(-${index * slideWidth}px)`;
});

// ⬆️ SCROLL TO TOP BUTTON
const scrollTopBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});