const express = require('express');
const app = express();

// Middleware to log request details
app.use((req, res, next) => {
  const method = req.method;
  const url = req.url;
  const time = new Date().toISOString();
  console.log(`${method} ${url} ${time}`);
  next();
});

let reqcount = 0;

// Middleware to count requests
app.use((req, res, next) => {
  reqcount++;
  console.log(`Request count: ${reqcount}`);
  next();
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
