const express = require("express");
const auth = require("../middleware/auth");
const user = require("../models/user");
const router = express.Router();

router.get("/profile", auth, (req, res) => {
    res.json({ message: "Profile", user: req.user });
})

exports.router = router;