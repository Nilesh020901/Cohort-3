const { text } = require("express");
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Force stop the server if DB not connected
    }
}

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: [true, 'Username is required'],
        unique: true
    },

    email: {
        type: String,
        require: [true, 'Email is required'],
        unique: true
    },

    passwords: {
        type: String,
        require: [true, 'Password is required'],
    }
}, 
{ 
    timestamps: true 
});

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    body: {
        type: String,
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    comments: [
        {
            user: { type: mongoose.Schema.Types.ObjectId },
            text: { type: String, require: true },
            createdAt: { type: Date, default: Date.now},
        }
    ]
},
{
    timestamps: true,
});

const userModel = mongoose.model("User", userSchema);
const blogModel = mongoose.model("Blog", blogSchema);

module.exports = {
    connectDB,
    userModel,
    blogModel
}