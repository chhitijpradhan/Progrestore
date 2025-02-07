import express from 'express';
import { getProduct, createProduct, getProducts, updateProduct, deleteProduct } from '../controllers/product.js'; // Correct the path

const router = express.Router();

router.get('/', getProducts);
router.get("/:id" , getProduct)
router.post('/', createProduct);
router.put("/:id" , updateProduct);
router.delete("/:id" , deleteProduct);

export default router;