const express = require("express");
const app = express();

app.use((req, res, next) => {
    console.log("next");
    next();
});

app.get("/", (req, res) => {
    res.send("Middleware example in Node.js");
});

app.listen(3000);