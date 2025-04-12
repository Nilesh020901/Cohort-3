const { Router } = require("express");
const router = Router();
const { userMiddleware, SECRET } = require("../middleware/user");
const { User, Todo } = require("../database/index");
const jwt = require("jsonwebtoken");

// User Routes
router.post('/signup',async (req, res) => {
    // Implement user signup logic
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if(user) {
            return res.status(404).json({ message: "You have already account" });
        }
        
        const newUser = new User({ username, password });
        await newUser.save();

        const token = jwt.sign({ userId: newUser._id}, SECRET, { expiresIn: "1h" });
        res.status(200).json({
            message: "You are successfully",
            token
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server Error"
        })
    }
});

router.post('/login',async (req, res) => {
     // Implement user login logic
     const { username, password } = req.body;
     try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({
                message: "You not have account"
            })
        }

        const token = jwt.sign({ userId: user._id}, SECRET, { expiresIn: "1h" });
        res.status(200).json({
            message: "You are logged-in",
            token
        });
     } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
     }
});

router.get('/todos', userMiddleware, (req, res) => {
    // Implement logic for getting todos for a user
    
});

router.post('/logout', userMiddleware, (req, res) => {
    // Implement logout logic
    // No server-side action needed for JWT logout
    res.status(200).json({ message: "Logout successful" });
});

module.exports = router