const express = require('express');
const router = express.Router();
const passport = require('passport');

const UserController = require('../controllers/user.controller');

// @route   GET /api/user/test
// @desc    Test User Route
// @access  Public
router.get('/test', (req, res) => { res.json({msg: 'User Test Page'}) });

// @route   GET /api/user/register
// @desc    Register
// @access  Public
router.post('/register', UserController.registerUser)

// @route   POST /api/user/login
// @desc    Login
// @access  Public
router.post('/login', UserController.loginUser)

// @route   GET /api/user/current
// @desc    Return current user
// @access  Private
router.get('/current', passport.authenticate('jwt', { session: false }), UserController.getCurrentUser);

module.exports = router;