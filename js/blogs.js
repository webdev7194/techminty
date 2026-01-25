// ================= BLOGS PAGE LOGIC =================

// DOM
const blogsGrid = document.querySelector(".blogs-grid");
const searchInput = document.getElementById("blogser");
const searchBtn = document.getElementById("searchBtn");
const searchDropdown = document.querySelector(".search-dropdown");
const categoryButtons = document.querySelectorAll(".blogs-categories button");
const loadMoreBtn = document.getElementById("loadMoreBtn");

// State
let allBlogs = [];
let filteredBlogs = [];
let currentCategory = "All";
let visibleCount = 6;

// ================= FETCH BLOGS =================
fetch("./data/blogs.json")
  .then(res => res.json())
  .then(data => {
    allBlogs = data.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    filteredBlogs = [...allBlogs];
    renderBlogs();
    toggleLoadMore();
  })
  .catch(err => console.error("Error loading blogs:", err));

// ================= RENDER =================
function renderBlogs() {
  blogsGrid.innerHTML = "";

  const blogsToShow = filteredBlogs.slice(0, visibleCount);

  if (blogsToShow.length === 0) {
    blogsGrid.innerHTML = "<p>No articles found.</p>";
    return;
  }

  blogsToShow.forEach(blog => {
    const card = document.createElement("article");
    card.className = "blog-card";

    card.innerHTML = `
      <img src="${blog.coverImage}" loading="eager" alt="${blog.title}">
      <div class="blog-content">
        <span class="meta">
          ${blog.date} · ${blog.readTime} · ${blog.category}
        </span>
        <h3>${blog.title}</h3>
        <p>${blog.description}</p>
        <a href="${blog.slug}">Read more</a>
      </div>
    `;

    blogsGrid.appendChild(card);
  });
}

// ================= LOAD MORE =================
if (loadMoreBtn) {
  loadMoreBtn.addEventListener("click", () => {
    visibleCount += 6;
    renderBlogs();
    toggleLoadMore();
  });
}

function toggleLoadMore() {
  if (!loadMoreBtn) return;

  loadMoreBtn.style.display =
    visibleCount >= filteredBlogs.length ? "none" : "block";
}

// ================= CATEGORY FILTER =================
categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    categoryButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    currentCategory = button.textContent.trim();
    searchDropdown.style.display = "none";
    applyFilters();
  });
});

// ================= SEARCH =================
searchInput.addEventListener("input", handleSearch);
searchBtn.addEventListener("click", applyFilters);

function handleSearch() {
  const query = searchInput.value.toLowerCase().trim();
  searchDropdown.innerHTML = "";

  if (!query) {
    searchDropdown.style.display = "none";
    applyFilters();
    return;
  }

  const matches = allBlogs.filter(blog =>
    blog.title.toLowerCase().includes(query) ||
    blog.description.toLowerCase().includes(query)
  );

  if (!matches.length) {
    searchDropdown.style.display = "none";
    return;
  }

  matches.forEach(blog => {
    const li = document.createElement("li");
    li.textContent = blog.title;

    li.addEventListener("click", () => {
      window.location.href = blog.slug;
    });

    searchDropdown.appendChild(li);
  });

  searchDropdown.style.display = "block";
  applyFilters();
}

// Hide dropdown on outside click
document.addEventListener("click", (e) => {
  if (!e.target.closest(".blogs-search")) {
    searchDropdown.style.display = "none";
  }
});

// ================= APPLY FILTERS =================
function applyFilters() {
  const query = searchInput.value.toLowerCase().trim();

  filteredBlogs = allBlogs.filter(blog => {
    const matchesSearch =
      blog.title.toLowerCase().includes(query) ||
      blog.description.toLowerCase().includes(query);

    const matchesCategory =
      currentCategory === "All" ||
      blog.category.toLowerCase() === currentCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  visibleCount = 6;
  renderBlogs();
  toggleLoadMore();
}