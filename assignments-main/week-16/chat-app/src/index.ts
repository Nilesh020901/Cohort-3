import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User{
    socket: WebSocket;
    room: string;
}

// Array to store all active WebSocket connections and their room assignments
let allSockets: User[] = [];

// Listen for new WebSocket connections
wss.on("connection", (socket) => {
    // Handle incoming messages from clients
    socket.on("message", (message) => {
        // Parse the incoming message from JSON string to object
        const parsedMessage = JSON.parse(message.toString());
    })
})