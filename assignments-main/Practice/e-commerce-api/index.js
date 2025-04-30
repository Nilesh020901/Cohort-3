const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRouter = require("./routes/authRoutes");
const productRouter = require("./routes/productRoutes");
const cartRouter = require("./routes/cartRouter");
const orderRouter = require("./routes/orderRoutes");

dotenv.config();

app.use(cors);
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("api/v1/product", productRouter);
app.use("api/v1/cart", cartRouter);
app.use("api/v1/orders", orderRoutes)

mongoose.connect(process.env.MONGO_URL, { userNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("MONGODB Connected"))
.catch(error => console.log(error));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))