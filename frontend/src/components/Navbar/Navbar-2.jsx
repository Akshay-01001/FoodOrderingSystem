import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar2 = ({ isLoggedIn, setIsLoggedIn }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    toast.info("Logged out",{
      autoClose:1000
    });
    navigate("/");
  };

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  useEffect(() => {

  }, []);

  return (
    <div className="navbar flex justify-between items-center p-4 text-gray-700 sticky top-0 z-10 bg-white">
      <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
        <img
          src={assets.food_wagon}
          alt=""
          className="w-16 cursor-pointer h-12 ml-4 bg-white border-none inline-block"
        />
        <p className="inline-block font-[700] text-2xl ml-2 bg-clip-text text-transparent bg-gradient-to-r from-green-700 via-yellow-700 to-red-700">
          FoodWagon
        </p>
      </div>
      <div className="navbar-right flex items-center gap-10 relative">
        <div className="navbar-search-icon relative">
          <img
            src={assets.basket_icon}
            alt="Basket"
            className="cursor-pointer"
            onClick={() => {
              isLoggedIn
                ? navigate("/cart")
                : toast.warning("Please Login First", {
                    theme: "dark",
                    autoClose: 1500,
                  });
            }}
          />
          <div className="dot absolute top-[-5px] left-[11px] bg-red-500 rounded-full w-2 h-2"></div>
        </div>

        {isLoggedIn ? (
          <div className="relative">
            <button
              className="px-4 py-1 border-none rounded-lg hover:text-white"
              onClick={toggleDropdown}
            >
              <img src={assets.profile_icon} alt="" />
            </button>
            {dropdownVisible && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg">
                <button
                  className="block px-4 py-2 text-gray-700 hover:bg-orange-100 w-full text-left"
                  onClick={() => {
                    navigate("/my-orders");
                    setDropdownVisible(false);
                  }}
                >
                  My Orders
                </button>
                <button
                  className="block px-4 py-2 text-gray-700 hover:bg-orange-100 w-full text-left"
                  onClick={() => {
                    handleLogout();
                    setDropdownVisible(false);
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            className="px-4 py-1 border border-orange-600 rounded-lg hover:bg-orange-500 hover:text-white"
            onClick={() => navigate("/signin")}
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar2;
