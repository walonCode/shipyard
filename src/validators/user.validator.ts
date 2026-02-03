import z from "zod";

export const userPatchSchema = z.object({
	age: z.number().max(100),
	address: z.string().min(1),
});
