import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User {
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
        
        // Handle 'join' message type - when a user wants to join a room
        if (parseMessaged === "join") {
            allSockets.push({
                socket,
                parseMessaged.payload.roomId,
            })
        }

        if (parseMessaged === "chat") {
            let currentUserRoom = null;

            for (let i = 0; i < allSockets.length; i++) {
                if (allSockets[i].socket === socket) {
                    currentUserRoom = allSockets[i].room;
                }
            }

            for (let i = 0; i < allSockets.length; i++) {
                if (allSockets[i].room === currentUserRoom) {
                    allSockets[i].socket.send(parseMessaged.payload.message);
                }
            }
        }
    })
})