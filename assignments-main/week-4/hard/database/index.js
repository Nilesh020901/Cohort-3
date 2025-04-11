const mongoose = require('mongoose');
require("dotenv").config();
// Connect to MongoDB
const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database Connect");
    } catch (error) {
        console.log("Database connection failed:", error)
        process.exit();
    }
}
// Define schemas

const UserSchema = new mongoose.Schema({
    // Schema definition here
});

const TodoSchema = new mongoose.Schema({
    // Schema definition here
});

const User = mongoose.model('User', UserSchema);
const Todo = mongoose.model('Todo', TodoSchema);

module.exports = {
    User,
    Todo
}