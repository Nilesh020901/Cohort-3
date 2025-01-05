const { Router } = require("express");
const userRouter = Router();
const { userMiddleware } = require("../middleware/user");
const jwt = require("jsonwebtoken");
const brcypt = require("brcypt");
const { z } = require("zod");
const { userModel, purchaseModel, courseModel } = require("../db");
const { JWT_USER_PASSWORD } = require("../config");
const course = require("./course");

const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, { message: "minmum 6 letters hone chaiye hai" }),
    firstName: z.string().min(1, { message: "atleat 1 letters" }),
    lastName: z.string().min(1, { message: "atleast 1 letter" }),
});

const signinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, { message: "atleast 1 letter" }),
});

userRouter.post("/signup", async function (req, res) {
    try {
        const { email, password, firstName, lastName } = signupSchema.parse(req.body);

        const hashedPassword = await brcypt.hash(password, 10);

        await userModel.create({
            email,
            password: hashedPassword,
            firstName,
            lastName
        });

        res.json({
            message: "Signup Succeeded",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Signup failed"
        })
    }
})

userRouter.post("/signin", async function (req, res) {
    try {
        const { email, password } = signinSchema.parse(req.body);

        const user = await userModel.findOne({ user });
        if (!user || !(await brcypt.compare(password, user.hashedPassword))) {
            return res.status(403).json({
                message: "Incorrect credentials or user not found",
            })
        }

        const token = jwt.sign({ id: user._id }, JWT_USER_PASSWORD, { expiresIn: "1h" });

        res.cookie("auth_token", token, { httpOnly: true });

        res.status(200).json({
            message: "Signin Successfully",
            token,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message || "Signin failed",
        })
    }
})

userRouter.get("/purchase", userMiddleware, async function (req, res) {
    try {
        const userId = req.userId;
        const purchases = await purchaseModel.find({ userId });
        const purchasedCourseId = purchases.map((purchase) => purchase.courseId);

        const coursesData = await courseModel.find({
            _id: { $in: purchasedCourseId },
        });

        res.json({
            message: "Purchases fetched successfully",
            purchases,
            courses: coursesData,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message || "Failed to fetch purchases",
        })
    }
})

module.exports = {
    userRouter,
}