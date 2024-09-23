import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { StoreContext } from "../../Context/StoreContext";
import { assets } from "../../assets/assets";

const UserOrder = () => {
  const { food_list } = useContext(StoreContext);
  const [orders, setOrders] = useState([]); // Initialize as an empty array for multiple orders
  const [loading, setLoading] = useState(true); // Loading state

  const fetchOrders = async () => {
    console.log("Fetching orders...");
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/orders/",
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("authToken")}`,
          },
        }
      );
      console.log("Orders fetched:", response.data);
      setOrders(response.data); // Set orders to the fetched data
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (orders.length === 0) return <p>No orders found.</p>;

  return (
    <div className="my-orders my-12">
      <h2 className="text-2xl font-semibold">My Orders</h2>
      <div className="flex flex-col gap-5 mt-8">
        {orders.map((order) => (
          <div key={order.id} className="grid grid-cols-6 items-center gap-8 text-sm p-3 border border-tomato text-gray-700">
            <img src={assets.parcel_icon} alt="" className="w-12" />
            <p>
              {order.items.map(item => {
                const foodItem = food_list ? food_list.find(food => food.id === item.food) : null;
                return foodItem ? `${foodItem.name} x ${item.quantity}` : `Food not found x ${item.quantity}`;
              }).join(', ')}
            </p>
            <p>₹ {order.total_price}.00</p>
            <p>Items: {order.items.length}</p>
            <p>
              <span className="text-tomato">&#x25cf;</span>
              <b className="font-medium">{order.status}</b>
            </p>
            <button className="border-none py-3 rounded bg-red-200 cursor-pointer text-gray-700">
              Track Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserOrder;
