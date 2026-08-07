const express = require("express");
const Lead = require("../models/Lead");

const router = express.Router();

// ===============================
// Create Lead
// ===============================
router.post("/", async (req, res) => {
  try {
    const lead = new Lead(req.body);
    await lead.save();

    res.status(201).json({
      message: "Lead Added Successfully",
      lead,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ===============================
// Get All Leads
// ===============================
router.get("/", async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ===============================
// Update Lead Status
// ===============================
router.put("/:id", async (req, res) => {
  try {
    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      {
        new: true,
      }
    );

    res.json(updatedLead);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ===============================
// Delete Lead
// ===============================
router.delete("/:id", async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);

    res.json({
      message: "Lead Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;