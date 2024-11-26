const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");
const logger = require("./middleware/logger");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(logger);

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/contacts", contactRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

module.exports = app;
