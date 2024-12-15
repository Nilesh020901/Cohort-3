//Try converting the calculator assignment to use POST endpoints. Check if it works with/without the express.json middleware

const express = require('express');
const app = express();

app.use(express.json());

app.post('/sum', (req, res) => {  
  const { a, b } = req.body;
  const result = Number(a) + Number(b);
  res.json({ result });
});

app.get('/sub', (req, res) => {
  const { a, b } = req.body;
  const result = Number(a) - Number(b);
  res.json({ result });
});

app.get('/mult', (req, res) => {
  const { a, b } = req.body;
  const result = Number(a) * Number(b);
  res.json({ result });
});

app.get('/div', (req, res) => {
  const { a, b } = req.body;
  const result = Number(a) / Number(b);
  res.json({ result });
});

app.listen(3000);