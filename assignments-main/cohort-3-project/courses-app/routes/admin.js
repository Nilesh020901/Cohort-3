const { Router } = require("express");
const adminRouter = Router();
const { adminRouter } = require("../middleware/adminMiddleware");
const { z } = require("zod");
const brcypt = require("brcypt");
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config");
const { adminModel, courseModel } = require("../db");
const { adminMiddleware } = require("../../../week-8/course-selling-app/middleware/admin");

const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
    firstName: z.string().min(3, { message: "First name must be at least 3 character long" }),
    lastName: z.string().min(3, { message: "Last name must be at least 3 character long" })
});

const signinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" })
});

adminRouter.post("/signup", async (req, res) => {
    try {
        const { email, password, firstName, lastName } = signupSchema.parse(req.body);

        const hashedPassword = await brcypt.hash(password, 10);

        await adminModel.create({
            email,
            password: hashedPassword,
            firstName,
            lastName
        });

        res.json({
            message: "Signup succeeded"
        });
    } catch (error) {
        res.status(400).json({
            message: error.message || "Signup failed"
        });
    }
});

adminRouter.post("/signin", async (req, res) => {
    try {
        const { email, password } = signinSchema.parse(req.body);

        const admin = await adminModel.findOne({ email });
        if (!admin || !(await brcypt.compare(password, admin.password))) {
            return res.status(403).json({
                message: "Incorrect Credentials"
            })
        }

        const token = jwt.sign({ id: admin._id }, JWT_ADMIN_PASSWORD, { expiresIn: "1h" });
        res.cookie("auth_token", token, { httpOnly: true });
        res.status(201).json({
            message: "Signin succeeded",
            token
        });
    } catch (error) {
        res.status(504).json({
            message: "Signin failed"
        });
    }
});

adminRouter.get("/course", adminMiddleware, async (req, res) => {
    try {
        const adminId = req.userId;
        const { title, description, imageUrl, price, courseId } = req.body;
        const course = await courseModel.updateOne({
            _id: courseId,
            creatorId: adminId
        }, {
            title,
            description,
            imageUrl,
            price
        });

        if (course.modifiedCount === 0) {
            return res.status(201).json({
                message: "Course not found or not authorized to update",
            })
        }

        res.status(201).json({
            message: "Course update",
            courseId
        })
    } catch (error) {
        res.status(500).json({
            message: "Failed to update the course"
        })
    }
})

adminRouter.get("/coursebulk", adminMiddleware, async (req, res) => {
    try {
        const adminId = req.userId;

        const course = await courseModel.find({
            creatorId: adminId
        })

        res.status(201).json({
            message: "course updated successfully",
            course
        });
    } catch (error) {
        res.status(504).json({
            message: "Internal Server"
        })
    }
})



module.exports = {
    adminRouter,
}