import React, { useState, useEffect } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function LoginPopup({ setShowLogin, setIsLoggedIn }) {
  const [currentState, setCurrentState] = useState("Sign Up");
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn]);

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register/",
        {
          username: user.username,
          email: user.email,
          password : user.password
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Registered successfully",{
        autoClose:1000
      });
      setShowLogin(false);
      navigate("/login");
    } catch (error) {
      toast.error("Register failed",{
        autoClose:1000
      })
      setError(
        error.response?.data || "An error occurred during registration."
      );
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login/",
        {
          username: user.username,
          password: user.password,
          message : "user"
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data);
        const  token  = response.data;
        localStorage.setItem("authToken", token);
        setIsLoggedIn(true);
        toast.info("Login successful",{
          autoClose:1000
        });
        setShowLogin(false);
        navigate("/");
      }
    } catch (error) {
      toast.error("login failed",{
        autoClose:1000
      })
      setError(error.response?.data.error || "An error occurred during login.");
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentState === "Sign Up") {
      handleRegister();
    } else {
      handleLogin();
    }
  };

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={handleSubmit}>
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img
            onClick={() => {
              setShowLogin(false);
              navigate("/");
            }}
            src={assets.cross_icon}
            style={{ width: "10px", height: "10px" }}
            alt="Close icon"
          />
        </div>
        <div className="login-popup-inputs">
          {currentState === "Sign Up" && (
            <input
            type="email"
            name="email"
            placeholder="Your email"
            required
            onChange={handleChange}
          />
          )}
          <input
              type="text"
              name="username"
              placeholder="Username"
              required
              onChange={handleChange}
            />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
          />
        </div>
        <button type="submit">
          {currentState === "Sign Up" ? "Create account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {error && <p className="error-message">{error}</p>}
        {currentState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrentState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrentState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
}

export default LoginPopup;
