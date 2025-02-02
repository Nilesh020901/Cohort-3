const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");
const { default: mongoose } = require("mongoose");

router.get("/balance", authMiddleware, async(req, res) => {
    try {
        const account = await Account.findOne({
            userId: req.userId
        });
        if (!account) {
            return res.status(404).json({ message: "Account is not found" });
        }
        res.status(201).json({
            balance: account.balance
        })
    } catch (error) {
        res.status(500).json({ message: "Bank Server is down" });
    }
});

router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    try {
        const { amount, to } = req.body;

        if(!amount || !to) { 
            return res.status(400).json({ message: "Invalid request parameters" });
        }

        const account = await Account.findOne({ userId: req.body }).session(session);

        if(!account || account.balance < amount ) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Insufficient Balance" });
        }

        const toAccount = await Account.findOne({ userId: to }).session(session);
        if(!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Not Found Recipient" });
        }

        await Account.updateOne({ userId: req.userId }, {$inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: to }, {$inc: { balance: +amount} }).session(session);

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({ message: "Transfer Successful"});
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ message: "Server Error" });
    }
})

module.exports = router;