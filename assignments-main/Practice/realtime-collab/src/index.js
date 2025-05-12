require("dotenv").config();

const express = require("express");
const http = require("http");
const { WebSocketServer } = require("ws");
const mongoose = require("mongoose");
const authRouter = require("./routes/authRoutes");
const teamRouter = require("./routes/teamRoutes")

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/teams", teamRouter);

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("Connected to MongoDB"))
.catch(() => console.log("DB connection error"))

const server = http.createServer(app);

const wss = new WebSocketServer({ server })

wss.on("connection", (ws) => {
    console.log("New Client Connected")

    ws.on("message", (message) => {
        console.log("Recevied: ", message.toString());

        wss.clients.forEach(client => {
            if (client !== ws && client.readyState === ws.OPEN) {
                client.send(message.toString());
            }
        });
    });

    ws.on("close", () => {
        console.log("Client disconnected");
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})