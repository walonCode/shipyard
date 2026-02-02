import type { Request, Response } from "express";
import logger from "../config/logger";
import { loginSchema } from "../validators/auth.validator";

export async function login(req: Request, res: Response,) {
  try { 
    const body = req.body
    //validate the request 
    const {data ,success } = loginSchema.safeParse(body)
    if (!success) {
      res.status(400).json({
        success: false,
        error:"invalid request body",
      })
    }
    
    
  } catch (err) {
    logger.error(err)
    res.status(500).json({
      success: false,
      error:"something went wrong",
    })
  }
}