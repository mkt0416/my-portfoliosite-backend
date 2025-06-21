
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
    comments: [
        {
            userId: String,
            username: String,
            text: String,
            createdAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);