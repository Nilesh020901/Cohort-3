import { HTTP_BACKEND_URL } from "@/config";
import axios from "axios";

type Shape = {
    type: "rect",
    x: number,
    y: number,
    width: number,
    height: number
} | {
    type: "circle",
    centerX: number,
    centerY: number,
    radius: number
} | {
    type: "pencil",
    points: {x: number, y: number}[]
}

export async function initDraw(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
    
}