const express = require("express");
const roomRouter = express.Router();
const path = require("path");
const fs = require("fs");
const { authMiddleware, authAdmin } = require("../middleware/authMiddleware");
const db = require("../config/db");
const upload = require("../utils/multerConfig");

roomRouter.post("/add", authMiddleware, authAdmin, upload.array("images", 5), async (req, res) => {
    const { name, type, price, availability, amenities, rating, description } = req.body;
    try {
        await db.query(
            "INSERT INTO rooms (name, type, price, availability, amenities, rating, description) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id",
            [name, type, price, availability, amenities, rating, description]
        );
        const roomId = result.rows[0].id;

        if (files.length > 0) {
            const imageInserts = files.map(file =>
                db.query("INSERT INTO room_images (room_id, image_path) VALUES ($1, $2)", [roomId, file.filename])
            );
            await Promise.all(imageInserts);
        }

        res.status(201).json({ message: "Room added successfully" });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

roomRouter.put("/update/:id", authMiddleware, authAdmin, async (req, res) => {
    const { id } = req.params;
    const { name, type, price, availability, amenities, rating, description } = req.body;

    try {
        await db.query(
            "UPDATE rooms SET name = $1, type = $2, price = $3, availability = $4, amenities = $5, rating = $6, description = $7 WHERE id = $8",
            [name, type, price, availability, amenities, rating, description, id]
        );

        res.status(201).json({ message: "Room updated successfully" });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

roomRouter.delete("/delete/:id", authMiddleware, authAdmin, async (req, res) => {
    const { id } = req.params;

    try {
        await db.query("UPDATE rooms SET availability = false WHERE id = $1",[id])
        res.json({ message: 'Room marked as unavailable' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
})

roomRouter.get("/all", async (req, res) => {
    const { page = 1, limit = 10, search = "", minPrice = 0, maxPrice = 10000, minRating = 0, amenities = "", type = "" } = req.query;
    const offset = (page - 1) * limit;

    try {
        const result = await db.query(
            `SELECT * FROM rooms 
             WHERE availability = true 
             AND price BETWEEN $1 AND $2
             AND rating >= $3
             AND LOWER(name) LIKE LOWER($4)
             AND ($5 = "" OR LOWER(amenities) LIKE LOWER($5))
             AND ($6 = "" OR LOWER(type) = LOWER($6)) 
             ORDER BY id DESC
             LIMIT $7 OFFSET $8`,
            [minPrice, maxPrice, minRating, `%${search}%`, `%${amenities}%`, type, limit, offset]
        );

        const roomIds = result.rows.map(r => r.id);
        const images = await db.query("SELECT * FROM room_images WHERE room_id = ANY($1)", [roomIds]);

        const imageMap = {};
        images.rows.forEach(img => {
            if (!imageMap[img.room_id]) imageMap[img.room_id] = [];
            imageMap[img.room_id].push(img.image_path);
        });

        const roomsWithImages = result.rows.map(room => ({
            ...room,
            images: imageMap[room.id] || []
        }));

        res.status(201).json(roomsWithImages);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

roomRouter.delete("/image/:imageId", authMiddleware, authAdmin, async (req, res) => {
    const { imageId } = req.params;
    try {
        const result = await db.query("SELECT image_path FROM room_images WHERE id = $1", [imageId]);
        if (result.rows.length === 0) return res.status(404).json({ message: "Image not found" });

        const imagePath = result.rows[0].image_path;
        fs.unlinkSync(path.join(__dirname, "../uploads/room_images", imagePath));

        await db.query("DELETE FROM room_images WHERE id = $1", [imageId]);
        res.json({ message: "Image deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting image" });
    }
});

roomRouter.put("/image/:imageId", authMiddleware, authAdmin, upload.single("image"), async (req, res) => {
    const { imageId } = req.params;
    const file = req.file;
    if (!file) return res.status(400).json({ message: "No file uploaded" });

    try {
        const result = await db.query("SELECT image_path FROM room_images WHERE id = $1", [imageId]);
        if (result.rows.length === 0) return res.status(404).json({ message: "Image not found" });

        const oldPath = result.rows[0].image_path;
        fs.unlinkSync(path.join(__dirname, "../uploads/room_images", oldPath));

        await db.query("UPDATE room_images SET image_path = $1 WHERE id = $2", [file.filename, imageId]);
        res.json({ message: "Image replaced successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error replacing image" });
    }
})

module.exports = roomRouter;