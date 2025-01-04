import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 10;
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();

  const addToCart = (itemId, size) => {
    if(!size) {
      toast.error('Please select a size');
      return false;
    }
    if (cartItems[itemId]) {
      if (cartItems[itemId][size]) {
        cartItems[itemId][size] += 1;
      } else {
        cartItems[itemId][size] = 1;
      }
    } else {
      cartItems[itemId] = { [size]: 1 };
    }
    setCartItems({ ...cartItems });
  };

  const updateCartQuantity = (itemId, size, quantity) => {
    if (quantity < 1) {
      delete cartItems[itemId][size];
      if (Object.keys(cartItems[itemId]).length === 0) {
        delete cartItems[itemId];
      }
    } else {
      cartItems[itemId][size] = quantity;
    }
    setCartItems({ ...cartItems });
  };

  const getCartCount = () => {
    let count = 0;
    for (const item in cartItems) {
      for (const size in cartItems[item]) {
        count += cartItems[item][size];
      }
    }
    return count;
  };

  const getCartAmount = () => {
    let amount = 0;
    for (const item in cartItems) {
      const product = products.find((product) => product._id === item);
      for (const size in cartItems[item]) {
        amount += product.price * cartItems[item][size];
      }
    }
    return amount;
  };

  const getAllProducts = async () => {
    try {
      const { data : { success, products}} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/list`);
      if (!success) {
        toast.error('Failed to fetch products');
        return;
      }
      console.log(products);
      setProducts(products);
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    products, currency, delivery_fee, search, setSearch, showSearch, setShowSearch, cartItems, addToCart, getCartCount, updateCartQuantity,
    getCartAmount, navigate
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;