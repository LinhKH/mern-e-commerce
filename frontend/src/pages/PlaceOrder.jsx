import React, { useContext, useEffect, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const { token, navigate, cartItems, products, getCartAmount, delivery_fee, setCartItems } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    let tempCartData = [];
    if (products.length > 0) {
      for (const item in cartItems) {
        const product = products.find((product) => product._id === item);
        const sizes = cartItems[item];
        for (const size in sizes) {
          tempCartData.push({
            ...product,
            size,
            quantity: sizes[size],
          });
        }
      }
    };

    let orderData = {
      address: formData,
      items: tempCartData,
      amount: getCartAmount() + delivery_fee,
      paymentMethod: method
    };
    switch (method) {
      case 'cod':
        try {
          const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, orderData, { headers: { token: token } });

          if (response.data.success) {
            setCartItems({});
            navigate('/orders');
          } else {
            console.log(response.data.message);
          }
          
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
        break;
      case 'stripe':
        console.log('Stripe');
        break;
      default:
        console.log('Default');
    };


  };

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

  return (
    <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* left side bar */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1='PLACE' text2='ORDER' />
        </div>
        <div className="flex gap-3">
          <input onChange={handleChange} name='firstName' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First name' />
          <input onChange={handleChange} name='lastName' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last name' />
        </div>
        <input onChange={handleChange} name='email' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email' />
        <input onChange={handleChange} name='street' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' />
        <div className="flex gap-3">
          <input onChange={handleChange} name='city' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
          <input onChange={handleChange} name='state' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />
        </div>
        <div className="flex gap-3">
          <input onChange={handleChange} name='zip' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zip code' />
          <input onChange={handleChange} name='country' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />
        </div>
        <input onChange={handleChange} name='phone' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Phone' />
      </div>
      {/* end left side bar */}
      {/* right side bar */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1='PAYMENT' text2='METHOD' />
          <div className='flex flex-col gap-3 md:flex-col xl:flex-row '>
            <div onClick={() => setMethod('stripe')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${ method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
            </div>
            
            <div onClick={() => setMethod('cod')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${ method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>
        </div>
        <div className="w-full text-end mt-8">
          <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
