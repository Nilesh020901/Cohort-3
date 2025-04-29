const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRouter = require("./routes/authRoutes");

dotenv.config();

app.use(cors);
app.use(express.json());

app.use("/api/v1/auth", authRouter);

mongoose.connect(process.env.MONGO_URL, { userNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("MONGODB Connected"))
.catch(error => console.log(error));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))