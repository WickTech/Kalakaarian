import { Router, Response } from 'express';
import Campaign from '../models/Campaign';
import Proposal from '../models/Proposal';
import { auth } from '../middleware/auth';
import { AuthRequest } from '../middleware/auth';

const router = Router();

router.get('/brand', auth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (req.user!.role !== 'brand') {
      res.status(403).json({ message: 'Only brands can view this analytics' });
      return;
    }

    const userId = req.user!.userId;

    const totalCampaigns = await Campaign.countDocuments({ brandId: userId });
    const openCampaigns = await Campaign.countDocuments({ brandId: userId, status: 'open' });
    const inProgressCampaigns = await Campaign.countDocuments({ brandId: userId, status: 'in_progress' });
    const completedCampaigns = await Campaign.countDocuments({ brandId: userId, status: 'completed' });

    const campaigns = await Campaign.find({ brandId: userId });
    const campaignIds = campaigns.map(c => c._id);

    const totalProposals = await Proposal.countDocuments({ campaignId: { $in: campaignIds } });
    const acceptedProposals = await Proposal.countDocuments({ campaignId: { $in: campaignIds }, status: 'accepted' });
    const pendingProposals = await Proposal.countDocuments({ campaignId: { $in: campaignIds }, status: 'pending' });
    const rejectedProposals = await Proposal.countDocuments({ campaignId: { $in: campaignIds }, status: 'rejected' });

    const acceptedProposalData = await Proposal.find({ campaignId: { $in: campaignIds }, status: 'accepted' });
    const totalSpent = acceptedProposalData.reduce((sum, p) => sum + (p.bidAmount || 0), 0);

    res.json({
      campaigns: {
        total: totalCampaigns,
        open: openCampaigns,
        inProgress: inProgressCampaigns,
        completed: completedCampaigns,
      },
      proposals: {
        total: totalProposals,
        accepted: acceptedProposals,
        pending: pendingProposals,
        rejected: rejectedProposals,
      },
      spend: totalSpent,
    });
  } catch (error) {
    console.error('Brand analytics error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/influencer', auth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (req.user!.role !== 'influencer') {
      res.status(403).json({ message: 'Only influencers can view this analytics' });
      return;
    }

    const userId = req.user!.userId;

    const totalProposals = await Proposal.countDocuments({ influencerId: userId });
    const acceptedProposals = await Proposal.countDocuments({ influencerId: userId, status: 'accepted' });
    const pendingProposals = await Proposal.countDocuments({ influencerId: userId, status: 'pending' });
    const rejectedProposals = await Proposal.countDocuments({ influencerId: userId, status: 'rejected' });

    const acceptedProposalData = await Proposal.find({ influencerId: userId, status: 'accepted' });
    const totalEarnings = acceptedProposalData.reduce((sum, p) => sum + (p.bidAmount || 0), 0);

    res.json({
      proposals: {
        total: totalProposals,
        accepted: acceptedProposals,
        pending: pendingProposals,
        rejected: rejectedProposals,
      },
      earnings: totalEarnings,
      acceptedRate: totalProposals > 0 ? Math.round((acceptedProposals / totalProposals) * 100) : 0,
    });
  } catch (error) {
    console.error('Influencer analytics error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
