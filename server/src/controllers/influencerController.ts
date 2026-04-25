import { Request, Response } from 'express';
import InfluencerProfile from '../models/InfluencerProfile';
import { AuthRequest } from '../middleware/auth';
import { applyPlatformMargin } from '../utils/pricing';

const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const ALLOWED_GENDERS = ['male', 'female', 'non_binary', 'prefer_not_to_say'] as const;

// Fields needed for list views — excludes heavy arrays like instagramPosts/youtubeVideos
const LIST_SELECT = 'userId bio city gender niches socialHandles profileImage platform tier pricing verified isOnline lastSeenAt';

const formatInfluencer = (inf: any) => ({
  id: inf._id,
  name: inf.userId?.name || 'Unknown',
  bio: inf.bio || '',
  city: inf.city || '',
  gender: inf.gender,
  niches: inf.niches || [],
  socialHandles: inf.socialHandles || {},
  profileImage: inf.profileImage,
  platform: inf.platform || [],
  tier: inf.tier,
  verified: inf.verified,
  isOnline: !!inf.isOnline,
  lastSeenAt: inf.lastSeenAt,
  pricing: applyPlatformMargin(inf.pricing),
});

function buildQuery(params: {
  tier?: any; city?: any; genre?: any; platform?: any; gender?: any; q?: any;
}): Record<string, any> {
  const query: Record<string, any> = {};
  if (params.tier) query.tier = params.tier;
  if (typeof params.city === 'string') query.city = { $regex: escapeRegex(params.city), $options: 'i' };
  if (params.genre) query.niches = { $in: Array.isArray(params.genre) ? params.genre : [params.genre] };
  if (params.platform) query.platform = { $in: Array.isArray(params.platform) ? params.platform : [params.platform] };
  if (typeof params.gender === 'string' && (ALLOWED_GENDERS as readonly string[]).includes(params.gender)) {
    query.gender = params.gender;
  }
  if (typeof params.q === 'string') {
    const safe = escapeRegex(params.q);
    query.$or = [
      { bio: { $regex: safe, $options: 'i' } },
      { city: { $regex: safe, $options: 'i' } },
      { niches: { $regex: safe, $options: 'i' } },
    ];
  }
  return query;
}

export const getTierCounts = async (req: Request, res: Response): Promise<void> => {
  try {
    const counts = await InfluencerProfile.aggregate([
      { $group: { _id: '$tier', count: { $sum: 1 } } },
    ]);
    const tierCounts: Record<string, number> = { nano: 0, micro: 0, mid: 0, macro: 0, mega: 0 };
    counts.forEach((item) => {
      if (item._id && Object.prototype.hasOwnProperty.call(tierCounts, item._id)) {
        tierCounts[item._id] = item.count;
      }
    });
    res.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=600');
    res.json(tierCounts);
  } catch (error) {
    console.error('Get tier counts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getInfluencers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tier, city, genre, platform, gender, page = 1, limit = 20 } = req.query;
    const clampedLimit = Math.min(Number(limit) || 20, 100);
    const skip = (Number(page) - 1) * clampedLimit;
    const query = buildQuery({ tier, city, genre, platform, gender });

    const [influencers, total] = await Promise.all([
      InfluencerProfile.find(query)
        .select(LIST_SELECT)
        .populate('userId', 'name')
        .skip(skip)
        .limit(clampedLimit)
        .sort({ createdAt: -1 })
        .lean(),
      InfluencerProfile.countDocuments(query),
    ]);

    res.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
    res.json({
      influencers: influencers.map(formatInfluencer),
      pagination: { page: Number(page), limit: clampedLimit, total, pages: Math.ceil(total / clampedLimit) },
    });
  } catch (error) {
    console.error('Get influencers error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getInfluencerById = async (req: Request, res: Response): Promise<void> => {
  try {
    const influencer = await InfluencerProfile.findById(req.params.id)
      .populate('userId', 'name')
      .lean();
    if (!influencer) {
      res.status(404).json({ message: 'Influencer not found' });
      return;
    }
    res.set('Cache-Control', 'public, max-age=30, stale-while-revalidate=120');
    res.json({ influencer: formatInfluencer(influencer) });
  } catch (error) {
    console.error('Get influencer error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const searchInfluencers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { q, tier, city, genre, platform, gender, page = 1, limit = 20 } = req.query;
    const clampedLimit = Math.min(Number(limit) || 20, 100);
    const skip = (Number(page) - 1) * clampedLimit;
    const query = buildQuery({ q, tier, city, genre, platform, gender });

    const [influencers, total] = await Promise.all([
      InfluencerProfile.find(query)
        .select(LIST_SELECT)
        .populate('userId', 'name')
        .skip(skip)
        .limit(clampedLimit)
        .sort({ createdAt: -1 })
        .lean(),
      InfluencerProfile.countDocuments(query),
    ]);

    res.json({
      influencers: influencers.map(formatInfluencer),
      pagination: { page: Number(page), limit: clampedLimit, total, pages: Math.ceil(total / clampedLimit) },
    });
  } catch (error) {
    console.error('Search influencers error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getOwnProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user || req.user.role !== 'influencer') {
      res.status(403).json({ message: 'Only influencers can view their own profile' });
      return;
    }
    const influencer = await InfluencerProfile.findOne({ userId: req.user.userId })
      .populate('userId', 'name')
      .lean();
    if (!influencer) {
      res.status(404).json({ message: 'Influencer profile not found' });
      return;
    }
    res.json({ influencer: formatInfluencer(influencer) });
  } catch (error) {
    console.error('Get own profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateInfluencerProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user || req.user.role !== 'influencer') {
      res.status(403).json({ message: 'Only influencers can update their profile' });
      return;
    }

    const { bio, city, gender, niches, platform, tier, followers, pricing, portfolio, instagramPosts, youtubeVideos } = req.body;

    const updateData: any = {};
    if (bio !== undefined) updateData.bio = bio;
    if (city) updateData.city = city;
    if (typeof gender === 'string' && (ALLOWED_GENDERS as readonly string[]).includes(gender)) {
      updateData.gender = gender;
    }
    if (niches) updateData.niches = niches;
    if (platform) updateData.platform = platform;
    if (tier) updateData.tier = tier;
    if (followers) updateData.followers = followers;
    if (pricing) updateData.pricing = pricing;
    if (portfolio) updateData.portfolio = portfolio;
    if (instagramPosts) updateData.instagramPosts = instagramPosts;
    if (youtubeVideos) updateData.youtubeVideos = youtubeVideos;

    const profile = await InfluencerProfile.findOneAndUpdate(
      { userId: req.user.userId },
      updateData,
      { new: true }
    ).populate('userId', 'name email');

    if (!profile) {
      res.status(404).json({ message: 'Profile not found' });
      return;
    }

    res.json({ profile });
  } catch (error) {
    console.error('Update influencer profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
