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

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: roomDetails.name,
                            description: roomDetails.type,
                        },
                        unit_amount: parseInt(roomDetails.price * 100),
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
        console.error("Stripe Error:", error);
        res.status(500).json({ message: 'Payment processing error', error });
    }
})

paymentRouter.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        )

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;
            const userId = session.metadata.userId;
            const roomId = session.metadata.roomId;

            await db.query(
                "UPDATE rooms SET availability = false WHERE id = $1",
                [roomId]
            );

            await db.query(
                "INSERT INTO bookings (user_id, booking_date, status) VALUES ($1, $2, NOW(), $3)",
                [userId, roomId, "confirmed"]
            )
            console.log('Payment successful and booking confirmed');
        }

        res.status(200).json({ received: true });
    } catch (error) {
        console.log(`Webhook Error: ${error.message}`);
        res.status(400).send(`Webhook Error: ${error.message}`);
    }
});

module.exports = paymentRouter;