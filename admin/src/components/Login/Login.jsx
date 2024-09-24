import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Login({isLoggedIn,setIsUserLoggedIn}) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    username: "",
    password: "",
    message : "admin"
  });
 

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login/",
        // {
        //   username: user.username,
        //   password: user.password,
        //   message : user.message
        // },
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const token = response.data;
        localStorage.setItem("adminToken", token);
        setIsUserLoggedIn(true);
        toast("Login successful");
        navigate("/");
      }
    } catch (error) {
      setError(error.response?.data.error || "An error occurred during login.");
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsUserLoggedIn(false);
    toast("Logged out successfully");
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  if (isLoggedIn) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 w-1/3">
          <h2 className="text-2xl font-bold mb-4">Welcome, {user.username}</h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 w-full">
      <form
        className="bg-white shadow-lg rounded-lg p-8 mx-auto w-1/3"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Login</h2>
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Login
        </button>
        <div className="mt-4 flex items-center">
          <input type="checkbox" required className="mr-2" />
          <p className="text-sm text-gray-600">
            By continuing, I agree to the terms of use & privacy policy.
          </p>
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
    </div>
  );
}

export default Login;
