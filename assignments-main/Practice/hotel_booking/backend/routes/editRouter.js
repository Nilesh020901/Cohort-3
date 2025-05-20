const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const db = require("../config/db");
const bcrypt = require("bcrypt");
const editRouter = express.Router();

editRouter.put("/updateprofile", authMiddleware, async (req, res) => {
    const userId = req.user.id;
    const { name, email, password } = req.body;

    try {
        const emailCheck = await db.query("SELECT * FROM users WHERE email = $1 AND id != $2", [email, userId]);
        if (emailCheck > 0) {
            return res.status(400).json({ message: 'Email already in use by another user' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query(
            `UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4`,
            [name, email, hashedPassword, userId]
        );
        res.status({ message: 'Profile updated successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});



module.exports = editRouter;