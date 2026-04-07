import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import serverless from 'serverless';
import connectDB from './config/database';
import { errorHandler } from './middleware/errorHandler';
import authRoutes from './routes/auth';
import influencerRoutes from './routes/influencers';
import campaignRoutes from './routes/campaigns';
import proposalRoutes from './routes/proposals';
import cartRoutes from './routes/cart';
import messageRoutes from './routes/messages';
import analyticsRoutes from './routes/analytics';

dotenv.config();

console.log('CORS_ORIGIN env:', process.env.CORS_ORIGIN);

const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://kalakaarian.vercel.app',
];

if (process.env.CORS_ORIGIN && !allowedOrigins.includes(process.env.CORS_ORIGIN)) {
  allowedOrigins.push(process.env.CORS_ORIGIN);
}

const corsOptions: cors.CorsOptions = {
  origin: function(origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'), false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/debug/cors', (req, res) => {
  res.json({
    origin: req.headers.origin,
    corsOrigin: process.env.CORS_ORIGIN,
    allowedOrigins: [
      'http://localhost:3000',
      'http://localhost:5173',
      process.env.CORS_ORIGIN,
      'https://kalakaarian.vercel.app',
    ],
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/influencers', influencerRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/proposals', proposalRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/analytics', analyticsRoutes);

app.use(errorHandler);

const server = app;
let handler = serverless(server);

// Connect to database in serverless mode before each request
const handlerWithDB = async (event: any, context: any) => {
  try {
    await connectDB();
  } catch (error) {
    console.error('Database connection error:', error);
  }
  return handler(event, context);
};

export { handler: handlerWithDB };

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
}
