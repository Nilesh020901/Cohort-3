const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db")

authRouter.post("/signup", async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const userExists = await db.query("SELECT * FROM users Where email = $1", [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query(
            "INSERT INTO users (name, email, password, role) values ($1, $2, $3, $4)",
            [name, email, hashedPassword, role]
        );

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
})

authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length === 0) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.rows[0].password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.rows[0].id, role: user.rows[0].role }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
})

module.exports = authRouter;