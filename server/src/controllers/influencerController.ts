import { Request, Response } from 'express';
import InfluencerProfile from '../models/InfluencerProfile';
import User from '../models/User';
import { AuthRequest } from '../middleware/auth';

export const getInfluencers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tier, city, genre, platform, page = 1, limit = 20 } = req.query;

    const query: any = {};

    if (tier) query.tier = tier;
    if (city) query.city = { $regex: city, $options: 'i' };
    if (genre) query.genre = { $in: Array.isArray(genre) ? genre : [genre] };
    if (platform) query.platform = { $in: Array.isArray(platform) ? platform : [platform] };

    const skip = (Number(page) - 1) * Number(limit);

    const influencers = await InfluencerProfile.find(query)
      .populate('userId', 'name email')
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await InfluencerProfile.countDocuments(query);

    res.json({
      influencers,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    console.error('Get influencers error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getInfluencerById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const influencer = await InfluencerProfile.findById(id).populate('userId', 'name email');
    if (!influencer) {
      res.status(404).json({ message: 'Influencer not found' });
      return;
    }

    res.json({ influencer });
  } catch (error) {
    console.error('Get influencer error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const searchInfluencers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { q, tier, city, genre, platform, minFollowers, maxFollowers, page = 1, limit = 20 } = req.query;

    const query: any = {};

    if (q) {
      query.$or = [
        { bio: { $regex: q, $options: 'i' } },
        { city: { $regex: q, $options: 'i' } },
        { genre: { $regex: q, $options: 'i' } },
      ];
    }

    if (tier) query.tier = tier;
    if (city) query.city = { $regex: city, $options: 'i' };
    if (genre) query.genre = { $in: Array.isArray(genre) ? genre : [genre] };
    if (platform) query.platform = { $in: Array.isArray(platform) ? platform : [platform] };

    if (minFollowers || maxFollowers) {
      query['followers.instagram'] = {};
      if (minFollowers) query['followers.instagram'].$gte = Number(minFollowers);
      if (maxFollowers) query['followers.instagram'].$lte = Number(maxFollowers);
    }

    const skip = (Number(page) - 1) * Number(limit);

    const influencers = await InfluencerProfile.find(query)
      .populate('userId', 'name email')
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await InfluencerProfile.countDocuments(query);

    res.json({
      influencers,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    console.error('Search influencers error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateInfluencerProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user || req.user.role !== 'influencer') {
      res.status(403).json({ message: 'Only influencers can update their profile' });
      return;
    }

    const { bio, city, genre, platform, tier, followers, pricing, portfolio } = req.body;

    const updateData: any = {};
    if (bio !== undefined) updateData.bio = bio;
    if (city) updateData.city = city;
    if (genre) updateData.genre = genre;
    if (platform) updateData.platform = platform;
    if (tier) updateData.tier = tier;
    if (followers) updateData.followers = followers;
    if (pricing) updateData.pricing = pricing;
    if (portfolio) updateData.portfolio = portfolio;

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
