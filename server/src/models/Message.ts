import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  conversationId: string;
  senderId: mongoose.Types.ObjectId;
  senderRole: 'brand' | 'influencer';
  receiverId: mongoose.Types.ObjectId;
  receiverRole: 'brand' | 'influencer';
  content: string;
  read: boolean;
  createdAt: Date;
}

const MessageSchema = new Schema<IMessage>({
  conversationId: { type: String, required: true, index: true },
  senderId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  senderRole: { type: String, enum: ['brand', 'influencer'], required: true },
  receiverId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  receiverRole: { type: String, enum: ['brand', 'influencer'], required: true },
  content: { type: String, required: true },
  read: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model<IMessage>('Message', MessageSchema);
