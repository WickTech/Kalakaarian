import mongoose, { Document, Schema } from 'mongoose';

export interface IMembership {
  influencerId: Schema.Types.ObjectId;
  tier: 'gold' | 'silver' | 'regular';
  startDate: Date;
  endDate: Date;
  autoRenew: boolean;
  paymentId?: string;
}

interface IMembershipDocument extends IMembership, Document {}

const membershipSchema = new Schema(
  {
    influencerId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    tier: { type: String, enum: ['gold', 'silver', 'regular'], default: 'regular' },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date },
    autoRenew: { type: Boolean, default: false },
    paymentId: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IMembershipDocument>('Membership', membershipSchema);
