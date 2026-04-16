import mongoose, { Document, Schema } from 'mongoose';

export interface INotification {
  userId: Schema.Types.ObjectId;
  type: 'proposal' | 'campaign' | 'message' | 'payment' | 'system';
  title: string;
  message: string;
  read: boolean;
  link?: string;
  createdAt: Date;
}

interface INotificationDocument extends INotification, Document {}

const notificationSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    type: { type: String, enum: ['proposal', 'campaign', 'message', 'payment', 'system'], default: 'system' },
    title: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    link: { type: String },
  },
  { timestamps: true }
);

notificationSchema.index({ userId: 1, read: 1, createdAt: -1 });

export default mongoose.model<INotificationDocument>('Notification', notificationSchema);