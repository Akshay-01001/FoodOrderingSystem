import React, { useContext, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { StoreContext } from "../../Context/StoreContext";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { addOrder } = useContext(StoreContext);
  const { getTotalCartAmount, cartItems, food_list } = useContext(StoreContext);
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    first_name: "",
    last_name: "",
    total_price: 0,
    email: "",
    street: "",
    city: "",
    zipcode: "",
    country: "",
    mobile: "",
    items: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const orderItems = Object.keys(cartItems).map((itemId) => {
      const foodItem = food_list.find((food) => food.id === parseInt(itemId));
      return {
        food: parseInt(itemId),      
        quantity: cartItems[itemId],  
        price: parseFloat(foodItem.price),        
      };
    });

    const orderDetails = {
      ...details,
      total_price: getTotalCartAmount() + 2,
      items: orderItems,
    };

    // addOrder(orderDetails);
    console.log("Proceed to Payment");
    console.log(orderDetails);
    navigate("/payment",{state:orderDetails});
  };


  // const addOrder = async (orderDetails) => {
  //   try {
  //     const response = await axios.post("http://127.0.0.1:8000/api/orders/", orderDetails, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Token ${localStorage.getItem("authToken")}`,
  //       },
  //     });
  //     console.log(response.data);
  //   } catch (error) {
  //     console.log("Error placing order: ", error);
  //   }
  // };


  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Navbar />
      <form
        className="place-order w-full mt-8 px-4 lg:px-0 lg:w-3/4 mx-auto flex flex-col lg:flex-row gap-8"
        onSubmit={handleSubmit}
      >
        {/* Delivery Information Section */}
        <div className="place-order-left w-full lg:w-1/2 space-y-6">
          <p className="text-2xl font-semibold">Delivery Information</p>
          <div className="multi-fields flex gap-4">
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={handleChange}
              value={details.first_name}
              // required
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={handleChange}
              value={details.last_name}
              // required
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            onChange={handleChange}
            value={details.email}
            // required
          />
          <input
            type="text"
            name="street"
            placeholder="Street"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            onChange={handleChange}
            value={details.street}
            // required
          />
          <div className="multi-fields flex gap-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={handleChange}
              value={details.city}
              // required
            />
            <input
              type="text"
              name="zipcode"
              placeholder="Zip code"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={handleChange}
              value={details.zipcode}
              // required
            />
          </div>
          <input
            type="text"
            name="country"
            placeholder="Country"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            onChange={handleChange}
            value={details.country}
            // required
          />
          <input
            type="tel"
            name="mobile"
            placeholder="Phone"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            onChange={handleChange}
            value={details.mobile}
            // required
          />
        </div>

        {/* Cart Total Section */}
        <div className="place-order-right w-full lg:w-1/2 flex flex-col gap-6 p-6 border border-gray-200 rounded-md shadow-sm">
          <h2 className="text-xl font-semibold">Cart Total</h2>
          <div>
            <div className="cart-total-details flex justify-between text-gray-700">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr className="my-3" />
            <div className="cart-total-details flex justify-between text-gray-700">
              <p>Delivery Fee</p>
              <p>₹{2}</p>
            </div>
            <hr className="my-3" />
            <div className="cart-total-details flex justify-between text-lg font-bold">
              <b>Total</b>
              <b>₹{getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button
            type="submit"
            className="bg-orange-600 text-white w-full py-3 rounded-md cursor-pointer mt-4 hover:bg-orange-700 transition duration-300"
          >
            PROCEED TO PAYMENT
          </button>
        </div>
      </form>

      <Footer />
    </>
  );
};

export default PlaceOrder;