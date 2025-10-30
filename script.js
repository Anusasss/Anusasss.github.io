document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const tables = document.querySelectorAll(".searchable");
  const themeToggle = document.getElementById("themeToggle");
  const backToTopButton = document.getElementById("back-to-top");
  const loaderWrapper = document.querySelector(".loader-wrapper");

  // Page Loader
  window.addEventListener("load", () => {
    if (loaderWrapper) {
      loaderWrapper.style.display = "none";
    }
  });

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
      localStorage.setItem("theme", isLight ? "light" : "dark");
      updateFavicon(isLight ? "light" : "dark");
    });

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      document.body.classList.add("light-theme");
      updateFavicon("light");
    }
  }

  // Favicon switcher
  function updateFavicon(theme) {
    const link = document.querySelector("link[rel~='icon']");
    if (link) {
      link.href = theme === "light" ? "favicon-light.ico" : "favicon-dark.ico";
    }
  }

  // Back to Top Button
  if (backToTopButton) {
    window.onscroll = function() {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopButton.style.display = "block";
      } else {
        backToTopButton.style.display = "none";
      }
    };

    backToTopButton.addEventListener("click", () => {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    });
  }
});