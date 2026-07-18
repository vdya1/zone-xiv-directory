// Hash-based Router for Zone XIV Business Directory
const routes = {
  home: { title: "Zone XIV | Home", meta: "Welcome to Zone XIV Business Directory. Explore featured businesses, statistics, and chapters." },
  directory: { title: "Zone XIV | Directory", meta: "Search and filter businesses in Zone XIV directory by name, category, chapter, or city." },
  business: { title: "Zone XIV | Business Profile", meta: "View contact information, owner details, location, and services of this Zone XIV member." },
  register: { title: "Zone XIV | Business Registration", meta: "Register your business in the Zone XIV Business Directory." },
  adminLogin: { title: "Zone XIV | Admin Login", meta: "Secure administrator login for Zone XIV Directory management." },
  adminDashboard: { title: "Zone XIV | Admin Dashboard", meta: "Admin panel to manage businesses, categories, chapters, and approvals." },
  contact: { title: "Zone XIV | Contact Us", meta: "Get in touch with Zone XIV Business Directory administrators." }
};

function parseRoute() {
  const hash = window.location.hash || "#/";
  const path = hash.slice(1); // Remove '#'
  const parts = path.split("/").filter(Boolean); // Split and remove empty segments

  // Route matches
  if (parts.length === 0) {
    return { route: "home", params: {} };
  }
  
  const root = parts[0];
  
  if (root === "directory") {
    return { route: "directory", params: {} };
  }
  
  if (root === "business" && parts[1]) {
    return { route: "business", params: { id: parts[1] } };
  }
  
  if (root === "register") {
    return { route: "register", params: {} };
  }
  
  if (root === "contact") {
    return { route: "contact", params: {} };
  }
  
  if (root === "admin") {
    if (parts[1] === "login") {
      return { route: "adminLogin", params: {} };
    }
    if (parts[1] === "dashboard") {
      return { route: "adminDashboard", params: {} };
    }
  }
  
  // Default fallback to home
  return { route: "home", params: {} };
}

// Router dispatch function
function navigateTo(hash) {
  window.location.hash = hash;
}

function handleRoute() {
  const { route, params } = parseRoute();
  
  // SEO Updates
  const routeConfig = routes[route] || routes.home;
  document.title = routeConfig.title;
  
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement("meta");
    metaDesc.name = "description";
    document.head.appendChild(metaDesc);
  }
  metaDesc.content = routeConfig.meta;

  // Security Route Guard
  if (route === "adminDashboard" && !isAdminLoggedIn()) {
    navigateTo("#/admin/login");
    return;
  }
  
  // If user goes to admin login and is already logged in, redirect to dashboard
  if (route === "adminLogin" && isAdminLoggedIn()) {
    navigateTo("#/admin/dashboard");
    return;
  }

  // Trigger main app render for this route
  if (typeof renderView === "function") {
    renderView(route, params);
  }
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });
  
  // Update active links in navigation
  updateActiveNavLinks(route);
}

function updateActiveNavLinks(currentRoute) {
  document.querySelectorAll("header nav a").forEach(link => {
    const href = link.getAttribute("href");
    if (!href) return;
    
    const isHome = currentRoute === "home" && (href === "#/" || href === "#");
    const matches = href === `#/${currentRoute}` || 
                    (currentRoute.startsWith("admin") && href.includes("#/admin"));
                    
    if (isHome || matches) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// Set up listeners
window.addEventListener("hashchange", handleRoute);
window.addEventListener("DOMContentLoaded", () => {
  initDatabase();
  handleRoute();
});
