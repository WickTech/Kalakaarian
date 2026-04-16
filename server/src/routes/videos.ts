import { Router, Request, Response } from 'express';
import CampaignVideo from '../models/CampaignVideo';
import { auth, AuthRequest } from '../middleware/auth';

const router = Router();

router.post('/', auth, async (req: AuthRequest, res: Response) => {
  try {
    const { campaignId, videoUrl, platform } = req.body;
    const userId = req.user?.userId;

    const video = new CampaignVideo({
      influencerId: userId,
      campaignId,
      videoUrl,
      platform: platform || 'file',
    });

    await video.save();
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: 'Error uploading video' });
  }
});

router.get('/campaign/:campaignId', auth, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const videos = await CampaignVideo.find({ 
      campaignId: req.params.campaignId,
      influencerId: userId 
    });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching videos' });
  }
});

router.get('/my', auth, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const videos = await CampaignVideo.find({ influencerId: userId })
      .populate('campaignId', 'title');
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching videos' });
  }
});

router.put('/:id/review', auth, async (req: AuthRequest, res: Response) => {
  try {
    const { status, feedback } = req.body;
    const video = await CampaignVideo.findByIdAndUpdate(
      req.params.id,
      { status, feedback },
      { new: true }
    );
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: 'Error reviewing video' });
  }
});

export default router;
