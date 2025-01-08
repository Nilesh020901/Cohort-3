import dotenv from "dotenv";
import express, { Request, Response } from "express";
import mongoose from "mongoose";

import { userRouter } from "./routes/user";
import { adminRouter } from "./routes/admin";
import { courseRouter } from "./routes/course";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

async function main(): Promise<void> {
    try {
        const MONGO_URL: string = process.env.MONGO_URL as string;
        await mongoose.connect(MONGO_URL);
        console.log('Connected to MongoDB');

        app.listen(3000, () => {
            console.log("Listening on port 3000");
        });
    } catch (error:any) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

main();
