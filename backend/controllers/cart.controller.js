import User from "../models/user.model.js";
import { StatusCodes } from "http-status-codes";

const addItemToCart = async (req, res) => {
  const { itemId, size } = req.body;
  const userId = req.userId;

  const userData = await User.findById(userId);
  let cartData = userData.cartData;

  try {
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = { [size]: 1 };
    }
    const userCart = await User.findByIdAndUpdate(
      userId,
      { cartData },
      { new: true }
    );
    return res
      .status(StatusCodes.OK)
      .json({ success: true, userCart, message: "Item added to cart" });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: error.message });
  }
};

const getCartItems = async (req, res) => {
  try {
    const userId = req.userId;
    const { cartData } = await User.findById(userId);
    return res.status(StatusCodes.OK).json({ success: true, cartData });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: error.message });
  }
};

const updateItemFromCart = async (req, res) => {
  const { itemId, size, quantity } = req.body;
  const userId = req.userId;

  const userData = await User.findById(userId);
  let cartData = userData.cartData;

  try {
    if (quantity < 1) {
      delete cartData[itemId][size];
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      cartData[itemId][size] = quantity;
    }
    const userCart = await User.findByIdAndUpdate(
      userId,
      { cartData },
      { new: true }
    );
    const message = quantity < 1 ? "Item removed from cart" : "Item updated in cart";
    return res
      .status(StatusCodes.OK)
      .json({ success: true, userCart, message: message });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: error.message });
  }
};

export { addItemToCart, getCartItems, updateItemFromCart };
