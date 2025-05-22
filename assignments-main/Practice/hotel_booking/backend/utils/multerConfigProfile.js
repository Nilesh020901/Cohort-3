const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads/profile_pics");
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, `user-${Date.now()}${ext}`);
    }
});

const fileFilter = (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/jpg"];
    allowed.includes(file.mimetype) ? cb(null, true) : cb(new Error("Only images are allowed"));
};

const upload = multer({
    storage,
    fileFilter
});

module.exports = upload;