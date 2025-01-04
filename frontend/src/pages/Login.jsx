import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate} = useContext(ShopContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (currentState === 'Login') {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`, {email, password});
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          // navigate('/place-order');
        } else {
          toast.error(response.data.message);
        }
        
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    } else {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/register`, {name, email, password})
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          // navigate('/place-order');
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);
  
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] m-auto mt-14 sm:max-w-96 gap-4 text-gray-800'>
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {currentState !== 'Login' && <input onChange={(e) => setName(e.target.value)} className='w-full px-3 py-2 border border-gray-800' type="text" placeholder='Name' />}
      <input onChange={(e) => setEmail(e.target.value)} className='w-full px-3 py-2 border border-gray-800' type="email" placeholder='Email' />
      <input onChange={(e) => setPassword(e.target.value)} className='w-full px-3 py-2 border border-gray-800' type="password" placeholder='Password' />
      <div className="w-full flex flex-col sm:flex-row justify-between text-sm mt-[-8px]">
        <p className='cursor-pointer'>Forgot your password?</p>
        {
          currentState === 'Login' ? (
            <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer'>Create an account</p>
          ) : (
            <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>Already have an account?</p>
          )
        }
      </div>
      <button type='submit' className='border-none px-3 py-2 bg-black text-white font-light mt-4'>{ currentState === 'Login' ? 'Login' : 'Sign Up'}</button>
    </form>
  )
}

export default Login
