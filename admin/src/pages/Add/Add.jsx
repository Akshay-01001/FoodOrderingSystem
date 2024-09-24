import React, { useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = ({url}) => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: 0,
    category: "Salad" 
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  const addFood = async (e) => {
    e.preventDefault();
    const formData = new FormData(); 
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('category', data.category);
    if (image) {
      formData.append('image', image); // Append image
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/foods/", formData, {
        headers: {
          Authorization: `Token ${localStorage.getItem("adminToken")}`,
          'Content-Type': 'multipart/form-data' // Set content type
        }
      });
      toast("Food item added successfully");
      console.log(response.data);
      
    } catch (error) {
      console.error(error.response.data); // Log detailed error response
    }
  };

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={addFood}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="Upload Area" />
          </label>
          <input onChange={(e) => { setImage(e.target.files[0]); }} type="file" hidden required id="image" />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder='Type here ' required />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here ' required />
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select name="category" onChange={onChangeHandler} value={data.category}>
              <option value="Salad">Salad</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
        </div>
        <div className="add-price flex-col">
          <p>Product price</p>
          <input onChange={onChangeHandler} value={data.price} type="number" name="price" placeholder='$20' required />
        </div>
        <button type='submit' className='add-btn'>ADD</button>
      </form>
    </div>
  );
};

export default Add;
