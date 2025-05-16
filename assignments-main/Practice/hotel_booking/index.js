const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000
const db = require("./config/db");
const authRoutes = require("./routes/authRoutes");

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send('Hotel Booking System API');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});