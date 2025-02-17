const express = require("express");
const mongoose = require("mongoose");

app.use = express();

app.get("/api/message", (req, res) => {
    res.status(200).json({
        message: "Welcome to Express!"
    })
});

async function main() {
    await mongoose.connect("url of mongoose");
    app.listen(3000);
}

main();

app.listen(3000);