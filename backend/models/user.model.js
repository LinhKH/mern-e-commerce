import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // isAdmin: {
  //   type: Boolean,
  //   required: true,
  //   default: false,
  // },
  cartData: {
    type: Object,
    default: {},
  },
  date: {
    type: Date,
    default: new Date(),
  },
}, {
  minimize: false,
});

const User = mongoose.model("User", userSchema);

export default User;