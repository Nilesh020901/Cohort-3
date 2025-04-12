//  start writing from here
const mongoose = require("mongoose");
require("dotenv").config();

//connect to mongoDB
const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDb connected");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.error(1);
    }
};

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    username: String,
    password: String
});

const TodoSChema = new Schema({
    userId: ObjectId,
    title: String,
    completed: Boolean,
});

const User = mongoose.model("User", UserSchema);
const Todo = mongoose.model("Todo", TodoSChema);

module.exports = {
    connectToDatabase,
    User,
    Todo
}