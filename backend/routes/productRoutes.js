import express from 'express';
import { getProduct, createProduct } from '../controllers/product.js'; // Correct the path

const router = express.Router();

router.get('/', getProduct);
router.post('/', createProduct);

export default router;