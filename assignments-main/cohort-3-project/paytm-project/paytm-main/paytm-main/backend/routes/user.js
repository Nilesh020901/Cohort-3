const express = require("express");
const bcrypt = require("bcrypt");
const { z } = require("zod");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const router = express.Router();

const signupBody = z.object({
	username: z.string().email(),
	password: z.string().min(6, { message: "minmum 6 letters hone chaiye hai" }),
	firstName: z.string().min(3, { message: "minmum 3 letters hone chaiye hai"}),
	lastName: z.string().min(3, { message: "minmum 3 letters hone chaiye hai"}),
});

const signinBody = z.object({
	username: z.string().email(),
	password: z.string.min(6, { message: "minmum 6 letters hone chaiye hai" }),
});

// Signup route
router.post("/signup", async (req, res) => {
	try {
		const { success } = signupBody.safeParse(req.body);
		if (!success) {
			return res.status(400).json({ message: "Invalid Input Format" });
		}

		const existingUser = await User.findOne({ username: req.body.username });
		if (existingUser) {
			return res.status(409).json({ message: "User already existing" });
		}

		const hashedPassword = await bcrypt.hash(req.body.password, 10);

		const user = await User.create({
			username: req.body.username,
			password: hashedPassword,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
		});

		const token = jwt.sign({ userId: user._id}, JWT_SECRET, {expiresIn: "2d" });

		res.status(201).json({ message: "You are Signed up" });
	} catch(error) {
		res.status(500).json({ message: "Internal Server Error"});
	}
});

// Signin route
router.post("/signin", async (req, res) => {
	try {
		const { success } = signinBody.safeParse(req.body);
		if(!success) {
			return res.status(400).json({ message: "Invalid Input Format" });
		}

		const user = await User.findOne({ username: req.body.username });

		if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid Password" });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "2d" });

        res.status(201).json({ message: "Login successfully", token });
	} catch(error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;