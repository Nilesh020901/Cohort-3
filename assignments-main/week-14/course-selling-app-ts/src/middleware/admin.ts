import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_ADMIN_PASSWORD } from "../config";
import { string } from "zod";

// Extend Express Request to include `userId` for routes
declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

export function adminMiddleware(req: Request, res: Response, next: NextFunction): void {
    try {
        const token = req.headers.token as string;

        if (!token) {
            res.status(404).json({
                message: "Token not provided. You are not signed in.",
            });
        }
        const decoded = jwt.verify(token, JWT_ADMIN_PASSWORD) as { id: string };
        if (decoded) {
            req.userId = decoded.id;
            next();
        } else {
            res.status(404).json({
                message: "Invalid token. You are not signed in.",
            });
        }
    } catch (error: any) {
        res.status(403).json({
            message: error.message || "You are not signed in.",
        });
    }
}