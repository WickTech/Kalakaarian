import { Router, Request, Response } from 'express';
import Referral from '../models/Referral';
import { auth, AuthRequest } from '../middleware/auth';
import crypto from 'crypto';

const router = Router();

router.post('/generate', auth, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    
    let referral = await Referral.findOne({ referrerId: userId });
    
    if (!referral) {
      const code = crypto.randomBytes(6).toString('hex').toUpperCase();
      referral = new Referral({
        referrerId: userId,
        referralCode: code,
      });
      await referral.save();
    }
    
    res.json({ code: referral.referralCode });
  } catch (error) {
    res.status(500).json({ message: 'Error generating referral code' });
  }
});

router.post('/use', auth, async (req: AuthRequest, res: Response) => {
  try {
    const { code } = req.body;
    const userId = req.user?.userId;
    
    const referral = await Referral.findOne({ referralCode: code });
    
    if (!referral) {
      return res.status(404).json({ message: 'Invalid referral code' });
    }
    
    if (referral.used || referral.referredId) {
      return res.status(400).json({ message: 'Referral already used' });
    }
    
    if (referral.referrerId.toString() === userId?.toString()) {
      return res.status(400).json({ message: 'Cannot use your own referral code' });
    }
    
    referral.referredId = userId as any;
    referral.used = true;
    await referral.save();
    
    res.json({ message: 'Referral applied successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error using referral code' });
  }
});

router.get('/stats', auth, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    
    const referral = await Referral.findOne({ referrerId: userId });
    const usedCount = await Referral.countDocuments({ referrerId: userId, used: true });
    
    res.json({
      code: referral?.referralCode || null,
      usedCount,
      goldUnlocked: usedCount >= 10,
      silverUnlocked: usedCount >= 1,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching referral stats' });
  }
});

export default router;
