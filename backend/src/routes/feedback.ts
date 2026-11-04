import express from 'express';
import { verify_login } from '../middleware/auth_middleware.js';
import {
  create_feedback,
  get_product_feedback,
  update_feedback,
  delete_feedback
} from '../controllers/feedback.js';

const feedbackRouter = express.Router();

// 1. POST /api/feedback - Submit feedback (Protected)
feedbackRouter.post('/', verify_login, create_feedback);

// 2. GET /api/feedback/:productId - Fetch feedback for a product (Public)
feedbackRouter.get('/:productId', get_product_feedback);

// 3. PATCH /api/feedback/:feedbackId - Update feedback (Protected, Owner only)
feedbackRouter.patch('/:feedbackId', verify_login, update_feedback);

// 4. DELETE /api/feedback/:feedbackId - Delete feedback (Protected, Owner only)
feedbackRouter.delete('/:feedbackId', verify_login, delete_feedback);

export default feedbackRouter;
