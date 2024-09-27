import React from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";





const Navbar = ({ isLoggedIn ,setIsUserLoggedIn}) => {

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsUserLoggedIn(false);
    toast("Logged out successfully");
  };

  const navigate = useNavigate();
  return (
    <div className="navbar">
      {isLoggedIn ? (
        <>
          <img className="logo" src={assets.logo} alt="" />
          <button className="bg-gray-700 text-white p-3 rounded-full" onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <img className="logo" src={assets.logo} alt="" />
          <button className="profile bg-gray-700 text-white p-3 rounded-full" onClick={()=> navigate("/login")}>Login</button>
        </>
      )}
    </div>
  );
};

export default Navbar;
