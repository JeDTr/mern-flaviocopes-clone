const express = require('express');
const router = express.Router();
const passport = require('passport');

const postController = require('../controllers/post.controller');

// @route   GET /api/post/all
// @desc    Get all posts
// @access  Public
router.get('/all', postController.getAllPosts);

// @route   GET /api/post/tag/id/:id
// @desc    Get all posts by tag id
// @access  Public
router.get('/tag/id/:id', postController.getPostsByTagId);

// @route   GET /api/post/tag/slug/:slug
// @desc    Get all posts by tag slug
// @access  Public
router.get('/tag/slug/:slug', postController.getPostsByTagSlug);

// @route   GET /api/post/id/:id
// @desc    Get post by id
// @access  Public
router.get('/id/:id', postController.getPostById);

// @route   GET /api/post/cuid/:cuid
// @desc    Get post by cuid
// @access  Public
router.get('/cuid/:cuid', postController.getPostByCuid);

// @route   POST /api/post/
// @desc    Create post
// @access  Private
router.post('/', passport.authenticate('jwt', {session: false}), postController.createPost);

// @route   PUT /api/post/id/:id
// @desc    Edit post by id
// @access  Private
router.put('/cuid/:cuid', passport.authenticate('jwt', {session: false}), postController.editPostById);

module.exports = router;