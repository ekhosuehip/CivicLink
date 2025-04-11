import { Document, Types } from 'mongoose';

export interface IOfficial extends Document {
    fullName: string,
    email: string,
    phone: string,
    pic?: string,
    password: string,
    isAdmin?: boolean,
    position: string,
    stateOfOrigin: string
    jurisdiction: 'federal' | 'state' | 'local';
}
export interface IUser extends Document {
    
  }