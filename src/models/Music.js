const mongoose = require("mongoose");

const MusicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    path: {
        type: String,
        trim: true
    },
    size: {
        type: String,
        trim: true
    },
    album: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Album'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Music', MusicSchema);