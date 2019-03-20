const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    slug: { type: String, required: true },
    cuid: { type: String, required: true },
    content: { type: String, required: true },
    tag: { type: Schema.Types.ObjectId, ref: 'Tag' },
    dateAdded: { type: Date, default: Date.now, required: true },
})

module.exports = Post = mongoose.model('Post', PostSchema);