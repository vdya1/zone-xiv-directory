// API Database Bridge for Zone XIV Business Directory
const API_BASE = ""; // Relative endpoints because frontend is served by Node.js statically

// Helper to inject admin auth header dynamically if admin is authenticated
function getHeaders() {
  const headers = {
    "Content-Type": "application/json"
  };
  if (typeof isAdminLoggedIn === "function" && isAdminLoggedIn()) {
    headers["x-admin-auth"] = "true";
  }
  return headers;
}

// Database Initialization (Handled by the server now, this is a placeholder to prevent client errors)
function initDatabase() {
  console.log("Database initialized on Node.js Server.");
}

// CRUD Operations calling Express API

// --- Businesses ---
async function getBusinesses() {
  try {
    const res = await fetch(`${API_BASE}/api/businesses/all`, { headers: getHeaders() });
    if (!res.ok) throw new Error("Failed to fetch all businesses");
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function getApprovedBusinesses() {
  try {
    const res = await fetch(`${API_BASE}/api/businesses`);
    if (!res.ok) throw new Error("Failed to fetch approved businesses");
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function getPendingBusinesses() {
  try {
    const all = await getBusinesses();
    return all.filter(b => b.status === "pending");
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function getBusinessById(id) {
  try {
    const res = await fetch(`${API_BASE}/api/businesses/${id}`);
    if (res.status === 404) return null;
    if (!res.ok) throw new Error("Failed to fetch business details");
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function addBusiness(businessData) {
  try {
    const res = await fetch(`${API_BASE}/api/businesses`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(businessData)
    });
    if (!res.ok) throw new Error("Failed to register business");
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function updateBusiness(id, updatedData) {
  try {
    const res = await fetch(`${API_BASE}/api/businesses/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(updatedData)
    });
    if (!res.ok) throw new Error("Failed to update business");
    const result = await res.json();
    
    // Dispatch custom event to notify listeners
    window.dispatchEvent(new Event("databaseChanged"));
    return result.success;
  } catch (err) {
    console.error(err);
    return false;
  }
}

async function deleteBusiness(id) {
  try {
    const res = await fetch(`${API_BASE}/api/businesses/${id}`, {
      method: "DELETE",
      headers: getHeaders()
    });
    if (!res.ok) throw new Error("Failed to delete business");
    const result = await res.json();
    
    window.dispatchEvent(new Event("databaseChanged"));
    return result.success;
  } catch (err) {
    console.error(err);
    return false;
  }
}

async function approveBusiness(id) {
  return await updateBusiness(id, { status: "approved" });
}

// --- Categories ---
async function getCategories() {
  try {
    const res = await fetch(`${API_BASE}/api/categories`);
    if (!res.ok) throw new Error("Failed to fetch categories");
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function addCategory(categoryName) {
  try {
    const res = await fetch(`${API_BASE}/api/categories`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ name: categoryName })
    });
    if (!res.ok) throw new Error("Failed to add category");
    window.dispatchEvent(new Event("databaseChanged"));
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

async function updateCategory(oldName, newName) {
  try {
    const res = await fetch(`${API_BASE}/api/categories`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify({ oldName, newName })
    });
    if (!res.ok) throw new Error("Failed to update category");
    window.dispatchEvent(new Event("databaseChanged"));
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

async function deleteCategory(categoryName) {
  try {
    const res = await fetch(`${API_BASE}/api/categories/${encodeURIComponent(categoryName)}`, {
      method: "DELETE",
      headers: getHeaders()
    });
    if (!res.ok) throw new Error("Failed to delete category");
    window.dispatchEvent(new Event("databaseChanged"));
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

// --- Chapters ---
async function getChapters() {
  try {
    const res = await fetch(`${API_BASE}/api/chapters`);
    if (!res.ok) throw new Error("Failed to fetch chapters");
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function addChapter(chapterName) {
  try {
    const res = await fetch(`${API_BASE}/api/chapters`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ name: chapterName })
    });
    if (!res.ok) throw new Error("Failed to add chapter");
    window.dispatchEvent(new Event("databaseChanged"));
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

async function updateChapter(oldName, newName) {
  try {
    const res = await fetch(`${API_BASE}/api/chapters`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify({ oldName, newName })
    });
    if (!res.ok) throw new Error("Failed to update chapter");
    window.dispatchEvent(new Event("databaseChanged"));
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

async function deleteChapter(chapterName) {
  try {
    const res = await fetch(`${API_BASE}/api/chapters/${encodeURIComponent(chapterName)}`, {
      method: "DELETE",
      headers: getHeaders()
    });
    if (!res.ok) throw new Error("Failed to delete chapter");
    window.dispatchEvent(new Event("databaseChanged"));
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

// --- Dynamic Initials SVG Helpers ---
function getInitialsSVG(name, type = "business") {
  const initials = name
    ? name
        .split(" ")
        .map(word => word[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "ZX";
  
  const colors = {
    business: ["#4f46e5", "#818cf8"],
    owner: ["#0d9488", "#2dd4bf"]
  };
  
  const selectedColor = colors[type] || colors.business;
  const safeName = name ? name.replace(/[^a-zA-Z0-9]/g, "") : "zx";
  const id = `grad-${safeName}-${type}`;
  
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="initials-svg">
      <defs>
        <linearGradient id="${id}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${selectedColor[0]}" />
          <stop offset="100%" stop-color="${selectedColor[1]}" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="50" fill="url(#${id})" />
      <text x="50" y="55" font-family="'Outfit', 'Inter', sans-serif" font-size="36" font-weight="bold" fill="#ffffff" dominant-baseline="middle" text-anchor="middle">
        ${initials}
      </text>
    </svg>
  `;
}
