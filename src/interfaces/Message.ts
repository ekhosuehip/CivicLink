import { Document, Types } from 'mongoose';

export interface IMessage extends Document {
  senderID: Types.ObjectId; 
  receiverID: Types.ObjectId;
  content: string;
  sentAt: Date;
  status: 'sent' | 'delivered' | 'read';
  deliveredAt?: Date | null;
  readAt?: Date | null;
}