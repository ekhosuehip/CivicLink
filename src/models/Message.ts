import mongoose, { Schema  } from 'mongoose';
import { IMessage } from "../interfaces/Message";


const messageSchema = new Schema<IMessage>({
    senderID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiverID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
  
    sentAt: { type: Date, default: Date.now },
  
    status: {
      type: String,
      enum: ['sent', 'delivered', 'read'],
      default: 'sent',
    },
  
    deliveredAt: { type: Date, default: null },
    readAt: { type: Date, default: null },
  });
  
const Message = mongoose.model<IMessage>('Message', messageSchema);
export default Message