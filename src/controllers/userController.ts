import dotenv from 'dotenv';
import bcrypt from "bcryptjs";
import { Request, Response, NextFunction } from "express";
import citizenService from '../service/userService';
import officialService from '../service/officialService';
import { IAuthPayload } from "../interfaces/Users";
import { ObjectId } from "mongoose";
import jwt from "jsonwebtoken";

dotenv.config();

const saltRounds = 10;
// Register a user
export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, phone, password } = req.body;

  try {

    // Check if user already exists by email, phone, or position
    const existingUser = await citizenService.findUserByEmailPhone({ email, phone });
    console.log(existingUser);
    console.log(password);
    
    if (existingUser) {
      res.status(409).json({ message: "User already exists" });
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log(hashedPassword);
    
    req.body.password = hashedPassword;

    // Add new user
    const newUser = await citizenService.addUser(req.body);
    const userIdString = (newUser!._id as ObjectId).toString();
    
    // Generate JWT
    const payload: IAuthPayload = {userId: userIdString, email: email };
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "1h" });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    }).status(201).json({
        success: true,
        Message: 'User registered successfull',
        token: token,
        data: newUser
    });

  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ message: "Server error" });
    return;
  }
};

export const registerOfficial = async (req: Request, res: Response, next: NextFunction) => {
  const { email, phone, password } = req.body;

  try {

    // Check if official already exists by email, phone, or position
    const existingUser = await officialService.findUserByEmailPhone({ email, phone });
    console.log(existingUser);
    console.log(password);
    
    if (existingUser) {
      res.status(409).json({ message: "Official already exists" });
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log(hashedPassword);
    
    req.body.password = hashedPassword;

    // Add new user
    const newUser = await officialService.addOfficial(req.body);
    const userIdString = (newUser!._id as ObjectId).toString();
    
    // Generate JWT
    const payload: IAuthPayload = {userId: userIdString, email: email };
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "1h" });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    }).status(201).json({
        success: true,
        Message: 'User registered successfull',
        token: token,
        data: newUser
    });

  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ message: "Server error" });
    return;
  }
};

// User login
export const signIn = async (req: Request, res: Response, next: NextFunction) => {
  const { email, phone, password } = req.body;
  console.log(email, password);
  
  
  try {
      // Check if user already exists by email, phone
      const existingUser = await citizenService.findUserByEmailPhone({ email, phone });

      if (!existingUser) {
        res.status(401).json({
          success: false,
          message: 'Incorrect email or phone number'
      });
      return;
      }

      const userIdString = (existingUser!._id as ObjectId).toString();
      console.log(userIdString);
      const storedHashedPassword = existingUser!.password;
      console.log("Here")
      console.log(storedHashedPassword);
      

      const isMatch = await bcrypt.compare(password, storedHashedPassword)
      if (!isMatch) {
          console.log("Incorrect");
          res.status(401).json({
              success: false,
              message: 'Incorrect email or password'
          });
        return
      }

      // Generate JWT
      const payload: IAuthPayload = {userId: userIdString, email: email};
      const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "1h" });
      res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
      })
      .status(200).json({
          success: true, 
          message: 'login successful.',
          token: token
      });
      console.log(token);
      
      console.log(req.body.user);
      
      return
      
  } catch (error) {
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
    return  
  } 
}

// Get officials by filter
export const getByNameJurisdictionOrPosition = async (req: Request, res: Response) => {
  const { fullName, jurisdiction, position } = req.query as {
          fullName?: string;
          jurisdiction?: string;
          position?: string;
      };
  try {
      const {userId} = req.body;
      console.log(`id is working ${userId}`);
      const officials = await officialService.getByNameJurisdictionOrPosition({
          fullName,
          jurisdiction,
          position,
          userId
      });

      if (officials.length > 0) {
          res.status(200).json(officials);
          console.log("found");
          
          return;
      } else {
          res.status(404).json({ message: 'No officials found matching the criteria' });
          return;
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving officials', error });
      return;
  }
}

// Get all citizens
export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const { fullName, email } = req.query as {
          fullName?: string;
          email?: string;
       
      };
  try {
      const userId = req.body.userId;
      console.log(`id is working ${userId}`);
      
      
      const officials = await citizenService.getByNameOrEmail({
          fullName,
          email,
          userId
      });


      if (officials.length > 0) {
          res.status(200).json(officials);
          console.log("found");
          
          return;
      } else {
          res.status(404).json({ message: 'No citizen found matching the criteria' });
          return;
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving citizen', error });
      return;
  }
}

// Delete citizen
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.body.id;
  console.log(req.body);
  console.log(id);
  
  
  try {
    const user = await citizenService.deleteUser(id);
    res.status(200).json({
      success: true,
      message: `Note with id: ${id} deleted successfully`,
      deletedNote: user
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

// Logout
export const logoutUser = (req: Request, res: Response) => {
  res.clearCookie("token").json({ message: "Logout successful." });
};