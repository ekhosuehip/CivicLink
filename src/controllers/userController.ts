import { Request, Response, NextFunction } from "express";
import userService from "../service/userService";

// Register a user
export const addUser = async (req: Request, res: Response, next: NextFunction) => {
  const { fullName, email, phone, nin } = req.body;

  try {
    // Check if user already exists by email, phone, or NIN
    const existingUser = await userService.findUserByEmailPhoneNin({ email, phone, nin });

    if (existingUser) {
      return res.status(404).json({ message: "User already exists" });
    }

    // Add new user
    const newUser = await userService.addUser({ fullName, email, phone, nin });

    res.status(201).json({ message: "User added successfully", user: newUser });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ message: "Server error" });
  }
};
