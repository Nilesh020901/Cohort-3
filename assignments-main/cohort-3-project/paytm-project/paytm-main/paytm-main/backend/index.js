require('dotenv').config()
const express = require("express");
const cors = require("cors");
app.use(cors());
const app = express();
app.use(express.json());
const rootRouter = require("./routes/index");
const mongoose = require("mongoose");

app.use("/api/v1", rootRouter);


async function main() {
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(3000);
    console.log("listening on port 3000")
}

main()

