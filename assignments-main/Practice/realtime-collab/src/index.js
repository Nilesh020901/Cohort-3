require("dotenv").config();

const express = require("express");
const http = require("http");
const { WebSocketServer } = require("ws");
const mongoose = require("mongoose");
const authRouter = require("./routes/authRoutes");
const teamRouter = require("./routes/teamRoutes");
const documentRouter = require("./routes/documentRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/teams", teamRouter);
app.use("/api/documents", documentRouter);

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("Connected to MongoDB"))
.catch(() => console.log("DB connection error"))

const server = http.createServer(app);

const wss = new WebSocketServer({ server })

const documentClients = new Map();
wss.on("connection", (ws) => {
    try {
        const { type, documentId, content } = JSON.parse(message);

        if (type === "join") {
            if (!documentClients.has(documentId)) {
                documentClients.set(documentId, new Set());
            }
            documentClients.get(documentId).add(ws);
            console.log(`Client joined document: ${documentId}`);
        }

        if (type === "update") {
            const clients = documentClients.get(documentId) || [];
            clients.forEach((client) => {
                if (client !== ws && client.readyState === ws.OPEN) {
                    client.send(JSON.stringify({ type: "update", content }));
                }
            });
            `Client joined document: ${documentId}`
        }
    } catch (error) {
        console.error('Error handling WebSocket message:', err);
    }
    
    ws.on("close", () => {
        console.log("Client disconnected");
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})