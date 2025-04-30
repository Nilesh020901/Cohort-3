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
                cart.products.push({ product: productId, quantity });
            }
        }

        await cart.save();
        res.status(201).json({ message: "Product added to cart", cart });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

cartRouter.get("/", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.userId;
        const cart = await cart.findOne({ user: userId }).populate("products.product");

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(201).json({ cart });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

cartRouter.delete("/remove/:productId", async (req, res) => {
    try {
        const userId = req.user.userId
        const productId = req.params.productId;

        const cart = await cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const updateProducts = cart.products.filter(
            item => item.product.toString() !== productId
        );

        if (updateProducts.length === cart.products.) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        cart.products = updateProducts;
        await cart.save();

        res.status(201).json({ message: 'Product removed from cart', cart });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
})

module.exports = {
    cartRouter
}