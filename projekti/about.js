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
