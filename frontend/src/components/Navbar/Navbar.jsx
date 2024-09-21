import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [menu, setMenu] = useState("home");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    alert("Logged out");
    navigate("/");
  };

  useEffect(() => {}, []);

  return (
    <div className="navbar flex justify-between items-center p-4 text-gray-700">
      <img
        src={assets.logo}
        alt=""
        className="w-40 cursor-pointer"
        onClick={() => navigate("/")}
      />
      <ul className="navbar-menu flex list-none gap-5 text-xl">
        <li
          className={`cursor-pointer ${
            menu === "home" ? "border-b-2 border-orange-600" : ""
          }`}
          onClick={() => setMenu("home")}
        >
          Home
        </li>
        <li
          className={`cursor-pointer ${
            menu === "menu" ? "border-b-2 border-orange-600" : ""
          }`}
          onClick={() => setMenu("menu")}
        >
          Menu
        </li>
        <li
          className={`cursor-pointer ${
            menu === "contact" ? "border-b-2 border-orange-600" : ""
          }`}
          onClick={() => setMenu("contact")}
        >
          Contact Us
        </li>
      </ul>
      <div className="navbar-right flex items-center gap-10">
        <img src={assets.search_icon} alt="Search" className="cursor-pointer" />
        <div className="navbar-search-icon relative">
          <img
            src={assets.basket_icon}
            alt="Basket"
            className="cursor-pointer"
            onClick={() => navigate("/cart")}
          />
          <div className="dot absolute top-[-5px] left-[11px] bg-red-500 rounded-full w-2 h-2"></div>
        </div>

        {isLoggedIn ? (
          <button
            className="px-4 py-1 border border-orange-600 rounded-lg hover:bg-orange-500 hover:text-white"
            onClick={handleLogout} // Use handleLogout directly
          >
            Logout
          </button>
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

export default Navbar;
