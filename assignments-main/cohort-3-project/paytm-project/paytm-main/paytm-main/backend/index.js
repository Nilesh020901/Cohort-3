require('dotenv').config()
const express = require("express");
const cors = require("cors");
app.use(cors());
const app = express();
app.use(express.json());
const rootRouter = require("./routes/index");

app.use("/api/v1", rootRouter);


app.listen(3000);

