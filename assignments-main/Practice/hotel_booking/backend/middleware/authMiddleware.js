const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({ message: 'Access denied, no token provided' });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

const authAdmin = async (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: 'Access denied, admin only' });
    }
    next();
}

module.exports = {
    authMiddleware,
    authAdmin
}