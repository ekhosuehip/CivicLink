import { Document, Types } from 'mongoose';

export interface IOfficial extends Document {
    fullName: string,
    email: string,
    phone: string,
    password: string,
    position: string,
    stateOfOrigin: string
    jurisdiction: 'federal' | 'state' | 'local';
}
export interface IUser extends Document {
    
  }