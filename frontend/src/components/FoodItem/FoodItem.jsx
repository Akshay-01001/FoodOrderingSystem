import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";

const FoodItem = ({ id, name, description, price, image }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  // console.log(id);
  console.log(cartItems);
  
  
  return (
    <div className="flex flex-col gap-2 w-[80%] mx-auto sm:w-[48%] p-2 border rounded-lg shadow-sm m-2">
      <div className="flex justify-center relative">
        {!cartItems[id] ? (
          <img
            src={assets.add_icon_white}
            alt=""
            className="w-10 h-10 absolute bottom-5 right-5"
            onClick={() => addToCart(id)}
          />
          
        ) : (
          <div className="flex bg-white rounded-full justify-evenly items-center absolute bottom-7 gap-2 right-3">
            <img
              src={assets.remove_icon_red}
              alt=""
              className="w-10 h-10 "
              onClick={() => removeFromCart(id)}
              
            />
            <span>{cartItems[id]}</span>
            <img
              src={assets.add_icon_green}
              alt=""
              className="w-10 h-10 "
              onClick={() => addToCart(id)}
            />
          </div>
        )}
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover rounded-md"
        />
      </div>
      <div className="flex flex-col justify-between p-2">
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold">{name}</p>
          <img src={assets.rating_starts} alt="Rating" className="h-5" />
        </div>
        <p className="text-gray-600">{description}</p>
        <p className="text-lg font-bold">RS. {price * 10}</p>
      </div>
    </div>
  );
};

export default FoodItem;
