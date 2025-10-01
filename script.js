document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const tables = document.querySelectorAll(".searchable");
  const themeToggle = document.getElementById("themeToggle");

  // Live search with highlight
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

  // Sortable table headers
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

  // Theme toggle
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isLight = document.body.classList.toggle("light-theme");
      document.body.style.background = isLight ? "var(--bg-light)" : "var(--bg-dark)";
      document.body.style.color = isLight ? "var(--text-light)" : "var(--text-dark)";
      localStorage.setItem("theme", isLight ? "light" : "dark");
    });

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      document.body.classList.add("light-theme");
      document.body.style.background = "var(--bg-light)";
      document.body.style.color = "var(--text-light)";
    }
  }
});