import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './auth.js';
import productRouter from './product.js';
import feedbackRouter from './feedback.js';
import preorderRouter from './preorder.routes.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

// CORS configuration reading FRONTEND_URL from environment variables
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';
  const origin = req.headers.origin;

  if (origin === allowedOrigin || !origin) {
    res.header('Access-Control-Allow-Origin', origin || allowedOrigin);
  }
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

app.use('/api/auth', authRouter);
app.use('/api/product', productRouter);
app.use('/api/products', productRouter);
app.use('/api/feedback', feedbackRouter);
app.use('/api/preorders', preorderRouter);

// Catch-all 404 handler for undefined API routes
app.use((_req: express.Request, res: express.Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// Centralized error handling middleware
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  return res.status(500).json({
    success: false,
    message: err?.message || "Internal server error"
  });
});

export default app;
