const express = require("express");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const User = require("./config/db");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(404).json({ message: "user already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ name, email, hashedPassword, role });
        await user.save();

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(201).json({ message: "You are Signup", token });
    } catch (error) {
        res.status(404).json({ message: "Server Error" });
    }
})

authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: "Invalid credentials" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            res.status(404).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(201).json({ message: "You are login", token });
    } catch (error) {
        res.status(404).json({ message: "Server Error" });
    }
})

module.exports = {
    authRouter
}