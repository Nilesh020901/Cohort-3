const mongoose = require("mongoose");

mongoose.connect("");

const userSchema = new mongoose.Schema({
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
});

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    balance: {
        type: Number,
        require: true
    }
})

const Account = mongoose.model("Account", accountSchema);
const User = mongoose.model("User", userSchema);

module.exports = {
    User,
    Account,
}