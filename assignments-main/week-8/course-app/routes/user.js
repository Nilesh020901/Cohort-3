const { Router } = require("express");
const userRouter = Router();
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const brcypt = require("brcypt");
const { userModel, purchaseModel, courseModel } = require("../db");
const { JWT_USER_PASSWORD } = require("../config");
const userMiddleware = require("../middleware/user");


const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, { message: "minmum 6 letters hone chaiye hai" }),
    firstName:z.string().min(1, { message: "atleat 1 letters" }),
    lastName: z.string().min(1, { message: "atleast 1 letter" }),
})

const signinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, { message: "minmum 6 letters hone chaiye hai" }),
})

userRouter.post("/signup", async function (req, res) {
    try {
        const { email, password, firstName, lastName } = signupSchema.parse(req.body);
        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(404).json({ message: "Account already exists" });
        }

        const hashedPassword = await brcypt.hash(password, 10);

        await userModel.create({
            email,
            password: hashedPassword,
            firstName,
            lastName
        });

        const token = jwt.sign({ id: user._id }, JWT_USER_PASSWORD, { expiresIn: "1h" });
        res.status(201).json({ message: "Signup Succeeded", token });
    } catch (error) {
        res.status(500).json({ message: "Signup Failed" });
    }
})

userRouter.post("/signin", async function (req, res) {
    try {
        const { email, password } = signinSchema.parse(req.body)
    const user = await userModel.findOne({ email });
    if (!user || !(await brcypt.compare(password, user.password))) {
        return res.status(401).json({ message: "User does not exists" });
    }

    const token = jwt.sign({id: user._id}, JWT_USER_PASSWORD, { expiresIn: "1h" });
    res.cookie("auth_token", token, { httpOnly: true });
    res.status(201).json({ message: "Signin Successfully", token });
    } catch (error) {
        res.status(501).json({ message: "Signin Failed" });
    }
})

userRouter.get("/purchase", userMiddleware , async function (req, res) {
    try {
        const userId = req.userId;
        const purchases = await purchaseModel.find({ userId });
        const purchasedCourseId = purchases.map((purchase) => purchase.courseId);

        const coursesData = await courseModel.find({
            _id: { $in: purchasedCourseId },
        });

        res.status(201).json({
            message: "Purchases fetched successfully",
            purchases,
            courses: coursesData,
        })
    } catch (error) {
        res.status(501).json({ message: "Failed to fetch purchases" })
    }
})

module.exports = {
    userRouter,
}