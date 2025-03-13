type Tool = "rect" | "circle" | "line" | "pencil";
import { getExistingShapes } from "./http";

type Shape = {
    type: "rect";
    x: number;
    y: number;
    width: number;
    height: number;
} | {
    type: "circle";
    centerX: number;
    centerY: number;
    radius: number;
} | {
    type: "line";
    x1: number;
    y1: number;
    x2: number;
    y2: number;
} | {
    type: "pencil";
    points: { x: number, y: number }[];
}

export class Game {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private existingShapes: Shape[];
    private roomId: string;
    private clicked: boolean;
    private startX = 0;
    private startY = 0;
    private selectedTool: Tool = "circle";

    socket: WebSocket;

    constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
        this.existingShapes = [];
        this.roomId = roomId;
        this.socket = socket;
        this.clicked = false;
        this.init();
        this.initHandlers();
        this.initMouseHandlers();
    }

    destroy() {
        this.canvas.removeEventListener("mousemove", this.mouseMoveHandler);
        this.canvas.removeEventListener("mousedown", this.mouseDownHandler);
        this.canvas.removeEventListener("mouseup", this.mouseUpHandler);
    }

    setTool(tool: Tool) {
        this.selectedTool = tool;
    }

    async init() {
        this.existingShapes = await getExistingShapes(this.roomId);
        this.clearCanvas();
    }

    initHandlers() {
        this.socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.type === "chat") {
                const parsedShape = JSON.parse(message.message);
                this.existingShapes.push(parsedShape.shape);
                this.clearCanvas();
            }
        }
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "rgba(0, 0, 0, 1)";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.existingShapes.forEach((shape) => {
            this.ctx.strokeStyle = "rgba(255, 255, 255)";
            this.ctx.beginPath();
            if (shape.type === "rect") {
                this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
            } else if (shape.type === "circle") {
                this.ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, 2 * Math.PI);
            }
            this.ctx.stroke();
            this.ctx.closePath();
        });
    }

    getMousePosition(e: MouseEvent) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    mouseDownHandler = (e: MouseEvent) => {
        this.clicked = true;
        const { x, y } = this.getMousePosition(e);
        this.startX = x;
        this.startY = y;
    }

    mouseUpHandler = (e: MouseEvent) => {
        this.clicked = false;
        const { x, y } = this.getMousePosition(e);
        const width = x - this.startX;
        const height = y - this.startY;

        let shape: Shape | null = null;

        if (this.selectedTool === "rect") {
            shape = {
                type: "rect",
                x: this.startX,
                y: this.startY,
                width,
                height
            }
        } else if (this.selectedTool === "circle") {
            const radius = Math.sqrt(width ** 2 + height ** 2);
            shape = {
                type: "circle",
                centerX: this.startX,
                centerY: this.startY,
                radius
            }
        }

        if (shape) {
            this.existingShapes.push(shape);
            this.socket.send(JSON.stringify({
                type: "chat",
                message: JSON.stringify({ shape }),
                roomId: this.roomId
            }));
            this.clearCanvas();
        }
    }

    mouseMoveHandler = (e: MouseEvent) => {
        if (this.clicked) {
            const { x, y } = this.getMousePosition(e);
            const width = x - this.startX;
            const height = y - this.startY;

            this.clearCanvas();

            this.ctx.strokeStyle = "rgba(255, 255, 255)";
            this.ctx.beginPath();
            if (this.selectedTool === "rect") {
                this.ctx.strokeRect(this.startX, this.startY, width, height);
            } else if (this.selectedTool === "circle") {
                const radius = Math.sqrt(width ** 2 + height ** 2);
                this.ctx.arc(this.startX, this.startY, radius, 0, 2 * Math.PI);
            }
            this.ctx.stroke();
            this.ctx.closePath();
        }
    }

    initMouseHandlers() {
        this.canvas.addEventListener("mousedown", this.mouseDownHandler);
        this.canvas.addEventListener("mouseup", this.mouseUpHandler);
        this.canvas.addEventListener("mousemove", this.mouseMoveHandler);
    }
}
