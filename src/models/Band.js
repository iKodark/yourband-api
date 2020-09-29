const mongoose = require("mongoose");
const Album = require('./Album').schema;

const BandSchema = new mongoose.Schema({
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
    albums: {
        type: [Album]
    },
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Band', BandSchema);