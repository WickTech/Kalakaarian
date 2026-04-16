import mongoose, { Document, Schema } from 'mongoose';

export interface IInfluencerAnalytics {
  influencerId: Schema.Types.ObjectId;
  ER: number;
  avgViews: number;
  cpv: number;
  fakeFollowersPercent: number;
  totalFollowers: number;
  lastUpdated: Date;
}

interface IInfluencerAnalyticsDocument extends IInfluencerAnalytics, Document {}

const influencerAnalyticsSchema = new Schema(
  {
    influencerId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    ER: { type: Number, default: 0 },
    avgViews: { type: Number, default: 0 },
    cpv: { type: Number, default: 0 },
    fakeFollowersPercent: { type: Number, default: 0 },
    totalFollowers: { type: Number, default: 0 },
    lastUpdated: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

influencerAnalyticsSchema.index({ influencerId: 1 }, { unique: true });

export default mongoose.model<IInfluencerAnalyticsDocument>('InfluencerAnalytics', influencerAnalyticsSchema);
