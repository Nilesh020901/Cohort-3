import { Router } from 'express';
import prisma from '../prisma';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = Router();

router.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Please provide email and password" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword
            },
        });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
        return res.status(201).json({ token });
    } catch (error) {
        console.error('Signup Error:', error);
        return res.status(403).json({ error: 'Error while signing up' });
    }
});

router.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Please provide email and password" });
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            },
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Compare hashed passwords
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(403).json({ error: 'Invalid password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: "1h" });

        return res.status(201).json({ token });
    } catch (error) {
        console.error('Signin Error:', error);
        return res.status(403).json({ error: 'Error while signing in' });
    }
});

export default router;