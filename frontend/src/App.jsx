import React, { useState,useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import Header from './components/Header/Header'
import Exploremenu from './components/Exploremenu/Exploremenu'
import Cart from './pages/Cart/Cart'
import FoodDisplay from './components/FoodDisplay/FoodDisplay'
import Home from './pages/Home/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import LoginPopup from './components/Login/LoginPopup'
import UserOrder from './pages/UserOrder/UserOrder'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
// import PaymentPage from './pages/Payment/PaymentPage';
import PaymentPage from './pages/payment/PaymentPage'

const App = () => {
  const [showLogin,setShowLogin] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    }else{
      setIsLoggedIn(false);
    }
  }, [isLoggedIn,setIsLoggedIn]);

  return (
   <>
   <ToastContainer />
   {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <Router>
        <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
          {/* <Route path="/menu" element={<Exploremenu />} /> */}
          <Route path="/cart" element={<Cart isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/food" element={<FoodDisplay />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/signin" element={<LoginPopup setShowLogin={setShowLogin} setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path='/my-orders' element={<UserOrder isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path='/payment' element={<PaymentPage />} />
        </Routes>
      </Router>
   </>
  )
}

export default App