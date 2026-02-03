import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { eq } from "drizzle-orm";
import { db } from "../../../src/config/drizzle";
import { user } from "../../../src/models/user.model";
import { createUser, getUser } from "../../../src/services/auth.service";

describe("getUser test ", () => {
	beforeEach(async () => {
		await db.insert(user).values({
			username: "test",
			email: "test@test.com",
			password: "password",
		});
	});

	afterEach(async () => {
		await db.delete(user).where(eq(user.email, "test@test.com"));
	});

	it("success case", async () => {
		const user = await getUser("test@test.com");

		expect(user).toBeDefined();
		expect(user.email).toMatch("test@test.com");
	});

	it("fail case", async () => {
		const user = await getUser("test@test1.com");

		expect(user).toBeUndefined();
	});
});

describe("createUser test", () => {
	afterEach(async () => {
		db.delete(user).where(eq(user.email, "test@test.com"));
	});

	it("success case", async () => {
		const { success, data, error } = await createUser(
			"test",
			"test@test.com",
			"password",
		);

		expect(success).toBe(true),
			expect(error).toBeUndefined(),
			expect(data.email).toMatch("test@test.com");
	});
});
