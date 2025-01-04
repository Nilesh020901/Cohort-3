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
	const { email, password, firstName, lastName } = req.body;
    try {
        signupSchema = { email pa}
    } catch (error) {
        
    }
    await adminModel()
})
