import React from "react";
import { assets } from "../../assets/assets";
import Navbar from "../Navbar/Navbar";

const Header = () => {
  return (
    <>
      <div
        id="home"
        className="header relative h-[40vw] sm:h-[34vw] mx-auto my-8 bg-contain bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${assets.header_img})` }}
      >
        <div className="absolute flex flex-col items-start gap-4 max-w-[90%] sm:max-w-[50%] bottom-[10%] left-[5%] sm:left-[20vw]">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-left">
            Order Your Favourite Food Here
          </h2>
          <p className="mt-2 text-base sm:text-lg text-gray-200">
            Choose from a diverse menu featuring a delectable array of dishes
            crafted with the finest ingredients and culinary expertise.
          </p>
          <button className="mt-4 bg-[#747474] border-none p-2 text-white font-[500] rounded-2xl hover:bg-[#606060]">
            View Menu
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
