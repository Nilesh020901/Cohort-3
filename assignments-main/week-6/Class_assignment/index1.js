const express = require("express");
const app = express();
const JWT_SECRET = "USER_APP";

app.use(express.json());

const users = [];

app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  users.push({
    username,
    password
  })

  res.json({
    message: "You have successfully signed up!"
  })
});

app.post("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    const token = jwt.sign({
      username: user.username
    }, JWT_SECRET)
    user.token = token;
    res.send({
      token
    })
    console.log(users);
  }
  else {
    res.status(403).send({
      message: "Invalid username or password"
    })
  }
});

app.get("/me", (req, res)=>{
  const token = req.headers.authorization;
  const userDetails = jwt.verify(token, JWT_SECRET);

  const username = userDetails.username;
  const user = users.find(user => user.username === username);
  
  if (user) {
    res.send({
      username: user.username
    })
  }
  else {
    res.status(403).send({
      message: "Unauthorised"
    })
  }
})

app.listen(3000);