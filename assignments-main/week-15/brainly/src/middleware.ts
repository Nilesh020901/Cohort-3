import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_USER_PASSWORD } from "./config";

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

export function userMiddleware(req: Request, res:Response, next: NextFunction): void {
    try {
        const authHeader = req.headers.authorization;

        if(!authHeader) {
            res.status(403).json({ message: "Authorization header is missing. You are not signed in." });
            return;
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            res.status(404).json({ message: "Token is not provided in the Authorization" });
            return;
        }

        const decoded = jwt.verify(token, JWT_USER_PASSWORD) as { userId: string };
        if(decoded) {
            req.userId = decoded.userId;
            next();
        } else {
            res.status(403).json({
                message: "Invalid token. You are not signed in."
            });
        }
    } catch (error: any) {
        if (error.name === "TokenExpriedError") {
            res.status(404).json({ message: "Token has expired. Please sign in again." });
            return;
        }
        res.status(500).json({ message: "An error occurred while verifying the token." });
    }
}