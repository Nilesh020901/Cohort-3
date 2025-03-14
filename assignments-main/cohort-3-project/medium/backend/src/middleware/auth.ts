import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

interface id {
    id: string;
}

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"] ?? "";

    if (!authHeader) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    try {
        const decoded = jwt.verify(authHeader, JWT_SECRET as string) as id;
        if (!decoded.id) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        req.userId = decoded.id;
        next();
    } catch (error) {
        console.error("Auth Error:", error);
        res.status(403).json({ error: "Error while authenticating" });
        return;
    }
};