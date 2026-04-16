import mongoose, { Document, Schema } from 'mongoose';

export interface IReferral {
  referrerId: Schema.Types.ObjectId;
  referredId: Schema.Types.ObjectId;
  referralCode: string;
  rewardType: 'gold_year' | 'silver_free' | null;
  used: boolean;
  createdAt: Date;
}

interface IReferralDocument extends IReferral, Document {}

const referralSchema = new Schema(
  {
    referrerId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    referredId: { type: Schema.Types.ObjectId, ref: 'User' },
    referralCode: { type: String, required: true, unique: true },
    rewardType: { type: String, enum: ['gold_year', 'silver_free', null], default: null },
    used: { type: Boolean, default: false },
  },
  { timestamps: true }
);

referralSchema.index({ referralCode: 1 });
referralSchema.index({ referrerId: 1 });

export default mongoose.model<IReferralDocument>('Referral', referralSchema);
