const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true }, // Removed the `unique` constraint
  phone: { type: String, required: true },
  address: { type: String, required: true },
  country: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

// Add a unique index on the combination of `user` and `phone`
contactSchema.index({ user: 1, phone: 1 }, { unique: true });

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
