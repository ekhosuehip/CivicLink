import { Document } from "mongoose";

// This is for incoming user data (from req.body, etc.)
interface IUser extends Document {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  stateOfOrigin: string
}

// This is for the full Mongoose document (returned from MongoDB)
export default IUser
