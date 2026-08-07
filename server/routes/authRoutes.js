const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const router = express.Router();

// Admin Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({
        message: "Invalid Email",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      message: "Login Successful",
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});
// Register Admin (Use Only Once)
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const adminExists = await Admin.findOne({ email });

    if (adminExists) {
      return res.status(400).json({
        message: "Admin already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({
      email,
      password: hashedPassword,
    });

    await admin.save();

    res.status(201).json({
      message: "Admin Registered Successfully",
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});
module.exports = router;