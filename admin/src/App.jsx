import React,{useState,useEffect} from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import Login from "../src/components/Login/Login"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const url = "http://localhost:4000";
  const [isLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setIsUserLoggedIn(true);
    }
  }, []);

  return (
    <div >
      <ToastContainer />
      <Navbar isLoggedIn={isLoggedIn} setIsUserLoggedIn={setIsUserLoggedIn}/>
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path='/add' element={<Add url={url}/>} />
          <Route path='/list' element={<List url={url} />} />
          <Route path='/orders' element={<Orders url={url}/>} />
          <Route path='/login' element={<Login isLoggedIn={isLoggedIn} setIsUserLoggedIn={setIsUserLoggedIn} url={url}/>} />
        </Routes>
      </div>
    </div>
  )
}

export default App