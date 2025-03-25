const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authenticateToken = require('../middleware/auth');
const prisma = new PrismaClient();

const router = express.Router();

router.post('/', authenticateToken, async (req, res) => {
  const { movieId, reviewText, rating } = req.body;
  const { id: userId } = req.user;

  const review = await prisma.review.create({
    data: {
      reviewText,
      rating,
      userId,
      movieId,
    },
  });

  res.status(201).json({ message: 'Review posted successfully', review });
});

router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { reviewText, rating } = req.body;
  const { id: userId } = req.user;

  const review = await prisma.review.findUnique({
    where: { id: parseInt(id) },
  });

  if (!review || review.userId !== userId) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const updatedReview = await prisma.review.update({
    where: { id: parseInt(id) },
    data: { reviewText, rating },
  });

  res.json({ message: 'Review updated', updatedReview });
});

router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  const review = await prisma.review.findUnique({
    where: { id: parseInt(id) },
  });

  if (!review || review.userId !== userId) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  await prisma.review.delete({
    where: { id: parseInt(id) },
  });

  res.json({ message: 'Review deleted' });
});

router.post('/:id/like', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  const review = await prisma.review.findUnique({
    where: { id: parseInt(id) },
  });

  if (!review) {
    return res.status(404).json({ error: 'Review not found' });
  }

  const existingLike = await prisma.reviewLike.findFirst({
    where: { reviewId: parseInt(id), userId },
  });

  if (existingLike) {
    return res.status(400).json({ error: 'You have already liked this review' });
  }

  const like = await prisma.reviewLike.create({
    data: {
      reviewId: parseInt(id),
      userId,
    },
  });

  await prisma.review.update({
    where: { id: parseInt(id) },
    data: { likesCount: { increment: 1 } },
  });

  res.json({ message: 'Review liked', like });
});

router.delete('/:id/like', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  const review = await prisma.review.findUnique({
    where: { id: parseInt(id) },
  });

  if (!review) {
    return res.status(404).json({ error: 'Review not found' });
  }

  const existingLike = await prisma.reviewLike.findFirst({
    where: { reviewId: parseInt(id), userId },
  });

  if (!existingLike) {
    return res.status(400).json({ error: 'You have not liked this review' });
  }

  await prisma.reviewLike.delete({
    where: { id: existingLike.id },
  });

  await prisma.review.update({
    where: { id: parseInt(id) },
    data: { likesCount: { decrement: 1 } },
  });

  res.json({ message: 'Review unliked' });
});

module.exports = router;
