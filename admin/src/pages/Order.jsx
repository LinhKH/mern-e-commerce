import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { assets } from "../assets/assets";

const Order = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("");
  const currency = "$";

  const fetchOrders = async () => {
    if (!token) return null;
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders`,
        {
          headers: {
            token,
          },
        }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatus = async (e, orderId) => {
    const { value } = e.target;
    // console.log(orderId);
    // setStatus(value);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderId}/status`,
        { status: value },
        {
          headers: {
            token,
          },
        }
      );
      if (response.data.success) {
        fetchOrders();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div>
      <h3>All Orders</h3>
      <div>
        {orders.map((order) => (
          <div
            key={order._id}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-center border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
          >
            <img className="w-12" src={assets.parcel_icon} alt="" />
            <div>
              <div>
                {order.items.map((item, index) => (
                  <p key={index} className="py-0.5">
                    {item.name} x {item.quantity} <span>{item.size}</span>
                    {index !== order.items.length - 1 && ","}
                  </p>
                ))}
              </div>
              <p className="mt-3 mb-2 font-medium">{order.address.firstName + " " + order.address.lastName}</p>
              <div>
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country}
                </p>
              </div>
              <p>{order.address.phone}</p>
            </div>
            <div>
              <p className="text-sm sm:text-[15px]">
                <b>Items:</b> {order.items.length}
              </p>
              <p className="mt-3">
                <b>Method:</b> {order.paymentMethod}
              </p>
              <p>
                <b>Payment:</b> {order.payment ? "Paid" : "Pending"}
              </p>
              <p>
                <b>Date:</b> {new Date(order.date).toLocaleString()}
              </p>
            </div>
            <p className="text-sm sm:text-[15px]">
              {currency}
              {order.amount}
            </p>
            <select className="p-2 font-semibold" onChange={(e) => handleStatus(e, order._id)} value={order.status}>
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivery">Delivery</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
