const jwt = require("jsonwebtoken");
const SECRET = "secret123";

function userMiddleware(req, res, next) {
    // Implement user auth logic
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, SECRET, (err, user) => {
            if (err) {
                return res.status(404).json({
                    message: "Forbidden: Invalid token"
                })
            }
            req.userId = user.userId;
            next();
        });
    } else {
        res.status(404).json({
            message: "Unauthorized: No token provided"
        })
    }
};

module.exports = {
    userMiddleware,
    SECRET
}