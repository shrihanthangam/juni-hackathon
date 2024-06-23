const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 5000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Enable CORS for all origins
app.use(cors());

// Serve static files (if needed)
// app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to get data from data.json
app.get("/getData", (req, res) => {
  try {
    const filePath = path.join(__dirname, "data.json");
    const jsonData = JSON.parse(fs.readFileSync(filePath));
    res.status(200).json(jsonData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to retrieve data" });
  }
});

// Endpoint to update data.json
app.post("/updateData", (req, res) => {
  const newData = req.body; // Assuming JSON data is sent in the request body
  try {
    // Logic to update data in your JSON file or database
    // For example, if you are updating a JSON file
    const jsonString = JSON.stringify(newData);
    fs.writeFileSync("data.json", jsonString, "utf-8");
    res.status(200).json({ message: "Data updated successfully" });
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
