import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

export function middleware(req: Request, res: Response, next: NextFunction) {
	try {
		const token = req.headers["authorization"] ?? "";
		const decoded = jwt.verify(token, JWT_SECRET);

		if (decoded) {
		// @ts-ignore: TODO: Fix this
			req.userId = decoded.userId;
			next();
		} else {
			res.status(403).json({ message: "Unauthorized" })
		}
	} catch(e) {
		res.status(503).json({ message: "Internal Server Error" })
	}
}