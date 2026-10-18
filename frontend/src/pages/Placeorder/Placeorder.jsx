import React, { useContext, useState } from "react";
import "./Placeorder.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItem, url, setCartItem } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const placeOrderHandler = async (e) => {
    e.preventDefault();

    const orderItems = food_list
      .filter((item) => cartItem[item._id] > 0)
      .map((item) => ({ ...item, quantity: cartItem[item._id] }));

    if (orderItems.length === 0) return alert("Your cart is empty!");

    const orderData = { items: orderItems, address: data };

    try {
      const res = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const { success, orderId, razorpayOrderId, amount, currency, key } = res.data;
      if (!success) return alert("Order creation failed");

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) return alert("Razorpay SDK failed to load");

      const options = {
        key,
        amount,
        currency,
        name: "Food Delivery",
        description: "Order Payment",
        order_id: razorpayOrderId,
        prefill: {
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          contact: data.phone
        },
        theme: { color: "#3399cc" },
        handler: (response) => {
          // Redirect to verification page
          const query = `?orderId=${orderId}&razorpay_order_id=${response.razorpay_order_id}&razorpay_payment_id=${response.razorpay_payment_id}&razorpay_signature=${response.razorpay_signature}`;
          window.location.href = `/verify${query}`;
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error("Order placement error:", error.response?.data || error.message);
      alert("Something went wrong while placing order");
    }
  };

  return (
    <form onSubmit={placeOrderHandler} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name="firstName" onChange={onChangeHandler} value={data.firstName} placeholder="First Name" />
          <input required name="lastName" onChange={onChangeHandler} value={data.lastName} placeholder="Last Name" />
        </div>
        <input required name="email" onChange={onChangeHandler} value={data.email} placeholder="Email" />
        <input required name="street" onChange={onChangeHandler} value={data.street} placeholder="Street" />
        <div className="multi-fields">
          <input required name="city" onChange={onChangeHandler} value={data.city} placeholder="City" />
          <input required name="state" onChange={onChangeHandler} value={data.state} placeholder="State" />
        </div>
        <div className="multi-fields">
          <input required name="zipcode" onChange={onChangeHandler} value={data.zipcode} placeholder="Zip Code" />
          <input required name="country" onChange={onChangeHandler} value={data.country} placeholder="Country" />
        </div>
        <input required name="phone" onChange={onChangeHandler} value={data.phone} placeholder="Phone" />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p><p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p><p>₹{getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b><b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
