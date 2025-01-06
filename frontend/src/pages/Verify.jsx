import React, { useContext, useEffect } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("order_id");
  const navigate = useNavigate();

  const verifyOrder = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/verify`,
        { order_id: orderId, success },
        {
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data);
      if (response.data.success) {
        navigate("/orders");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error verifying order:", error);
    }
  };

  useEffect(() => {
    verifyOrder();
  }, []);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
