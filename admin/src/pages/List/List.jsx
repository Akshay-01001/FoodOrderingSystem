import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
// import { XCircleIcon } from '@heroicons/react/solid'; // Importing the cross icon

const List = () => {
  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    fetchFoodData();
  }, []);

  const fetchFoodData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/foods/", {
        headers: {
          // Authorization: `Token ${localStorage.getItem("authToken")}`,
        },
      });
      setFoodList(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFood = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/foods/${id}/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("adminToken")}`,
        }
      });
      fetchFoodData()
      toast("Food item deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Food Items</h2>

      <div className="grid grid-cols-5 gap-4 font-semibold text-gray-600 border-b-2 pb-2 text-center">
        <span>Image</span>
        <span>Name</span>
        <span>Category</span>
        <span>Price</span>
        <span>Action</span>
      </div>

      {foodList.map((item, index) => {
        return (
          <div className="mt-4">
            <div className="grid grid-cols-5 gap-4 items-center border-b py-4 text-center">
              <img
                src={"http://127.0.0.1:8000/api" + item.image}
                alt="Food item"
                className="w-12 h-12 rounded-full object-cover mx-auto"
              />
              <span>{item.name}</span>
              <span>{item.category}</span>
              <span>RS. {item.price}</span>
              <button className="text-red-500 hover:text-red-600 mx-auto" onClick={() => deleteFood(item.id)}>
                X
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default List;
