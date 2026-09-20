const express = require('express');
const { register, login } = require('../Controllers/authController');

const router = express.Router();

// Public routes - no JWT required.
router.post('/register', register);
router.post('/login', login);

module.exports = router;
