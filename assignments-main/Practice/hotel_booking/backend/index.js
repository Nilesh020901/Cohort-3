const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Database
const db = require("./config/db");

// Middleware
app.use(cors());
app.use(express.json());

// Static file access (image uploads)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
const authRoutes = require("./routes/authRoutes");
const roomRoutes = require("./routes/roomRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const editRoutes = require("./routes/editRouter");
const resetPasswordRoutes = require("./routes/forgetPassRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/room", roomRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/profile", editRoutes);              // Profile image upload
app.use("/api/reset", resetPasswordRoutes);

// Default route
app.get("/", (req, res) => {
    res.send("Hotel Booking System API is running");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}`);
});
