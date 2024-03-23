// Import required modules
const express = require('express');
const { validateSignup, validateLogin } = require('../middleware/validation');
const { signup, login } = require('../controller/user');

// Create an instance of Express router
const router = express.Router();

// Define routes using the router
router.post('/signup', validateSignup, signup);
router.post('/login', validateLogin, login);

// Export the router
module.exports = router;
