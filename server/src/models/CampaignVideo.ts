import mongoose, { Document, Schema } from 'mongoose';

export interface ICampaignVideo {
  influencerId: Schema.Types.ObjectId;
  campaignId: Schema.Types.ObjectId;
  videoUrl: string;
  platform: 'instagram' | 'youtube' | 'file' | 'drive';
  status: 'pending' | 'approved' | 'revision';
  feedback?: string;
  uploadedAt: Date;
}

interface ICampaignVideoDocument extends ICampaignVideo, Document {}

const campaignVideoSchema = new Schema(
  {
    influencerId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    campaignId: { type: Schema.Types.ObjectId, ref: 'Campaign', required: true, index: true },
    videoUrl: { type: String, required: true },
    platform: { type: String, enum: ['instagram', 'youtube', 'file', 'drive'], default: 'file' },
    status: { type: String, enum: ['pending', 'approved', 'revision'], default: 'pending' },
    feedback: { type: String },
    uploadedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

campaignVideoSchema.index({ campaignId: 1, influencerId: 1 });

export default mongoose.model<ICampaignVideoDocument>('CampaignVideo', campaignVideoSchema);
