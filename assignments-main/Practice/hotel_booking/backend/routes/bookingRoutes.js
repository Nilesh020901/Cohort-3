const express = require("express");
const bookingRouter = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const db = require("../config/db");
const sendEmail = require("../utils/sendEmail");
const stripe = require("../utils/stripe");

bookingRouter.post("/book", authMiddleware, async (req, res) => {
    const { roomId, check_in, check_out } = req.body;
    const userId = req.user.userId;

    try {
        
        const userRes = await db.query("SELECT name, email FROM users WHERE id = $1", [userId]);
        const user = userRes.rows[0];

        const room = await db.query("SELECT * FROM rooms WHERE id = $1 AND availability = true", [roomId]);
        if (room.rows.length === 0) {
            return res.status(404).json({ message: 'Room not available' });
        }

        await db.query(
            "INSERT INTO bookings (user_id, room_id, check_in, check_out, status, booking_date) VALUES ($1, $2, $3, $4, $5, NOW())",
            [userId, roomId, check_in, check_out, "confirmed"]
        );

        await db.query("UPDATE rooms SET availability = false WHERE id = $1", [roomId]);

        await sendEmail({
            to: user.email,
            subject: "Booking Confirmed!",
            text: `Hi ${user.name}, your booking is confirmed for Room ${roomId} from ${check_in} to ${check_out}.`,
            html: `<p>Hi <strong>${user.name}</strong></p>
                   <p>Your booking is <b>confirmed</b> for Room <b>${roomId}</b></p>
                   <p><strong>Check-in:</strong> ${check_in}<br/>
                   <strong>Check-out:</strong> ${check_out}</p>`
        });

        res.status(201).json({ message: 'Room booked successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

bookingRouter.delete("/cancel/:id", authMiddleware, async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;

    try {
        const bookingRes = await db.query("SELECT * FROM bookings WHERE id = $1 AND user_id = $2", [id, userId]);
        if (bookingRes.rows.length === 0) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        const booking = bookingRes.rows[0];
        const roomId = booking.room_id;

        if (booking.payment_intent_id) {
            try {
                await stripe.refunds.create({
                    payment_intent: booking.payment_intent_id,
                });
            } catch (refundError) {
                console.error("Refund failed:", refundError);
                return res.status(500).json({ message: "Refund failed" });
            }
        }

        await db.query("UPDATE bookings SET status = $1 WHERE id = $2", ["cancelled", id]);
        await db.query("UPDATE rooms SET availability = true WHERE id = $1", [roomId]);

        const userRes = await db.query("SELECT name, email FROM users WHERE id = $1", [userId]);
        const user = userRes.rows[0];

        await sendEmail({
            to: user.email,
            subject: 'Booking Cancelled',
            text: `Hi ${user.name}, your booking for Room ${roomId} has been cancelled. Refund has been initiated.`,
        });

        res.json({ message: 'Booking cancelled and refund processed successfully' });
    } catch (error) {
        console.error(error);
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
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

bookingRouter.get("/search", authMiddleware, async (req, res) => {
    const { keyword } = req.query;

    try {
        const results = await db.query(
            `SELECT b.id, r.name AS room_name, b.booking_date, b.status
             FROM bookings b
             JOIN rooms r ON b.room_id = r.id
             WHERE r.name ILIKE $1 OR b.status ILIKE $1`,
            [`%${keyword}%`]
        );
        res.json(results.rows); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = bookingRouter;
