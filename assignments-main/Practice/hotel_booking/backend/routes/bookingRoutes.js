const express = require("express");
const bookingRouter = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const db = require("../config/db");

bookingRouter.post("/book", authMiddleware, async (req, res) => {
    const { roomId, bookingDate } = req.body;
    const userId = req.user.userId;

    try {
        const room = await db.query("SELECT * FROM rooms WHERE id = $1 AND availability = true", [roomId]);
        if (room.rows.length === 0) {
            return res.status(404).json({ message: 'Room not available' });
        }

        await db.query(
            "INSERT INTO bookings (user_id, room_id, booking_date, status) VALUES ($1, $2, $3, $4)",
            [userId, roomId, bookingDate, "confirmed"]
        );

        await db.query("UPDATE rooms SET availability = false WHERE id = $1", [roomId]);
        res.status(201).json({ message: 'Room booked successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

bookingRouter.delete("/cancel/:id", authMiddleware, async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId

    try {
        const booking = await db.query("SELECT * FROM bookings WHERE id = $1 AND user_id = $2", [id, userId]);
        if (booking.rows.length === 0) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        await db.query("UPDATE bookings SET status = $1 WHERE id = $2", ["cancelled", id]);
        await db.query("UPDATE rooms SET availability = true WHERE id = $1", [booking.rows[0].room_id]);

        res.json({ message: 'Booking cancelled successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

bookingRouter.get("/mybookings", authMiddleware, async (req, res) => {
    const userId = req.user.userId;

    try {
        const bookings = await db.query(
            `SELECT b.id, r.name AS room_name, b.booking_date, b.status 
             FROM bookings b 
             JOIN rooms r ON b.room_id = r.id 
             WHERE b.user_id = $1 
             ORDER BY b.booking_date DESC`,
            [userId]
        );
        res.json(bookings.rows);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

bookingRouter.get("/search", authMiddleware, async (req, res) => {
    const { keyword } = req.query;

    try {
        const results = await db.query(
            `SELECT b.id, r.name AS room_name, b.booking_date, b.status
            FROM bookings b
            JOIN room r ON b.room_id = r.id
            WHERE r.name ILIKE $1 OR b.status ILIKE $1`,
            [`%${keyword}%`]
        );
        res.status(results.rows);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
})

module.exports = bookingRouter;