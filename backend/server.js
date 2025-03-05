const express = require("express");
const connectDB = require("./db");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());  
app.use(cors());         

connectDB();
app.get("/", (req, res) => {
    res.send("Server is running!");
});
const inventoryRoutes = require("./routes/inventory");
app.use("/api/inventory", inventoryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
