// Server-side Authentication bridge for Zone XIV Business Directory

function isAdminLoggedIn() {
  return sessionStorage.getItem("zx_admin_logged_in") === "true";
}

async function loginAdmin(username, password) {
  try {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username.trim().toLowerCase(),
        password: password
      })
    });
    
    const result = await res.json();
    
    if (res.ok && result.success) {
      sessionStorage.setItem("zx_admin_logged_in", "true");
      sessionStorage.setItem("zx_admin_user", username.trim());
      // Dispatch an event to update header and navigation
      window.dispatchEvent(new Event("authChanged"));
      return { success: true };
    } else {
      return { success: false, message: result.message || "Invalid username or password" };
    }
  } catch (err) {
    console.error("Login verification error:", err);
    return { success: false, message: "Network connection to server failed." };
  }
}

function logoutAdmin() {
  sessionStorage.removeItem("zx_admin_logged_in");
  sessionStorage.removeItem("zx_admin_user");
  window.dispatchEvent(new Event("authChanged"));
}

function getLoggedInAdmin() {
  return sessionStorage.getItem("zx_admin_user") || null;
}
