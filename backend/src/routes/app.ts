import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './auth.js';
import productRouter from './product.js';
import feedbackRouter from './feedback.js';
import preorderRouter from './preorder.routes.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

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
