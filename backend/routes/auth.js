const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();


router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

   
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

   
    user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


const router = express.Router();

// Login Route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Wrong password" });

        // Redirect to homepage
        res.json({ message: "Login successful", redirect: "/home" });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;