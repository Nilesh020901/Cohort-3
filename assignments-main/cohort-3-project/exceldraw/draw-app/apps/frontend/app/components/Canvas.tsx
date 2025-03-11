import { initDraw } from "@/draw";
import { useEffect, useRef, useState } from "react";
import { IconButton } from "./IconButton";
import { Circle, RectangleHorizontalIcon, Pencil } from "lucide-react";
import { Game } from "@/draw/Game";

export type Tool = "circle" | "rect" | "pencil";
export function Canvas ({
    roomId,
    socket
} : {
    roomId: string,
    socket: WebSocket
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [game, setGame] = useState<Game>();
    const [selectedTool, setSelectedTool] = useState<Tool>("circle")

    useEffect(() => {
        if (canvasRef.current) {
            const g = new Game(canvasRef.current, roomId, socket);
            setGame(g);

            return () => {
                g.destroy();
            }
        }
    }, [canvasRef]);

    return (
        <div style={{height: "100vh", overflow: "hidden"}}>
            <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>
            <Topbar setSelectedTool={setSelectedTool} selectedTool={selectedTool} />
        </div>
    )
}

function Topbar({selectedTool, setSelectedTool} : {
    selectedTool: Tool,
    setSelectedTool: (s: Tool) => void
}) {
    return (
        <div style={{position: "fixed", top: 10, left: 10}}>
            <div className="flex gap-t">
                <IconButton icon={<Circle />} activated={selectedTool === "circle"} onClick={() => setSelectedTool("circle")} />
                <IconButton icon={<RectangleHorizontalIcon />} activated={selectedTool === "rect"} onClick={() => setSelectedTool("rect")} />
                <IconButton icon={<Pencil />} activated={selectedTool === "pencil"} onClick={() => setSelectedTool("pencil")} />
            </div>
        </div>
    )
}