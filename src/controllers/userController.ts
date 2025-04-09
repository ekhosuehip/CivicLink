import { Request, Response, NextFunction } from "express";
import userService from "../service/userService";


// Register a user 
export const addUser = (req: Request, res: Response, next: NextFunction) => {
    const {fullName, email, phone, nin} = req.body
}