import express from "express";
import userRouter from "./routes/user";
import blogRouter from "./routes/blog";
import cors from "cors";

type Bindings = {
    Database_URL: string;
    JWT_SECRET: string;
};

const app = express();
app.use(cors());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/blog", blogRouter);

export default app;