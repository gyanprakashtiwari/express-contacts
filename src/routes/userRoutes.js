const express = require("express");
const { userDetails } = require("../controllers/userController");
const { authenticate } = require("../middleware/authMiddleware"); // Middleware to validate token

const router = express.Router();

// Route to get user details
router.get("/details", authenticate, userDetails);

module.exports = router;
