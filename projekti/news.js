// Set the current year in the footer
document.getElementById("year").textContent = new Date().getFullYear();

// --- DOM ELEMENTS (Cleaned up) ---
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

// --- MOCK DATA (Initial Articles) ---
// news.js file

const NEWS_DATA = [
    {
        title: "Bayern crush rivals with 4–1 win at Allianz Arena",
        category: "bundesliga",
        // Replace this placeholder with one of your actual image paths
        img: "images/OIP.webp", // Replace with: "images/image_arena.jpg"
        summary: "Bayern Munich continued their strong Bundesliga form with a commanding home victory over Borussia Dortmund.",
        link: "https://www.bavarianfootballworks.com/"
    },
    {
        title: "Olise's Leadership Key in Latest Win",
        category: "club",
        // Replace this placeholder with your other actual image path
        img: "images/olise.jpg", // Replace with: "images/image_kimmich.jpg"
        summary: "Olise delivered a masterclass performance, cementing his role as the team's engine.",
        link: "https://www.example.com/kimmich"
    },
    {
        title: "Konrad Laimer signs new 3-year Bayern deal",
        category: "transfers",
        // Keep this as a placeholder, or replace with a third image if you have one
        img: "images/laimer.jpg", // Replace with: "images/image_laimer.jpg"
        summary: "Bayern confirm Laimer’s contract extension following stellar midfield performances this season.",
        link: "https://www.bavarianfootballworks.com/"
    }
];

// --- GLOBAL NEWS ARRAY INITIALIZATION (THE FIX) ---
// 1. Load saved news from Local Storage.
let savedNews = JSON.parse(localStorage.getItem("userNews")) || [];

// 2. The main array, combining user news (first, to appear as newest) and mock data.
let allNews = [...savedNews, ...NEWS_DATA];

// --- THEME TOGGLE (Vanilla JS) ---
const updateTheme = (isLight) => {
    document.body.classList.toggle('light', isLight);
    themeToggle.textContent = isLight ? '☀️ Light Mode' : '🌙 Dark Mode';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
};

if (localStorage.getItem('theme') === 'light') {
    updateTheme(true);
} else {
    updateTheme(false); 
}

themeToggle.addEventListener('click', () => {
    const isLight = !document.body.classList.contains('light');
    updateTheme(isLight);
});

// --- RENDER NEWS ---
function renderNews(news) {
    container.innerHTML = "";
    if (news.length === 0) {
        container.innerHTML = `<p style="text-align:center;opacity:0.7;padding:30px;">No news found matching your criteria 😕</p>`;
        return;
    }

    news.forEach((item, i) => {
        const card = document.createElement('div');
        card.className = 'news-card';
        card.style.animationDelay = `${i * 0.05}s`;
        card.innerHTML = `
            <img src="${item.img}" alt="${item.title}">
            <div class="news-content">
                <span class="category-tag">${item.category.toUpperCase()}</span>
                <h2>${item.title}</h2>
                <p>${item.summary}</p>
            </div>
        `;
        card.addEventListener('click', () => openModal(item));
        container.appendChild(card);
    });
}

// --- SEARCH & FILTER ---
function applyFilters() {
    const query = searchBar.value.toLowerCase();
    const cat = categoryFilter.value;

    const filtered = allNews.filter(item => {
        const matchText = item.title.toLowerCase().includes(query) || item.summary.toLowerCase().includes(query);
        const matchCat = cat === 'all' || item.category === cat || (cat === 'user' && item.isUser);
        return matchText && matchCat;
    });
    
    // Sort newest items first (user submitted news is tagged with isUser: true)
    // The filter function handles the sorting logic based on the isUser flag
    const sorted = filtered.sort((a, b) => (b.isUser === true) - (a.isUser === true)); 

    renderNews(sorted);
}

// --- MODAL FUNCTIONS ---
function openModal(item) {
    modalImg.src = item.img;
    modalImg.alt = item.title;
    modalTitle.textContent = item.title;
    modalSummary.textContent = item.summary;
    modalLink.href = item.link || "#"; 
    modal.classList.add('visible');
    document.body.style.overflow = 'hidden'; 
}

function closeModalHandler() {
    modal.classList.remove('visible');
    document.body.style.overflow = 'auto';
}

closeModal.addEventListener('click', closeModalHandler);
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModalHandler();
    }
});


// --- INITIALIZATION (Ensure data is rendered after load) ---
loader.style.display = 'block';
setTimeout(() => { // Simulate API loading time
    loader.style.display = 'none';
    applyFilters(); // Initial render using combined data
}, 500);

searchBar.addEventListener('input', applyFilters);
categoryFilter.addEventListener('change', applyFilters);

// =======================================================
// 🧾 USER NEWS FORM (using jQuery)
// =======================================================

function saveNews() {
    localStorage.setItem("userNews", JSON.stringify(savedNews));
}

function showError(msg) {
    $("#formError").text(msg).slideDown();
}

// LIVE IMAGE PREVIEW (jQuery)
$("#formImg").on("input", function () {
    const url = $(this).val().trim();
    const urlRegex = /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i;

    if (urlRegex.test(url)) {
        $("#imgPreview").attr("src", url).slideDown(200);
    } else {
        $("#imgPreview").slideUp(200);
    }
});

// CHARACTER COUNTERS (jQuery)
$("#formTitle").on("input", function () {
    const text = $(this).val();
    const count = text.length;
    const max = 50;
    $("#titleCount").text(`${count} / ${max}`);
    $("#titleCount").toggleClass("invalid", count < 5 || count > max);
});

$("#formSummary").on("input", function () {
    const text = $(this).val();
    const count = text.length;
    const max = 300;
    $("#summaryCount").text(`${count} / ${max}`);
    $("#summaryCount").toggleClass("invalid", count < 10 || count > max);
});

// FORM SUBMISSION (jQuery)
$("#newsForm").on("submit", function (e) {
    e.preventDefault();

    const title = $("#formTitle").val().trim();
    const category = $("#formCategory").val();
    const img = $("#formImg").val().trim();
    const summary = $("#formSummary").val().trim();
    
    // Regex rules
    const titleRegex = /^[A-Za-z0-9\s\-'!?,.]{5,50}$/;
    const urlRegex = /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i;
    const summaryRegex = /^.{10,300}$/;

    // VALIDATION
    if (!titleRegex.test(title)) return showError("✖ Title must be 5–50 characters.");
    if (!summaryRegex.test(summary)) return showError("✖ Summary must be 10–300 characters.");
    if (img !== "" && !urlRegex.test(img)) return showError("✖ Invalid image URL.");
    if (!category) return showError("✖ Pick a category.");

    $("#formError").slideUp();

    // Create News Object
    const newPost = {
        title,
        category: category,
        img: img || "images/default-bayern.jpg", 
        summary,
        link: "#", 
        isUser: true, 
    };

    // Save to memory + storage (unshift adds to the beginning, making it the newest)
    savedNews.unshift(newPost);
    saveNews();

    // Re-render: Rebuild the master array and re-filter/sort
    allNews = [...savedNews, ...NEWS_DATA];
    applyFilters();

    // Clear form and counters
    $("#newsForm")[0].reset();
    $("#imgPreview").slideUp();
    $("#titleCount").text("0 / 50").removeClass("invalid");
    $("#summaryCount").text("0 / 300").removeClass("invalid");
});