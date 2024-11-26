const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Hash password
const hashPassword = async (password) => {
  //   console.log("Password to be hashed:", password);
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// Validate password
const validatePassword = async (password, hashedPassword) => {
  //   console.log("Password to validate:", password);
  //   console.log("Hashed Password from DB:", hashedPassword);
  const isValid = await bcrypt.compare(password, hashedPassword);
  //   console.log("Validation Result:", isValid);
  return isValid;
};

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET, // Secret key from .env
    { expiresIn: "1h" } // Token expires in 1 hour
  );
};

module.exports = { hashPassword, validatePassword, generateToken };
