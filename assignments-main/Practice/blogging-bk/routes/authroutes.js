const express = require("express");
const authrouter = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("");
const brcypt = require("brcypt");
const { userModel } = require("../config/db");

authrouter.post("/signup", async function (req, res) {
    try {
        const { username, email, password } = req.body;

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already have account" });
        }

        const hashedPassword = await brcypt.hash(password, 10);
        const user = new UserActivation({
            username,
            email,
            password: hashedPassword
        })
        await user.save();
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
        res.status(201).json({ message: "Successfully Signup ", token });
    } catch (error) {
        res.status(500).json({ message: "Sign-up Failed" });
    }
})

authrouter.post("/login", async function (req, res) {
    try {
        const { username, email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "You doesn't have account" });
        }

        const isMatch = await brcypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const token = jwt.sign(
            { id: user_id },
            JWT_SECRET,
            { expiresIn: "1h" }
        )

        res.status(201).json({ message: "You are logged-in", token });
    } catch (error) {
        res.status(500).json({ message: 'Logged-In Failed' });
    }
})

module.exports = {
    authrouter
}