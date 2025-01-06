import { Router, Request, Response } from "express";
import { adminModel, courseModel  } from "../db";
import { z } from "zod";
import bcrypt from "bcrypt";
import { JWT_ADMIN_PASSWORD } from "../config";
import { adminMiddleware } from "../middleware/admin";
import jwt from "jsonwebtoken";

const adminRouter = Router();

const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, { message: "atleast 6 letters" }),
    firstName: z.string().min(1, { message: "atleast 1 letter" }),
    lastName: z.string().min(1, { message: "atleast 1 letter" }),
})

const SigninSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, { message: "atleast 6 letters "}),
})

//Routes
adminRouter.post("/signup", async function (req: Request, res: Response) {
    try {
        const { email, password, firstName, lastName } = signupSchema.parse(req.body);
        const hashedPassword = await bcrypt.hash(password, 10);

        await adminModel.create({
            email,
            password: hashedPassword,
            firstName,
            lastName,
        });

        res.json({
            message: "Signup Successfully",
        })
    } catch (error: any) {
        res.status(400).json({
            message: error.message || "signup failed",
        })
    }
})

adminRouter.post("/signin", async function (req: Request, res: Response) {
    try {
        const { email, password } = SigninSchema.parse(req.body);
        const admin = await adminModel.findOne({ email });

        if (!admin || (await bcrypt.compare(password, admin.password ))) {
            return res.status(400).json({
                message: "User or Password Invalid",
            })
        }

        const token = jwt.sign({ id: admin._id }, JWT_ADMIN_PASSWORD, { expiresIn: "1h" });

        res.cookie("auth_Admin", token, { httpOnly: true })
        res.status(200).json({ message: "Signin Successfully", token })
    } catch (error: any) {
        res.status(500).json({
            message: error.message || "Signin Successfully",
        })
    }
})

adminMiddleware.post("/course", adminMiddleware, async function (req:Request, res:Response) {
    try {
        const adminId = req.userId; //adminMiddleware se layega userId


    } catch (error) {
        
    }
})