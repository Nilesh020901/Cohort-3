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
    
})

adminRouter.post("/signin", async function (req, res) {
    
})

adminRouter.post("/course", async function (req, res) {
    
})

adminRouter.put("/course", async function (req, res) {
    
})

adminRouter.get("/course/bulk", async function (req, res) {
    
})

module.exports = {
    adminRouter,
};