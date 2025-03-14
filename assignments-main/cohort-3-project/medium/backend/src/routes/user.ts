import { Router } from 'express';
import { prismaClient } from '../prisma';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { JWT_SECRET } from '../config';

const router = Router();

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: 'Please provide email and password' });
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prismaClient.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ id: user.id }, JWT_SECRET as string, { expiresIn: '1h' });

    res.status(201).json({ token });
    return;
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(403).json({ error: 'Error while signing up' });
    return;
  }
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: 'Please provide email and password' });
    return;
  }

  try {
    const user = await prismaClient.user.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      res.status(403).json({ error: 'Invalid password' });
      return;
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET as string, { expiresIn: '1h' });

    res.status(200).json({ token });
    return;
  } catch (error) {
    console.error('Signin Error:', error);
    res.status(403).json({ error: 'Error while signing in' });
    return;
  }
});

export default router;
