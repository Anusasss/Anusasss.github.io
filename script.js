document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const tables = document.querySelectorAll(".searchable");

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();

    tables.forEach(table => {
      const rows = table.querySelectorAll("tbody tr");
      rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(query) ? "" : "none";
      });
    });
  });