const express = require("express");
const orderRouter = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const Cart = require("../models/cart");
const Order = require("../models/order");
const Product = require("../models/product");
const product = require("../models/product");

orderRouter.post("/place", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.userId;

        const cart = await Cart.findOne({ user: userId }).populate("products.product");

        if (!cart || cart.products.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        // Calculate total amount
        let total = 0;
        cart.products.map(item => {
            total += item.product.price * item.quantity;
        });

        const newOrder = new Order({
            user: userId,
            products: cart.products.map(item => ({
                product: item.product._id,
                quantity: item.quantity
            })),
            totalAmount = total
        });

        await newOrder.save();

        // Clear cart
        cart.products = [];
        await cart.save();

        res.status(201).json({ message: 'Order placed successfully', order: newOrder });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = {
    orderRouter,
}