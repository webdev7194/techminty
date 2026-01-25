// ================= HOME PAGE BLOG RENDERING =================

const featuredGrid = document.querySelector(".featured-grid");
const recentGrid = document.querySelector(".recent-grid");

let allBlogs = [];

// Fetch blogs.json
fetch("./data/blogs.json")
  .then(res => res.json())
  .then(data => {
    // Sort latest first
    allBlogs = data.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    renderHomeBlogs();
    window.addEventListener("resize", renderHomeBlogs);
  })
  .catch(err => console.error("Error loading blogs:", err));


// Main render function
function renderHomeBlogs() {
  renderFeaturedBlogs();
  renderRecentBlogs();
}

// ================= FEATURED BLOGS =================
function renderFeaturedBlogs() {
  featuredGrid.innerHTML = "";

  const featuredBlogs = allBlogs
    .filter(blog => blog.featured)
    .slice(0, 3);

  featuredBlogs.forEach(blog => {
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

    featuredGrid.appendChild(card);
  });
}

// ================= RECENT BLOGS =================
function renderRecentBlogs() {
  recentGrid.innerHTML = "";

  const isMobile = window.innerWidth <= 768;
  const limit = isMobile ? 3 : 6;

  const recentBlogs = allBlogs.slice(0, limit);

  recentBlogs.forEach(blog => {
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

    recentGrid.appendChild(card);
  });
}
function blogs() {
    open("blogs.html");
}
