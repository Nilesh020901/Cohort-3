const jwt = require("jsonwebtoken");
const userModel = require("../config/db");
const JWT_SECRET = require("")

const protect = async function (req, res, next) {
    let token;
    if (req.headers.authorization && req.headers.authorization.startswith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = await userModel.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
}

module.exports = {
    protect
}