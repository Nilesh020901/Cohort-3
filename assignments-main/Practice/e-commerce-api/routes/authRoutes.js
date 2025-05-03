const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

authRouter.post("/signup", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(401).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password: hashedPassword,
            role,
        });
        await user.save();

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(201).json({ message: "Signup successful", token })
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

authRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        if (user.isBanned) {
            return res.status(403).json({ message: 'Your account has been banned' });
        }          

        const isMatch = await bcrypt.compare( password, user.password );
        if (!isMatch) return res.status(401).json({ message: "Invalid creadentials" });

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(201).json({ message: "Sign-In successfully", token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

module.exports = {
    authRouter
}