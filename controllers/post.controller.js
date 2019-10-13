const slugify = require('slugify')
const cuid = require('cuid')

// Load validation
const validatePostInput = require('../validation/post.js')

// Load Model
const Post = require('../models/Post')
const Tag = require('../models/Tag')

// GET /api/post/all
module.exports.getAllPosts = (req, res) => {
  // Post.estimatedDocumentCount().then(console.log)
  const page = req.query.page ? req.query.page : 1
  Post.find()
    .limit(5)
    .skip((page - 1) * 5)
    .populate('tag', ['name', 'slug'])
    .sort({ dateAdded: 'desc' })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ posts: 'No posts found' }))
}

// GET /api/post/id/:id
module.exports.getPostById = (req, res) => {
  Post.findById(req.params.id)
    .populate('tag', ['name'])
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ post: 'No posts found' }))
}

// GET /api/post/cuid/:cuid
module.exports.getPostByCuid = (req, res) => {
  Post.findOne({ cuid: req.params.cuid })
    .populate('tag', ['name'])
    .then(post => {
      post ? res.json(post) : res.status(404).json({ post: 'No posts found' })
    })
    .catch(err => res.status(404).json({ post: 'No posts found' }))
}

// GET /api/post/tag/id/:id
module.exports.getPostsByTagId = (req, res) => {
  Post.find({ tag: req.params.id })
    .populate('tag', ['name', 'slug'])
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ post: 'No posts found' }))
}

// GET /api/post/tag/slug/:slug
module.exports.getPostsByTagSlug = (req, res) => {
  Tag.findOne({ slug: req.params.slug })
    .then(tag => {
      Post.find({ tag: tag.id })
        .populate('tag', ['name', 'slug'])
        .sort({ dateAdded: 'desc' })
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({ post: 'No posts found' }))
    })
    .catch(err => res.status(404).json({ tag: 'No tags found' }))
}

// POST /api/post
module.exports.createPost = (req, res) => {
  const { errors, isValid } = validatePostInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }

  const { title, subtitle, content, tag } = req.body
  const slug = slugify(title, {
    replacement: '-',
    remove: /[*+~.()'"!:@]/g,
    lower: true,
  })

  const newPost = new Post({
    user: req.user.id,
    title: title,
    subtitle: subtitle,
    slug: slug,
    cuid: cuid(),
    content: content,
    tag: tag,
  })

  newPost
    .save()
    .then(post => res.json(post))
    .catch(err =>
      res.status(400).json({ post: 'Something wrong when save post' }),
    )
}

// PUT /api/post/cuid/:cuid
module.exports.editPostById = (req, res) => {
  const { errors, isValid } = validatePostInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  const { title, subtitle, content, tag } = req.body
  Post.findOneAndUpdate(
    { cuid: req.params.cuid },
    { $set: { title, subtitle, content, tag } },
    { new: true },
  )
    .then(post => res.json(post))
    .catch(err =>
      res.status(400).json({ post: 'Something wrong when update post' }),
    )
}
