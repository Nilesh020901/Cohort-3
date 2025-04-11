// You have to create a middleware for logging the number of requests on a server

const express = require('express');

const app = express();

// You have been given an express server which has a few endpoints.
// Your task is to create a global middleware (app.use) which will
// maintain a count of the number of requests made to the server in the global
// requestCount variable

let requestCount = 0;

function middleware2(req, res, next) {
  const user = req.query.user;
  if (!user) {
    return res.status(401).send("Unauthorized: No user provided");
  }

  requestCount++;
  next();
}

app.use(middleware2);

app.get("/request-count", (req, res) => {
  res.send(`Request count: ${requestCount}`);
})

module.exports = app;