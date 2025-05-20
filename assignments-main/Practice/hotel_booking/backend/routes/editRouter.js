const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const db = require("../config/db");
const bcrypt = require("bcrypt");
const upload = require("../utils/multerConfig");
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
            "UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4",
            [name, email, hashedPassword, userId]
        );
        res.status({ message: 'Profile updated successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

editRouter.put("/profile/upload", authMiddleware, async (req, res) => {
    const userId = req.user.id;
    const file = req.file;

    if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
        const imagePath = file.filename;
        const result = await db.query(
            "UPDATE users SET profile_pic = $1 WHERE id = $2 RETURNING profile_pic",
            [imagePath, userId]
        );

        res.status(200).json({ message: "Profile picture updated", profile_pic: result.rows[0].profile_pic });
    } catch (error) {
        res.status(500).json({ message: 'Server error during file upload' });
    }
})



module.exports = editRouter;