import express from 'express';
import { signup, signin, createProduct, getProducts } from '../controllers';
import validateBody from '../middleware/validateBody';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router
  .route('/auth/signup')
  .post(
    validateBody('userSchema', 'signup'),
    signup,
  );

router
  .route('/auth/signin')
  .post(
    validateBody('userSchema', 'signin'),
    signin,
  );
router
  .route('/products')
  .get(
    authMiddleware,
    getProducts,
  );

router
  .route('/product/new')
  .post(
    authMiddleware,
    validateBody('productSchema', 'createProduct'),
    createProduct,
  );

export default router;
