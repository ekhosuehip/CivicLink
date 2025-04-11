import mongoose, { Schema } from 'mongoose';
import User from './User';
import { IUser } from '../interfaces/Oficial';

interface IOfficial extends IUser {
  position: string;
  jurisdiction: string;
}

const officialSchema = new Schema<IOfficial>({
  position: { type: String, required: true, trim: true },
  jurisdiction: { type: String, required: true, trim: true },
}, { timestamps: true, versionKey: false });

const Official = User.discriminator<IOfficial>('Official', officialSchema);
export default Official;
