const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config");

function userMiddleware(req, res, next) {
    const token = req.headers.token;
    const decode = jwt.verify(token, JWT_USER_PASSWORD);

    if (decode) {
        req.userID = decode.id;
        next();
    }
    else {
        res.status(403).json({
            message: "You are not Signed in"
        })
    }
}

module.exports = {
    userMiddleware: userMiddleware
}