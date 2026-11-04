import express from 'express';
import { verify_login } from '../middleware/auth_middleware.js';
import checkRole from '../middleware/check_admin.js';
import {
  create_preorder,
  get_my_preorders,
  get_all_preorders,
  get_preorder_by_id,
  update_preorder_by_id,
  delete_preorder_by_id
} from '../controllers/preorder.controller.js';

const preorderRouter = express.Router();

// 1. POST /api/preorders - Create pre-order (Authenticated user)
preorderRouter.post('/', verify_login, create_preorder);

// 2. GET /api/preorders/my - Fetch own pre-order (Authenticated user)
// Placed before /:id to prevent matching 'my' as an ID parameter
preorderRouter.get('/my', verify_login, get_my_preorders);

// 3. GET /api/preorders - Fetch all pre-orders (ADMIN only)
preorderRouter.get('/', verify_login, checkRole, get_all_preorders);

// 4. GET /api/preorders/:id - Fetch pre-order by ID (Owner or ADMIN)
preorderRouter.get('/:id', verify_login, get_preorder_by_id);

// 5. PATCH /api/preorders/:id - Update pre-order details (Owner or ADMIN)
preorderRouter.patch('/:id', verify_login, update_preorder_by_id);

// 6. DELETE /api/preorders/:id - Delete/cancel pre-order (Owner or ADMIN)
preorderRouter.delete('/:id', verify_login, delete_preorder_by_id);

export default preorderRouter;
