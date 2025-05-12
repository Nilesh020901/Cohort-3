const express = require("express");
const productRouter = express.Router();
const { authMiddleware, adminOnly } = require("../middleware/authMiddleware");
const Product = require("../models/product");

productRouter.post("/create", authMiddleware, adminOnly, async (req, res) => {
    try {
        const { name, price, description, category, stock } = req.body;

        if (!name || !price || !description || !category || !stock) {
            return res.status(401).json({ message: "All fields are required" });
        }

        const newProduct = await Product.create({
            name,
            price,
            description,
            category,
            stock,
        })

        res.status(201).json({ message: "Product created successfully", newProduct });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

productRouter.get("/", async (req, res) => {
    try {
        const { search } = req.query;

        let filterProduct = { isActive: true };

        if (search) {
            filterProduct.name = { $regex: search, $options: "i" };
        }

        const products = await Product.find(filter);
        res.status(201).json(products);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

productRouter.put("/:id", authMiddleware, adminOnly, async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updateProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
        
        if (!updatedProduct) {
            return res.status(401).json({ message: "Product not found" });
        }

        res.status(201).json({ message: "Product updated", product: updatedProduct });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

productRouter.delete("/:id", authMiddleware, adminOnly, async (req, res) => {
    try {
        const { id } = req.params;
        const  deletedProduct = await Product.findByIdAndDelete(id, { isActive: false }, { new: true });

        if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });

        res.json({ message: 'Product soft-deleted' });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
})
module.exports = {
    productRouter
}