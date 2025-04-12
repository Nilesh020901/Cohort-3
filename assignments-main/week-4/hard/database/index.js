const mongoose = require('mongoose');
require("dotenv").config();
// Connect to MongoDB
const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database Connect");
    } catch (error) {
        console.log("Database connection failed:", error)
        process.exit(1);
    }
}
// Define schemas
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    password: String
});

const TodoSchema = new mongoose.Schema({
    // Schema definition here
    userId: ObjectId,
    title: String,
    completed: Boolean
});

const User = mongoose.model('User', UserSchema);
const Todo = mongoose.model('Todo', TodoSchema);

module.exports = {
    connectToDatabase,
    User,
    Todo
}