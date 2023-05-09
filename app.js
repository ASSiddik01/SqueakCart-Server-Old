const express = require("express");
const app = express();
const cors = require("cors");
let bodyParser = require("body-parser");
const dataRoute = require("./routes/data.route");
const userRoute = require("./routes/user.route");

// Middleware
app.use(express.json());
app.use(cors());

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Testing API
app.get("/", (req, res) => {
  res.send(`==== Your app is running successfully ====`);
});

// Route
app.use("/api/v1/data", dataRoute);
app.use("/api/v1/user", userRoute);

// Unknown API Handle
app.all("*", (req, res) => {
  res.send(`==== Requested Route Not Found ====`);
});

module.exports = app;
