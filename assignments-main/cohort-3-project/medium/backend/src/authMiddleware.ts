import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.header("authorization") || "";

    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET as string);
        if (user) {
            req.userId = (user as any).id;
            next();
        }
    } catch (error: any) {
        console.error("JWT Error:", error);
        return res.status(403).json({ error: "Invalid or expired token" });
    }
}
