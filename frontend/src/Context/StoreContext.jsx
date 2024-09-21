import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);

  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/foods/");
        const data = await response.json();
        setFoodList(data);
        console.log(food_list);
        console.log(data);
        
        
      } catch (error) {
        console.log(error);
      }
    };
    
    fetchFoodData(); // Call the fetch function
  }, []);

  const addToCart = (itemId) => {
    console.log("cart",itemId);
    
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
    console.log(cartItems);
    
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      if (prev[itemId] > 1) {
        return { ...prev, [itemId]: prev[itemId] - 1 };
      } else {
        const { [itemId]: _, ...rest } = prev; // Remove item if quantity is 1
        return rest;
      }
    });
  };

  const contextValue = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
  };

  useEffect(() => {
    console.log(cartItems); // Keep this for debugging, but consider removing in production
  }, [cartItems]);

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
