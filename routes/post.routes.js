const express = require('express');
const router = express.Router();

// @route   GET /api/post/test
// @desc    Test Post Route
// @access  Public
router.get('/test', (req, res) => {
    res.json({msg: "Post Test Page"});
})

module.exports = router;