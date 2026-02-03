import { eq } from "drizzle-orm";
import { db } from "../config/drizzle";
import { user } from "../models/user.model";
import type { Result } from "../types/types";

export async function getUser(email: string) {
	const [userExist] = await db
		.select()
		.from(user)
		.where(eq(user.email, email))
		.limit(1)
		.execute();
	return userExist;
}

export async function createUser(
	username: string,
	email: string,
	password: string,
): Promise<Result<any>> {
	const [newUser] = await db
		.insert(user)
		.values({
			username,
			email,
			password,
		})
		.returning()
		.execute();

	if (!newUser) {
		return { success: false, error: "failed to create user" };
	}

	return { success: true, data: newUser };
}

export async function getUserById(id: string) {
	const [userExist] = await db.select().from(user).where(eq(user.id, id));

	return userExist;
}

export async function updateUserById(age: number, address: string, id: string) {
	const [updatedUser] = await db
		.update(user)
		.set({
			age,
			address,
		})
		.where(eq(user.id, id))
		.returning()
		.execute();

	return updatedUser;
}


export async function deleteUserById(id: string) {
  return await db.delete(user).where(eq(user.id, id)).execute()
}
