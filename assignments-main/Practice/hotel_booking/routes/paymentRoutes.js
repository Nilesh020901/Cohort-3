const express = require("express");
const paymentRouter = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const db = require("../config/db");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

paymentRouter.post("/create-checkout-session", authMiddleware, async (req, res) => {
    const { roomId } = req.body;
    const userId = req.user.userId;

    try {
        const room = await db.query("SELECT * FROM rooms WHERE id = $1", [roomId]);
        if (room.rows.length === 0) {
            return res.status(404).json({ message: 'Room not found' });
        }

        const roomDetails = room.rows[0];

        const session = await stripe.checkout.session.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: roomDetails.name,
                            description: roomDetails.type,
                        },
                        unit_amount: roomDetails.price * 100,
                    },
                    quantity: 1,
                },
            ],

            success_url: `${process.env.CLIENT_URL}/payment-success`,
            cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
            metadata: {
                userId,
                roomId: roomDetails.id,
            },
        });

        res.json({ url: session.url });
    } catch (error) {
        res.status(500).json({ message: 'Payment processing error', error });
    }
})

module.exports = paymentRouter;