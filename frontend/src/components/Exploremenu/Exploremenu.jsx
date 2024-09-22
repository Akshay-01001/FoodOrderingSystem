import React, { useState } from "react";
import { menu_list } from "../../assets/assets";
import "./Exploremenu.css";
import FoodDisplay from "../FoodDisplay/FoodDisplay";

const Exploremenu = ({ category, setCatogory }) => {
  // const [menu, setMenu] = useState("All")
  return (
    <div
      className="explore-menu relative flex flex-col gap-5 w-full sm:w-3/4  mx-auto"
      id="explore-menu"
    >
      <h1 className="font-[500] text-2xl">Explore Our Menu</h1>
      <p className="text">Choose From a Diverse Menu</p>
      <div className="exploremenu-list flex justify-between items-center sm:gap-8 text-center overflow-x-scroll transition-[0.2s]">
        {menu_list.map((item, index) => {
          return (
            <div
              key={index}
              className="cursor-pointer"
              onClick={() => setCatogory(item.menu_name)}
            >
              <img
                src={item.menu_image}
                alt=""
                className={
                  category == item.menu_name
                    ? "border-4 border-orange-600 rounded-full"
                    : ""
                }
              />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr className="h-4 w-full" />
    </div>
  );
};

export default Exploremenu;
