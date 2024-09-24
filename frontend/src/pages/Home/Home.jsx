import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import Exploremenu from '../../components/Exploremenu/Exploremenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Navbar/Navbar'
import { toast } from 'react-toastify'

const Home = ({isLoggedIn,setIsLoggedIn}) => {
    const [category,setCatogory] = useState("All");

    useEffect(()=>{
      toast("Welcome to the Food Ordering System!")
    },[])
  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      <Header />
      <Exploremenu category={category} setCatogory = {setCatogory}/>
      <FoodDisplay category={category}/>
      <Footer />
    </div>
  )
}

export default Home
