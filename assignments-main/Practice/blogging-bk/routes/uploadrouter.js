const express = require("express");
const { upload } = require("../middleware/uploadMiddleware");
const { protect } = require("../middleware/protect");
const uploadrouter = express.Router();

uploadrouter.post("/", protect, upload.single("image"), (req, res) => {
    res.status(200).json({ imagePath: `/${req.file.path}` });
});

module.exports = {
    uploadrouter
}