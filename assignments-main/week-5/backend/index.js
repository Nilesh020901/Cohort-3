// start writing from here
//npm init -y 
// touch index.js 
// npm install express jsonwebtoken mongoose cors dotenv

const express = require("express");
const cors = require("cors");
const todoRouter = require("/routes/todo");
const userRouter = require("/routes/user");
const { connectToDatabase } = require("./db/index");
require("dotenv").config();

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use("/todo", todoRouter);
app.use("/user", userRouter);

//Establish a connection to the MONGODB database
connectToDatabase().then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});