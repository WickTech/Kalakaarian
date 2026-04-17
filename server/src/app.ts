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

let isConnected = false;
let connectionPromise: Promise<void> | null = null;

const connectDB = async (): Promise<void> => {
  if (isConnected) return;
  
  if (connectionPromise) return connectionPromise;
  
  if (!process.env.MONGODB_URI) {
    console.log('No MONGODB_URI, skipping DB');
    return;
  }
  
  connectionPromise = (async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI!, {
        serverSelectionTimeoutMS: 3000,
        connectTimeoutMS: 3000,
        socketTimeoutMS: 10000,
      });
      isConnected = true;
      console.log('MongoDB connected');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      connectionPromise = null;
      isConnected = false;
    }
  })();
  
  return connectionPromise;
};

const app = express();

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin === 'https://kalakaarian.vercel.app' || 
      origin === 'http://localhost:5173' || 
      origin === 'http://localhost:3000' ||
      (origin && origin.includes('vercel.app'))) {
    res.setHeader('Access-Control-Allow-Origin', origin || '*');
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let dbConnecting = false;

app.use(async (req, res, next) => {
  if (req.path === '/health' || req.path === '/debug/cors') {
    return next();
  }
  if (process.env.MONGODB_URI && !isConnected && !dbConnecting) {
    dbConnecting = true;
    connectDB().then(() => { dbConnecting = false; }).catch(() => { dbConnecting = false; });
  }
  next();
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', dbConnected: isConnected });
});

app.get('/debug/cors', (req, res) => {
  res.json({
    origin: req.headers.origin,
    corsOrigin: process.env.CORS_ORIGIN,
    dbConnected: isConnected,
  });
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