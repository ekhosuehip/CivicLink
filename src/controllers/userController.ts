import { Request, Response, NextFunction } from "express";
import userService from "../service/userService";

// Register a user
export const addUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, phone, position } = req.body;

  try {

    // Check if user already exists by email, phone, or position
    const existingUser = await userService.findUserByEmailPhonePosition({ email, phone, position });

    if (existingUser) {
      res.status(409).json({ message: "User already exists" });
      return;
    }

    // Add new user
    const newUser = await userService.addUser(req.body);

    res.status(201).json({ message: "User added successfully", user: newUser });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ message: "Server error" });
    return;
  }
};

export const getOfficials = async (req: Request, res: Response, next: NextFunction) => {

  try {

    const officials = await userService.getUserByCategory()
    res.status(200).json({
      success: true,
      message: 'Officials fetched successfully',
      data: officials
    });
    return
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

export const getUser = async (req: Request, res: Response, next: NextFunction) => {

  try {
    
    const users = await userService.getUser()
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully',
      data: users
    });
    return
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}