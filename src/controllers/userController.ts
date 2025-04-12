import dotenv from 'dotenv';
import bcrypt from "bcryptjs";
import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";
import citizenService from '../service/userService';
import officialService from '../service/officialService';
import { IAuthPayload } from "../interfaces/Users";
import { ObjectId } from "mongoose";
import jwt from "jsonwebtoken";
import Citizen from '../models/User';

dotenv.config();

const webtoken = process.env.AUTH_TOKEN
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
export const getByNameJurisdictionOrPosition = async (req: AuthenticatedRequest, res: Response,  next: NextFunction) => {
  const { fullName, jurisdiction, position } = req.query as {
          fullName?: string;
          jurisdiction?: string;
          position?: string;
      };
  try {
      const userId = req.user!.userId;
      console.log("useri",userId);
      
      console.log(`id is working ${userId}`);
      const officials = await officialService.getByNameJurisdictionOrPosition({
          fullName,
          jurisdiction,
          position,
          userId
      });

      if (officials.length > 0) {
          res.status(200).json({
            success: true,
            data: officials
          });
          console.log("found");
          
          return;
      } else {
          res.status(404).json({ 
            success: false,
            message: 'No officials found matching the criteria' });
          return;
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ 
        success: false,
        message: 'Error retrieving officials', error });
      return;
  }
}

// Get citizens by filter
export const getUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const { fullName, email } = req.query as {
          fullName?: string;
          email?: string;
       
      };
  try {
      const userId = req.user!.userId;
      console.log(`id is working ${userId}`);
      
      
      const officials = await citizenService.getByNameOrEmail({
          fullName,
          email,
          userId
      });


      if (officials.length > 0) {
          res.status(200).json({
            success: true,
            data: officials
          });
          console.log("found");
          
          return;
      } else {
          res.status(404).json({ 
            success: false,
            message: 'No citizen found matching the criteria' });
          return;
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ 
        success: false,
        message: 'Error retrieving citizen', error });
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


// get all officials
export const getAllOfficial = async (req: Request, res: Response, next: NextFunction) => {
  
  try {

      const officials = await officialService.getAllOfficials()

      if (officials.length > 0) {
          res.status(200).json({
            success: true,
            data: officials
          });
          console.log("found");
          
          return;
      } else {
          res.status(404).json({ 
            success: false,
            message: 'No officials found matching the criteria' });
          return;
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ 
        success: false,
        message: 'Error retrieving officials', error });
      return;
  }
}

// Get officials by filter with token
export const getOfficialWithToken = async (req: Request, res: Response, next: NextFunction) => {
  const { fullName, jurisdiction, position } = req.query as {
          fullName?: string;
          jurisdiction?: string;
          position?: string;
      };

  const authToken = req.params.authToken
  console.log(authToken);
  console.log("Here");
  
  
  if (authToken != webtoken){
    res.send(404).json({success: false, message: "Token needed"})
    return;
  }
  try {

      const officials = await officialService.getWithoutAuth({
          fullName,
          jurisdiction,
          position,
      });

      if (officials.length > 0) {
          res.status(200).json({
            success: true,
            data: officials
          });
          console.log("found");
          
          return;
      } else {
          res.status(404).json({ 
            success: false,
            message: 'No officials found matching the criteria' });
          return;
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ 
        success: false,
        message: 'Error retrieving officials', error });
      return;
  }
}

// Get All officials with token
export const getAllOfficialWithToken = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.params);

  const authToken = req.params.authToken
  console.log(authToken);
  console.log("here now");
  
  
  if (authToken != webtoken){
    res.send(404).json({success: false, message: "Token needed"})
    return;
  }
  try {

      const officials = await officialService.getAllOfficials()

      if (officials.length > 0) {
          res.status(200).json({
            success: true,
            data: officials
          });
          console.log("found");
          
          return;
      } else {
          res.status(404).json({ 
            success: false,
            message: 'No officials found matching the criteria' });
          return;
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ 
        success: false,
        message: 'Error retrieving officials', error });
      return;
  }
}