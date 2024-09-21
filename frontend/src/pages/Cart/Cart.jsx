import React, { useContext } from "react";
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

function Cart() {
    const { cartItems, food_list, removeFromCart, getTotalCartAmount } = useContext(StoreContext);
    const navigate = useNavigate()


    return (
        <>
        <Navbar />
        <div className="cart mt-24 px-6">
            <div className="cart-items">
                <div className="cart-items-title grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center text-gray-500 text-[max(1vw,12px)] mb-4">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <hr className="h-px bg-gray-200 border-none" />
                {food_list.map((item, index) => {
                    if (cartItems[item._id] > 0) {
                        return (
                            <div key={index} className="my-4">
                                <div className='cart-items-item grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center my-2 text-black'>
                                    <img src={item.image} alt="" className="w-12 h-12 object-cover" />
                                    <p>{item.name}</p>
                                    <p>₹{item.price}</p>
                                    <p>{cartItems[item._id]}</p>
                                    <p>₹{item.price * cartItems[item._id]}</p>
                                    <p className="cursor-pointer text-red-500" onClick={() => removeFromCart(item._id)}>x</p>
                                </div>
                                <hr className="h-px bg-gray-200 border-none" />
                            </div>
                        );
                    }
                })}
            </div>
            <div className="cart-bottom mt-16 flex flex-col lg:flex-row justify-between gap-8">
                <div className="cart-total flex-1 flex flex-col gap-6 p-6 border border-gray-200 rounded-md shadow-sm">
                    <h2 className="text-xl font-semibold">Cart Total</h2>
                    <div>
                        <div className="cart-total-details flex justify-between text-gray-700">
                            <p>Subtotal</p>
                            <p>₹{getTotalCartAmount()}</p>
                        </div>
                        <hr className="my-3" />
                        <div className="cart-total-details flex justify-between text-gray-700">
                            <p>Delivery Fee</p>
                            <p>₹{2}</p>
                        </div>
                        <hr className="my-3" />
                        <div className="cart-total-details flex justify-between">
                            <b>Total</b>
                            <b>₹{getTotalCartAmount() + 2}</b>
                        </div>
                    </div>
                    <button className="bg-tomato text-white bg-orange-600 w-1/2 py-3 rounded cursor-pointer mt-4" onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
                </div>
                <div className="cart-promocode flex-1 p-6 border border-gray-200 rounded-md shadow-sm">
                    <p className="text-gray-700">If you have a promo code, Enter it here</p>
                    <div className="cart-promocode-input flex justify-between items-center bg-gray-200 mt-3 rounded">
                        <input type="text" className="bg-transparent border-none outline-none pl-3 w-full py-2" placeholder="Promo code" />
                        <button className="bg-black text-white w-[max(10vw,150px)] py-3 px-4 rounded ml-2">Submit</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Cart;
