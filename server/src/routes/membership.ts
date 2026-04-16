import { Router, Request, Response } from 'express';
import Membership from '../models/Membership';
import { auth, AuthRequest } from '../middleware/auth';

const router = Router();

router.post('/purchase', auth, async (req: AuthRequest, res: Response) => {
  try {
    const { tier, paymentId } = req.body;
    const userId = req.user?.userId;

    const membership = await Membership.findOneAndUpdate(
      { influencerId: userId },
      {
        influencerId: userId,
        tier,
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        autoRenew: true,
        paymentId,
      },
      { upsert: true, new: true }
    );

    res.json(membership);
  } catch (error) {
    res.status(500).json({ message: 'Error purchasing membership' });
  }
});

router.get('/status', auth, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const membership = await Membership.findOne({ influencerId: userId });
    res.json(membership || { tier: 'regular' });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching membership status' });
  }
});

router.put('/cancel', auth, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    await Membership.findOneAndUpdate(
      { influencerId: userId },
      { autoRenew: false }
    );
    res.json({ message: 'Auto-renew cancelled' });
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling membership' });
  }
});

export default router;
