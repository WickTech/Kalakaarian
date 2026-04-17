import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import serverless from 'serverless-http';
import authRoutes from './routes/auth';
import influencerRoutes from './routes/influencers';
import campaignRoutes from './routes/campaigns';
import proposalRoutes from './routes/proposals';
import cartRoutes from './routes/cart';
import messageRoutes from './routes/messages';
import analyticsRoutes from './routes/analytics';
import membershipRoutes from './routes/membership';
import videoRoutes from './routes/videos';
import referralRoutes from './routes/referrals';
import campaignFilesRoutes from './routes/campaignFiles';
import notificationRoutes from './routes/notifications';
import campaignWorkflowRoutes from './routes/campaignWorkflow';
import whatsappRoutes from './routes/whatsapp';
import socialStatsRoutes from './routes/socialStats';
import contactRoutes from './routes/contact';

dotenv.config();

const app = express();

app.use(cors({
  origin: '*',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let isConnected = false;

app.use(async (req, res, next) => {
  if (req.path === '/health') return next();
  if (!isConnected && process.env.MONGODB_URI) {
    try {
      await mongoose.connect(process.env.MONGODB_URI!, {
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 5000,
      });
      isConnected = true;
    } catch (e) {
      console.error('DB error:', e);
    }
  }
  next();
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', db: isConnected });
});

app.use('/api/auth', authRoutes);
app.use('/api/influencers', influencerRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/proposals', proposalRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/membership', membershipRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/referrals', referralRoutes);
app.use('/api/campaigns', campaignFilesRoutes);
app.use('/api/campaigns', campaignWorkflowRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/whatsapp', whatsappRoutes);
app.use('/api/social', socialStatsRoutes);
app.use('/api/contact', contactRoutes);

const handler = serverless(app);

export { handler };