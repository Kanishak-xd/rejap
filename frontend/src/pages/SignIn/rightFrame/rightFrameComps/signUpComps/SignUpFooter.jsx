import React from 'react';

export default function SignUpFooter({ handleSignUp, setMode, status }) {
    return (
        <div className='w-full h-28 sm:h-28 flex flex-col justify-center items-center gap-1'>
            <button
                onClick={handleSignUp}
                className="w-full text-center bg-white text-black font-outfit font-semibold text-xl sm:text-3xl/13 rounded-md cursor-pointer hover:-translate-y-0.5 transition-transform duration-200 ease-in-out py-2 sm:py-0"
            >
                Sign Up
            </button>
            <p className="text-sm sm:text-sm text-green-300">{status}</p>
            <button
                onClick={() => setMode('login')}
                className="font-outfit font-regular text-[1rem] sm:text-[1rem] text-[#717171] cursor-pointer hover:underline transition-all"
            >
                Already have an account? <span className="text-white">Log in</span>
            </button>
        </div>
    );
}