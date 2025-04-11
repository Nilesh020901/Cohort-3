const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");

// User Routes
router.post('/signup',async (req, res) => {
    // Implement user signup logic
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if(user) {
            return res.status(404).json({ message: "You have already account" });
        }

        
    } catch (error) {
        
    }
});

router.post('/login', (req, res) => {
     // Implement user login logic
});

router.get('/todos', userMiddleware, (req, res) => {
    // Implement logic for getting todos for a user
});

router.post('/logout', userMiddleware, (req, res) => {
    // Implement logout logic
});

module.exports = router