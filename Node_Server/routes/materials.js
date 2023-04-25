const express = require("express");
const router = express.Router();
const Material = require("../Model/material");
const app = express();

// POST new material
app.post("/materials", async (req, res) => {
  try {
    const material = new Material({
      name: req.body.name,
      cost: req.body.cost,
      color: req.body.color,
      volume: req.body.volume,
      date: req.body.date,
    });
    await material.save();
    res.status(201).json(material);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET all materials
app.get("/materials", async (req, res) => {
  try {
    const materials = await Material.find();
    res.json(materials);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET material by ID
app.get("/materials/:id", async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);
    if (!material) {
      res.status(404).json({ error: "Material not found" });
    } else {
      res.json(material);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE request to delete a material by ID
app.delete("/materials/:id", async (req, res) => {
  try {
    const material = await Material.findByIdAndDelete(req.params.id);
    if (!material) {
      return res.status(404).json({ error: "Material not found" });
    }
    res.json({ message: "Material deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// PUT request to update a material by ID
app.put("/materials/:id", async (req, res) => {
  try {
    // const { name, price, color } = req.body;
    const material = await Material.findByIdAndUpdate(req.params.id,  req.body, {
      new: true,
    });
    if (!material) {
      return res.status(404).json({ error: "Material not found" });
    }
    return res.json(material);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = app;
