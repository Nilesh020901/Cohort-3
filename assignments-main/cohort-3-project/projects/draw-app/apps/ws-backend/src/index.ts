import { WebSocket, WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { prismaClient } from "@repo/db/client";

const wss = new WebSocketServer({ port: 8080 });

interface User {
    ws: WebSocket,
    rooms: String[],
    userId: String
}

const users: User[] = [];

function checkUser(token: String): String | null {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if (typesof decoded == "String") {
            return null;
        }

        if (!decoded || !decoded.userId) {
            return null;
        }

        return decoded.userId;
    } catch (e) {
        return null;
    }
    return null;
}

ws.on("connection", function connection(ws, request) {
    const url = request.url;
    if (!url) {
        return;
    }

    const quaryParams = new URLSearchParams(url.split('?')[1]);
    const token = quaryParams.get('token') || "";
    const userId = checkUser(token);

    if (userId == null) {
        ws.close()
        return null;
    }

    users.push({
        userId,
        rooms: [],
        ws
    })

    ws.on("message", async function message(data) {
        let parsedData;
        if (typesof data !== "string") {
        parsedData = JSON.parse(data.toString());
    } else {
        parsedData = JSON.parse(data);
    }

    if (parsedData.type === "join_room") {
        const user = users.find(x => x.ws === ws);
        user?.rooms.push(parsedData.roomId);
    }

    if (parsedData.type === "leave_room") {
        const user = users.find(x => x.ws == ws);

        if (!user) {
            return;
        }

        user?.rooms.filter(x => x === parsedData.room);
    }

    console.log("message recived");
    console.log("parsedData");

    if (parsedData === "chat") {
        const roomId = parsedData.roomId;
        const message = parsedData.message;

        await prismaClient.chat.create({
            data: {
                roomId: Number(roomId),
                message,
                userId
            }
        });

        users.forEach(users => {
            if (user.rooms.includes(roomId)) {
                user.ws.send(JSON.stringify({
                    type: "chat",
                    message: message,
                    roomId
                }))
            }
        })
    }
});

