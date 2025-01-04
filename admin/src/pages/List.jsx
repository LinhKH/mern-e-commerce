import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import axios from "axios";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [items, setItems] = useState([]);

  const currency = "$";

  const fetchItems = async () => {
    try {
      const {
        data: { products, success },
      } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/list`
      );
      if (success) {
        setItems(products);
      } else {
        toast.error("Failed to fetch items");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const {
        data: { success, message },
      } = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}/remove`,
        { headers: { token } }
      );
      if (success) {
        fetchItems();
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      <p className="mb-2">All Products</p>
      <div className="flex flex-col gap-2">
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] gap-2 items-center py-1 px-2 bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>
        {items.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] gap-2 items-center py-1 px-2 bg-gray-100 text-sm"
          >
            <img className="w-10 h-10" src={item.image[0]} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>
              {currency}
              {item.price}
            </p>
            <button
              onClick={() => deleteProduct(item._id)}
              className="text-right md:text-center cursor-pointer text-lg"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
