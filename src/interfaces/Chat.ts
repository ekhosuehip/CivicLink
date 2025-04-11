import { Document, Types } from "mongoose";
import { IMessage } from "./Message";
import { IUser } from "./Users";

export interface IChat extends Document {
  chatName: string;
  isGroupChat: boolean;
  users: Types.Array<Types.ObjectId | IUser>;
  latestMessage: Types.ObjectId | IMessage;
  groupAdmin: Types.ObjectId | IUser;
  createdAt: Date;
  updatedAt: Date;
}
