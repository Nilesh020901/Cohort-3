"use client"

import { WS_URL } from "@/config"
import { initDraw } from "@/draw"
import { useEffect, useRef, useState } from "react"
import { Canvas } from "./Canvas"

export function RoomCanvas({ roomId } : { roomId: string }) {
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        //here need modification
        const ws = new WebSocket(`${WS_URL}/chats/${roomId}`);
        ws.onopen = () => {
            setSocket(ws);
            const data = JSON.stringify({ 
                type: "join_room",
                roomId 
            });
            ws.send(data);
        }
    }, [])

    if (!socket) {
        return <div>Connecting Server...</div>
    }

    return (
        <Canvas roomId={roomId} socket={socket} />
    )
}