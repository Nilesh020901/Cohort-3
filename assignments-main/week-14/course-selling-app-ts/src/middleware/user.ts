import { Request, Response, NextFunction } from "express";
import jwt, { decode } from "jsonwebtoken";
import { JWT_USER_PASSWORD } from "../config";

// Extend Express Request to include `userId` for routes
declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

export function userMiddleware(req: Request, res: Response, next: NextFunction): void{
    try {
        const token = req.headers.token as string;

        if (!token) {
            res.status(403).json({ message: "You are not signed in or token not provided" });
            return;
        }

        const decoded = jwt.verify(token, JWT_USER_PASSWORD) as { id: string };
        if(decoded) {
            req.userId = decoded.id;
            next();
        } else {
            res.status(403).json({
                message: "Invalid token. You are not signed in."
            });
        }
    } catch (error:any) {
        res.status(403).json({
            message: error.message || "You are Signed in",
        });
    }
}