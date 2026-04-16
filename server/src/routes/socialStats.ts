import { Router, Request, Response } from 'express';
import { auth, optionalAuth } from '../middleware/auth';
import InfluencerProfile from '../models/InfluencerProfile';
import { getInstagramStats, getInstagramPosts, getYouTubeStats, getYouTubeVideos } from '../services/socialMediaService';
import { calculateAnalytics } from '../services/analyticsService';

const router = Router();

router.get('/stats/:userId', optionalAuth, async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const profile = await InfluencerProfile.findOne({ userId });

    if (!profile) {
      res.status(404).json({ message: 'Profile not found' });
      return;
    }

    const { socialHandles } = profile;

    const [instagramStats, youtubeStats] = await Promise.all([
      socialHandles?.instagram ? getInstagramStats(socialHandles.instagram) : Promise.resolve(null),
      socialHandles?.youtube ? getYouTubeStats(socialHandles.youtube) : Promise.resolve(null),
    ]);

    const analytics = calculateAnalytics(instagramStats, youtubeStats);

    res.json({
      instagram: instagramStats,
      youtube: youtubeStats,
      analytics,
    });
  } catch (error) {
    console.error('Social stats error:', error);
    res.status(500).json({ message: 'Error fetching social stats' });
  }
});

router.get('/instagram/:handle/posts', async (req: Request, res: Response) => {
  try {
    const { handle } = req.params;
    const limit = parseInt(req.query.limit as string) || 9;
    
    const posts = await getInstagramPosts(handle, limit);
    res.json(posts);
  } catch (error) {
    console.error('Instagram posts error:', error);
    res.status(500).json({ message: 'Error fetching Instagram posts' });
  }
});

router.get('/youtube/:channelId/videos', async (req: Request, res: Response) => {
  try {
    const { channelId } = req.params;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const videos = await getYouTubeVideos(channelId, limit);
    res.json(videos);
  } catch (error) {
    console.error('YouTube videos error:', error);
    res.status(500).json({ message: 'Error fetching YouTube videos' });
  }
});

router.get('/instagram/stats/:handle', async (req: Request, res: Response) => {
  try {
    const { handle } = req.params;
    const stats = await getInstagramStats(handle);
    res.json(stats);
  } catch (error) {
    console.error('Instagram stats error:', error);
    res.status(500).json({ message: 'Error fetching Instagram stats' });
  }
});

router.get('/youtube/stats/:channelId', async (req: Request, res: Response) => {
  try {
    const { channelId } = req.params;
    const stats = await getYouTubeStats(channelId);
    res.json(stats);
  } catch (error) {
    console.error('YouTube stats error:', error);
    res.status(500).json({ message: 'Error fetching YouTube stats' });
  }
});

export default router;
