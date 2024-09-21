import React, { useContext } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { StoreContext } from "../../Context/StoreContext";
import Footer from "../../components/Footer/Footer";

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Proceed to Payment");
  };

  return (
    <>
      <Navbar />
      <form
        action=""
        className="place-order w-full mt-8 px-4 lg:px-0 lg:w-3/4 mx-auto flex flex-col lg:flex-row gap-8"
        onSubmit={handleSubmit}
      >
        {/* Delivery Information Section */}
        <div className="place-order-left w-full lg:w-1/2 space-y-6">
          <p className="text-2xl font-semibold">Delivery Information</p>
          <div className="multi-fields flex gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <input
            type="email"
            placeholder="Email address"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
          <input
            type="text"
            placeholder="Street"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
          <div className="multi-fields flex gap-4">
            <input
              type="text"
              placeholder="City"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
            <input
              type="text"
              placeholder="State"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <div className="multi-fields flex gap-4">
            <input
              type="text"
              placeholder="Zip code"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
            <input
              type="text"
              placeholder="Country"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <input
            type="tel"
            placeholder="Phone"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
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
            className="bg-orange-600 text-white w-full py-3 rounded-md cursor-pointer mt-4 hover:bg-orange-700 transition duration-300"
            onClick={getTotalCartAmount}
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
