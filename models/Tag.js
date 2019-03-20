const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TagSchema = mongoose.Schema({
    name: { type: String, require: true },
    slug: { type: String, require: true },
    description: { type: String, require: true }
})

module.exports = Tag = mongoose.model('Tag', TagSchema);