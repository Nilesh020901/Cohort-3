const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000
const db = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const roomRoutes = require("./routes/roomRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/room", roomRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/payments", paymentRoutes);

app.get("/", (req, res) => {
    res.send('Hotel Booking System API');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});