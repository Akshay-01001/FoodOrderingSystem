import axios from "axios";
import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";

const Orders = () => {
  const [foodList, setFoodList] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFoodData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/foods/");
      setFoodList(response.data);
    } catch (error) {
      setError("Failed to fetch food data");
      console.error(error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/orders/", {
        headers: {
          Authorization: `Token ${localStorage.getItem("adminToken")}`,
        },
      });
      setOrders(response.data);
    } catch (error) {
      setError("Failed to fetch orders");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/orders/${orderId}/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("adminToken")}`,
        },
      });
  
      const orderData = response.data;
  
      const updatedOrder = {
        ...orderData,
        status: newStatus,
      };
  
      await axios.put(`http://127.0.0.1:8000/api/orders/${orderId}/`, updatedOrder, {
        headers: {
          Authorization: `Token ${localStorage.getItem("adminToken")}`,
        },
      });
      toast("Order status updated successfully");
      fetchOrders();
    } catch (error) {
      setError("Failed to update order status");
      console.error(error);
    }
  };
  
  useEffect(() => {
    fetchFoodData();
    fetchOrders();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-600 text-center">{error}</div>;

  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold mb-4">Order Page</h3>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white shadow-lg rounded-lg p-4 border border-gray-200">
            <h4 className="text-lg font-semibold">Order ID: {order.id}</h4>
            <p className="text-gray-700">Name: {order.first_name} {order.last_name}</p>
            <p className="text-gray-700">Email: {order.email}</p>
            <p className="text-gray-700">Total Price: <span className="font-bold">{order.total_price}</span></p>
            <p className="text-gray-700">Status: {order.status}</p>
            <div className="mt-2">
              <label htmlFor={`status-${order.id}`} className="block text-sm font-medium text-gray-600">Update Status:</label>
              <select
                id={`status-${order.id}`}
                value={order.status}
                onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              >
                <option value="pending">Pending</option>
                <option value="out for delivery">Out for Delivery</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
            <h5 className="mt-4 text-md font-semibold">Items:</h5>
            <ul className="list-disc pl-5">
              {order.items.map((item) => {
                const foodItem = foodList.find(food => food.id === item.food);
                return (
                  <li key={item.id} className="flex items-center mt-1">
                    {foodItem ? (
                      <>
                        <img src={"http://127.0.0.1:8000/api" + foodItem.image} alt={foodItem.name} className="w-12 h-12 object-cover rounded-md mr-2" />
                        <span>{foodItem.name} - Quantity: {item.quantity} - Price: {item.price}</span>
                      </>
                    ) : (
                      <span>Food item not found</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
