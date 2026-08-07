require("dns").setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const leadRoutes = require("./routes/leadRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/api/leads", leadRoutes);
app.use("/api/auth", authRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.log("❌ MongoDB Connection Error:", err);
  });

// Test Route
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>LeadDesk Mini API</title>
      <style>
        body{
          margin:0;
          font-family:Arial,sans-serif;
          background:linear-gradient(135deg,#2563eb,#7c3aed);
          display:flex;
          justify-content:center;
          align-items:center;
          height:100vh;
          color:white;
        }

        .card{
          background:rgba(255,255,255,.12);
          backdrop-filter:blur(10px);
          padding:40px;
          border-radius:18px;
          width:550px;
          text-align:center;
          box-shadow:0 10px 30px rgba(0,0,0,.3);
        }

        h1{
          font-size:38px;
        }

        .status{
          margin:25px auto;
          padding:10px 18px;
          background:#22c55e;
          width:max-content;
          border-radius:30px;
          font-weight:bold;
        }

        a{
          display:block;
          margin:12px;
          color:white;
          text-decoration:none;
          font-size:18px;
        }

        a:hover{
          text-decoration:underline;
        }

        footer{
          margin-top:25px;
          font-size:14px;
        }
      </style>
    </head>

    <body>

      <div class="card">

        <h1>🚀 LeadDesk Mini API</h1>

        <p>Backend Server is running successfully.</p>

        <div class="status">
          ✅ Server Status : ONLINE
        </div>

        <a href="/api/leads">
          📋 View All Leads
        </a>

        <footer>
          Developed by <b>Sonu Kumari</b> ❤️
        </footer>

      </div>

    </body>

    </html>
  `);
});

const PORT = process.env.PORT || 5000;
app.get("/api/setup-admin", async (req, res) => {
  try {
    const bcrypt = require("bcryptjs");
    const Admin = require("./models/Admin");

    const existingAdmin = await Admin.findOne({
      email: "admin@gmail.com",
    });

    if (existingAdmin) {
      return res.json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    await Admin.create({
      email: "admin@gmail.com",
      password: hashedPassword,
    });

    res.json({ message: "Admin created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create admin" });
  }
});
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});