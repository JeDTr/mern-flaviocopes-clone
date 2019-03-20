const slugify = require('slugify');

// Load validation 
const validateTagInput = require('../validation/tag');

// Load Tag model
const Tag = require('../models/Tag');

// GET /api/tag/all
module.exports.getAllTags = (req, res) => {
    Tag.find()
        .sort({name: 'asc'})
        .then(tags => res.json(tags))
        .catch(err => res.status(404).json({tag: 'No tags found'}))
}

// GET /api/tag/id/:id
module.exports.getTagById = (req, res) => {
    Tag.findById(req.params.id)
        .then(tag => res.json(tag))
        .catch(err => res.status(404).json({tag: 'No tags found'}))
}

// GET /api/tag/:slug
module.exports.getTagBySlug = (req, res) => {
    Tag.findOne({slug: req.params.slug})
        .then(tag => res.json(tag))
        .catch(err => res.status(404).json({tag: 'No tags found'}))
}

// POST /api/tag/
module.exports.createTag = (req, res) => {
    const { errors, isValid } = validateTagInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const { name, description } = req.body;
    const slug = slugify(name, {
        replacement: '-',
        remove: /[*+~.()'"!:@]/g,
        lower: true
    });

    const tagFields = { name, slug, description }

    Tag.findOne({slug})
        .then (tag => {
            if (tag) {
                // Tag.findOneAndUpdate(
                //     {slug},
                //     { $set: tagFields },
                //     { new: true }
                // )
                // .then(tag => res.json(tag))
                return res.status(400).json({tag: 'Tag already exists'})
            }

            const newTag = new Tag({
                name: name, 
                slug: slug, 
                description: description
            })
            newTag.save()
                .then( tag => res.json(tag))
                .catch(err => res.json({tag: 'Something wrong when save tag'}))
        })
}

// PUT /api/tag/id/:id
module.exports.editTagById = (req, res) => {
    // res.json({userId: req.user.id})
    Tag.findById(req.params.id)
        .then(tag => {
            if(!tag) {
                return res.status(404).json({tag: 'No tags found'});
            }
            const {errors, isValid} = validateTagInput(req.body);
            if (!isValid) {
                return res.status(400).json(errors);
            }
            const {name, description} = req.body;
            const updateField = {name, description};

            Tag.findOneAndUpdate(
                { _id: req.params.id },
                { $set: updateField },
                { new: true }
            )
            .then(tag => res.json(tag))
            .catch(err => res.status(400).json({tag: 'Something wrong when update tag'}))
        })
        .catch(err => res.status(404).json({tag: 'No tags found'}))
}

// DELETE /api/tag/id/:id
module.exports.deleteTag = (req, res) => {
    Tag.findById(req.params.id)
        .then(tag => {
            if (!tag) {
                return res.status(404).json({tag: 'No tags found'})
            }

            tag.remove()
                .then(() => res.json({success: true}))
        })
        .catch(err => res.status(404).json({tag: 'No tags found'}))
}