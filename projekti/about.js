// Vendos vitin aktual në footer
document.getElementById("year").textContent = new Date().getFullYear();

// Efekt fade kur elementet shfaqen në ekran
const faders = document.querySelectorAll(".fade");
const options = { threshold: 0.2 };

const appearOnScroll = new IntersectionObserver(function(entries, observer){
  entries.forEach(entry => {
    if(!entry.isIntersecting) return;
    entry.target.classList.add("show");
    observer.unobserve(entry.target);
  });
}, options);

faders.forEach(fade => {
  appearOnScroll.observe(fade);
});
// darkmode.js

document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("darkModeToggle");
    const body = document.body;

    // Load saved mode from localStorage
    const savedMode = localStorage.getItem("darkMode");

    if (savedMode === "enabled") {
        body.classList.add("dark-mode");
        if (toggle) toggle.textContent = "☀️ Light Mode";
    }

    // Toggle dark mode on click
    if (toggle) {
        toggle.addEventListener("click", () => {
            body.classList.toggle("dark-mode");

            if (body.classList.contains("dark-mode")) {
                localStorage.setItem("darkMode", "enabled");
                toggle.textContent = "☀️ Light Mode";
            } else {
                localStorage.setItem("darkMode", "disabled");
                toggle.textContent = "🌙 Dark Mode";
            }
        });
    }
});
const elements = document.querySelectorAll('.fade-in');

function checkFadeIn() {
  elements.forEach(el => {
    const rect = el.getBoundingClientRect().top;
    if (rect < window.innerHeight - 50) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', checkFadeIn);
window.addEventListener('load', checkFadeIn);

// Butoni "Kthehu lart"
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }
});

topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
