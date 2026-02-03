import jwt from "jsonwebtoken"

export function getToken(id: string) {
  return jwt.sign({id}, process.env.SECRET!)
}

export function verifyToken(token:string) {
  return jwt.verify(token, process.env.SECRET!) as { id:string }
}