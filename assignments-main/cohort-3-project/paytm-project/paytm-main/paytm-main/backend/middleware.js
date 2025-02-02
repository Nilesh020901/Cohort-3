const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");

const authMiddleware = ((req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        res.status(401).json({ message: "You are not login" });
    }

    const token = authHeader.split('')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (decoded) {
            req.userId = decoded.userId;
            next();
        }
        else {
            res.status(403).json({ message: "Invalid username or password" });
        }
    } catch (error) {
        res.status(503).json({ message: "Internal Server Error" });
    }
});

module.exports = {
    authMiddleware
} 