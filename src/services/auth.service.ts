import { eq } from "drizzle-orm";
import { db } from "../config/drizzle";
import { user } from "../models/user.model";
import type { Result } from "../types/types";

export async function getUser(email:string) {
  const [userExist] = await db.select().from(user).where(eq(user.email, email)).limit(1).execute()
  return userExist;
}

export async function createUser(username:string, email:string, password:string):Promise<Result<any>> {
  const [newUser] = await db.insert(user).values({
    username,
    email,
    password
  }).returning().execute()
  
  if (!newUser) {
    return { success:false, error:"failed to create user"}
  }
  
  return { success:true, data:newUser}
}