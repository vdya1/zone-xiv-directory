// Centralized Node.js Express Server for Zone XIV Business Directory
const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

// Database File Path
const DB_DIR = path.join(__dirname, "data");
const DB_PATH = path.join(DB_DIR, "database.json");

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" })); // Increased limit to support base64 image uploads

// Serve static frontend files securely (exclude server.js, database.json, package.json)
app.use("/css", express.static(path.join(__dirname, "css")));
app.use("/js", express.static(path.join(__dirname, "js")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Seed data
const INITIAL_DATA = {
  categories: [
    "Information Technology",
    "Healthcare & Medical",
    "Construction & Real Estate",
    "Finance & Insurance",
    "Retail & E-commerce",
    "Education & Training",
    "Food & Hospitality",
    "Manufacturing & Logistics"
  ],
  chapters: [
    "Chapter Alpha",
    "Chapter Beta",
    "Chapter Gamma",
    "Chapter Delta"
  ],
  businesses: [
    {
      id: "ZX-1001",
      fullName: "John Doe",
      mobileNumber: "+1 (555) 019-2834",
      emailId: "john.doe@apextech.com",
      chapterName: "Chapter Alpha",
      businessName: "Apex Tech Solutions",
      businessCategory: "Information Technology",
      businessDescription: "Providing premium software engineering, cloud computing migrations, and enterprise-level IT security auditing services.",
      productsServices: "Cloud Infrastructure, Software Development, Cybersecurity Audits",
      businessAddress: "742 Evergreen Terrace",
      city: "New York",
      district: "Manhattan",
      state: "New York",
      pinCode: "10001",
      businessMobileNumber: "+1 (555) 019-2000",
      whatsAppNumber: "+15550192834",
      website: "https://example.com/apextech",
      googleMapsLocation: "https://maps.google.com/?q=New+York",
      businessLogo: "",
      ownerPhoto: "",
      status: "approved",
      isFeatured: true,
      registeredAt: "2026-06-15T10:30:00.000Z"
    },
    {
      id: "ZX-1002",
      fullName: "Dr. Sarah Jenkins",
      mobileNumber: "+1 (555) 021-9988",
      emailId: "contact@heartlandhealth.com",
      chapterName: "Chapter Beta",
      businessName: "Heartland Health Clinic",
      businessCategory: "Healthcare & Medical",
      businessDescription: "A comprehensive family health practice offering primary care, preventive medicine, and specialized cardiac screenings.",
      productsServices: "Primary Care, Cardiovascular Screening, Pediatric Care",
      businessAddress: "456 Oak Avenue",
      city: "London",
      district: "Greater London",
      state: "England",
      pinCode: "EC1A 1BB",
      businessMobileNumber: "+44 20 7946 0958",
      whatsAppNumber: "+442079460958",
      website: "https://example.com/heartland",
      googleMapsLocation: "https://maps.google.com/?q=London",
      businessLogo: "",
      ownerPhoto: "",
      status: "approved",
      isFeatured: true,
      registeredAt: "2026-06-20T14:45:00.000Z"
    },
    {
      id: "ZX-1003",
      fullName: "Rajesh Kumar",
      mobileNumber: "+91 98765 43210",
      emailId: "rajesh@kumarestates.in",
      chapterName: "Chapter Gamma",
      businessName: "Kumar Estates & Infrastructure",
      businessCategory: "Construction & Real Estate",
      businessDescription: "Designing and developing ultra-modern sustainable commercial developments and luxury residential apartments.",
      productsServices: "Commercial Construction, Interior Architecture, Real Estate Advisory",
      businessAddress: "12 Marine Drive",
      city: "Mumbai",
      district: "Mumbai City",
      state: "Maharashtra",
      pinCode: "400020",
      businessMobileNumber: "+91 22 2282 1111",
      whatsAppNumber: "+919876543210",
      website: "https://example.com/kumarestates",
      googleMapsLocation: "https://maps.google.com/?q=Mumbai",
      businessLogo: "",
      ownerPhoto: "",
      status: "approved",
      isFeatured: false,
      registeredAt: "2026-07-01T08:15:00.000Z"
    },
    {
      id: "ZX-1004",
      fullName: "Kenji Takahashi",
      mobileNumber: "+81 90 1234 5678",
      emailId: "takahashi@sakurafinance.co.jp",
      chapterName: "Chapter Delta",
      businessName: "Sakura Wealth Advisory",
      businessCategory: "Finance & Insurance",
      businessDescription: "Tailored asset management, retirement planning, and corporate insurance risk assessments for small to mid-sized businesses.",
      productsServices: "Corporate Financial Planning, Asset Allocation, Group Health Insurance",
      businessAddress: "1-2-1 Otemachi",
      city: "Tokyo",
      district: "Chiyoda-ku",
      state: "Tokyo",
      pinCode: "100-0004",
      businessMobileNumber: "+81 3 5555 1234",
      whatsAppNumber: "+819012345678",
      website: "https://example.com/sakurafinance",
      googleMapsLocation: "https://maps.google.com/?q=Tokyo",
      businessLogo: "",
      ownerPhoto: "",
      status: "approved",
      isFeatured: true,
      registeredAt: "2026-07-05T11:20:00.000Z"
    },
    {
      id: "ZX-1005",
      fullName: "Elena Rostova",
      mobileNumber: "+7 901 234 5678",
      emailId: "elena@siberiangems.com",
      chapterName: "Chapter Beta",
      businessName: "Siberian Gems & Jewelry",
      businessCategory: "Retail & E-commerce",
      businessDescription: "Exquisite hand-crafted jewelry featuring rare siberian minerals, ethically sourced diamonds, and custom platinum designs.",
      productsServices: "Custom Engagement Rings, Natural Gemstones, Jewelry Restorations",
      businessAddress: "Nevsky Prospekt 24",
      city: "St. Petersburg",
      district: "Central",
      state: "St. Petersburg",
      pinCode: "191186",
      businessMobileNumber: "+7 812 345 6789",
      whatsAppNumber: "+79012345678",
      website: "https://example.com/siberiangems",
      googleMapsLocation: "https://maps.google.com/?q=St+Petersburg",
      businessLogo: "",
      ownerPhoto: "",
      status: "approved",
      isFeatured: false,
      registeredAt: "2026-07-10T16:00:00.000Z"
    },
    {
      id: "ZX-1006",
      fullName: "Robert Vance",
      mobileNumber: "+1 (555) 043-9821",
      emailId: "bob@vancerefrigeration.com",
      chapterName: "Chapter Alpha",
      businessName: "Vance Refrigeration",
      businessCategory: "Manufacturing & Logistics",
      businessDescription: "Commercial and residential refrigerator sales, installation, preventative maintenance contracts, and HVAC repair services.",
      productsServices: "Commercial Coolers, Cold Storage Logistics, HVAC Repairs",
      businessAddress: "1725 Slough Avenue",
      city: "Scranton",
      district: "Lackawanna",
      state: "Pennsylvania",
      pinCode: "18505",
      businessMobileNumber: "+1 (555) 043-9000",
      whatsAppNumber: "+15550439821",
      website: "https://example.com/vance",
      googleMapsLocation: "https://maps.google.com/?q=Scranton",
      businessLogo: "",
      ownerPhoto: "",
      status: "pending",
      isFeatured: false,
      registeredAt: "2026-07-17T09:00:00.000Z"
    },
    {
      id: "ZX-1007",
      fullName: "Anita Sharma",
      mobileNumber: "+91 99887 76655",
      emailId: "anita@spicetrail.in",
      chapterName: "Chapter Gamma",
      businessName: "Spice Trail Fine Dining",
      businessCategory: "Food & Hospitality",
      businessDescription: "An upscale Indian culinary experience celebrating historical subcontinental recipes with a modern fusion twist.",
      productsServices: "Premium Catering, Fine Dining Table Bookings, Corporate Events",
      businessAddress: "45 Colaba Causeway",
      city: "Mumbai",
      district: "Mumbai City",
      state: "Maharashtra",
      pinCode: "400005",
      businessMobileNumber: "+91 22 2202 8888",
      whatsAppNumber: "+919988776655",
      website: "https://example.com/spicetrail",
      googleMapsLocation: "https://maps.google.com/?q=Colaba",
      businessLogo: "",
      ownerPhoto: "",
      status: "pending",
      isFeatured: false,
      registeredAt: "2026-07-18T15:30:00.000Z"
    }
  ]
};

// Database Initialization helper
async function initDatabase() {
  try {
    await fs.mkdir(DB_DIR, { recursive: true });
    try {
      await fs.access(DB_PATH);
    } catch {
      // Seeding database file
      await fs.writeFile(DB_PATH, JSON.stringify(INITIAL_DATA, null, 2), "utf8");
      console.log("Database file seeded successfully.");
    }
  } catch (err) {
    console.error("Database directory setup failed:", err);
  }
}

// Database helper functions
async function getDb() {
  const data = await fs.readFile(DB_PATH, "utf8");
  return JSON.parse(data);
}

async function saveDb(db) {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), "utf8");
}

// Route Guards (Admin verification middleware)
function verifyAdmin(req, res, next) {
  if (req.headers["x-admin-auth"] === "true") {
    next();
  } else {
    res.status(401).json({ success: false, message: "Unauthorized access: admin privileges required." });
  }
}

// ----------------------------------------
// API ENDPOINTS
// ----------------------------------------

// --- Auth ---
app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "Admin@123") {
    res.json({ success: true, token: "zx-admin-token-value" });
  } else {
    res.status(401).json({ success: false, message: "Invalid username or password" });
  }
});

// --- Businesses ---
// 1. Get approved businesses (Public)
app.get("/api/businesses", async (req, res) => {
  try {
    const db = await getDb();
    const approved = db.businesses.filter(b => b.status === "approved");
    res.json(approved);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2. Get all businesses (Admin only)
app.get("/api/businesses/all", verifyAdmin, async (req, res) => {
  try {
    const db = await getDb();
    res.json(db.businesses);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. Get single business profile (Public)
app.get("/api/businesses/:id", async (req, res) => {
  try {
    const db = await getDb();
    const business = db.businesses.find(b => b.id === req.params.id);
    if (business) {
      res.json(business);
    } else {
      res.status(404).json({ success: false, message: "Business not found" });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4. Register new business (Public)
app.post("/api/businesses", async (req, res) => {
  try {
    const db = await getDb();
    
    // Generate ID
    const ids = db.businesses.map(b => parseInt(b.id.replace("ZX-", "")));
    const maxId = ids.length > 0 ? Math.max(...ids) : 1000;
    const newId = `ZX-${maxId + 1}`;

    const newBusiness = {
      ...req.body,
      id: newId,
      status: req.body.status || "pending", // default is pending
      isFeatured: req.body.isFeatured || false,
      registeredAt: new Date().toISOString()
    };

    db.businesses.push(newBusiness);
    await saveDb(db);
    res.status(201).json(newBusiness);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 5. Update business details (Admin only)
app.put("/api/businesses/:id", verifyAdmin, async (req, res) => {
  try {
    const db = await getDb();
    const index = db.businesses.findIndex(b => b.id === req.params.id);
    
    if (index !== -1) {
      db.businesses[index] = { ...db.businesses[index], ...req.body };
      await saveDb(db);
      res.json({ success: true, business: db.businesses[index] });
    } else {
      res.status(404).json({ success: false, message: "Business listing not found" });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 6. Delete business listing (Admin only)
app.delete("/api/businesses/:id", verifyAdmin, async (req, res) => {
  try {
    const db = await getDb();
    const index = db.businesses.findIndex(b => b.id === req.params.id);

    if (index !== -1) {
      db.businesses.splice(index, 1);
      await saveDb(db);
      res.json({ success: true, message: "Business deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: "Business listing not found" });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// --- Categories ---
app.get("/api/categories", async (req, res) => {
  try {
    const db = await getDb();
    res.json(db.categories);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post("/api/categories", verifyAdmin, async (req, res) => {
  try {
    const db = await getDb();
    const name = req.body.name.trim();
    if (name && !db.categories.includes(name)) {
      db.categories.push(name);
      await saveDb(db);
      res.json({ success: true, categories: db.categories });
    } else {
      res.status(400).json({ success: false, message: "Category exists or invalid name" });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.put("/api/categories", verifyAdmin, async (req, res) => {
  try {
    const db = await getDb();
    const { oldName, newName } = req.body;
    const cleanNew = newName.trim();
    const index = db.categories.indexOf(oldName);
    
    if (index !== -1 && cleanNew && !db.categories.includes(cleanNew)) {
      db.categories[index] = cleanNew;
      // Update businesses using category
      db.businesses.forEach(b => {
        if (b.businessCategory === oldName) b.businessCategory = cleanNew;
      });
      await saveDb(db);
      res.json({ success: true, categories: db.categories });
    } else {
      res.status(400).json({ success: false, message: "Invalid modification request" });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete("/api/categories/:name", verifyAdmin, async (req, res) => {
  try {
    const db = await getDb();
    const index = db.categories.indexOf(req.params.name);
    if (index !== -1) {
      db.categories.splice(index, 1);
      // Remove references
      db.businesses.forEach(b => {
        if (b.businessCategory === req.params.name) b.businessCategory = "";
      });
      await saveDb(db);
      res.json({ success: true, categories: db.categories });
    } else {
      res.status(404).json({ success: false, message: "Category not found" });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// --- Chapters ---
app.get("/api/chapters", async (req, res) => {
  try {
    const db = await getDb();
    res.json(db.chapters);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post("/api/chapters", verifyAdmin, async (req, res) => {
  try {
    const db = await getDb();
    const name = req.body.name.trim();
    if (name && !db.chapters.includes(name)) {
      db.chapters.push(name);
      await saveDb(db);
      res.json({ success: true, chapters: db.chapters });
    } else {
      res.status(400).json({ success: false, message: "Chapter exists or invalid name" });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.put("/api/chapters", verifyAdmin, async (req, res) => {
  try {
    const db = await getDb();
    const { oldName, newName } = req.body;
    const cleanNew = newName.trim();
    const index = db.chapters.indexOf(oldName);
    
    if (index !== -1 && cleanNew && !db.chapters.includes(cleanNew)) {
      db.chapters[index] = cleanNew;
      db.businesses.forEach(b => {
        if (b.chapterName === oldName) b.chapterName = cleanNew;
      });
      await saveDb(db);
      res.json({ success: true, chapters: db.chapters });
    } else {
      res.status(400).json({ success: false, message: "Invalid modification request" });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete("/api/chapters/:name", verifyAdmin, async (req, res) => {
  try {
    const db = await getDb();
    const index = db.chapters.indexOf(req.params.name);
    if (index !== -1) {
      db.chapters.splice(index, 1);
      db.businesses.forEach(b => {
        if (b.chapterName === req.params.name) b.chapterName = "";
      });
      await saveDb(db);
      res.json({ success: true, chapters: db.chapters });
    } else {
      res.status(404).json({ success: false, message: "Chapter not found" });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// --- Backup & Restore ---
app.get("/api/admin/backup", verifyAdmin, async (req, res) => {
  try {
    const db = await getDb();
    res.json(db);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post("/api/admin/restore", verifyAdmin, async (req, res) => {
  try {
    const db = req.body;
    // Basic verification
    if (db && Array.isArray(db.businesses) && Array.isArray(db.categories) && Array.isArray(db.chapters)) {
      await saveDb(db);
      res.json({ success: true, message: "Database restored successfully" });
    } else {
      res.status(400).json({ success: false, message: "Invalid backup database format" });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Start Server & Initialize Database
initDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`=================================================`);
    console.log(`Zone XIV Server running at: http://localhost:${PORT}`);
    console.log(`=================================================`);
  });
});
