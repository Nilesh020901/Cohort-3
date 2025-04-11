// You have to create a middleware for rate limiting a users request based on their username passed in the header

// Your task is to create a global middleware (app.use) which will
// rate limit the requests from a user to only 5 request per second
// If a user sends more than 5 requests in a single second, the server
// should block them with a 404.
// User will be sending in their user id in the header as 'user-id'
// You have been given a numberOfRequestsForUser object to start off with which
// clears every one second

// This object will hold the count of requests per user

// Store the interval ID so we can clear it in tests

// Middleware to rate limit based on user-id

// Initialize user data if not already present

const express = require("express");

const app = express();


let numberOfRequestsForUser = {}

const intervals = setInterval(() => {
  numberOfRequestsForUser = {}
}, 1000);

const ratelimitmiddleware = (req, res, next) => {
  const userId = req.header("user-id");

  if (!userId) {
    return res.status(404).json({
      message: "UserId is required"
    });
  }

  if (!numberOfRequestsForUser[userId]) {
    numberOfRequestsForUser[userId] = 0;
  }

  if (!numberOfRequestsForUser[userId] > 5) {
    return res.status(404).json({ message: "You tried more than 5 times"});
  }

  numberOfRequestsForUser++;
  next();
}

<<<<<<< HEAD
=======
app.use(ratelimitmiddleware);
>>>>>>> e485c4eb8b973e13ef18baf63d425c8ba2d37e39

app.get("/", (req, res) => {
  res.send('You have access to this data!');
})

app.listen(3000);
