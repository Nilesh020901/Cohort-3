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
app.post('/admin/signup',async (req, res) => {
    // logic to sign up admin
    try {
        const { username, password } = req.headers;
        const admin = await Admin.findOne({ username, password });
        
        if (admin) {
            return res.status(401).json({ message: "You have already account" });
        }
        const token = jwt.sign({ username, role: "admin" }, secret, { expiresIn: "1h" });
        res.status(201).json({ message: "Successfully Signup", token });
    } catch (error) {
        console.log("Internal Server Error");
    }
});

app.post('/admin/login',async (req, res) => {
    // logic to log in admin
    try {
        const { username, password } = req.headers;
    const admin = await Admin.findOne({ username, password });

    if (!admin) {
        return res.status(401).json({ message: "You have not signup" });
    }

    const token = jwt.sign({ username , role: "admin"}, secret, { expiresIn: "1h" });
    res.status(201).json({ message: "Successfully loggedIn", token });
    } catch (error) {
        console.log("Internal Server Error");
    }
});

app.post('/admin/courses', authMiddleware, async (req, res) => {
    // logic to create a course
    const course = new Course(req.body);
    await course.save();

    res.status(201).json({ message: "Course created successfully", courseId: course._id });
});

app.put('/admin/courses/:courseId', authMiddleware, async (req, res) => {
    // logic to edit a course
    const courseId = req.params.courseId;
    const updatedData = req.body;

    try {
        const course = await Course.findById(courseId);
        if(course) {
            course.title = updatedData.title;
            course.description = updatedData.description;
            course.price = updatedData.price;
            course.imageLink = updatedData.imageLink;
            course.publised = updatedData.publised;

            await course.save();

            res.status(201).json({ message: 'Course updated successfully' })
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
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