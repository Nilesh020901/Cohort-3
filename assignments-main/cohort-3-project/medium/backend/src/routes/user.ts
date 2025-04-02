import express from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
//middleware and zod remaing

const router = express.Router();
const prisma = new PrismaClient();

router.post("/signup", async (req, res) => {
  const body = req.body;
  const { success } = signInput.safeParse(body);
  if(!success) {
    res.status(400).json({ message: "Invalid input" });
    return;
  }
  try {
    const findUser = await prisma.user.findUnique({
      where: {
        email: body.email
      }
    });

    if(findUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, process.env.JwT_SECRET);
    res.status(201).json({ message: "User created", jwt: token });
  } catch (error) {
    console.log("Error while signing up", error);
    res.status(403).json({ error: "Error while signing up" });
  }
})

router.post("/signin", async (req, res) => {
  const body = req.body;
  const { success } = signinInput.safeParse(body);
  if (!success) {
    res.status(400).json({ message: "Invalid input" });
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email
      }
    })
    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(body.password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ message: "Invalid password" });
      return;
    }

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, process.env.JwT_SECRET);
    res.status(200).json({ message: "User signed in", jwt: token });
  } catch (error) {
    console.log("Error while signing in", error);
    res.status(403).json({ error: "Error while signing in" });
  }
})

router.put("/update", async (req, res) => {
  const body = req.body;
  const { success } = updateInput.safeParse(body);
  if (!success) {
    res.status(400).json({ message: "Invalid input" });
    return;
  }

  try {
    await prisma.user.update({
      where: {
        id: req.userId
      },
      data: body
    });
    res.json({ message: "User updated" });
  } catch (error) {
    console.log("Error while updating user", error);
    res.status(403).json({ error: "Error while updating user" });
  }
})

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        posts: { where: { published: true } },
      },
    });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ user });
  } catch (error) {
    console.log("Error while getting user", error);
    res.status(403).json({ error: "Error while getting user" }); 
  }
})

export default router;
