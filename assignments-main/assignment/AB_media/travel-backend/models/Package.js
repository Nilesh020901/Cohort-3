const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true,
        trim: true
    },
    destinations: String
});

module.exports = mongoose.model('Package', packageSchema);