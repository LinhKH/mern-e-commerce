import express from "express";

import {
  placeOrder,
  placeOrderStripe,
  getOrderById,
  updateOrderStatus,
  getMyOrders,
  getAdminOrders,
  verifyOrder
} from "../controllers/order.controller.js";

import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/authUser.js";

const router = express.Router();

router.route("/").post(authUser, placeOrder).get(adminAuth, getAdminOrders);
router.route("/place-stripe").post(authUser, placeOrderStripe);
router.route("/my-orders").get(authUser, getMyOrders);
router.route("/:id").get(authUser, getOrderById);
router.route("/:id/status").put(adminAuth, updateOrderStatus);
router.route('/verify').post(authUser, verifyOrder);

export default router;
