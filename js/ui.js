const navToggle = document.getElementById("navToggle");
const mobileNav = document.getElementById("mobileNav");
const icon = navToggle.querySelector("i");

navToggle.addEventListener("click", () => {
  mobileNav.classList.toggle("open");
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-xmark");
});

// HERO SEARCH (future integration)
const heroSearchInput = document.querySelector(".hero-search input");
const heroSearchBtn = document.querySelector(".hero-search button");

heroSearchBtn?.addEventListener("click", () => {
  const query = heroSearchInput.value.trim();
  if(query){
    // later: redirect to search results
    console.log("Search for:", query);
  }
});

// ================= AUTH UI =================

const authBtn = document.getElementById("authBtn");
const authBtn1 = document.getElementById("authBtn1");
const signedIn = localStorage.getItem("signedIn");
const userName = localStorage.getItem("userName");

if(signedIn === "true" && userName){
  authBtn.textContent = userName;
  authBtn1.textContent = userName;
  authBtn.href = "#";
  authBtn1.href = "#";
  authBtn.onclick = toggleUserMenu;
  authBtn1.onclick = toggleUserMenu;

  createUserMenu();
}

function createUserMenu(){
  const menu = document.createElement("div");
  menu.id = "userMenu";
  menu.style.cssText = `
    position: fixed;
top: 70px;
right: 16px;
    background:#fff;
    border:1px solid #ddd;
    border-radius:10px;
    padding:12px;
    display:none;
    z-index:1000;
    min-width:180px;
  `;

  menu.innerHTML = `
    <p style="margin:0 0 10px;font-weight:600">${userName}</p>
    <button id="logoutBtn" style="
      width:100%;
      padding:8px;
      border:none;
      border-radius:6px;
      background:#e11d48;
      color:#fff;
      cursor:pointer;
    ">Log out</button>
  `;

  document.body.appendChild(menu);

  document.getElementById("logoutBtn").onclick = logout;
}

function toggleUserMenu(e){
  e.preventDefault();
  const menu = document.getElementById("userMenu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

function logout(){
  localStorage.removeItem("signedIn");
  localStorage.removeItem("userName");
  location.reload();
}

// Close menu on outside click
// Close menu on outside click (for both auth buttons)
document.addEventListener("click", (e) => {
  const menu = document.getElementById("userMenu");

  if (
    menu &&
    !menu.contains(e.target) &&
    e.target !== authBtn &&
    e.target !== authBtn1
  ) {
    menu.style.display = "none";
  }
});