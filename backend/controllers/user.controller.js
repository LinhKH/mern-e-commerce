import validator from "validator";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // check if all fields are filled
  if (!email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: "Please fill all fields" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: "User not found!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: "Invalid credentials" });
    }
    const token = createToken(user._id);
    res.status(StatusCodes.OK).json({ success: true, token });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: error.message });
  }
};


const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  
  // check if email is valid
  if (!validator.isEmail(email)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: "Invalid email" });
  }

  if (password.length < 8) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({
        success: false,
        message: "Password must be at least 6 characters",
      });
  }

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    // create token
    const token = createToken(newUser._id);
    res
      .status(StatusCodes.CREATED)
      .json({ success: true, message: "User registered successfully!", token });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: error.message });
  }
};

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
    return res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: "Invalid credentials" });
  };

  const token = createToken({ email, password, isAdmin: true });

  res.status(StatusCodes.OK).json({ success: true, token });

};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

export { loginUser, registerUser, adminLogin };
