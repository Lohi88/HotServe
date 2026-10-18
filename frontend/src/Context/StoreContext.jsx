import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
  const [cartItem, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);
  const [token, setToken] = useState("");
  const url = "http://localhost:4000";

  // ✅ Add item to cart
  const addToCart = async (itemId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to add items to cart");
      return;
    }

    try {
      const res = await axios.post(
        `${url}/api/cart/add`,
        { itemId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ Item added to cart:", res.data);

      // Update local cart state
      if (!cartItem[itemId]) {
        setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
      } else {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
      }
    } catch (error) {
      console.error("❌ Error adding to cart:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  // ✅ Remove item from cart
  const removeFromCart = async (itemId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to remove items from cart");
      return;
    }

    try {
      const res = await axios.post(
        `${url}/api/cart/remove`,
        { itemId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ Removed from DB:", res.data);

      // Update local state
      setCartItems((prev) => {
        const updated = { ...prev };
        if (updated[itemId] > 1) {
          updated[itemId] -= 1;
        } else {
          delete updated[itemId];
        }
        return updated;
      });
    } catch (error) {
      console.error("❌ Error removing from cart:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  // ✅ Calculate total cart amount
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItem[item];
        }
      }
    }
    return totalAmount;
  };

  // ✅ Fetch food list from backend
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setFoodList(response.data.data);
    } catch (error) {
      console.error("❌ Failed to fetch food list:", error.message);
    }
  };

  // ✅ Load cart from backend
  const loadCartData = async (token) => {
    try {
      const response = await axios.post(
        `${url}/api/cart/get`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCartItems(response.data.cartData || {});
    } catch (error) {
      console.error("❌ Failed to load cart data:", error.response?.data || error.message);
    }
  };

  // ✅ On first load
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
      }
    }

    loadData();
  }, []);

  // ✅ Optional: persist to localStorage (for faster UI, not required if backend is reliable)
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItem));
  }, [cartItem]);

  const contextValue = {
    food_list,
    cartItem,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
