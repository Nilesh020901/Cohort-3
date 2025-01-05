const { Router } = require("express");
const adminRouter = Router();
const { adminModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken");
// brcypt, zod, jsonwebtoken
const brcypt = require("brcyptjs");
const { z } = require("zod");
const { JWT_ADMIN_PASSWORD } = require("../config");
const { adminMiddleware } = require("../middleware/admin.js");

//zod validation
const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, { message: "min 6 letters hone chaiye" }),
    firstName: z.string().min(1, { message: "firstName atleat 1 char" }),
    lastName: z.string().min(1, { message: "lastName atleat 1 char" })
});

const signinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, { message: "Password must be at least 6 characters long"})
});

adminRouter.post("/signup", async function(req, res) {
	try {
        //validate
        const { email, password, firstName, lastName } = signinSchema.parse(req.body);

        //password hash
        const hashedPassword = await brcypt.hash(password, 10);
        
        await adminModel.create({
            email,
            password: hashedPassword,
            firstName,
            lastName
        });
        res.json({
            message: "Signup succeeded"
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || "Signup failed"
        });
    }
});

adminRouter.post("/signin", async function (req, res) {
    try {
        //validate
        const { email, password } = signinSchema.parse(req.body);

        const admin = await adminModel.findOne({ email });
        if (!admin || !(await brcypt.compare(password, admin.password))) {
            return res.status(403).json({
                message: "Incorrect credentials"
            });
        }

        const token = jwt.sign({
            id: admin._id
        }, JWT_ADMIN_PASSWORD, { expiresIn: "1h" });

        //set cookies
        res.cookie("auth_token", token, { httpOnly: true });

        res.json({
            message: "Signin succeeded",
            token
        });
    } catch (error) {
        res.status(400).json({
            message: error.message || "Signin failed"
        });
    }
});

adminRouter.post("/course", adminMiddleware, async function (req, res) {
    try {
        const adminId = req.userId;
        const { title, description, imageUrl, price } = req.body;

        const course = await courseModel.create({
            title,
            description,
            imageUrl,
            price,
            creatorId: adminId
        });

        res.json({
            message: "Course created",
            courseId: course._id
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Failed to create course"
        });
    }
});

adminRouter.put("/course", adminMiddleware, async function (req, res) {
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
            return res.status(404).json({
                message: "Course not found or not authorized to update"
            });
        }

        res.json({
            message: "Course updated",
            courseId
        })
    } catch (error) {
        res.status(500).json({
            message: error.message || "Failed to update the course"
        })
    }
})

adminRouter.get("/course/bulk", adminMiddleware, async function (req, res) {
    try {
        const adminId = req.userId;

        const course = await courseModel.find({
            creatorId: adminId
        })

        res.json({
            message: "updated course",
            course
        })
    } catch (error) {
        res.status(500).json({
            message: error.message || "Failed to fetch the course"
        });
    }
});

module.exports = {
    adminRouter
};
