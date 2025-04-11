const express = require("express");
const app = express();

function middleware(req, res, next) {
  const user = req.query.user;
  if (!user) {
    return res.status(401).send("Unauthorized: No user provided");
  }

  const httpMethod = req.method;
  const url = req.url;
  const timestamp = new Date().toString();
  console.log(`Request Method: ${httpMethod}`);
  console.log(`Request URL: ${url}`);
  console.log(`Timestamp: ${timestamp}`);
  next();
}

app.use(middleware);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});