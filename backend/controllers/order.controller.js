import mongoose from "mongoose";
import Order from "../models/order.model.js";
import User from "../models/user.model.js";

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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
    await order.save({ session });
    await User.findByIdAndUpdate(userId, { cartData: {} }, { session });

    await session.commitTransaction();
    session.endSession();

    res
      .status(200)
      .json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const placeOrderStripe = async (req, res) => {
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
    await order.save();

    // line items for stripe
    const lineItems = items.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      };
    });

    // Create a new payment intent
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/verify?success=true&order_id=${order._id}`,
      cancel_url: `${process.env.CLIENT_URL}/verify?success=false&order_id=${order._id}`,
    });

    res.status(200).json({ success: true, session_url: session.url });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// verify order
const verifyOrder = async (req, res) => {
  const { order_id, success } = req.body;
  try {
    if (success) {
      const order = await Order.findByIdAndUpdate(order_id, { payment: true }, { new: true });
      await User.findByIdAndUpdate(req.userId, { cartData: {} });
      if (!order) {
        return res.status(404).json({ success: false, message: "Order not found" });
      }
      res.status(200).json({ success: true, message: 'paid', order });
    } else {
      await Order.findByIdAndDelete(order_id);
      res.status(200).json({ success: false, message: 'cancelled' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Error in verifying order" });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const orderId = req.params.id;
    console.log(status, orderId);
    await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    res
      .status(200)
      .json({ success: true, message: "Order updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId }).sort({ date: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getOrderById = async (req, res) => {};

const getAdminOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ date: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  getOrderById,
  updateOrderStatus,
  getMyOrders,
  getAdminOrders,
  verifyOrder
};
