import z from "zod";

export const loginSchema = z.object({
	email: z.email().lowercase(),
	password: z.string().min(8),
});

export const signupSchema = z.object({
	username: z.string().min(1),
	email: z.email().lowercase(),
	password: z.string().min(8),
});
