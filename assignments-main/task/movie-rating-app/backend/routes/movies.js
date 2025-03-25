const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const router = express.Router();

router.get('/', async (req, res) => {
  const movies = await prisma.movie.findMany();
  res.json(movies);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  
  const movie = await prisma.movie.findUnique({
    where: { id: parseInt(id) },
    include: { reviews: true },
  });

  if (!movie) {
    return res.status(404).json({ error: 'Movie not found' });
  }

  res.json(movie);
});

module.exports = router;
