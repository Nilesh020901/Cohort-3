import express from 'express';
import userRouter from './routes/user';
import blogRouter from './routes/blog';

const app = express();
app.use(express.json());

//user routes
app.use('/user', userRouter);

//blog routes
app.use('/blog', blogRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});