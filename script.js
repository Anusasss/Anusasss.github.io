document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const tables = document.querySelectorAll(".searchable");
  const themeToggle = document.getElementById("themeToggle");

  // Live search with highlight
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
      const dark = document.body.classList.toggle("light-theme");
      document.body.style.backgroundColor = dark ? "#f5f5f5" : "#0d0d0d";
      document.body.style.color = dark ? "#0d0d0d" : "#f5f5f5";
      localStorage.setItem("theme", dark ? "light" : "dark");
    });

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      document.body.classList.add("light-theme");
      document.body.style.backgroundColor = "#f5f5f5";
      document.body.style.color = "#0d0d0d";
    }
  }
});