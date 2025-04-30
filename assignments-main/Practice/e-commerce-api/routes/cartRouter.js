const express = require("express");
const cartRouter = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const Cart = require("../models/cart");
const product = require("../models/product");

cartRouter.post("/add", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.userId;
        const { productId, quantity } = req.body;

        if (!productId || !quantity) {
            return res.status(400).json({ message: 'Product ID and quantity required' });
        }

        let cart = await Cart.findOne({ user: userId })
        if (!cart) {
            cart = new Cart({
                user: userId,
                products: [{ product: productId, quantity }]
            });
        } else {
            // Check if product already exists
            const index = cart.products.findIndex(p => p.product.toString() === productId);
            if (index > -1) {
                // Update quantity
                cart.products[index].quantity += quantity;
            } else {
                // Add new product
                card.products.push({ product: productId, quantity });
            }
        }

        await cart.save();
        res.status(201).json({ message: "Product added to cart", cart });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = {
    cartRouter
}