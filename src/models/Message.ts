import mongoose, { Schema  } from 'mongoose';
import { IMessage } from "../interfaces/Message";


const messageSchema = new Schema<IMessage>(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String, trim: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true, versionKey: false }
);
const Message = mongoose.model<IMessage>('Message', messageSchema);
export default Message