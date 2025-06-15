
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
    likes: {
        type: Array,
        default: [],
    },
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);