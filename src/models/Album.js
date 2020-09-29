const mongoose = require("mongoose");
const Music = require('./Music').schema;

const AlbumSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    picture: {
        type: String,
        trim: true
    },
    musics: {
        type: [Music]
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Album', AlbumSchema);