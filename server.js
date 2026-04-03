04.03 10:02 PM
server.js
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const TOKEN = "8499244190:AAHJlWnnZz3MTLRk3K6t4Kr-_AYhOsb-yZ8";
const CHAT_ID = "7071374060";

app.get("/", (req, res) => {
  res.send(`
    <h2>Customer Form</h2>
    <form method="POST" action="/send">
      Name:<br><input name="name"/><br>
      Phone:<br><input name="phone"/><br>
      ID:<br><input name="id"/><br><br>
      <button type="submit">Submit</button>
    </form>
  `);
});

app.post("/send", async (req, res) => {
  const { name, phone, id } = req.body;

  const message = `
NEW CUSTOMER
Name: ${name}
Phone: ${phone}
ID: ${id}
`;

  await axios.post(
    `https://api.telegram.org/bot${TOKEN}/sendMessage`,
    {
      chat_id: CHAT_ID,
      text: message,
    }
  );

  res.send("Submitted successfully!");
});

app.listen(3000, () => console.log("Server running"));
