import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { DecodedUser } from "../interfaces/Users";
import dotenv from 'dotenv'

dotenv.config();

const secretKey: string | undefined = process.env.ACCESS_TOKEN_SECRET;

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  console.log("Extracted Token:", token);
  
  if (!token) {
    res.status(401).json({ message: "Unauthorized. Token not provided." });
    return;
  }

  try {
    const decoded = jwt.verify(token, secretKey as string) as DecodedUser;
    req.body.user = decoded;

    next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};
