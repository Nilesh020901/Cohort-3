//  start writing your code from here
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { SECRET } = require("../db/index");
const { User } = require("../db/index");

router.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await findOne({ username });
        if (user) {
            return res.status(404).json({ message: "User already exists" });
        }

        const newUser = new User({ username, password });
        await newUser.save();

        const token = jwt.sign({ userId: newUser._id}, SECRET, {expiresIn: "1h" });
        res.status(200).json({ 
            message: "You are successfully signed",
            token
        })
    } catch (error) {
        res.status(404).json({
            message: "Internal Server Error";
        })
    }
});

router.post("/signin", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await findOne({ username });
        if(!user) {
            return res.status(200).json({ message: "You don't have an account" })
        }

        const token = jwt.sign({ userId: user._id}, SECRET, { expiresIn: "1h" });
        res.status(200).json({ message: "You are successfully signed-in", token })
    } catch (error) {
        res.status(404).json({
            message: "Internal Server Error";
        })
    }
})

module.exports = router;