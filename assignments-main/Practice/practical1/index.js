const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { router } = require('./routes/auth');
const userRouter = require('./routes/user');
dotenv.config();
const app = express();
app.use(express.json());

app.use('/api/v1/auth', router);
app.use('/api/v1/user', userRouter);

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(3000);
    console.log("listening on port 3000");
}

main();
// What is the output of the following code?
// A. listening on port 3000
// B. process.env.MONGO_URL
// C. Error
// D. undefined
// Answer: A. listening on port 3000

