import mongoose, { Schema  } from 'mongoose';
import {IOfficial} from '../interfaces/Oficial'


const officialSchema = new Schema<IOfficial>({
    fullName: { type: String, required: true, trim: true, },
    email: { type: String, required: true, unique: true, trim: true, },
    phone: { type: String, required: true, unique: true, trim: true, },
    password: { type: String, required: true, trim: true, },
    position: { type: String, required: true, trim: true, },
    jurisdiction: { type: String, required: true, trim: true, },
    stateOfOrigin: { type: String, required: true, trim: true, }
  }, { timestamps: true });
  

const Official = mongoose.model<IOfficial>('Official', officialSchema);
export default Official