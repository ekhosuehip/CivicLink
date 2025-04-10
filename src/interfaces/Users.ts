import { Document } from "mongoose";
import { JwtPayload } from "jsonwebtoken";

export interface IUser extends Document {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  stateOfOrigin: string;
}

export interface IAuthPayload {
  userId: string,
  email: string
}

export interface DecodedUser extends JwtPayload {
  userId: string;
  email: string;
}

