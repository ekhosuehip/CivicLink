import { Document, Types } from "mongoose";
import { IUser } from "./Users";
import { IChat } from "./Chat";

export interface IMessage extends Document {
  sender: Types.ObjectId | IUser;
  content: string;
  chat: Types.ObjectId | IChat;
  readBy: Types.Array<Types.ObjectId | IUser>;
  createdAt: Date;
  updatedAt: Date;
}
