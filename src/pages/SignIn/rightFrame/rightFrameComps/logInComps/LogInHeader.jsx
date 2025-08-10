import React from 'react'

export default function LogInHeader() {
  return (
    <div className='w-full h-20 sm:h-24 flex flex-col justify-start items-center gap-2'>
      <h2 className='text-[#F3F3EE] font-outfit font-semibold text-4xl sm:text-5xl/15 cursor-default'>
        Log In
      </h2>
      <h2 className='font-outfit font-regular text-[1rem] sm:text-[1.1rem] text-[#717171] cursor-default'>
        Enter your details to access your account
      </h2>
    </div>
  )
}
