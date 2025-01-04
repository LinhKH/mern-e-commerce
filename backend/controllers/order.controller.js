import mongoose from "mongoose";
import Order from "../models/order.model.js";
import User from "../models/user.model.js";

// place order with COD
const placeOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { items, amount, address, paymentMethod } = req.body;
    const userId = req.userId;

    const order = new Order({
      userId,
      items,
      amount,
      address,
      paymentMethod,
    });
    await order.save({session});
    await User.findByIdAndUpdate(userId, { cartData: {} }, {session});

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const placeOrderStripe = async (req, res) => {};

const updateOrderStatus = async (req, res) => {};

const getMyOrders = async (req, res) => {};

const getOrderById = async (req, res) => {};

const getAdminOrders = async (req, res) => {};

export {
  placeOrder,
  placeOrderStripe,
  getOrderById,
  updateOrderStatus,
  getMyOrders,
  getAdminOrders,
};
