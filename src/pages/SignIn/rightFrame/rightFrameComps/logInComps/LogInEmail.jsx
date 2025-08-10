import React from 'react'

export default function LogInEmail({ email, setEmail }) {
  return (
    <div className='w-full h-20 sm:h-20 flex flex-col justify-center items-start gap-1'>
      <h2 className='font-outfit font-medium text-[1.3rem] sm:text-[1.5rem] text-white cursor-default'>
        Email
      </h2>
      <input
        type="text"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 sm:px-4 py-3 sm:py-3 rounded-md bg-[#1A1A1A] text-white text-base sm:text-base focus:outline-none focus:ring-2 focus:ring-white"
      />
    </div>
  )
}
