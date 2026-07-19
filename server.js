// Centralized Node.js Express Server for Zone XIV Business Directory (MongoDB Edition)
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" })); // Support base64 image uploads

// Serve static frontend files securely
app.use("/css", express.static(path.join(__dirname, "css")));
app.use("/js", express.static(path.join(__dirname, "js")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Seed data definition
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

// ----------------------------------------
// MONGOOSE SCHEMAS & MODELS
// ----------------------------------------
const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }
});
const Category = mongoose.model("Category", CategorySchema);

const ChapterSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }
});
const Chapter = mongoose.model("Chapter", ChapterSchema);

const BusinessSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  emailId: { type: String, required: true },
  chapterName: { type: String, required: true },
  businessName: { type: String, required: true },
  businessCategory: { type: String, required: true },
  businessDescription: { type: String, required: true },
  productsServices: { type: String, required: true },
  businessAddress: { type: String, required: true },
  city: { type: String, required: true },
  district: { type: String, required: true },
  state: { type: String, required: true },
  pinCode: { type: String, required: true },
  businessMobileNumber: { type: String, required: true },
  whatsAppNumber: { type: String, required: true },
  website: { type: String, default: "" },
  googleMapsLocation: { type: String, default: "" },
  businessLogo: { type: String, default: "" },
  ownerPhoto: { type: String, default: "" },
  status: { type: String, enum: ["approved", "pending"], default: "pending" },
  isFeatured: { type: Boolean, default: false },
  registeredAt: { type: Date, default: Date.now }
});
const Business = mongoose.model("Business", BusinessSchema);

// Database Seeding Logic
async function seedDatabase() {
  try {
    const businessCount = await Business.countDocuments();
    if (businessCount === 0) {
      console.log("Database is empty. Initiating seeding...");

      // Seed Categories
      for (const name of INITIAL_DATA.categories) {
        await Category.findOneAndUpdate({ name }, { name }, { upsert: true });
      }

      // Seed Chapters
      for (const name of INITIAL_DATA.chapters) {
        await Chapter.findOneAndUpdate({ name }, { name }, { upsert: true });
      }

      // Seed Businesses
      for (const b of INITIAL_DATA.businesses) {
        await Business.create(b);
      }

      console.log("Database seeded successfully with starter entries.");
    }
  } catch (err) {
    console.error("Database seeding failed:", err);
  }
}

// Connect to MongoDB (with local fallback for local development)
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/zone_xiv_db";
console.log("Connecting to MongoDB...");

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB successfully.");
    seedDatabase();
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
  });

// Admin Route Verification Middleware
function verifyAdmin(req, res, next) {
  if (req.headers["x-admin-auth"] === "true") {
    next();
  } else {
    res.status(401).json({ success: false, message: "Unauthorized access: admin privileges required." });
  }
}

// ----------------------------------------
// API ENDPOINTS (MONGODB BACKED)
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
    const approved = await Business.find({ status: "approved" }).sort({ registeredAt: -1 });
    res.json(approved);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2. Get all businesses (Admin only)
app.get("/api/businesses/all", verifyAdmin, async (req, res) => {
  try {
    const businesses = await Business.find().sort({ registeredAt: -1 });
    res.json(businesses);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. Get single business profile (Public)
app.get("/api/businesses/:id", async (req, res) => {
  try {
    const business = await Business.findOne({ id: req.params.id });
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
    // Generate unique numerical ZX ID based on maximum numeric ID in DB
    const allBusinesses = await Business.find({}, { id: 1 });
    const ids = allBusinesses.map(b => parseInt(b.id.replace("ZX-", "")));
    const maxId = ids.length > 0 ? Math.max(...ids) : 1000;
    const newId = `ZX-${maxId + 1}`;

    const newBusiness = new Business({
      ...req.body,
      id: newId,
      status: req.body.status || "pending",
      isFeatured: req.body.isFeatured || false,
      registeredAt: new Date()
    });

    await newBusiness.save();
    res.status(201).json(newBusiness);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 5. Update business details (Admin only)
app.put("/api/businesses/:id", verifyAdmin, async (req, res) => {
  try {
    const result = await Business.findOneAndUpdate(
      { id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    
    if (result) {
      res.json({ success: true, business: result });
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
    const result = await Business.findOneAndDelete({ id: req.params.id });
    if (result) {
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
    const cats = await Category.find().sort({ name: 1 });
    res.json(cats.map(c => c.name));
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post("/api/categories", verifyAdmin, async (req, res) => {
  try {
    const name = req.body.name.trim();
    if (!name) return res.status(400).json({ success: false, message: "Invalid category name" });

    const existing = await Category.findOne({ name });
    if (existing) return res.status(400).json({ success: false, message: "Category already exists" });

    await Category.create({ name });
    const allCats = await Category.find().sort({ name: 1 });
    res.json({ success: true, categories: allCats.map(c => c.name) });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.put("/api/categories", verifyAdmin, async (req, res) => {
  try {
    const { oldName, newName } = req.body;
    const cleanNew = newName.trim();
    
    const existing = await Category.findOne({ name: cleanNew });
    if (existing) return res.status(400).json({ success: false, message: "Category name already exists" });

    const result = await Category.findOneAndUpdate({ name: oldName }, { name: cleanNew });
    if (result) {
      // Cascade update to all businesses using this category
      await Business.updateMany({ businessCategory: oldName }, { businessCategory: cleanNew });
      const allCats = await Category.find().sort({ name: 1 });
      res.json({ success: true, categories: allCats.map(c => c.name) });
    } else {
      res.status(404).json({ success: false, message: "Category not found" });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete("/api/categories/:name", verifyAdmin, async (req, res) => {
  try {
    const result = await Category.findOneAndDelete({ name: req.params.name });
    if (result) {
      // Unset category in affected businesses
      await Business.updateMany({ businessCategory: req.params.name }, { businessCategory: "" });
      const allCats = await Category.find().sort({ name: 1 });
      res.json({ success: true, categories: allCats.map(c => c.name) });
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
    const chaps = await Chapter.find().sort({ name: 1 });
    res.json(chaps.map(c => c.name));
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post("/api/chapters", verifyAdmin, async (req, res) => {
  try {
    const name = req.body.name.trim();
    if (!name) return res.status(400).json({ success: false, message: "Invalid chapter name" });

    const existing = await Chapter.findOne({ name });
    if (existing) return res.status(400).json({ success: false, message: "Chapter already exists" });

    await Chapter.create({ name });
    const allChaps = await Chapter.find().sort({ name: 1 });
    res.json({ success: true, chapters: allChaps.map(c => c.name) });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.put("/api/chapters", verifyAdmin, async (req, res) => {
  try {
    const { oldName, newName } = req.body;
    const cleanNew = newName.trim();

    const existing = await Chapter.findOne({ name: cleanNew });
    if (existing) return res.status(400).json({ success: false, message: "Chapter name already exists" });

    const result = await Chapter.findOneAndUpdate({ name: oldName }, { name: cleanNew });
    if (result) {
      await Business.updateMany({ chapterName: oldName }, { chapterName: cleanNew });
      const allChaps = await Chapter.find().sort({ name: 1 });
      res.json({ success: true, chapters: allChaps.map(c => c.name) });
    } else {
      res.status(404).json({ success: false, message: "Chapter not found" });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete("/api/chapters/:name", verifyAdmin, async (req, res) => {
  try {
    const result = await Chapter.findOneAndDelete({ name: req.params.name });
    if (result) {
      await Business.updateMany({ chapterName: req.params.name }, { chapterName: "" });
      const allChaps = await Chapter.find().sort({ name: 1 });
      res.json({ success: true, chapters: allChaps.map(c => c.name) });
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
    const [businesses, categories, chapters] = await Promise.all([
      Business.find(),
      Category.find().sort({ name: 1 }),
      Chapter.find().sort({ name: 1 })
    ]);
    
    res.json({
      businesses,
      categories: categories.map(c => c.name),
      chapters: chapters.map(c => c.name)
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post("/api/admin/restore", verifyAdmin, async (req, res) => {
  try {
    const { businesses, categories, chapters } = req.body;

    if (Array.isArray(businesses) && Array.isArray(categories) && Array.isArray(chapters)) {
      // Clear current data completely
      await Promise.all([
        Business.deleteMany({}),
        Category.deleteMany({}),
        Chapter.deleteMany({})
      ]);

      // Re-insert Restore elements
      if (categories.length > 0) {
        await Category.insertMany(categories.map(name => ({ name })));
      }
      if (chapters.length > 0) {
        await Chapter.insertMany(chapters.map(name => ({ name })));
      }
      if (businesses.length > 0) {
        await Business.insertMany(businesses);
      }

      res.json({ success: true, message: "Database restored successfully" });
    } else {
      res.status(400).json({ success: false, message: "Invalid backup database format payload" });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Start Server listening
app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`Zone XIV MongoDB-Backend running at port: ${PORT}`);
  console.log(`=================================================`);
});
