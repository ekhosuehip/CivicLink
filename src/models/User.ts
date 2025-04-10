import mongoose, { Schema, Model } from 'mongoose';
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
    category: {
      type: String,
      required: true,
      enum: ['citizen', 'official'],
    },
    position: {
      type: String,
      trim: true,
      required: function (this: IUser) {
        return this.category === 'official';
      },
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

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
export default User;
