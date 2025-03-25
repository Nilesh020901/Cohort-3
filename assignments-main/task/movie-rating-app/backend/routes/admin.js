const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authenticateToken = require('../middleware/auth');
const prisma = new PrismaClient();

const router = express.Router();

router.post('/movies', authenticateToken, async (req, res) => {

  const { title, description, releaseDate } = req.body;

  const movie = await prisma.movie.create({
    data: {
      title,
      description,
      releaseDate,
    },
  });

  res.status(201).json({ message: 'Movie added successfully', movie });
});

router.put('/movies/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { title, description, releaseDate } = req.body;

  const movie = await prisma.movie.update({
    where: { id: parseInt(id) },
    data: {
      title,
      description,
      releaseDate,
    },
  });

  res.json({ message: 'Movie updated successfully', movie });
});

router.delete('/movies/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  await prisma.movie.delete({
    where: { id: parseInt(id) },
  });

  res.json({ message: 'Movie deleted successfully' });
});

router.get('/reviews', authenticateToken, async (req, res) => {
  const reviews = await prisma.review.findMany({
    include: { user: true, movie: true },
  });

  res.json(reviews);
});

module.exports = router;
