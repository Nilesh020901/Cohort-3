const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isBanned: {
        type: Boolean,
        default: false
    },      
    role: {
        type: String,
        enum: ["customer", "admin"], 
        default: "customer"
    },
},
{
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);