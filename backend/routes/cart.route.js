import express from 'express';
import { addItemToCart, getCartItems, updateItemFromCart } from '../controllers/cart.controller.js';
import authUser from '../middleware/authUser.js';

const router = express.Router();

router.route('/').get(authUser, getCartItems).post(authUser, addItemToCart).put(authUser, updateItemFromCart);

export default router;


