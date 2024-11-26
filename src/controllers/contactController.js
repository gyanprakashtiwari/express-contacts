const Contact = require("../models/contactModel");
const User = require("../models/userModel"); // Import User model

// Create a new contact
const createContact = async (req, res) => {
  const { name, email, phone, address, country } = req.body;

  // Basic validation
  if (!name || !email || !phone || !address || !country) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if user exists (to associate contact with a user)
    const user = await User.findById(req.userId); // Assuming userId is attached to req via JWT

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new contact and associate it with the user
    const contact = new Contact({
      name,
      email,
      phone,
      address,
      country,
      user: user._id,
    });
    await contact.save();

    res.status(201).json({
      message: "Contact created successfully",
      contact: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        address: contact.address,
        country: contact.country,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating contact", error });
  }
};

// Get all contacts for a user
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.userId }); // Find contacts for the logged-in user
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching contacts", error });
  }
};

// Get contact by ID for a specific user
const getContactById = async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await Contact.findOne({ _id: id, user: req.userId }); // Only fetch contacts for the logged-in user
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: "Error fetching contact", error });
  }
};

// Update a contact
const updateContact = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address, country } = req.body;

  try {
    const contact = await Contact.findOneAndUpdate(
      { _id: id, user: req.userId }, // Ensure contact belongs to the logged-in user
      { name, email, phone, address, country },
      { new: true } // Return updated document
    );
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({ message: "Contact updated successfully", contact });
  } catch (error) {
    res.status(500).json({ message: "Error updating contact", error });
  }
};

// Delete a contact
const deleteContact = async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await Contact.findOneAndDelete({
      _id: id,
      user: req.userId,
    }); // Ensure contact belongs to the logged-in user
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting contact", error });
  }
};

module.exports = {
  createContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact,
};
