import { Router } from 'express';
import * as productController from '../controllers/product.controller';

const router = Router();

// GET /api/products (يدعم الفلترة عبر ?category=APPAREL)
router.get('/', productController.getAllProducts);

// GET /api/products/:id
router.get('/:id', productController.getProductById);

// POST /api/products
router.post('/', productController.createProduct);

export default router;