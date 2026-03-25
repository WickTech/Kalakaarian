import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IPortfolioItem {
  type: 'image' | 'video';
  url: string;
  caption?: string;
}

export interface IGenderSplit {
  male: number;
  female: number;
  other: number;
}

export interface ISocialHandles {
  instagram?: string;
  youtube?: string;
  twitter?: string;
}

export interface IFollowers {
  instagram?: number;
  youtube?: number;
}

export interface IInfluencerProfile extends Document {
  userId: Types.ObjectId;
  niche?: string;
  bio?: string;
  socialHandles?: ISocialHandles;
  platform?: 'instagram' | 'youtube' | 'both';
  tier?: 'nano' | 'micro' | 'macro' | 'celebrity';
  followers?: IFollowers;
  activeFollowers?: number;
  fakeFollowers?: number;
  avgViews?: number;
  avgLikes?: number;
  engagementRate?: number;
  genderSplit?: IGenderSplit;
  audienceCity?: string;
  genre?: string;
  price?: number;
  isVerified?: boolean;
  portfolio?: IPortfolioItem[];
  rating?: number;
  reviewCount?: number;
}

const PortfolioItemSchema = new Schema<IPortfolioItem>({
  type: { type: String, enum: ['image', 'video'] },
  url: { type: String },
  caption: { type: String },
});

const GenderSplitSchema = new Schema<IGenderSplit>({
  male: { type: Number, default: 0 },
  female: { type: Number, default: 0 },
  other: { type: Number, default: 0 },
});

const SocialHandlesSchema = new Schema<ISocialHandles>({
  instagram: { type: String },
  youtube: { type: String },
  twitter: { type: String },
});

const FollowersSchema = new Schema<IFollowers>({
  instagram: { type: Number },
  youtube: { type: Number },
});

const InfluencerProfileSchema = new Schema<IInfluencerProfile>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
    niche: { type: String },
    bio: { type: String },
    socialHandles: { type: SocialHandlesSchema },
    platform: { type: String, enum: ['instagram', 'youtube', 'both'] },
    tier: { type: String, enum: ['nano', 'micro', 'macro', 'celebrity'] },
    followers: { type: FollowersSchema },
    activeFollowers: { type: Number },
    fakeFollowers: { type: Number },
    avgViews: { type: Number },
    avgLikes: { type: Number },
    engagementRate: { type: Number },
    genderSplit: { type: GenderSplitSchema },
    audienceCity: { type: String },
    genre: { type: String },
    price: { type: Number },
    isVerified: { type: Boolean, default: false },
    portfolio: [PortfolioItemSchema],
    rating: { type: Number },
    reviewCount: { type: Number },
  },
  { timestamps: true }
);

InfluencerProfileSchema.virtual('totalFollowers').get(function() {
  return (this.followers?.instagram || 0) + (this.followers?.youtube || 0);
});

InfluencerProfileSchema.set('toJSON', { virtuals: true });
InfluencerProfileSchema.set('toObject', { virtuals: true });

InfluencerProfileSchema.index({ tier: 1 });
InfluencerProfileSchema.index({ platform: 1 });
InfluencerProfileSchema.index({ niche: 1 });
InfluencerProfileSchema.index({ price: 1 });
InfluencerProfileSchema.index({ 'followers.instagram': -1 });
InfluencerProfileSchema.index({ 'followers.youtube': -1 });

export const InfluencerProfile = mongoose.model<IInfluencerProfile>('InfluencerProfile', InfluencerProfileSchema);
