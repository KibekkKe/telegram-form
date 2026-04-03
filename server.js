const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// OPEN WEBSITE
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// RECEIVE FORM DATA
app.post("/submit", (req, res) => {
  console.log("New Customer Data:");
  console.log(req.body);

  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
