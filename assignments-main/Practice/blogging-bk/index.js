const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authrouter = require("./routes/authroutes");
const blogrouter = require("./routes/blogrouter");
const userrouter = require("./routes/userrouter");
const app = express()

dotenv.config();
connectDB

app.use(express.json());

app.use("/api/v1/auth", authrouter);
app.use("/api/v1/blog", blogrouter);
app.use("/api/v1/users", userrouter);

app.get("/", (req, res) => {
    res.send("API is running...");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))