import express from 'express';
import { verify_login } from '../middleware/auth_middleware.js';
import checkRole from '../middleware/check_admin.js';
import {
    listProduct,
    allProduct,
    productById,
    updateProductById,
    deleteProductById
} from '../controllers/product.js';

const productRoute = express.Router();

// Static routes (supports standard REST and existing paths)
productRoute.get('/', allProduct);
productRoute.get('/all', allProduct);

productRoute.post('/', verify_login, checkRole, listProduct);
productRoute.post('/list', verify_login, checkRole, listProduct);

// Dynamic routes
productRoute.get('/:id', productById);
productRoute.patch('/:id', verify_login, checkRole, updateProductById);
productRoute.delete('/:id', verify_login, checkRole, deleteProductById);

export default productRoute;
