import mongoose, { Document, Schema } from 'mongoose';

interface IContact extends Document {
  name: string;
  email?: string;
  phone?: string;
  message: string;
  type: 'general' | 'callback' | 'business';
  status: 'new' | 'read' | 'replied';
  createdAt: Date;
  updatedAt: Date;
}

const contactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    message: { type: String, required: true },
    type: { 
      type: String, 
      enum: ['general', 'callback', 'business'],
      default: 'general' 
    },
    status: { 
      type: String, 
      enum: ['new', 'read', 'replied'],
      default: 'new' 
    },
  },
  { timestamps: true }
);

export default mongoose.model<IContact>('Contact', contactSchema);
