const { Router } = require("express");
const adminRouter = Router();
const { adminModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken");
const brcypt = require("brcypt");
const { z } = require("zod");
const { JWT_ADMIN_PASSWORD } = require("../config");
const adminMiddleware = require("../middleware/admin");

const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, { message: "min 6 letters hone chaiye" }),
    firstName: z.string().min(1, { message: "firstName atleat 1 char" }),
    lastName: z.string().min(1, { message: "lastName atleat 1 char" })
});

const signinSchema = z.object({
    email:z.string().email(),
    password: z.string().min(6, { message: "min 6 letters hone chaiye" }),
});

adminRouter.post("/signup", async function (req, res) {
    try {
        const { email, password, firstName, lastName } = signupSchema.parse(req.body);
        const admin = await adminModel.findOne({ email });
        if (admin) {
            return res.status(401).json({ message: "User already exists" });
        }
        
        const hashedPassword = await brcypt.hash(password, 10)
        await adminModel.create({
            email,
            password: hashedPassword,
            firstName,
            lastName
        });
        const token = jwt.sign({ id: admin._id }, JWT_ADMIN_PASSWORD, { expiresIn: "1h" });
        res.status(201).json({ message: "Successfully Signup", token });
    } catch (error) {
        res.status(501).json({ message: "Signup failed" });
    }
})

adminRouter.post("/signin", async function (req, res) {
    try {
        const { email, password } = signinSchema.parse(req.body);
        const admin = await adminModel.findOne({ email })
        if (!admin || !(await brcypt.compare(password, admin.password))) {
            return res.status(401).json({ message: "Incorrect Creadentials" });
        }

        const token = jwt.sign({ id: admin._id }, JWT_ADMIN_PASSWORD, { expiresIn: "1h" });
        res.cookies("auth_token", token, { httpOnly: true });
        res.status(201).json({ message: "You are Signin", token }); 
    } catch (error) {
        res.status(401).json({ message: "Sign-In failed"})
    }
})

adminRouter.post("/course", adminMiddleware, async function (req, res) {
    try {
        const adminId = req.userId;
        const { title, description, imageUrl, price } = req.body;

        const course = await courseModel.create({
            title,
            description,
            imageUrl,
            price,
            creatorId: adminId,
        });

        res.status(201).json({
            message: "Course Created",
            courseId: course._id
        })
    } catch (error) {
        res.status(500).json({ message: "Failed to create course" });
    }
})

adminRouter.put("/course", adminMiddleware, async function (req, res) {
    try {
        const adminId = req.userId;
        const { title, description, imageUrl, price, courseId } = req.body;

        const course = await courseModel.updateOne({ 
            _id: courseId,
            creatorId: adminId,
        }, {
            title,
            description,
            imageUrl,
            price
        });

        if (course.modifiedCount===0) {
            return res.status(404).json({ message: "Course not found or not authorized to update"})
        }
        res.status(201).json({ 
            message: "Course updated successfully", 
            courseId
        });
    } catch(error) {
        res.status(401).json({ message: "Failed to update the course" })
    }
})

adminRouter.get("/course/bulk", async function (req, res) {
    try {
        const adminId = req.userId;

        const course = await courseModel.find({
            creatorId: adminId
        })

        res.status(201).json({
            message: "All updated courses",
            course
        })
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch the course"})
    }
})

module.exports = {
    adminRouter,
};