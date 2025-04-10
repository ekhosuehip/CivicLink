import { Document } from "mongoose";

interface IUser extends Document {
  fullName: string;
  email: string;
  phone: string;
  position?: string; 
  stateOfOrigin: string;
  category: "citizen" | "official";
}

export default IUser;
