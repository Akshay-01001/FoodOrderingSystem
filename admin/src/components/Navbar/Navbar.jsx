import React from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      {isLoggedIn ? (
        <>
          <img className="logo" src={assets.logo} alt="" />
          <img className="profile" src={assets.profile_image} alt="" />
        </>
      ) : (
        <>
          <img className="logo" src={assets.logo} alt="" />
          <button className="profile" onClick={()=> navigate("/login")}>Login</button>
        </>
      )}
    </div>
  );
};

export default Navbar;
