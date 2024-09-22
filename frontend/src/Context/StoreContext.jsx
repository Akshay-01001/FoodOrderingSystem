import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchCartData()
  },[])
  
  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/foods/");
        setFoodList(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFoodData();
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/cart/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("authToken")}`,
        },
      });
      const cartData = response.data.reduce((acc, item) => {
        acc[item.food] = item.quantity;
        return acc;
      }, {});
      
      setCartItems(cartData);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart1 = async (itemId, quantity = 1, message) => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/cart/",
        {
          id: itemId,
          quantity: quantity,
          message: message,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("authToken")}`,
          },
        }
      );
      // fetchCartData();
    } catch (error) {
      console.log(error.message);
    }
  };

  const addToCart = async (itemId) => {
    if (isAdding) return;
    setIsAdding(true);
  
    const currentQuantity = cartItems[itemId] || 0;
    const newQuantity = currentQuantity + 1;
    
    setCartItems((prev) => ({
      ...prev,
      [itemId]: newQuantity,
    }));
  
    await addToCart1(itemId, newQuantity, "add");
    setIsAdding(false);
  };

  const getTotalCartAmount = () => {

    let totalAmount = 0;

    Object.keys(cartItems).forEach((itemId) => {
      const itemInfo = food_list.find(
        (product) => product.id === parseInt(itemId)
      );
      console.log(itemInfo);

      if (itemInfo) {
        totalAmount += itemInfo.price * cartItems[itemId];
      }
    });
    return totalAmount;
  };

  const removeFromCart = async (itemId) => {
    if (isAdding) return;
  
    setIsAdding(true);
    const currentQuantity = cartItems[itemId] || 0;
    const updatedQuantity = currentQuantity - 1;
  
    if (updatedQuantity > 0) {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: updatedQuantity,
      }));
      await addToCart1(itemId, updatedQuantity, "remove");
    } else {
      setCartItems((prev) => {
        const { [itemId]: _, ...rest } = prev;
        return rest; 
      });
      await addToCart1(itemId, 0, "delete"); 
    }
  
    setIsAdding(false);
  };
  

  const contextValue = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
