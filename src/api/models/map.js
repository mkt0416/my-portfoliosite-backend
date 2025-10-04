
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MapSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    province: {
        type: String,
    },
    city: {
        type: String,
    },
    neighbourhood: {
        type: String,
    },
    siteName: {
        type: String,
        default: "未記入",
    },
    workDescription: {
        type: String,
        default: "未記入",
    },
    feedback: {
        type: String,
        default: "未記入",
    },
    location: {
        lat: {
            type: Number,
        },
        lng: {
            type: Number,
        }
    },
}, { timestamps: true });

module.exports = mongoose.model("Map", MapSchema);