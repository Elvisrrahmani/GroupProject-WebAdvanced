// 🌗 THEME TOGGLE + SAVE THEME
const themeBtn = document.getElementById("themeToggle");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  themeBtn.textContent = "☀️ Light Mode";
}

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  const isDark = document.body.classList.contains("dark-mode");
  themeBtn.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";

  // Save preference
  localStorage.setItem("theme", isDark ? "dark" : "light");
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

// 🎠 CAROUSEL + AUTO-SLIDE
const track = document.querySelector(".carousel-track");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let index = 0;
const slides = document.querySelectorAll(".carousel-track img");

function updateCarousel() {
  const slideWidth = slides[0].offsetWidth + 20;
  track.style.transform = `translateX(-${index * slideWidth}px)`;
}

nextBtn.addEventListener("click", () => {
  index = (index + 1) % slides.length;
  updateCarousel();
});

prevBtn.addEventListener("click", () => {
  index = (index - 1 + slides.length) % slides.length;
  updateCarousel();
});

// Auto-slide every 3 seconds
setInterval(() => {
  index = (index + 1) % slides.length;
  updateCarousel();
}, 3000);

// ⬆️ SCROLL TO TOP
const scrollBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {
  scrollBtn.style.display = window.scrollY > 250 ? "block" : "none";
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ---------------- FAN FORM ----------------
const nameRegex = /^[A-Za-z ]{3,20}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-z]+\.[a-z]{2,4}$/;

const fanForm = document.getElementById("fanForm");

fanForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let nameValue = document.getElementById("nameInput").value.trim();
  let emailValue = document.getElementById("emailInput").value.trim();
  let playerValue = document.getElementById("playerInput").value.trim();

  nameValue = nameValue.charAt(0).toUpperCase() + nameValue.slice(1);
  playerValue = playerValue.toUpperCase();

  if (!nameRegex.test(nameValue)) {
    $("#formMessage").text("❌ Name must have 3–20 letters!");
    return;
  }

  if (!emailRegex.test(emailValue)) {
    $("#formMessage").text("❌ Invalid email format!");
    return;
  }

  const players = ["KIMMICH", "KANE", "MUSIALA", "NEUER", "GNABRY", "DAVIES"];

  let message = players.includes(playerValue)
    ? `🔥 ${playerValue} is a TOP Bayern player!`
    : `👌 ${playerValue} is not in our list, but still cool!`;

  $("#formMessage").text(`✔️ Welcome, ${nameValue}! ${message}`);
});

// document.body.classList.toggle("dark-mode")
