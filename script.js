document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const tables = document.querySelectorAll(".searchable");
  const themeToggle = document.getElementById("themeToggle");
  const clock = document.getElementById("clockWidget");
  const quoteBox = document.getElementById("techQuote");

  // 🔍 Live search with highlight
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase();
      tables.forEach(table => {
        const rows = table.querySelectorAll("tbody tr");
        rows.forEach(row => {
          const text = row.textContent.toLowerCase();
          const match = text.includes(query);
          row.style.display = match ? "" : "none";
          row.classList.toggle("highlight", match && query.length > 0);
        });
      });
    });
  }

  // 📊 Sortable table headers
  tables.forEach(table => {
    const headers = table.querySelectorAll("th");
    headers.forEach((th, index) => {
      th.addEventListener("click", () => {
        const rows = Array.from(table.querySelectorAll("tbody tr"));
        const sorted = rows.sort((a, b) => {
          const aText = a.children[index].textContent.trim().toLowerCase();
          const bText = b.children[index].textContent.trim().toLowerCase();
          return aText.localeCompare(bText);
        });
        const tbody = table.querySelector("tbody");
        sorted.forEach(row => tbody.appendChild(row));
      });
    });
  });

  // 🌓 Theme toggle
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isLight = document.body.classList.toggle("light-theme");
      document.body.style.background = isLight ? "var(--bg-light)" : "var(--bg-dark)";
      document.body.style.color = isLight ? "var(--text-light)" : "var(--text-dark)";
      localStorage.setItem("theme", isLight ? "light" : "dark");
      updateFavicon(isLight ? "light" : "dark");
    });

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      document.body.classList.add("light-theme");
      document.body.style.background = "var(--bg-light)";
      document.body.style.color = "var(--text-light)";
      updateFavicon("light");
    }
  }

  // 🖼️ Favicon switcher
  function updateFavicon(theme) {
    const link = document.querySelector("link[rel~='icon']");
    if (link) {
      link.href = theme === "light" ? "favicon-light.ico" : "favicon-dark.ico";
    }
  }

  // ⏰ Live clock
  function updateClock() {
    if (clock) {
      const now = new Date();
      clock.innerText = now.toLocaleString("lt-LT", {
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        day: "2-digit",
        month: "short",
        year: "numeric"
      });
    }
  }
  setInterval(updateClock, 1000);
  updateClock();

  // 💡 Tech quote generator
  const quotes = [
    "“Programs must be written for people to read.” – Harold Abelson",
    "“Talk is cheap. Show me the code.” – Linus Torvalds",
    "“The best way to predict the future is to invent it.” – Alan Kay",
    "“Code is like humor. When you have to explain it, it’s bad.” – Cory House",
    "“Simplicity is the soul of efficiency.” – Austin Freeman"
  ];
  function rotateQuote() {
    if (quoteBox) {
      const quote = quotes[Math.floor(Math.random() * quotes.length)];
      quoteBox.innerHTML = `<h2>💡 Tech Mintis</h2><p>${quote}</p>`;
    }
  }
  setInterval(rotateQuote, 10000);
  rotateQuote();

  // 🎮 Keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    if (e.key === "1") location.href = "index.html";
    if (e.key === "2") location.href = "lenteles.html";
    if (e.key === "3") location.href = "lenteles copy.html";
    if (e.key.toLowerCase() === "t") themeToggle?.click();
  });

  // 🧑‍💻 Console Easter egg
  console.log("%cSveikas, tech entuziaste! 👨‍💻", "color: gold; font-size: 16px; font-weight: bold;");
  console.log("Ši svetainė sukurta su meile ir JavaScript. Naršyk, tyrinėk, tobulėk.");
});
