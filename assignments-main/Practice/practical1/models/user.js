const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
})

module.exports = mongoose.model("User", userSchema);
// What is the output of the following code?
// A. Error in the code
// B. undefined
// C. User
// D. userSchema
// Answer: C. User
//
