import mongoose, {  Schema, Model } from 'mongoose';
import IUser from '../interfaces/Users';

const userSchema = new Schema<IUser>(
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
    nin: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 11,
      maxlength: 11,
    },
  },
  {
    timestamps: true, versionKey: false
  }
);

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
export default User;
