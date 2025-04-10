import { IUser } from "../interfaces/Users"
import mongoose, { Schema } from 'mongoose';


const citizenSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    stateOfOrigin: {
      type: String,
      required: true,                                                        
      trim: true,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Citizens = mongoose.model<IUser>('Citizen', citizenSchema);
export default Citizens;
