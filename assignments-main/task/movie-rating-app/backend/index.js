const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
app.use(cors());
const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movies');
const reviewRoutes = require('./routes/reviews');
const adminRoutes = require('./routes/admin');

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/admin', adminRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
