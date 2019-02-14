const express = require('express');
const router = express.Router();

// @route   GET /api/user/test
// @desc    Test User Route
// @access  Public
router.get('/test', (req, res) => {
    res.json({msg: 'User Test Page'});
});

module.exports = router;