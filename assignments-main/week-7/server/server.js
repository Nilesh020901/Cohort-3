//  TODO: Can you create backend with standard folder structure like: week-4/hard ???
const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();
const app = express();

app.use(express.json());

const secret = process.env.JWT_SECRERT;  // This should be in an environment variable in a real application
const port = process.env.PORT;

// Define mongoose schemas
const userSchema = new mongoose.Schema({
  // userSchema here
  username: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "course" }]
});

const adminSchema = new mongoose.Schema({
// adminSchema here
username: { type: String, require: true, unique: true},
password: { type: String, require: true },
});

const courseSchema = new mongoose.Schema({
// courseSchema here
title: { type: String, require: true },
description: { type: String, require: true },
price: { type: Number, require: true },
imageLink: { type: String, require: true },
publised: { type: Boolean, require: true }
});

// Define mongoose models
const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Course = mongoose.model('Course', courseSchema);

const authMiddleware = (req, res, next) => {
//  authMiddleware logic here 
const AuthHeader = req.headers.authorization;
if (!AuthHeader || !AuthHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "You are not Authorized"})
}

const token = AuthHeader.split("")[1];

try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
} catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
}
};

// Connect to MongoDB
mongoose.connect('<YourMongoDbConnectionString>'); 


// Admin routes
app.post('/admin/signup', (req, res) => {
    // logic to sign up admin
});

app.post('/admin/login', (req, res) => {
    // logic to log in admin
});

app.post('/admin/courses', (req, res) => {
    // logic to create a course
});

app.put('/admin/courses/:courseId', (req, res) => {
    // logic to edit a course
});

app.get('/admin/courses', (req, res) => {
    // logic to get all courses
});

// User routes
app.post('/users/signup', (req, res) => {
    // logic to sign up user
});

app.post('/users/login', (req, res) => {
    // logic to log in user
});

app.get('/users/courses', (req, res) => {
    // logic to list all courses
});

app.post('/users/courses/:courseId', (req, res) => {
    // logic to purchase a course
});

app.get('/users/purchasedCourses', (req, res) => {
    // logic to view purchased courses
});

app.listen(port, () => {
    console.log('Server is listening on port 3000');
});