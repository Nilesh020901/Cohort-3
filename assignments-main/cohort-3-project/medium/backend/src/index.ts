import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import blogRoutes from "./routes/blogRoutes";

dotenv.config();

const app = express();
app.use(express.json()); //Middleware json ko parse karega

// Routes jo hum use kar rahe hai
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/user", blogRoutes);

const PORT = process.env.port || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});