const mongoose = require("mongoose");

mongoose.connect("");

const usserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30,
    },
    password: {
        type: String,
        require: true,
        minLength: 6,
    },
    firstName: {
        type: String,
        require: true,
        trim: true,
        maxLength: 30,
    },
    lastName: {
        type: String,
        require: true,
        trim: true,
        maxLength: 30,
    },
})

const User = mongoose.model("User", usserSchema);

module.exports = {
    User,
}