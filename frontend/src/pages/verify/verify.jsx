import React, { useEffect, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import "./verify.css";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { url, token } = useContext(StoreContext);

  const orderId = searchParams.get("orderId");
  const razorpay_order_id = searchParams.get("razorpay_order_id");
  const razorpay_payment_id = searchParams.get("razorpay_payment_id");
  const razorpay_signature = searchParams.get("razorpay_signature");

  const verifyPayment = async () => {
    try {
      if (!orderId || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        alert("Invalid payment details!");
        return navigate("/");
      }

      const response = await axios.post(
        `${url}/api/order/verifyOrder`,
        {
          orderId,
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data.success) {
        alert("✅ Payment verified successfully!");
        navigate("/myorders");
      } else {
        alert("❌ Payment verification failed!");
        navigate("/");
      }

    } catch (err) {
      console.error("Error verifying payment:", err.response?.data || err.message);
      alert("❌ Something went wrong during verification!");
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="verify">
      <div className="spinner"></div>
      <p>Verifying your payment, please wait...</p>
    </div>
  );
};

export default Verify;
