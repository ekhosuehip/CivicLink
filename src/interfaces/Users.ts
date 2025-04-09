import { Document } from "mongoose";

// This is for incoming user data (from req.body, etc.)
export interface IUserInput {
  fullName: string;
  email: string;
  phone: string;
  nin: string;
}

// This is for the full Mongoose document (returned from MongoDB)
export interface IUser extends Document, IUserInput {}
