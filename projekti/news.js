const container = document.getElementById('newsContainer');
const loader = document.getElementById('loader');
const searchBar = document.getElementById('searchBar');
const categoryFilter = document.getElementById('categoryFilter');
const themeToggle = document.getElementById('themeToggle');

const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');
const modalTitle = document.getElementById('modalTitle');
const modalSummary = document.getElementById('modalSummary');
const modalImg = document.getElementById('modalImg');
const modalLink = document.getElementById('modalLink');

// --- THEME TOGGLE ---
if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light');
  themeToggle.textContent = '☀️ Light';
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  const isLight = document.body.classList.contains('light');
  themeToggle.textContent = isLight ? '☀️ Light' : '🌙 Dark';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// --- FETCH NEWS (mocked, can be replaced with real API) ---
async function fetchNews() {
  try {
    // Example: Replace with a real API endpoint later
    // const res = await fetch('https://newsapi.org/v2/everything?q=Bayern%20Munich&apiKey=YOUR_KEY');
    // const data = await res.json();
    // return data.articles;

    // Mock data
    return [
      {
        title: "Bayern crush rivals with 4–1 win at Allianz Arena",
        category: "club",
        img: "images/OIP.webp",
        summary: "Bayern Munich continued their strong Bundesliga form with a commanding home victory.",
        link: "https://www.bavarianfootballworks.com/"
      },
      {
        title: "Harry Kane scores hat-trick as Bayern dominate",
        category: "champions-league",
          img: "images/OIP.webp2.jfif",
        summary: "The English striker continued his impressive form in European competition.",
        link: "https://www.bavarianfootballworks.com/"
      },
      {
        title: "Konrad Laimer signs new 3-year Bayern deal",
        category: "transfers",
        img: "images/OIP.webp3.jfif",
        summary: "Bayern confirm Laimer’s contract extension following stellar performances.",
        link: "https://www.bavarianfootballworks.com/"
      }
    ];
  } catch (err) {
    console.error(err);
    return [];
  }
}

// --- RENDER NEWS ---
function renderNews(news) {
  container.innerHTML = "";
  if (news.length === 0) {
    container.innerHTML = `<p style="text-align:center;opacity:0.7;">No news found 😕</p>`;
    return;
  }

  news.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'news-card';
    card.style.animationDelay = `${i * 0.1}s`;
    card.innerHTML = `
      <img src="${item.img}" alt="${item.title}">
      <div class="news-content">
        <h2>${item.title}</h2>
        <p>${item.summary}</p>
      </div>
    `;
    card.addEventListener('click', () => openModal(item));
    container.appendChild(card);
  });
}

// --- SEARCH & FILTER ---
function applyFilters(allNews) {
  const query = searchBar.value.toLowerCase();
  const cat = categoryFilter.value;
  return allNews.filter(item => {
    const matchText = item.title.toLowerCase().includes(query) || item.summary.toLowerCase().includes(query);
    const matchCat = cat === 'all' || item.category === cat;
    return matchText && matchCat;
  });
}

// --- INIT ---
(async () => {
  loader.style.display = 'block';
  const allNews = await fetchNews();
  loader.style.display = 'none';
  renderNews(allNews);

  searchBar.addEventListener('input', () => renderNews(applyFilters(allNews)));
  categoryFilter.addEventListener('change', () => renderNews(applyFilters(allNews)));
})();


// =======================================================
// 🧾 USER NEWS FORM (with REGEX + jQuery + array functions)
// =======================================================

let userNews = []; // will store user-submitted posts

$("#newsForm").on("submit", function (e) {
    e.preventDefault();

    const title = $("#formTitle").val().trim();
    const category = $("#formCategory").val();
    const img = $("#formImg").val().trim();
    const summary = $("#formSummary").val().trim();

    const error = $("#formError");

    // --- REGEX VALIDATION ---
    const titleRegex = /^[A-Za-z0-9\s\-'!?,.]{5,50}$/;
    const urlRegex = /^https?:\/\/.*\.(jpg|jpeg|png|webp|gif)$/i;
    const summaryRegex = /^.{10,300}$/;

    // VALIDATION CHECKS
    if (!titleRegex.test(title)) {
        return showError("✖ Title must be 5–50 characters and contain valid characters.");
    }
    if (!summaryRegex.test(summary)) {
        return showError("✖ Summary must be 10–300 characters.");
    }
    if (img !== "" && !urlRegex.test(img)) {
        return showError("✖ Image URL must end with .jpg, .png, .webp, .gif");
    }
    if (!category) {
        return showError("✖ Please select a category.");
    }

    error.hide();

    // --- CREATE NEWS OBJECT ---
    const newPost = {
        title,
        category,
        img: img || "images/OIP.webp", // fallback image
        summary,
        link: "#"
    };

    // --- ADD NEWS TO ARRAY ---
    userNews.push(newPost);

    // --- MERGE WITH EXISTING NEWS ---
    const combinedNews = [...userNews, ...allNews];

    // --- SORT newest first ---
    combinedNews.reverse();

    // --- RENDER UPDATED LIST ---
    renderNews(combinedNews);

    // --- CLEAR FORM ---
    $("#newsForm")[0].reset();
});

// Helper: show error text
function showError(msg) {
    $("#formError").text(msg).slideDown();
}
// =======================================================
// 1️⃣ LOCAL STORAGE SAVE / LOAD SYSTEM
// =======================================================

// load saved news
let savedNews = JSON.parse(localStorage.getItem("userNews")) || [];

// combine user + built-in news
let allNews = [...savedNews, ...NEWS_DATA];

// render initial
renderNews(allNews);

// save to localStorage
function saveNews() {
    localStorage.setItem("userNews", JSON.stringify(savedNews));
}



// =======================================================
// 2️⃣ LIVE IMAGE PREVIEW
// =======================================================

$("#formImg").on("input", function () {
    const url = $(this).val().trim();
    const urlRegex = /^https?:\/\/.*\.(jpg|jpeg|png|webp|gif)$/i;

    if (urlRegex.test(url)) {
        $("#imgPreview").attr("src", url).fadeIn(200);
    } else {
        $("#imgPreview").fadeOut(200);
    }
});



// =======================================================
// 3️⃣ CHARACTER COUNTERS (with regex validation)
// =======================================================

// title counter
$("#formTitle").on("input", function () {
    const text = $(this).val();
    const count = text.length;
    const max = 50;

    $("#titleCount").text(`${count} / ${max}`);

    if (count < 5 || count > max) {
        $("#titleCount").addClass("invalid");
    } else {
        $("#titleCount").removeClass("invalid");
    }
});

// summary counter
$("#formSummary").on("input", function () {
    const text = $(this).val();
    const count = text.length;
    const max = 300;

    $("#summaryCount").text(`${count} / ${max}`);

    if (count < 10 || count > max) {
        $("#summaryCount").addClass("invalid");
    } else {
        $("#summaryCount").removeClass("invalid");
    }
});



// =======================================================
// EXTENDED FORM SUBMISSION (LocalStorage + new array merging)
// =======================================================

$("#newsForm").on("submit", function (e) {
    e.preventDefault();

    const title = $("#formTitle").val().trim();
    const category = $("#formCategory").val();
    const img = $("#formImg").val().trim();
    const summary = $("#formSummary").val().trim();
    const error = $("#formError");

    // Regex rules
    const titleRegex = /^[A-Za-z0-9\s\-'!?,.]{5,50}$/;
    const urlRegex = /^https?:\/\/.*\.(jpg|jpeg|png|webp|gif)$/i;
    const summaryRegex = /^.{10,300}$/;

    if (!titleRegex.test(title)) return showError("✖ Invalid title.");
    if (!summaryRegex.test(summary)) return showError("✖ Summary must be 10–300 characters.");
    if (img !== "" && !urlRegex.test(img)) return showError("✖ Invalid image URL.");
    if (!category) return showError("✖ Pick a category.");

    error.hide();

    const newPost = {
        title,
        category,
        img: img || "images/OIP.webp",
        summary,
        link: "#"
    };

    // save to memory + storage
    savedNews.push(newPost);
    saveNews();

    // re-render
    allNews = [...savedNews, ...NEWS_DATA].reverse();
    renderNews(allNews);

    // clear form
    $("#newsForm")[0].reset();
    $("#imgPreview").hide();
    $("#titleCount").text("0 / 50");
    $("#summaryCount").text("0 / 300");
});




// helper
function showError(msg) {
    $("#formError").text(msg).slideDown();
}
