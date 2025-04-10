import { Request, Response, NextFunction } from "express";
import userService from "../service/userService";

// Register a user
export const addUser = async (req: Request, res: Response, next: NextFunction) => {
  const { fullName, email, phone, position, stateOfOrigin } = req.body;

  try {
    // Check if user already exists by email, phone, or NIN
    const existingUser = await userService.findUserByEmailPhonePosition({ email, phone, position });

    if (existingUser) {
      res.status(404).json({ message: "User already exists" });
      return;
    }

    // Add new user
    const newUser = await userService.addUser(req.body);

    res.status(201).json({ message: "User added successfully", user: newUser });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ message: "Server error" });
  }
};
