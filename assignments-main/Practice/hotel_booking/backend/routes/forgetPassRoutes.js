const express = require("express");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const db = require("../config/db");
const resetPassword = express.Router();

resetPassword.post("/forget-password", async (req, res) => {
    const { email } = req.body;

    try {
        const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const resetToken = crypto.randomBytes(32).toString("hex");
        const tokenExpiry = new Date(Date.now() + 3600000);
        await db.query(
            "UPDATE users SET reset_token = $1, reset_token_expires = $2 WHERE email = $3",
            [resetToken, tokenExpiry, email]
        );

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
        await transporter.sendMail({
            to: email,
            subject: "Password Reset Request",
            html: `<p>You requested a password reset. Click <a href="${resetLink}">here</a> to set a new password. This link expires in 1 hour.</p>`
        });

        res.json({ message: "Reset link sent to email." });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

resetPassword.post("/reset-password/:token", async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        const user = await db.query(
            "SELECT * FROM users WHERE reset_token = $1 AND reset_token_expires > NOW()",
            [token]
        );

        if (!user.rows.length === 0) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query(
            "UPDATE users SET password = $1, reset_token = NULL, reset_token_expires = NULL WHERE id = $2",
            [hashedPassword, user.rows[0].id]
        );

        res.json({ message: "Password reset successful" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
})

module.exports = resetPassword;