import mongoose, { Schema, Types } from "mongoose";
import { IChat } from "../interfaces/Chat";

const chatModel = new Schema<IChat>(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: Types.ObjectId, ref: "User" }],
    latestMessage: {
      type: Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: { type: Types.ObjectId, ref: "User" },
  },
  { timestamps: true, versionKey: false }
);

const Chat = mongoose.model<IChat>("Chat", chatModel);
export default Chat;
