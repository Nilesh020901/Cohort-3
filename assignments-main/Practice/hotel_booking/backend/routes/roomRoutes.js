const express = require("express");
const roomRouter = express.Router();
const { authMiddleware, authAdmin } = require("../middleware/authMiddleware");
const db = require("../config/db");

roomRouter.post("/add", authMiddleware, authAdmin, async (req, res) => {
    const { name, type, price, availability, amenities, rating, description } = req.body;
    try {
        await db.query(
            "INSERT INTO rooms (name, type, price, availability, amenities, rating, description) VALUES ($1, $2, $3, $4, $5, $6, $7)",
            [name, type, price, availability, amenities, rating, description]
        );

        res.status(201).json({ message: "Room added successfully" });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

roomRouter.put("/update/:id", authMiddleware, authAdmin, async (req, res) => {
    const { id } = req.params;
    const { name, type, price, availability, amenities, rating, description  } = req.body;

    try {
        await db.query(
            "UPDATE rooms SET name = $1, type = $2, price = $3, availability = $4, amenities = $5, rating = $6, description = $7 WHERE id = $5",
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
        await db.query(
            "UPDATE rooms SET availability = false WHERE id = $1",
            [id]
        )

        res.json({ message: 'Room marked as unavailable' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
})

roomRouter.get("/all", async (req, res) => {
    const { page = 1, limit = 10, search = "" } = req.query;
    const offset = (page - 1) * limit;

    try {
        const result = await db.query(`SELECT * FROM rooms 
             WHERE availability = true AND 
             (LOWER(name) LIKE LOWER($1) OR LOWER(type) LIKE LOWER($1))
             ORDER BY id DESC
             LIMIT $2 OFFSET $3`,
            [`%${search}%`, limit, offset]);

        res.status(201).json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = roomRouter;