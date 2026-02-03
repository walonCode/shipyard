import jwt from "jsonwebtoken";

export function getToken(id: string, role: string) {
	return jwt.sign({ id, role }, process.env.SECRET!);
}

export function verifyToken(token: string) {
	return jwt.verify(token, process.env.SECRET!) as { id: string; role: string };
}
