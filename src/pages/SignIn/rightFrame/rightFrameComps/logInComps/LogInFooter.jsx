import React from 'react';

export default function LogInFooter({ setMode, handleLogin, status, isLoading, setShowModal }) {
  return (
    <div className='w-full h-28 sm:h-28 flex flex-col justify-center items-center gap-1'>
      <button
        onClick={handleLogin}
        disabled={isLoading}
        className="w-full text-center bg-white text-black font-outfit font-semibold text-xl sm:text-3xl/13 rounded-md cursor-pointer hover:-translate-y-0.5 transition-transform duration-200 ease-in-out py-2 sm:py-0 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Logging in...' : 'Log in'}
      </button>
      <p className="text-sm sm:text-sm text-green-300">{status}</p>
      <button
        onClick={() => setMode('signup')}
        className="font-outfit font-regular text-[1rem] sm:text-[1rem] text-[#717171] cursor-pointer hover:underline transition-all"
      >
        Don't have an account? <span className="text-white">Sign up</span>
      </button>

      {/* opens the modal */}
      <button
        onClick={() => setShowModal(true)}
        className="text-sm sm:text-sm text-white hover:underline"
      >
        Forgot password?
      </button>
    </div>
  );
}