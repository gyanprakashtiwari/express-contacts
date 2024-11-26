const express = require('express');
const router = express.Router();
const { signupUser } = require('../controllers/userController');

// Signup Route
router.post('/signup', signupUser);

module.exports = router;
