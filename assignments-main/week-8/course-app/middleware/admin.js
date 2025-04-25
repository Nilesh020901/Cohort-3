const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config");

function adminMiddleware(req, res, next) {
    const token = req.headers.token;
    const decoded = jwt.verify(token, JWT_ADMIN_PASSWORD);
    if (!decoded) {
        return res.status(401).json({ message: "You are not Sign-in" });
    }
    req.userId = decoded.id;
    next();
}

module.exports = {
    adminMiddleware: adminMiddleware
}