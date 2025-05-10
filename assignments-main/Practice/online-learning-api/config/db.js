const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["student", "instructor"],
        default: "student",
    },
},
{
    timestamps: true
})

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},
{
    timestamps: true
})

const userModel = mongoose.model("User", userSchema);
const courseModel = mongoose.model("Course", courseSchema);

module.exports = {
    userModel,
    courseModel
}