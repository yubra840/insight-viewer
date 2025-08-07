const ITEMS_PER_PAGE = 12;
let currentPage = 0;
let analysisData = [];

document.addEventListener("DOMContentLoaded", () => {
  fetch("marketAnalysis.json")
    .then(res => res.json())
    .then(data => {
      analysisData = data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      renderPage();
    });

  document.getElementById("nextBtn").addEventListener("click", () => {
    if ((currentPage + 1) * ITEMS_PER_PAGE < analysisData.length) {
      currentPage++;
      renderPage();
    }
  });

  document.getElementById("prevBtn").addEventListener("click", () => {
    if (currentPage > 0) {
      currentPage--;
      renderPage();
    }
  });
});

function renderPage() {
  const container = document.getElementById("analysis-grid");
  container.innerHTML = "";

  const start = currentPage * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const pageItems = analysisData.slice(start, end);

  pageItems.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";

    const timeAgo = timeSince(new Date(item.timestamp));

    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}" class="card-image" />
      <h3>${item.title}</h3>
      <p><strong>Pair:</strong> ${item.pair}</p>
      <p><strong>Type:</strong> ${item.type}</p>
      <p>${item.summary}</p>
      <p><strong>Analysis by:</strong> <span class = author>${item.author}<span></p>
      <p class="time">${timeAgo} ago</p>
    `;

    card.addEventListener("click", () => {
  window.location.href = `eachanalysis.html?id=${item.id}`;
});

    container.appendChild(card);
  });
}

function timeSince(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'day', seconds: 86400 },
    { label: 'hr', seconds: 3600 },
    { label: 'min', seconds: 60 },
    { label: 'sec', seconds: 1 }
  ];

  for (const i of intervals) {
    const count = Math.floor(seconds / i.seconds);
    if (count > 0) {
      return `${count} ${i.label}${count !== 1 ? 's' : ''}`;
    }
  }
  return "just now";
}
