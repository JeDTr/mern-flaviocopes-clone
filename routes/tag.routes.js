const express = require('express');
const router = express.Router();
const passport = require('passport');

const tagController = require('../controllers/tag.controller');

// @route   GET /api/tag/all
// @desc    get all tags
// @access  public
router.get('/all', tagController.getAllTags);

// @route   GET /api/tag/:id
// @desc    get tag by id
// @access  public
router.get('/id/:id', tagController.getTagById);

// @route   GET /api/tag/:slug
// @desc    get tag by slug
// @access  public
router.get('/:slug', tagController.getTagBySlug);

// @route   POST /api/tag/
// @desc    create tag
// @access  private
router.post('/', passport.authenticate('jwt', {session: false}), tagController.createTag);

// @route   PUT /api/tag/:id
// @desc    edit tag by id
// @access  private
router.put('/id/:id', passport.authenticate('jwt', {session: false}), tagController.editTagById);

// @route   DELETE /api/tag/:id
// @desc    delete tag
// @access  private
router.delete('/id/:id', passport.authenticate('jwt', {session: false}), tagController.deleteTag);

module.exports = router;