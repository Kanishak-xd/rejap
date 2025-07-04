import React from 'react'

export default function LogInFooter({ setMode, handleLogin, status }) {
  return (
    <div className='w-full h-[10%] flex flex-col justify-center items-center'>
      <button onClick={handleLogin} className="w-full text-center mt-8 bg-white text-black font-outfit font-semibold text-3xl/13 rounded-md cursor-pointer hover:-translate-y-0.5 transition-transform duration-200 ease-in-out">
        Log in
      </button>
      <p className="text-sm text-green-300 mt-2">{status}</p>
      <button
        onClick={() => setMode('signup')}
        className="font-outfit font-regular text-[1rem] mt-2 text-[#717171] cursor-pointer hover:underline transition-all"
      >
        Don't have an account? <span className="text-white">Sign up</span>
      </button>
      <button
        onClick={() => setMode('forgot')}
        className="text-sm text-white mt-2 hover:underline"
      >
        Forgot password?
      </button>
    </div>
  )
}
