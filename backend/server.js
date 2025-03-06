const express = require("express");
const connectDB = require("./db");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB()
    .then(() => {
        console.log("✅ MongoDB connected successfully to Compass");
    })
    .catch((err) => {
        console.error("❌ MongoDB connection error:", err);
        process.exit(1);
    });

// Routes
const inventoryRoutes = require("./routes/inventory");
app.use("/api/inventory", inventoryRoutes);

// Error handling for unhandled rejections & exceptions
process.on("uncaughtException", (err) => {
    console.error("❌ Uncaught Exception:", err);
    process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
    console.error("❌ Unhandled Rejection at:", promise, "reason:", reason);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`)); // ✅ FIXED TEMPLATE LITERAL
