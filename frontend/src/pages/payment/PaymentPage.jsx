import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";

const PaymentPage = () => {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expDate: "",
    cvv: "",
    cardholderName: "",
  });

  const { addOrder } = useContext(StoreContext);
  const location = useLocation();  // Correctly using useLocation to get the state
  const  orderDetails  = location.state || {};  // Extract orderDetails from location state
  // console.log(location.state,"location");
  console.log(orderDetails,"orderDetails");
  
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Payment details submitted: ", cardDetails);
    console.log(orderDetails);
    
    
    if (orderDetails) {
      addOrder(orderDetails);  // Call addOrder to save the order details
      console.log("Order placed successfully:", orderDetails);
    } else {
      console.error("No order details available.");
    }

    // Here you would add the logic for payment processing (e.g., Stripe)
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center mb-6">Payment Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Cardholder Name</label>
            <input
              type="text"
              name="cardholderName"
              value={cardDetails.cardholderName}
              onChange={handleInputChange}
              className="w-full mt-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="John Doe"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={cardDetails.cardNumber}
              onChange={handleInputChange}
              className="w-full mt-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="1234 5678 9012 3456"
              maxLength="16"
              required
            />
          </div>
          <div className="flex space-x-4">
            <div className="mb-4 w-1/2">
              <label className="block text-gray-700">Expiration Date</label>
              <input
                type="text"
                name="expDate"
                value={cardDetails.expDate}
                onChange={handleInputChange}
                className="w-full mt-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="MM/YY"
                required
              />
            </div>
            <div className="mb-4 w-1/2">
              <label className="block text-gray-700">CVV</label>
              <input
                type="text"
                name="cvv"
                value={cardDetails.cvv}
                onChange={handleInputChange}
                className="w-full mt-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="123"
                maxLength="3"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md mt-4 hover:bg-blue-600 transition duration-200"
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
