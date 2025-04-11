import { IUser } from "../interfaces/Users"
import mongoose, { Schema } from 'mongoose';


const userSchema = new Schema<IUser>({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  phone: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, trim: true },
  pic: { 
    type: String, 
    required: true, 
    default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" 
  },
  isAdmin: { type: Boolean, required: true, default: false },
  stateOfOrigin: { type: String, required: true, trim: true }
}, { timestamps: true, versionKey: false });

const Citizen = mongoose.model<IUser>('User', userSchema);
export default Citizen;