const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.split(" ")[1];
        if (!token) {
            res.status(401).json({ message: 'No token provided. Authorization denied.' })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token. Authorization denied.' });
    }
};

const authInstructor = async (req, res, next) => {
    if (req.user.role !== "instructor") {
        return res.status(403).json({ message: 'Access denied. Instructor role required.' });
    }
    next();
};

module.exports = {
    authInstructor,
    authMiddleware
}