
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MemoSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    icon: {
        type: String,
        default: "📝",
    },
    title: {
        type: String,
        default: "No Title",
    },
    description: {
        type: String,
        default: "No Description",
    },
    position: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

module.exports = mongoose.model("Memo", MemoSchema);