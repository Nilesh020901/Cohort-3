import express from "express";

const router = express.Router();

router.post("/singup", async (req, res) => {
    res.send("Signup Route")
});

router.post("/signin", async (req, res) => {
    res.send("Signin Route")
});

export default router;