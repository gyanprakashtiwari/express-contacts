const express = require("express");
const {
  createContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
const { authenticate } = require("../middleware/authMiddleware"); // Assuming you have an authenticate middleware

const router = express.Router();

// Protect the routes with authentication
router.use(authenticate); // This will ensure user is authenticated before accessing these routes

// Create a new contact
router.post("/", createContact);

// Get all contacts for the authenticated user
router.get("/", getContacts);

// Get contact by ID for the authenticated user
router.get("/:id", getContactById);

// Update a contact by ID for the authenticated user
router.put("/:id", updateContact);

// Delete a contact by ID for the authenticated user
router.delete("/:id", deleteContact);

module.exports = router;
