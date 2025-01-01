import React from 'react';

const NewsletterBox = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <div className='text-center'>
      <p className="text-2xl font-medium text-gray-800">Subscribe & get 20% off</p>
      <p className="text-gray-400 mt-3">In Tailwind CSS, sm refers to a breakpoint for small screens</p>
      <form onSubmit={handleSubmit} className='w-full sm:w-1/2 flex items-center gap-3 my-6 border mx-auto pl-3'>
        <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter your email' required />
        <button className='bg-black text-white text-xs px-10 py-4' type='submit'>subscribe</button>
      </form>
    </div>
  )
}

export default NewsletterBox
