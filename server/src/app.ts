import express from 'express';
import serverless from 'serverless-http';

const app = express();

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is working' });
});

app.get('/test', (req, res) => {
  res.json({ message: 'Test endpoint' });
});

const handler = serverless(app);
export default handler;