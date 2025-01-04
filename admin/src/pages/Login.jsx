import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = ({setToken}) => {
  const [email, setEmail] = useState('admin@gmail.com');
  const [password, setPassword] = useState('password');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/admin`, {email, password});
      if (response.data.success) {
        setToken(response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(response.data.message);
    }
    
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 w-full'>
      <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
        <h1 className='text-2xl font-bold mb-4 text-center'>Admin panel</h1>
        <form onSubmit={handleSubmit}>
          <div className='min-w-72 mb-3'>
            <p className='text-sm font-medium text-gray-700 mb-2'>Email address</p>
            <input onChange={(e) => setEmail(e.target.value)} value={email} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="email" placeholder='your@email.com' required />
          </div>
          <div className='min-w-72 mb-3'>
            <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
            <input onChange={(e) => setPassword(e.target.value)} value={password} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="password" placeholder='Enter your password' required />
          </div>
          <button className='bg-black text-white px-4 py-2 rounded-md mt-2 w-full'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login
