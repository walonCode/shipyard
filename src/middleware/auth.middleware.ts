import type { NextFunction, Request, Response } from "express";
import logger from "../config/logger";
import { verifyToken } from "../utils/jwt";

export async function authMiddleware() {
	return async (req: Request, res: Response, next: NextFunction) => {
		const token = req.cookies.access_token;
		const data = verifyToken(token);

		if (!token || !data) {
			logger.info("user is not authenticated");
			res.status(401).json({
				success: false,
				error: "User not authenticated",
			});
		}

		req.user = {
			id: data.id,
			role: data.role,
		};

		next();
	};
}
