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


