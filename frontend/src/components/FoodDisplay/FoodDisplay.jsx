import React, { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  return (
    <div className="relative sm:w-3/4 mx-auto">
      <h2 className="font-[500] text-xl top-2">Top dishes near you</h2>
      <div className="flex flex-wrap mt-5">
        {food_list.map((item, index) => {
          const imageUrl = `http://127.0.0.1:8000/api${item.image}`
          console.log(imageUrl);
          
          if (category === "All" || category === item.category) {
            return (
              <FoodItem
                key={item.id}
                id={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={imageUrl}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
