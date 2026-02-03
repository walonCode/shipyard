import { password } from "bun";
import type { Request, Response } from "express";
import logger from "../config/logger";
import type { NewUser } from "../dto/auth";
import { createUser, getUser } from "../services/auth.service";
import { getToken } from "../utils/jwt";
import { loginSchema, signupSchema } from "../validators/auth.validator";

export async function login(req: Request, res: Response) {
	try {
		const body = req.body;
		//validate the request
		const { data, success, error } = loginSchema.safeParse(body);
		if (!success) {
			logger.info("invalid request body", error);
			res.status(400).json({
				success: false,
				error: "invalid request body",
			});
		}

		//if user exist
		const userExist = await getUser(data?.email as string);
		const passwordMatch = await password.verify(
			data?.password as string,
			userExist?.password as string,
		);

		if (!passwordMatch || !userExist) {
			logger.info("invalid email or password");
			res.status(401).json({
				success: false,
				error: "invalid email or password",
			});
		}

		//create the token
		const token = getToken(userExist?.id as string, userExist?.role as string);

		//send the cookie
		res.cookie("access_token", token, {
			maxAge: 3600,
			httpOnly: true,
			sameSite: "lax",
			secure: true,
			path: "/",
		});

		logger.info("user login successful");
		//returning a 200 response
		res.status(200).json({
			success: true,
			message: "user login successful",
		});
	} catch (err) {
		logger.error(err);
		res.status(500).json({
			success: false,
			error: "something went wrong",
		});
	}
}

export async function signup(req: Request, res: Response) {
	try {
		const body = req.body;
		const { data, success, error } = signupSchema.safeParse(body);
		if (!success) {
			logger.error("invalid request body", error);
			res.status(400).json({
				success: false,
				error: "invalid request body",
			});
		}

		const userExist = await getUser(data?.email as string);
		if (userExist) {
			logger.info("user exist");
			res.status(403).json({
				success: false,
				error: "user already exist",
			});
		}

		const passwordHash = await password.hash(data?.password as string);

		const {
			success: createSuccess,
			data: newUser,
			error: createError,
		} = await createUser(
			data?.username as string,
			data?.email as string,
			passwordHash,
		);
		if (!createSuccess) {
			logger.error("user creation error", createError);
			res.status(500).json({
				success: false,
				error: "internal server error",
			});
		}

		const token = getToken(newUser.id, newUser.role);

		res.cookie("access_token", token, {
			maxAge: 3600,
			httpOnly: true,
			secure: true,
			sameSite: "lax",
			domain: ".url.com",
			path: "/",
		});

		logger.info("user signup successful");
		// the user data to send with out password
		const user: NewUser = {
			username: newUser.username,
			email: newUser.email,
			role: newUser.role,
			createdAt: newUser.createdAt,
		};

		//sending the success response
		res.status(201).json({
			success: true,
			message: "user signup successful",
			data: {
				user,
			},
		});
	} catch (err) {
		logger.error(err);
		res.status(500).json({
			success: false,
			error: "something went wrong",
		});
	}
}

export async function logout(_req: Request, res: Response) {
	try {
		res.clearCookie("access_token", {
			httpOnly: true,
			secure: true,
			domain: ".url.com",
			sameSite: "lax",
			path: "/",
		});

		res.status(200).json({
			success: true,
			message: "logout successful",
		});
	} catch (err) {
		logger.error(err);
		res.status(500).json({
			success: false,
			error: "something went wrong",
		});
	}
}
