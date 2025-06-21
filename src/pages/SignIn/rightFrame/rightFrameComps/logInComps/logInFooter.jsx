import React from 'react'

export default function LogInFooter() {
  return (
    <div className='w-full h-[20%] flex flex-col justify-center items-center'>
            <a href="#" className="w-full text-center mt-8 bg-white text-black font-outfit font-semibold text-3xl/13 rounded-md cursor-pointer hover:-translate-y-0.5 transition-transform duration-200 ease-in-out">
                Log in
            </a>
            <a href="/signup" className="font-outfit font-regular text-[1rem] mt-2 text-[#717171] cursor-pointer hover:underline transition-all">
                Don't have an account? <span className="text-white">Sign up</span>
            </a>
        </div>
  )
}
