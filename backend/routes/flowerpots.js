const express = require("express");
const fs = require("fs");
const router = express.Router();

// Simulate a moisture reading from Blynk
const getMockMoisture = () => Math.floor(Math.random() * 101); // 0 to 100%

router.get("/", (req, res) => {
  const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
  res.json(data);
});

router.post("/", (req, res) => {
  const { name, image, pot_id } = req.body;

  // Simulate checking if pot exists in Blynk and fetching moisture
  const moisture = getMockMoisture(); // Mocked Blynk data

  const newPot = { name, image, pot_id, moisture };

  // Read → update → save to JSON
  const flowerpots = JSON.parse(fs.readFileSync("data.json", "utf-8"));
  flowerpots.push(newPot);
  fs.writeFileSync("data.json", JSON.stringify(flowerpots, null, 2));

  res.status(201).json(newPot);
});

module.exports = router;
