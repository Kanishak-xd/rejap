import React from 'react';

export default function LogInPwd({ password, setPassword, setShowModal }) {
  return (
    <div className='w-full h-20 sm:h-20 flex flex-col justify-center items-start gap-1'>
      <h2 className='font-outfit font-medium text-[1.3rem] sm:text-[1.5rem] text-white cursor-default'>
        Password
      </h2>
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 sm:px-4 py-3 sm:py-3 rounded-md bg-[#1A1A1A] text-white text-base sm:text-base focus:outline-none focus:ring-2 focus:ring-white"
      />
      <h3
        onClick={() => setShowModal(true)}
        className='font-outfit font-regular text-[1rem] sm:text-[1rem] text-[#717171] cursor-pointer hover:underline'
      >
        Forgot password?
      </h3>
    </div>
  );
}