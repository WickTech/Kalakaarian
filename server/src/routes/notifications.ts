import { Router, Request, Response } from 'express';
import Notification from '../models/Notification';
import { auth } from '../middleware/auth';

const router = Router();

router.get('/', auth, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const notifications = await Notification.find({ userId })
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications' });
  }
});

router.get('/unread-count', auth, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const count = await Notification.countDocuments({ userId, read: false });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching count' });
  }
});

router.put('/:id/read', auth, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    await Notification.findOneAndUpdate(
      { _id: req.params.id, userId },
      { read: true }
    );
    res.json({ message: 'Marked as read' });
  } catch (error) {
    res.status(500).json({ message: 'Error marking as read' });
  }
});

router.put('/read-all', auth, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    await Notification.updateMany({ userId, read: false }, { read: true });
    res.json({ message: 'All marked as read' });
  } catch (error) {
    res.status(500).json({ message: 'Error marking all as read' });
  }
});

router.delete('/:id', auth, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    await Notification.findOneAndDelete({ _id: req.params.id, userId });
    res.json({ message: 'Notification deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting notification' });
  }
});

export default router;