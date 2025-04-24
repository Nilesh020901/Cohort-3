const express = require("express");
const mongoose = require("mongoose");


const app = express();
app.use(express.json());

app.use("api/v1/user")

async function main() {
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(3000);
    console.log("listen on port 3000");
}

main(); 