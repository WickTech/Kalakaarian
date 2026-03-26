import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import InfluencerProfile from '../models/InfluencerProfile';
import BrandProfile from '../models/BrandProfile';
import { generateToken } from '../utils/jwt';
import { AuthRequest } from '../middleware/auth';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name, role, companyName, industry, city, genre, platform, tier } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      role,
    });

    if (role === 'brand') {
      await BrandProfile.create({
        userId: user._id,
        companyName: companyName || name,
        industry: industry || '',
      });
    } else if (role === 'influencer') {
      await InfluencerProfile.create({
        userId: user._id,
        city: city || '',
        genre: genre || [],
        platform: platform || [],
        tier: tier || 'micro',
      });
    }

    const token = generateToken(user._id.toString(), user.role);

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const token = generateToken(user._id.toString(), user.role);

    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    let profile = null;
    if (user.role === 'brand') {
      profile = await BrandProfile.findOne({ userId: user._id });
    } else if (user.role === 'influencer') {
      profile = await InfluencerProfile.findOne({ userId: user._id });
    }

    res.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      profile,
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const user = await User.findById(req.user.userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const { name, companyName, industry, bio, city, genre, platform, tier, followers, pricing, portfolio } = req.body;

    if (name) user.name = name;
    await user.save();

    if (user.role === 'brand') {
      const updateData: any = {};
      if (companyName) updateData.companyName = companyName;
      if (industry) updateData.industry = industry;
      if (req.body.website) updateData.website = req.body.website;
      if (req.body.logo) updateData.logo = req.body.logo;
      if (req.body.description) updateData.description = req.body.description;

      await BrandProfile.findOneAndUpdate({ userId: user._id }, updateData, { new: true });
    } else if (user.role === 'influencer') {
      const updateData: any = {};
      if (bio !== undefined) updateData.bio = bio;
      if (city) updateData.city = city;
      if (genre) updateData.genre = genre;
      if (platform) updateData.platform = platform;
      if (tier) updateData.tier = tier;
      if (followers) updateData.followers = followers;
      if (pricing) updateData.pricing = pricing;
      if (portfolio) updateData.portfolio = portfolio;

      await InfluencerProfile.findOneAndUpdate({ userId: user._id }, updateData, { new: true });
    }

    const updatedUser = await User.findById(user._id).select('-password');
    let profile = null;
    if (user.role === 'brand') {
      profile = await BrandProfile.findOne({ userId: user._id });
    } else if (user.role === 'influencer') {
      profile = await InfluencerProfile.findOne({ userId: user._id });
    }

    res.json({
      user: updatedUser,
      profile,
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
