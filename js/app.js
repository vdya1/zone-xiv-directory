// App View Controller & Logic for Zone XIV Business Directory (API-driven)

// Inline SVG Icons dictionary for premium rendering without external fonts
const ICONS = {
  search: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>`,
  phone: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>`,
  mail: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>`,
  whatsapp: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.803-4.394 9.806-9.794.002-2.617-1.015-5.078-2.862-6.93C16.368 2.03 13.914.993 11.998.993c-5.405 0-9.809 4.397-9.813 9.802-.002 1.83.5 3.61 1.453 5.191l-.953 3.484 3.562-.934zm12.352-7.11c-.329-.165-1.949-.961-2.251-1.07-.302-.109-.522-.165-.742.165-.22.33-.85.107-1.04.107-.19 0-.379-.093-.708-.258-1.399-.625-2.527-1.537-3.464-3.15-.22-.38.22-.353.63-.761.368-.368.411-.522.615-.851.205-.33.103-.618-.051-.825-.154-.206-1.372-3.306-1.88-4.524-.495-1.189-.997-1.028-1.372-1.047-.354-.019-.759-.022-1.164-.022-.405 0-1.062.152-1.618.761-.557.608-2.126 2.08-2.126 5.076 0 2.996 2.176 5.89 2.48 6.299.303.41 4.283 6.54 10.377 9.167 1.448.624 2.58.997 3.46 1.277 1.454.463 2.78.396 3.827.239 1.166-.175 2.507-.822 2.859-1.62.352-.799.352-1.486.246-1.62-.105-.137-.389-.22-.719-.384z"/></svg>`,
  globe: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>`,
  map: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>`,
  user: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>`,
  users: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>`,
  briefcase: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>`,
  tag: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M6 20h12a2 2 0 002-2V8a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>`,
  home: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>`,
  plus: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>`,
  trash: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>`,
  edit: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>`,
  check: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>`,
  download: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>`,
  upload: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>`,
  calendar: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>`,
  cross: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>`,
  star: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.77-.57-.37-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>`
};

// Global Store for Filters (State persistent across navigation)
let directoryFilters = {
  searchQuery: "",
  category: "",
  chapter: "",
  city: ""
};

// Main dynamic renderer (Refactored to be Async)
async function renderView(route, params) {
  const appContainer = document.getElementById("app");
  if (!appContainer) return;
  
  // Update header auth state links
  updateHeaderAuthLinks();
  
  // Clear any open modals
  closeModal();

  // Show a premium glassy loading spinner during transitions
  appContainer.innerHTML = `
    <div style="display:flex; justify-content:center; align-items:center; min-height:40vh; flex-direction:column; gap:1rem;">
      <div class="logo-icon animate-pulse" style="width:60px; height:60px; font-size:1.75rem; animation: pulse 1.5s infinite;">ZX</div>
      <p class="text-muted" style="font-size:0.9rem; letter-spacing:0.05em; text-transform:uppercase;">Loading Directory Assets...</p>
    </div>
  `;

  try {
    switch (route) {
      case "home":
        await renderHome(appContainer);
        break;
      case "directory":
        await renderDirectory(appContainer);
        break;
      case "business":
        await renderBusinessProfile(appContainer, params.id);
        break;
      case "register":
        await renderRegistrationForm(appContainer);
        break;
      case "adminLogin":
        await renderAdminLogin(appContainer);
        break;
      case "adminDashboard":
        await renderAdminDashboard(appContainer);
        break;
      case "contact":
        await renderContact(appContainer);
        break;
      default:
        await renderHome(appContainer);
    }
  } catch (err) {
    appContainer.innerHTML = `
      <div class="view-container text-center" style="padding: 5rem 2rem;">
        <h3 style="color:var(--color-danger)">Application Load Error</h3>
        <p class="text-muted" style="margin: 1rem 0 2rem 0;">Unable to connect to the centralized directory server: ${err.message}</p>
        <button class="btn-premium" onclick="window.location.reload()">Retry Connection</button>
      </div>
    `;
  }
}

// ----------------------------------------
// VIEW RENDERING FUNCTIONS
// ----------------------------------------

// 1. HOME VIEW
async function renderHome(container) {
  // Fetch required data from backend in parallel
  const [businesses, categories, chapters] = await Promise.all([
    getApprovedBusinesses(),
    getCategories(),
    getChapters()
  ]);

  const featured = businesses.filter(b => b.isFeatured);
  
  // Count stats
  const totalBusinesses = businesses.length;
  const totalChapters = chapters.length;
  const totalCategories = categories.length;
  const totalMembers = new Set(businesses.map(b => b.fullName.toLowerCase())).size;

  let featuredHtml = "";
  if (featured.length === 0) {
    featuredHtml = `<p class="text-muted" style="grid-column: 1/-1; text-align: center; padding: 2rem;">No featured businesses yet.</p>`;
  } else {
    featuredHtml = featured.map(b => getBusinessCardHtml(b)).join("");
  }

  // Calculate category stats
  const catStats = categories.map(cat => {
    const count = businesses.filter(b => b.businessCategory === cat).length;
    return { name: cat, count };
  }).sort((a,b) => b.count - a.count).slice(0, 8); // Top 8

  const categoryCardsHtml = catStats.map(c => `
    <div class="category-card" onclick="browseCategory('${c.name}')">
      <div class="category-icon-box">${ICONS.briefcase}</div>
      <h4>${c.name}</h4>
      <span>${c.count} Business${c.count !== 1 ? 'es' : ''}</span>
    </div>
  `).join("");

  container.innerHTML = `
    <div class="view-container">
      <!-- Hero Section -->
      <section class="hero-section">
        <span class="hero-badge">Zone XIV Premium Business Hub</span>
        <h2>Connecting Businesses,<br>Building <span>Stronger Communities</span></h2>
        <p>Explore authorized services, verify chapter-specific profiles, and connect directly with local business owners.</p>
        
        <!-- Quick Search Panel -->
        <div class="search-panel">
          <form id="home-search-form" class="search-form" onsubmit="handleHomeSearch(event)">
            <div class="input-group">
              ${ICONS.search}
              <input type="text" id="home-search-query" class="search-input" placeholder="Business or Owner Name..." />
            </div>
            
            <div class="input-group">
              ${ICONS.briefcase}
              <select id="home-search-category" class="search-select">
                <option value="">All Categories</option>
                ${categories.map(c => `<option value="${c}">${c}</option>`).join("")}
              </select>
            </div>
            
            <div class="input-group">
              ${ICONS.users}
              <select id="home-search-chapter" class="search-select">
                <option value="">All Chapters</option>
                ${chapters.map(c => `<option value="${c}">${c}</option>`).join("")}
              </select>
            </div>
            
            <button type="submit" class="btn-search">
              Search
            </button>
          </form>
        </div>
      </section>

      <!-- Business Statistics Section -->
      <section class="stats-section">
        <div class="stat-card">
          <div class="stat-number">${totalBusinesses}</div>
          <div class="stat-label">Total Businesses</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">${totalMembers}</div>
          <div class="stat-label">Total Members</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">${totalChapters}</div>
          <div class="stat-label">Total Chapters</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">${totalCategories}</div>
          <div class="stat-label">Total Categories</div>
        </div>
      </section>

      <!-- Featured Section -->
      <section style="margin-bottom: 5rem;">
        <div class="section-header">
          <div>
            <span class="hero-badge" style="margin-bottom: 0.5rem;">Recommended</span>
            <h3>Featured Businesses</h3>
          </div>
          <a href="#/directory" class="section-link" onclick="clearFiltersAndBrowse()">View All Directory ${ICONS.phone}</a>
        </div>
        <div class="businesses-grid">
          ${featuredHtml}
        </div>
      </section>

      <!-- Browse by Category Section -->
      <section style="margin-bottom: 5rem;">
        <div class="section-header">
          <div>
            <span class="hero-badge" style="margin-bottom: 0.5rem;">Browse</span>
            <h3>Top Categories</h3>
          </div>
        </div>
        <div class="categories-grid">
          ${categoryCardsHtml}
        </div>
      </section>
    </div>
  `;
}

// Home Search Handler
window.handleHomeSearch = function(e) {
  e.preventDefault();
  directoryFilters.searchQuery = document.getElementById("home-search-query").value;
  directoryFilters.category = document.getElementById("home-search-category").value;
  directoryFilters.chapter = document.getElementById("home-search-chapter").value;
  directoryFilters.city = ""; 
  navigateTo("#/directory");
};

window.browseCategory = function(categoryName) {
  directoryFilters.searchQuery = "";
  directoryFilters.category = categoryName;
  directoryFilters.chapter = "";
  directoryFilters.city = "";
  navigateTo("#/directory");
};

window.clearFiltersAndBrowse = function() {
  directoryFilters = { searchQuery: "", category: "", chapter: "", city: "" };
};

// 2. DIRECTORY VIEW
async function renderDirectory(container) {
  const [categories, chapters] = await Promise.all([
    getCategories(),
    getChapters()
  ]);

  container.innerHTML = `
    <div class="view-container">
      <div class="directory-layout">
        <!-- Sidebar Filters -->
        <aside class="filters-sidebar">
          <div class="filters-header">
            <h4>Filters</h4>
            <button class="btn-clear-filters" onclick="clearDirectoryFilters()">Reset All</button>
          </div>
          
          <div class="filter-group">
            <label for="dir-search">Search Keyword</label>
            <input type="text" id="dir-search" value="${directoryFilters.searchQuery}" placeholder="Name, owner, service..." oninput="updateFiltersState()" />
          </div>
          
          <div class="filter-group">
            <label for="dir-category">Category</label>
            <select id="dir-category" onchange="updateFiltersState()">
              <option value="">All Categories</option>
              ${categories.map(c => `<option value="${c}" ${directoryFilters.category === c ? 'selected' : ''}>${c}</option>`).join("")}
            </select>
          </div>
          
          <div class="filter-group">
            <label for="dir-chapter">Chapter</label>
            <select id="dir-chapter" onchange="updateFiltersState()">
              <option value="">All Chapters</option>
              ${chapters.map(c => `<option value="${c}" ${directoryFilters.chapter === c ? 'selected' : ''}>${c}</option>`).join("")}
            </select>
          </div>
          
          <div class="filter-group">
            <label for="dir-city">City</label>
            <input type="text" id="dir-city" value="${directoryFilters.city}" placeholder="City name..." oninput="updateFiltersState()" />
          </div>
        </aside>

        <!-- Listings Section -->
        <section>
          <div class="directory-results-header">
            <span id="results-count">Showing 0 businesses</span>
          </div>
          <div id="directory-grid" class="businesses-grid">
            <!-- Dynamically populated via filters -->
          </div>
        </section>
      </div>
    </div>
  `;
  
  // Run initial filter rendering
  await applyDirectoryFilters();
}

window.clearDirectoryFilters = async function() {
  directoryFilters = { searchQuery: "", category: "", chapter: "", city: "" };
  document.getElementById("dir-search").value = "";
  document.getElementById("dir-category").value = "";
  document.getElementById("dir-chapter").value = "";
  document.getElementById("dir-city").value = "";
  await applyDirectoryFilters();
};

window.updateFiltersState = async function() {
  directoryFilters.searchQuery = document.getElementById("dir-search").value;
  directoryFilters.category = document.getElementById("dir-category").value;
  directoryFilters.chapter = document.getElementById("dir-chapter").value;
  directoryFilters.city = document.getElementById("dir-city").value;
  await applyDirectoryFilters();
};

async function applyDirectoryFilters() {
  const grid = document.getElementById("directory-grid");
  const countSpan = document.getElementById("results-count");
  if (!grid || !countSpan) return;

  grid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding: 2rem;">Loading filtered listings...</div>`;

  const businesses = await getApprovedBusinesses();
  const query = directoryFilters.searchQuery.toLowerCase().trim();
  const category = directoryFilters.category;
  const chapter = directoryFilters.chapter;
  const city = directoryFilters.city.toLowerCase().trim();
  
  const filtered = businesses.filter(b => {
    const matchesQuery = !query || 
      b.businessName.toLowerCase().includes(query) || 
      b.fullName.toLowerCase().includes(query) ||
      b.businessDescription.toLowerCase().includes(query) ||
      b.productsServices.toLowerCase().includes(query);
      
    const matchesCategory = !category || b.businessCategory === category;
    const matchesChapter = !chapter || b.chapterName === chapter;
    const matchesCity = !city || b.city.toLowerCase().includes(city);
    
    return matchesQuery && matchesCategory && matchesChapter && matchesCity;
  });

  countSpan.textContent = `Showing ${filtered.length} business${filtered.length !== 1 ? 'es' : ''}`;

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 4rem 2rem; background: var(--bg-card); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
        <p class="text-muted" style="font-size: 1.1rem; margin-bottom: 1rem;">No matching businesses found in the directory.</p>
        <button class="btn-outline" onclick="clearDirectoryFilters()">Reset Filters</button>
      </div>
    `;
  } else {
    grid.innerHTML = filtered.map(b => getBusinessCardHtml(b)).join("");
  }
}

// Shared Component: Business Card Generator HTML
function getBusinessCardHtml(b) {
  const logoContent = b.businessLogo 
    ? `<img src="${b.businessLogo}" alt="${b.businessName}" />` 
    : getInitialsSVG(b.businessName, "business");

  return `
    <div class="business-card">
      <div>
        <div class="card-top">
          <div class="business-card-logo">
            ${logoContent}
          </div>
          <div class="card-main-info">
            <div class="card-badges">
              ${b.isFeatured ? '<span class="badge-featured">Featured</span>' : ''}
              <span class="badge-category">${b.businessCategory || "Uncategorized"}</span>
            </div>
            <h4 onclick="navigateTo('#/business/${b.id}')">${b.businessName}</h4>
            <div class="owner-name">${ICONS.user} ${b.fullName}</div>
          </div>
        </div>
        <p class="business-card-desc">${b.businessDescription || "No description provided."}</p>
      </div>
      
      <div>
        <div class="card-meta-details">
          <div class="meta-item">${ICONS.users} <span>${b.chapterName || "No Chapter"}</span></div>
          <div class="meta-item">${ICONS.map} <span>${b.city || "N/A"}, ${b.state || "N/A"}</span></div>
        </div>
        
        <div class="card-actions">
          <a href="https://wa.me/${b.whatsAppNumber}?text=Hi%20${encodeURIComponent(b.fullName)},%20I%20saw%20your%20business%20${encodeURIComponent(b.businessName)}%20on%20Zone%20XIV%20Directory%20and%20wanted%20to%20connect." target="_blank" class="btn-card-whatsapp">${ICONS.whatsapp} WA</a>
          <a href="tel:${b.businessMobileNumber || b.mobileNumber}" class="btn-card-call">${ICONS.phone} Call</a>
          <button onclick="navigateTo('#/business/${b.id}')" class="btn-card-details">Details</button>
        </div>
      </div>
    </div>
  `;
}

// 3. BUSINESS PROFILE VIEW
async function renderBusinessProfile(container, id) {
  const b = await getBusinessById(id);
  
  if (!b || b.status !== "approved") {
    container.innerHTML = `
      <div class="view-container text-center" style="padding: 5rem 2rem;">
        <h3>Business Profile Not Found</h3>
        <p class="text-muted" style="margin: 1rem 0 2rem 0;">The requested profile does not exist or is awaiting administrator approval.</p>
        <button class="btn-premium" onclick="navigateTo('#/directory')">Back to Directory</button>
      </div>
    `;
    return;
  }

  const logoContent = b.businessLogo 
    ? `<img src="${b.businessLogo}" alt="${b.businessName}" />` 
    : getInitialsSVG(b.businessName, "business");

  const ownerPhotoContent = b.ownerPhoto 
    ? `<img src="${b.ownerPhoto}" alt="${b.fullName}" />` 
    : getInitialsSVG(b.fullName, "owner");

  const formattedProducts = b.productsServices
    ? b.productsServices.split(",").map(p => `<span class="product-tag">${p.trim()}</span>`).join("")
    : "<span class='text-muted'>Not specified.</span>";

  container.innerHTML = `
    <div class="view-container">
      <div style="margin-bottom: 2rem;">
        <button class="btn-outline" onclick="history.back()">&larr; Back</button>
      </div>

      <div class="profile-view">
        <!-- Main Info -->
        <div class="profile-main-card">
          <div class="profile-hero">
            <div class="profile-logo">
              ${logoContent}
            </div>
            <div class="profile-title-area">
              <span class="profile-category-tag">${b.businessCategory || "Uncategorized"}</span>
              <h2>${b.businessName}</h2>
              <div class="owner-name" style="font-size: 1.1rem;">${ICONS.user} Owned by <strong>${b.fullName}</strong></div>
            </div>
          </div>

          <div class="profile-section" style="margin-top: 2rem;">
            <h4>Business Description</h4>
            <p>${b.businessDescription || "No description provided for this business."}</p>
          </div>

          <div class="profile-section">
            <h4>Products & Services Offered</h4>
            <div class="products-list">
              ${formattedProducts}
            </div>
          </div>

          <div class="profile-section">
            <h4>Business Address</h4>
            <p>${b.businessAddress || "N/A"}<br>
            ${b.city || ""}, ${b.district || ""} - ${b.pinCode || ""}<br>
            ${b.state || ""}</p>
          </div>
        </div>

        <!-- Sidebar Contact & CTAs -->
        <div class="profile-sidebar">
          <!-- CTAs Widget -->
          <div class="sidebar-widget">
            <h4>Quick Connect</h4>
            <div class="profile-ctas">
              <a href="https://wa.me/${b.whatsAppNumber}?text=Hi%20${encodeURIComponent(b.fullName)},%20I%20saw%20your%20business%20${encodeURIComponent(b.businessName)}%20on%20Zone%20XIV%20Directory." target="_blank" class="btn-profile-whatsapp">${ICONS.whatsapp} WhatsApp</a>
              <a href="tel:${b.businessMobileNumber || b.mobileNumber}" class="btn-profile-call">${ICONS.phone} Call Office</a>
              <a href="mailto:${b.emailId}" class="btn-profile-email">${ICONS.mail} Send Email</a>
              ${b.website ? `<a href="${b.website}" target="_blank" class="btn-profile-web">${ICONS.globe} Visit Website</a>` : ""}
            </div>
          </div>

          <!-- Owner Profile Widget -->
          <div class="sidebar-widget">
            <h4>Owner Details</h4>
            <div class="owner-widget-profile">
              <div class="owner-photo">
                ${ownerPhotoContent}
              </div>
              <div class="owner-info">
                <h5>${b.fullName}</h5>
                <span>Chapter Representative</span>
              </div>
            </div>
            <div class="contact-info-list">
              <div class="contact-info-item">
                ${ICONS.users}
                <div>
                  <span class="info-label">Chapter Name</span>
                  <span class="info-value">${b.chapterName || "N/A"}</span>
                </div>
              </div>
              <div class="contact-info-item">
                ${ICONS.phone}
                <div>
                  <span class="info-label">Personal Mobile</span>
                  <span class="info-value">${b.mobileNumber || "N/A"}</span>
                </div>
              </div>
              <div class="contact-info-item">
                ${ICONS.mail}
                <div>
                  <span class="info-label">Email Address</span>
                  <span class="info-value">${b.emailId || "N/A"}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Location Mock Widget -->
          <div class="sidebar-widget">
            <h4>Google Maps Location</h4>
            <div class="map-widget" onclick="window.open('${b.googleMapsLocation || 'https://maps.google.com/?q='+encodeURIComponent(b.businessName)}', '_blank')">
              <div class="map-mock-bg"></div>
              <div class="map-pin">
                ${ICONS.map}
              </div>
              <span>Open in Google Maps</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// 4. REGISTRATION FORM VIEW
async function renderRegistrationForm(container) {
  const [categories, chapters] = await Promise.all([
    getCategories(),
    getChapters()
  ]);

  container.innerHTML = `
    <div class="view-container">
      <div id="register-container" class="form-card">
        <div class="form-header">
          <h2>Register Business</h2>
          <p>Submit your enterprise details to the Zone XIV directory. Registrations require administrator approval before publication.</p>
        </div>

        <form id="business-registration-form" onsubmit="handleRegistrationSubmit(event)">
          <!-- Primary Owner Information -->
          <div style="margin-bottom: 2rem;">
            <h3 style="font-size: 1.25rem; margin-bottom: 1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem; color: var(--color-primary);">1. Owner Information</h3>
            <div class="form-grid">
              <div class="form-group">
                <label for="reg-fullName">Full Name <span>*</span></label>
                <input type="text" id="reg-fullName" class="form-control" required placeholder="Owner's full name" />
              </div>
              <div class="form-group">
                <label for="reg-mobileNumber">Personal Mobile Number <span>*</span></label>
                <input type="tel" id="reg-mobileNumber" class="form-control" required placeholder="10-digit mobile number" pattern="[0-9+() -]{7,15}" />
              </div>
              <div class="form-group">
                <label for="reg-emailId">Email ID <span>*</span></label>
                <input type="email" id="reg-emailId" class="form-control" required placeholder="owner@domain.com" />
              </div>
              <div class="form-group">
                <label for="reg-chapterName">Chapter Name <span>*</span></label>
                <select id="reg-chapterName" class="form-control" required>
                  <option value="">Select Chapter</option>
                  ${chapters.map(c => `<option value="${c}">${c}</option>`).join("")}
                </select>
              </div>
            </div>
          </div>

          <!-- Business Details -->
          <div style="margin-bottom: 2rem;">
            <h3 style="font-size: 1.25rem; margin-bottom: 1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem; color: var(--color-primary);">2. Business Information</h3>
            <div class="form-grid">
              <div class="form-group">
                <label for="reg-businessName">Business Name <span>*</span></label>
                <input type="text" id="reg-businessName" class="form-control" required placeholder="Registered company name" />
              </div>
              <div class="form-group">
                <label for="reg-businessCategory">Business Category <span>*</span></label>
                <select id="reg-businessCategory" class="form-control" required>
                  <option value="">Select Category</option>
                  ${categories.map(c => `<option value="${c}">${c}</option>`).join("")}
                </select>
              </div>
              <div class="form-group full-width">
                <label for="reg-businessDescription">Business Description <span>*</span></label>
                <textarea id="reg-businessDescription" class="form-control" required placeholder="Describe your business operations..."></textarea>
              </div>
              <div class="form-group full-width">
                <label for="reg-productsServices">Products / Services Offered <span>*</span></label>
                <input type="text" id="reg-productsServices" class="form-control" required placeholder="Comma separated list (e.g. Consulting, Audit)" />
              </div>
            </div>
          </div>

          <!-- Business Location & Contact -->
          <div style="margin-bottom: 2rem;">
            <h3 style="font-size: 1.25rem; margin-bottom: 1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem; color: var(--color-primary);">3. Location & Communication</h3>
            <div class="form-grid">
              <div class="form-group full-width">
                <label for="reg-businessAddress">Business Address <span>*</span></label>
                <input type="text" id="reg-businessAddress" class="form-control" required placeholder="Office building details" />
              </div>
              <div class="form-group">
                <label for="reg-city">City <span>*</span></label>
                <input type="text" id="reg-city" class="form-control" required placeholder="City Name" />
              </div>
              <div class="form-group">
                <label for="reg-district">District <span>*</span></label>
                <input type="text" id="reg-district" class="form-control" required placeholder="District" />
              </div>
              <div class="form-group">
                <label for="reg-state">State <span>*</span></label>
                <input type="text" id="reg-state" class="form-control" required placeholder="State" />
              </div>
              <div class="form-group">
                <label for="reg-pinCode">PIN Code <span>*</span></label>
                <input type="text" id="reg-pinCode" class="form-control" required placeholder="PIN Code" />
              </div>
              <div class="form-group">
                <label for="reg-businessMobileNumber">Business Mobile Number <span>*</span></label>
                <input type="tel" id="reg-businessMobileNumber" class="form-control" required placeholder="Office phone" />
              </div>
              <div class="form-group">
                <label for="reg-whatsAppNumber">WhatsApp Communication Number <span>*</span></label>
                <input type="tel" id="reg-whatsAppNumber" class="form-control" required placeholder="Country code + number (e.g. 1555019200)" />
              </div>
              <div class="form-group">
                <label for="reg-website">Website URL</label>
                <input type="url" id="reg-website" class="form-control" placeholder="https://example.com" />
              </div>
              <div class="form-group">
                <label for="reg-googleMapsLocation">Google Maps Link</label>
                <input type="url" id="reg-googleMapsLocation" class="form-control" placeholder="https://maps.google.com/..." />
              </div>
            </div>
          </div>

          <!-- Photo Assets -->
          <div style="margin-bottom: 2.5rem;">
            <h3 style="font-size: 1.25rem; margin-bottom: 1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem; color: var(--color-primary);">4. Photos & Branding</h3>
            <div class="upload-grid">
              <div>
                <label style="display:block; font-size:0.85rem; font-weight:600; margin-bottom:0.5rem;">Business Logo</label>
                <div class="upload-box">
                  ${ICONS.upload}
                  <div class="upload-box-text">Drag files here or <strong>browse</strong></div>
                  <input type="file" id="reg-logo-file" accept="image/*" onchange="previewUploadImage(this, 'logo-preview')" />
                </div>
                <div id="logo-preview" class="preview-container"></div>
              </div>
              <div>
                <label style="display:block; font-size:0.85rem; font-weight:600; margin-bottom:0.5rem;">Owner Photograph</label>
                <div class="upload-box">
                  ${ICONS.upload}
                  <div class="upload-box-text">Drag files here or <strong>browse</strong></div>
                  <input type="file" id="reg-owner-file" accept="image/*" onchange="previewUploadImage(this, 'owner-preview')" />
                </div>
                <div id="owner-preview" class="preview-container circle"></div>
              </div>
            </div>
          </div>

          <div style="display:flex; justify-content:flex-end;">
            <button type="submit" class="btn-premium" style="padding: 0.85rem 2rem; font-size: 1rem;">Submit Registration</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

// Local base64 previews
window.previewUploadImage = function(input, previewId) {
  const preview = document.getElementById(previewId);
  if (!preview) return;

  const file = input.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      preview.innerHTML = `<img src="${e.target.result}" alt="Preview" />`;
      preview.style.display = "flex";
      input.dataset.base64 = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    preview.innerHTML = "";
    preview.style.display = "none";
    delete input.dataset.base64;
  }
};

window.handleRegistrationSubmit = async function(e) {
  e.preventDefault();

  const logoInput = document.getElementById("reg-logo-file");
  const ownerInput = document.getElementById("reg-owner-file");

  const businessData = {
    fullName: document.getElementById("reg-fullName").value,
    mobileNumber: document.getElementById("reg-mobileNumber").value,
    emailId: document.getElementById("reg-emailId").value,
    chapterName: document.getElementById("reg-chapterName").value,
    businessName: document.getElementById("reg-businessName").value,
    businessCategory: document.getElementById("reg-businessCategory").value,
    businessDescription: document.getElementById("reg-businessDescription").value,
    productsServices: document.getElementById("reg-productsServices").value,
    businessAddress: document.getElementById("reg-businessAddress").value,
    city: document.getElementById("reg-city").value,
    district: document.getElementById("reg-district").value,
    state: document.getElementById("reg-state").value,
    pinCode: document.getElementById("reg-pinCode").value,
    businessMobileNumber: document.getElementById("reg-businessMobileNumber").value,
    whatsAppNumber: document.getElementById("reg-whatsAppNumber").value,
    website: document.getElementById("reg-website").value || "",
    googleMapsLocation: document.getElementById("reg-googleMapsLocation").value || "",
    businessLogo: logoInput ? (logoInput.dataset.base64 || "") : "",
    ownerPhoto: ownerInput ? (ownerInput.dataset.base64 || "") : "",
    status: "pending",
    isFeatured: false
  };

  const newB = await addBusiness(businessData);

  const container = document.getElementById("register-container");
  if (container && newB) {
    container.innerHTML = `
      <div class="success-screen">
        <div class="success-icon-box">
          ${ICONS.check}
        </div>
        <h3>Registration Submitted!</h3>
        <p>Your business <strong>${newB.businessName}</strong> has been registered successfully. It will be published to the directory once approved by the administrator.</p>
        <div style="font-size: 0.9rem; font-family: monospace; background: var(--bg-input); padding: 0.5rem 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color); display: inline-block; margin-bottom: 2rem;">
          Reference ID: ZXIV-${newB.id}
        </div>
        <br>
        <button class="btn-premium" onclick="navigateTo('#/')">Go to Homepage</button>
      </div>
    `;
  }
};

// 5. ADMIN LOGIN VIEW
async function renderAdminLogin(container) {
  container.innerHTML = `
    <div class="view-container">
      <div class="form-card" style="max-width: 450px;">
        <div class="form-header text-center">
          <div class="logo-icon" style="margin: 0 auto 1rem auto; width: 48px; height: 48px; font-size: 1.5rem;">ZX</div>
          <h2>Admin Login</h2>
          <p>Access the Zone XIV directory management console.</p>
        </div>

        <div id="login-error" style="display:none; color: var(--color-danger); background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2); padding: 0.75rem 1rem; border-radius: var(--radius-sm); font-size: 0.9rem; margin-bottom: 1.5rem; text-align: center;">
        </div>

        <form id="admin-login-form" onsubmit="handleAdminLogin(event)">
          <div class="form-group" style="margin-bottom: 1.25rem;">
            <label for="login-username">Username</label>
            <input type="text" id="login-username" class="form-control" required placeholder="admin" autocomplete="username" />
          </div>
          <div class="form-group" style="margin-bottom: 1.75rem;">
            <label for="login-password">Password</label>
            <input type="password" id="login-password" class="form-control" required placeholder="••••••••" autocomplete="current-password" />
          </div>
          <button type="submit" class="btn-premium" style="width:100%; padding: 0.75rem; justify-content: center;">Authenticate</button>
        </form>
      </div>
    </div>
  `;
}

window.handleAdminLogin = async function(e) {
  e.preventDefault();
  const u = document.getElementById("login-username").value;
  const p = document.getElementById("login-password").value;
  const errorDiv = document.getElementById("login-error");

  const result = await loginAdmin(u, p);
  if (result.success) {
    navigateTo("#/admin/dashboard");
  } else {
    errorDiv.textContent = result.message;
    errorDiv.style.display = "block";
  }
};

// 6. ADMIN DASHBOARD VIEW
async function renderAdminDashboard(container) {
  // Fetch all dashboard requirements in parallel from Node.js APIs
  const [businesses, pending, approved, categories, chapters] = await Promise.all([
    getBusinesses(),
    getPendingBusinesses(),
    getApprovedBusinesses(),
    getCategories(),
    getChapters()
  ]);

  // Metrics
  const totalCount = approved.length;
  const pendingCount = pending.length;
  const totalChapters = chapters.length;
  const totalCategories = categories.length;
  const totalMembers = new Set(approved.map(b => b.fullName.toLowerCase())).size;

  container.innerHTML = `
    <div class="view-container">
      <div class="admin-layout">
        <!-- Admin header -->
        <div class="admin-header">
          <div class="admin-title-area">
            <h2>Admin Management Console</h2>
            <p>Welcome back, ${getLoggedInAdmin() || 'Administrator'}. Manage listings, categories, chapters and approve entries.</p>
          </div>
          <div class="admin-actions">
            <button class="btn-outline" onclick="triggerExportToExcel()">${ICONS.download} Export to Excel</button>
            <button class="btn-premium" onclick="triggerCreateBusiness()">${ICONS.plus} Add Business</button>
          </div>
        </div>

        <!-- Metric summaries -->
        <section class="admin-stats-grid">
          <div class="stat-card" style="padding: 1.5rem 1.25rem;">
            <div class="stat-number">${totalCount}</div>
            <div class="stat-label">Active Listings</div>
          </div>
          <div class="stat-card" style="padding: 1.5rem 1.25rem;">
            <div class="stat-number" style="color: ${pendingCount > 0 ? 'var(--color-phone)' : 'inherit'}; -webkit-text-fill-color: ${pendingCount > 0 ? 'var(--color-phone)' : ''};">${pendingCount}</div>
            <div class="stat-label">Pending Approvals</div>
          </div>
          <div class="stat-card" style="padding: 1.5rem 1.25rem;">
            <div class="stat-number">${totalMembers}</div>
            <div class="stat-label">Verified Members</div>
          </div>
          <div class="stat-card" style="padding: 1.5rem 1.25rem;">
            <div class="stat-number">${totalChapters}</div>
            <div class="stat-label">Active Chapters</div>
          </div>
        </section>

        <!-- Navigation Tabs -->
        <div class="admin-tabs">
          <button id="tab-btn-approvals" class="admin-tab-btn active" onclick="switchAdminTab('approvals')">
            Approvals ${pendingCount > 0 ? `<span class="badge-tab-count">${pendingCount}</span>` : ''}
          </button>
          <button id="tab-btn-listings" class="admin-tab-btn" onclick="switchAdminTab('listings')">Manage Listings</button>
          <button id="tab-btn-taxonomies" class="admin-tab-btn" onclick="switchAdminTab('taxonomies')">Categories & Chapters</button>
          <button id="tab-btn-backups" class="admin-tab-btn" onclick="switchAdminTab('backups')">Backup & Data</button>
        </div>

        <!-- Content Panels -->
        
        <!-- Panel 1: Approvals -->
        <div id="panel-approvals" class="admin-panel active">
          <div class="table-responsive">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Logo</th>
                  <th>Business Name</th>
                  <th>Owner Name</th>
                  <th>Category</th>
                  <th>Chapter</th>
                  <th>Submitted At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody id="approvals-table-body">
                ${getPendingRowsHtml(pending)}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Panel 2: Listings -->
        <div id="panel-listings" class="admin-panel">
          <div style="display:flex; justify-content:space-between; margin-bottom: 1.25rem; gap: 1rem;">
            <input type="text" id="admin-search-listings" class="form-control" style="max-width: 320px;" placeholder="Search all listings..." oninput="filterAdminListings()" />
          </div>
          <div class="table-responsive">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Logo</th>
                  <th>ID</th>
                  <th>Business Name</th>
                  <th>Owner</th>
                  <th>Category</th>
                  <th>Chapter</th>
                  <th>Status</th>
                  <th>Featured</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody id="listings-table-body">
                ${getListingsRowsHtml(businesses)}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Panel 3: Taxonomies -->
        <div id="panel-taxonomies" class="admin-panel">
          <div class="taxonomy-grid">
            <!-- Categories -->
            <div class="tax-card">
              <h4>Manage Categories</h4>
              <div class="inline-form">
                <input type="text" id="new-category-input" class="form-control" placeholder="New Category Name" />
                <button class="btn-premium" onclick="addNewCategory()">${ICONS.plus}</button>
              </div>
              <div class="tax-list" id="categories-list-container">
                ${getCategoriesListHtml(categories)}
              </div>
            </div>
            <!-- Chapters -->
            <div class="tax-card">
              <h4>Manage Chapters</h4>
              <div class="inline-form">
                <input type="text" id="new-chapter-input" class="form-control" placeholder="New Chapter Name" />
                <button class="btn-premium" onclick="addNewChapter()">${ICONS.plus}</button>
              </div>
              <div class="tax-list" id="chapters-list-container">
                ${getChaptersListHtml(chapters)}
              </div>
            </div>
          </div>
        </div>

        <!-- Panel 4: Backups -->
        <div id="panel-backups" class="admin-panel">
          <div class="taxonomy-grid">
            <!-- Backup -->
            <div class="tax-card">
              <h4>Database Backup</h4>
              <p class="text-muted" style="margin-bottom:1.5rem; font-size:0.9rem;">Download the entire current database structure (Businesses, Categories, Chapters) as a JSON file. Store this file securely to restore later.</p>
              <button class="btn-premium" onclick="triggerDatabaseBackup()">${ICONS.download} Download Backup JSON</button>
            </div>
            <!-- Restore -->
            <div class="tax-card">
              <h4>Database Restore</h4>
              <p class="text-muted" style="margin-bottom:1.5rem; font-size:0.9rem;">Upload a previously saved database backup JSON file to restore settings. Warning: this replaces all current entries and cannot be undone.</p>
              <div style="position:relative; overflow:hidden; display:inline-block; width:100%;">
                <button class="btn-outline" style="width:100%;">${ICONS.upload} Choose JSON File & Restore</button>
                <input type="file" id="db-restore-file" accept=".json" onchange="triggerDatabaseRestore(this)" style="position:absolute; left:0; top:0; width:100%; height:100%; opacity:0; cursor:pointer;" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  `;
}

// Admin Tab switcher
window.switchAdminTab = function(tabName) {
  document.querySelectorAll(".admin-tab-btn").forEach(btn => btn.classList.remove("active"));
  document.querySelectorAll(".admin-panel").forEach(panel => panel.classList.remove("active"));

  document.getElementById(`tab-btn-${tabName}`).classList.add("active");
  document.getElementById(`panel-${tabName}`).classList.add("active");
};

// Row Generators
function getPendingRowsHtml(pendingList) {
  if (pendingList.length === 0) {
    return `<tr><td colspan="7" class="text-center text-muted" style="padding:3rem 0;">No pending registrations at the moment.</td></tr>`;
  }
  return pendingList.map(b => {
    const logoContent = b.businessLogo 
      ? `<img src="${b.businessLogo}" alt="" />` 
      : getInitialsSVG(b.businessName, "business");

    const dateStr = b.registeredAt ? new Date(b.registeredAt).toLocaleDateString() : "N/A";
    return `
      <tr>
        <td><div class="row-logo">${logoContent}</div></td>
        <td><strong>${b.businessName}</strong></td>
        <td>${b.fullName}</td>
        <td>${b.businessCategory}</td>
        <td>${b.chapterName}</td>
        <td>${dateStr}</td>
        <td>
          <div class="row-actions">
            <button class="btn-icon btn-approve" title="Approve" onclick="adminApproveBusiness('${b.id}')">${ICONS.check}</button>
            <button class="btn-icon btn-delete" title="Reject / Delete" onclick="adminDeleteBusiness('${b.id}', true)">${ICONS.cross}</button>
          </div>
        </td>
      </tr>
    `;
  }).join("");
}

function getListingsRowsHtml(list) {
  if (list.length === 0) {
    return `<tr><td colspan="9" class="text-center text-muted" style="padding:3rem 0;">No listings found.</td></tr>`;
  }
  return list.map(b => {
    const logoContent = b.businessLogo 
      ? `<img src="${b.businessLogo}" alt="" />` 
      : getInitialsSVG(b.businessName, "business");

    const statusBadge = b.status === "approved" 
      ? `<span class="status-dot status-approved">Approved</span>`
      : `<span class="status-dot status-pending">Pending</span>`;

    const featureCheckbox = `
      <input type="checkbox" ${b.isFeatured ? 'checked' : ''} onchange="adminToggleFeatured('${b.id}', this.checked)" style="width:16px; height:16px; cursor:pointer;" />
    `;

    return `
      <tr class="listing-row" data-search-content="${b.businessName.toLowerCase()} ${b.fullName.toLowerCase()} ${b.id.toLowerCase()}">
        <td><div class="row-logo">${logoContent}</div></td>
        <td style="font-family:monospace;">${b.id}</td>
        <td><strong>${b.businessName}</strong></td>
        <td>${b.fullName}</td>
        <td>${b.businessCategory || "N/A"}</td>
        <td>${b.chapterName || "N/A"}</td>
        <td>${statusBadge}</td>
        <td class="text-center">${featureCheckbox}</td>
        <td>
          <div class="row-actions">
            <button class="btn-icon" title="View details" onclick="navigateTo('#/business/${b.id}')">${ICONS.globe}</button>
            <button class="btn-icon" title="Edit listing" onclick="adminEditBusiness('${b.id}')">${ICONS.edit}</button>
            <button class="btn-icon btn-delete" title="Delete listing" onclick="adminDeleteBusiness('${b.id}')">${ICONS.trash}</button>
          </div>
        </td>
      </tr>
    `;
  }).join("");
}

function getCategoriesListHtml(cats) {
  return cats.map(c => `
    <div class="tax-item">
      <span>${c}</span>
      <div class="tax-item-actions">
        <button class="btn-icon" onclick="editCategoryPrompt('${c}')">${ICONS.edit}</button>
        <button class="btn-icon btn-delete" onclick="deleteCategoryAction('${c}')">${ICONS.trash}</button>
      </div>
    </div>
  `).join("");
}

function getChaptersListHtml(chaps) {
  return chaps.map(c => `
    <div class="tax-item">
      <span>${c}</span>
      <div class="tax-item-actions">
        <button class="btn-icon" onclick="editChapterPrompt('${c}')">${ICONS.edit}</button>
        <button class="btn-icon btn-delete" onclick="deleteChapterAction('${c}')">${ICONS.trash}</button>
      </div>
    </div>
  `).join("");
}

// Admin handlers (Refactored to be Async)
window.adminApproveBusiness = async function(id) {
  await approveBusiness(id);
  await renderAdminDashboard(document.getElementById("app"));
};

window.adminDeleteBusiness = async function(id, isReject = false) {
  const label = isReject ? "reject and delete this registration" : "permanently delete this business listing";
  if (confirm(`Are you sure you want to ${label}?`)) {
    await deleteBusiness(id);
    await renderAdminDashboard(document.getElementById("app"));
  }
};

window.adminToggleFeatured = async function(id, isFeatured) {
  await updateBusiness(id, { isFeatured });
};

window.filterAdminListings = function() {
  const query = document.getElementById("admin-search-listings").value.toLowerCase().trim();
  document.querySelectorAll(".listing-row").forEach(row => {
    const text = row.dataset.searchContent;
    if (!query || text.includes(query)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
};

// Taxonomy management actions
window.addNewCategory = async function() {
  const input = document.getElementById("new-category-input");
  const val = input.value.trim();
  if (val) {
    await addCategory(val);
    input.value = "";
    const cats = await getCategories();
    document.getElementById("categories-list-container").innerHTML = getCategoriesListHtml(cats);
  }
};

window.editCategoryPrompt = async function(oldName) {
  const newName = prompt(`Edit category "${oldName}" name:`, oldName);
  if (newName && newName.trim() !== oldName) {
    await updateCategory(oldName, newName.trim());
    const cats = await getCategories();
    document.getElementById("categories-list-container").innerHTML = getCategoriesListHtml(cats);
  }
};

window.deleteCategoryAction = async function(catName) {
  if (confirm(`Delete category "${catName}"? This removes it from all associated business profiles.`)) {
    await deleteCategory(catName);
    const cats = await getCategories();
    document.getElementById("categories-list-container").innerHTML = getCategoriesListHtml(cats);
  }
};

window.addNewChapter = async function() {
  const input = document.getElementById("new-chapter-input");
  const val = input.value.trim();
  if (val) {
    await addChapter(val);
    input.value = "";
    const chaps = await getChapters();
    document.getElementById("chapters-list-container").innerHTML = getChaptersListHtml(chaps);
  }
};

window.editChapterPrompt = async function(oldName) {
  const newName = prompt(`Edit chapter "${oldName}" name:`, oldName);
  if (newName && newName.trim() !== oldName) {
    await updateChapter(oldName, newName.trim());
    const chaps = await getChapters();
    document.getElementById("chapters-list-container").innerHTML = getChaptersListHtml(chaps);
  }
};

window.deleteChapterAction = async function(chapName) {
  if (confirm(`Delete chapter "${chapName}"? This removes it from all associated business profiles.`)) {
    await deleteChapter(chapName);
    const chaps = await getChapters();
    document.getElementById("chapters-list-container").innerHTML = getChaptersListHtml(chaps);
  }
};

// 7. CONTACT US VIEW
async function renderContact(container) {
  container.innerHTML = `
    <div class="view-container">
      <div class="contact-layout">
        <!-- Form -->
        <div class="contact-card">
          <div class="form-header" style="margin-bottom:1.5rem;">
            <h2>Send a Message</h2>
            <p>Have questions about directory rules or need assistance registering? Write to our support team.</p>
          </div>
          
          <form id="contact-form" onsubmit="handleContactSubmit(event)">
            <div class="form-group" style="margin-bottom:1.25rem;">
              <label for="contact-name">Full Name</label>
              <input type="text" id="contact-name" class="form-control" required placeholder="Your name" />
            </div>
            <div class="form-group" style="margin-bottom:1.25rem;">
              <label for="contact-email">Email Address</label>
              <input type="email" id="contact-email" class="form-control" required placeholder="you@domain.com" />
            </div>
            <div class="form-group" style="margin-bottom:1.75rem;">
              <label for="contact-message">Your Message</label>
              <textarea id="contact-message" class="form-control" required style="min-height:120px;" placeholder="Details of your request..."></textarea>
            </div>
            <button type="submit" class="btn-premium" style="width:100%; justify-content:center;">Send Message</button>
          </form>
        </div>

        <!-- Info details -->
        <div class="contact-info-widget">
          <div>
            <h3 style="font-size: 1.5rem; margin-bottom: 1.5rem;">Zone XIV Directory Headquarters</h3>
            
            <div class="contact-info-list" style="gap:1.5rem;">
              <div class="contact-info-item">
                ${ICONS.map}
                <div>
                  <span class="info-label">Address</span>
                  <span class="info-value">Zone XIV Administrative Complex, Corporate Hub Blvd, Suite 400, New York, NY 10001</span>
                </div>
              </div>
              <div class="contact-info-item">
                ${ICONS.phone}
                <div>
                  <span class="info-label">Support Helpline</span>
                  <span class="info-value">+1 (555) 010-9000 (Mon - Fri, 9 AM - 6 PM)</span>
                </div>
              </div>
              <div class="contact-info-item">
                ${ICONS.mail}
                <div>
                  <span class="info-label">General Inquiries</span>
                  <span class="info-value">support@zonexiv-directory.org</span>
                </div>
              </div>
            </div>
          </div>

          <div style="border-top:1px solid var(--border-color); padding-top:1.5rem; margin-top:2rem; font-size:0.85rem; color:var(--text-muted);">
            Zone XIV is an independent, non-profit business association operating in compliance with global chapter coordination mandates.
          </div>
        </div>
      </div>
    </div>
  `;
}

window.handleContactSubmit = function(e) {
  e.preventDefault();
  const name = document.getElementById("contact-name").value;
  alert(`Thank you, ${name}! Your message has been sent.`);
  navigateTo("#/");
};

// ----------------------------------------
// MODAL FOR CREATING AND EDITING BUSINESS (ADMIN)
// ----------------------------------------
window.triggerCreateBusiness = async function() {
  await openBusinessFormModal(null);
};

window.adminEditBusiness = async function(id) {
  await openBusinessFormModal(id);
};

async function openBusinessFormModal(id) {
  // Load necessary parameters from backend asynchronously
  const [b, categories, chapters] = await Promise.all([
    id ? getBusinessById(id) : Promise.resolve(null),
    getCategories(),
    getChapters()
  ]);
  
  const title = b ? `Edit Business Details` : `Add New Business Listing`;
  const btnLabel = b ? `Save Changes` : `Create Listing`;

  const modalOverlay = document.getElementById("modal-overlay");
  if (!modalOverlay) return;

  modalOverlay.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h3>${title}</h3>
        <button class="btn-close-modal" onclick="closeModal()">&times;</button>
      </div>
      <form id="admin-business-modal-form" onsubmit="handleModalFormSubmit(event, ${b ? `'${b.id}'` : 'null'})">
        <div class="modal-body">
          <div class="form-grid" style="grid-template-columns:1fr; gap:1.25rem;">
            
            <div class="form-group">
              <label>Business Status (Publication State)</label>
              <select id="modal-status" class="form-control">
                <option value="approved" ${b && b.status === 'approved' ? 'selected' : ''}>Approved (Published)</option>
                <option value="pending" ${b && b.status === 'pending' ? 'selected' : ''}>Pending Approval (Hidden)</option>
              </select>
            </div>

            <div class="form-group">
              <label for="modal-fullName">Owner Full Name *</label>
              <input type="text" id="modal-fullName" class="form-control" required value="${b ? b.fullName : ''}" />
            </div>

            <div class="form-group">
              <label for="modal-mobileNumber">Owner Mobile *</label>
              <input type="tel" id="modal-mobileNumber" class="form-control" required value="${b ? b.mobileNumber : ''}" />
            </div>

            <div class="form-group">
              <label for="modal-emailId">Owner Email ID *</label>
              <input type="email" id="modal-emailId" class="form-control" required value="${b ? b.emailId : ''}" />
            </div>

            <div class="form-group">
              <label for="modal-chapterName">Chapter *</label>
              <select id="modal-chapterName" class="form-control" required>
                <option value="">Select Chapter</option>
                ${chapters.map(c => `<option value="${c}" ${b && b.chapterName === c ? 'selected' : ''}>${c}</option>`).join("")}
              </select>
            </div>

            <div class="form-group">
              <label for="modal-businessName">Business Name *</label>
              <input type="text" id="modal-businessName" class="form-control" required value="${b ? b.businessName : ''}" />
            </div>

            <div class="form-group">
              <label for="modal-businessCategory">Category *</label>
              <select id="modal-businessCategory" class="form-control" required>
                <option value="">Select Category</option>
                ${categories.map(c => `<option value="${c}" ${b && b.businessCategory === c ? 'selected' : ''}>${c}</option>`).join("")}
              </select>
            </div>

            <div class="form-group">
              <label for="modal-businessDescription">Description *</label>
              <textarea id="modal-businessDescription" class="form-control" required>${b ? b.businessDescription : ''}</textarea>
            </div>

            <div class="form-group">
              <label for="modal-productsServices">Products / Services Offered *</label>
              <input type="text" id="modal-productsServices" class="form-control" required value="${b ? b.productsServices : ''}" placeholder="Comma separated values" />
            </div>

            <div class="form-group">
              <label for="modal-businessAddress">Business Address *</label>
              <input type="text" id="modal-businessAddress" class="form-control" required value="${b ? b.businessAddress : ''}" />
            </div>

            <div class="form-group">
              <label for="modal-city">City *</label>
              <input type="text" id="modal-city" class="form-control" required value="${b ? b.city : ''}" />
            </div>

            <div class="form-group">
              <label for="modal-district">District *</label>
              <input type="text" id="modal-district" class="form-control" required value="${b ? b.district : ''}" />
            </div>

            <div class="form-group">
              <label for="modal-state">State *</label>
              <input type="text" id="modal-state" class="form-control" required value="${b ? b.state : ''}" />
            </div>

            <div class="form-group">
              <label for="modal-pinCode">PIN Code *</label>
              <input type="text" id="modal-pinCode" class="form-control" required value="${b ? b.pinCode : ''}" />
            </div>

            <div class="form-group">
              <label for="modal-businessMobileNumber">Business Phone *</label>
              <input type="tel" id="modal-businessMobileNumber" class="form-control" required value="${b ? b.businessMobileNumber : ''}" />
            </div>

            <div class="form-group">
              <label for="modal-whatsAppNumber">WhatsApp Link Number *</label>
              <input type="tel" id="modal-whatsAppNumber" class="form-control" required value="${b ? b.whatsAppNumber : ''}" />
            </div>

            <div class="form-group">
              <label for="modal-website">Website URL</label>
              <input type="url" id="modal-website" class="form-control" value="${b ? b.website : ''}" />
            </div>

            <div class="form-group">
              <label for="modal-googleMapsLocation">Maps URL</label>
              <input type="url" id="modal-googleMapsLocation" class="form-control" value="${b ? b.googleMapsLocation : ''}" />
            </div>

            <!-- Previews -->
            <div class="upload-grid">
              <div>
                <label style="display:block; font-size:0.85rem; font-weight:600; margin-bottom:0.5rem;">Logo Override</label>
                <div class="upload-box" style="padding:1rem;">
                  ${ICONS.upload}
                  <input type="file" id="modal-logo-file" accept="image/*" onchange="previewUploadImage(this, 'modal-logo-preview')" />
                </div>
                <div id="modal-logo-preview" class="preview-container" style="display: ${b && b.businessLogo ? 'flex' : 'none'};">
                  ${b && b.businessLogo ? `<img src="${b.businessLogo}" alt="" />` : ''}
                </div>
              </div>
              <div>
                <label style="display:block; font-size:0.85rem; font-weight:600; margin-bottom:0.5rem;">Photo Override</label>
                <div class="upload-box" style="padding:1rem;">
                  ${ICONS.upload}
                  <input type="file" id="modal-owner-file" accept="image/*" onchange="previewUploadImage(this, 'modal-owner-preview')" />
                </div>
                <div id="modal-owner-preview" class="preview-container circle" style="display: ${b && b.ownerPhoto ? 'flex' : 'none'};">
                  ${b && b.ownerPhoto ? `<img src="${b.ownerPhoto}" alt="" />` : ''}
                </div>
              </div>
            </div>

          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn-outline" onclick="closeModal()">Cancel</button>
          <button type="submit" class="btn-premium">${btnLabel}</button>
        </div>
      </form>
    </div>
  `;
  modalOverlay.style.display = "flex";
}

window.closeModal = function() {
  const modalOverlay = document.getElementById("modal-overlay");
  if (modalOverlay) {
    modalOverlay.style.display = "none";
    modalOverlay.innerHTML = "";
  }
};

window.handleModalFormSubmit = async function(e, id) {
  e.preventDefault();

  const logoInput = document.getElementById("modal-logo-file");
  const ownerInput = document.getElementById("modal-owner-file");

  let existingLogo = "";
  let existingOwner = "";
  if (id) {
    const existing = await getBusinessById(id);
    if (existing) {
      existingLogo = existing.businessLogo;
      existingOwner = existing.ownerPhoto;
    }
  }

  const logoData = logoInput && logoInput.dataset.base64 ? logoInput.dataset.base64 : existingLogo;
  const ownerData = ownerInput && ownerInput.dataset.base64 ? ownerInput.dataset.base64 : existingOwner;

  const data = {
    fullName: document.getElementById("modal-fullName").value,
    mobileNumber: document.getElementById("modal-mobileNumber").value,
    emailId: document.getElementById("modal-emailId").value,
    chapterName: document.getElementById("modal-chapterName").value,
    businessName: document.getElementById("modal-businessName").value,
    businessCategory: document.getElementById("modal-businessCategory").value,
    businessDescription: document.getElementById("modal-businessDescription").value,
    productsServices: document.getElementById("modal-productsServices").value,
    businessAddress: document.getElementById("modal-businessAddress").value,
    city: document.getElementById("modal-city").value,
    district: document.getElementById("modal-district").value,
    state: document.getElementById("modal-state").value,
    pinCode: document.getElementById("modal-pinCode").value,
    businessMobileNumber: document.getElementById("modal-businessMobileNumber").value,
    whatsAppNumber: document.getElementById("modal-whatsAppNumber").value,
    website: document.getElementById("modal-website").value || "",
    googleMapsLocation: document.getElementById("modal-googleMapsLocation").value || "",
    businessLogo: logoData,
    ownerPhoto: ownerData,
    status: document.getElementById("modal-status").value
  };

  if (id) {
    await updateBusiness(id, data);
  } else {
    await addBusiness({ ...data, isFeatured: false });
  }

  closeModal();
  await renderAdminDashboard(document.getElementById("app"));
};

// ----------------------------------------
// EXPORT DATA TO EXCEL (CSV)
// ----------------------------------------
window.triggerExportToExcel = async function() {
  const businesses = await getApprovedBusinesses();
  if (businesses.length === 0) {
    alert("No approved businesses to export.");
    return;
  }

  const headers = [
    "Business ID", "Business Name", "Category", "Description", "Products & Services",
    "Owner Full Name", "Personal Mobile", "Owner Email", "Chapter Name", "Business Address",
    "City", "District", "State", "PIN Code", "Business Mobile", "WhatsApp Link Number",
    "Website", "Maps Location", "Featured Status", "Registration Date"
  ];

  const rows = businesses.map(b => [
    b.id,
    b.businessName,
    b.businessCategory,
    b.businessDescription,
    b.productsServices,
    b.fullName,
    b.mobileNumber,
    b.emailId,
    b.chapterName,
    b.businessAddress,
    b.city,
    b.district,
    b.state,
    b.pinCode,
    b.businessMobileNumber,
    b.whatsAppNumber,
    b.website,
    b.googleMapsLocation,
    b.isFeatured ? "Yes" : "No",
    b.registeredAt
  ]);

  let csvContent = "\ufeff"; // UTF-8 BOM
  csvContent += headers.map(h => `"${h.replace(/"/g, '""')}"`).join(",") + "\r\n";
  
  rows.forEach(r => {
    csvContent += r.map(field => {
      const cellVal = field ? String(field) : "";
      return `"${cellVal.replace(/"/g, '""')}"`;
    }).join(",") + "\r\n";
  });

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `zone_xiv_business_directory_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// ----------------------------------------
// BACKUP & RESTORE DATABASE (API-driven)
// ----------------------------------------
window.triggerDatabaseBackup = async function() {
  try {
    const res = await fetch("/api/admin/backup", { headers: getHeaders() });
    if (!res.ok) throw new Error("Failed to download database backup from server.");
    
    const db = await res.json();
    const jsonStr = JSON.stringify(db, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `zone_xiv_db_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err) {
    alert("Database backup failed: " + err.message);
  }
};

window.triggerDatabaseRestore = function(input) {
  const file = input.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async function(e) {
    try {
      const db = JSON.parse(e.target.result);
      
      const res = await fetch("/api/admin/restore", {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(db)
      });
      
      const result = await res.json();
      if (res.ok && result.success) {
        alert("Centralized database restored successfully!");
        await renderAdminDashboard(document.getElementById("app"));
      } else {
        alert("Database restore failed: " + result.message);
      }
    } catch (err) {
      alert("Error parsing backup JSON: " + err.message);
    }
  };
  reader.readAsText(file);
  input.value = "";
};

// ----------------------------------------
// LAYOUT & HEADER UPDATES
// ----------------------------------------
function updateHeaderAuthLinks() {
  const authContainer = document.getElementById("header-auth-controls");
  if (!authContainer) return;

  if (isAdminLoggedIn()) {
    authContainer.innerHTML = `
      <a href="#/admin/dashboard" class="btn-outline" style="padding:0.4rem 0.85rem; font-size:0.85rem;">Dashboard</a>
      <button onclick="triggerLogout()" class="btn-premium" style="padding:0.4rem 0.85rem; font-size:0.85rem; background:var(--color-danger); color:#ffffff; box-shadow:none;">Logout</button>
    `;
  } else {
    authContainer.innerHTML = `
      <a href="#/admin/login" class="btn-outline" style="padding:0.4rem 0.85rem; font-size:0.85rem;">Admin Login</a>
    `;
  }
}

window.triggerLogout = function() {
  if (confirm("Are you sure you want to log out of the admin console?")) {
    logoutAdmin();
    navigateTo("#/");
  }
};

// Listen to session modifications
window.addEventListener("authChanged", updateHeaderAuthLinks);
window.addEventListener("databaseChanged", async () => {
  const { route } = parseRoute();
  if (route === "adminDashboard") {
    await renderAdminDashboard(document.getElementById("app"));
  }
});
