const User = require("../models/userModel");
const {
  hashPassword,
  generateToken,
  validatePassword,
} = require("../utils/authHelper");

// Signup Controller
const signupUser = async (req, res) => {
  const { name, email, password, address = "" } = req.body;

  // Basic validation
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Name, email, and password are required" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create a new user
    const user = new User({ name, email, password: hashedPassword, address });
    await user.save();

    // Generate a token
    const token = generateToken(user);

    res.status(201).json({
      message: "Signup successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        address: user.address, // Include address in the response
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error signing up user", error });
  }
};

// Login Controller
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isValidPassword = await validatePassword(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user);

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in user" });
  }
};

// Fetch user details
const userDetails = async (req, res) => {
  try {
    // Fetch user based on `req.userId` set by the middleware
    const user = await User.findById(req.userId).select("-password"); // Exclude the password field
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User details fetched successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user details", error });
  }
};

module.exports = { signupUser, loginUser, userDetails };
