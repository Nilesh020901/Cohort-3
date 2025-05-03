const express = require("express");
const adminRouter = express.Router;
const { authMiddleware, adminOnly } = require("../middleware/authMiddleware");
const User = require("../models/user");
const Order = require("../models/order");

adminRouter.get("/users", authMiddleware, adminOnly, async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

adminRouter.put("/user/:id/ban", authMiddleware, adminOnly, async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        user.isBanned = !user.isBanned;
        await user.save();

        res.status(200).json({
            message: `User has been ${user.isBanned ? "banned" : "unbanned"}`,
            user: { id: user._id, isBanned: user.isBanned }
        });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
})

adminRouter.put("/orders/:orderId/status", authMiddleware, adminOnly, async (req, res) => {
    try {
        const { orderId } = req.params; 
        const { status } = req.body;

        const order = await Order.findById(orderId)
        if (!orderId) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = status;
        await order.save();
        res.status(200).json({ message: "Order status updated", order })

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
})

adminRouter.get("/dasboard-stats", authMiddleware, adminOnly, async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        const orderCount = await Order.countDocuments();
        const totalRevenueData = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$totalPrice" }
                }
            }
        ]);

        const totalRevenue = totalRevenueData[0]?.totalRevenue || 0;

        const statusCount = await Order.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ]);

        const statusSummary = {};
        statusCount.forEach(item => {
            statusSummary[item._id] = item.count;
        });

        res.status(200).json({
            userCount,
            orderCount,
            totalRevenue,
            orderByStatus: statusSummary
        });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
})

module.exprots = {
    adminRouter
}