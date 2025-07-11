import React from 'react'

export default function SignUpFooter({ handleSignUp, setMode, status }) {
    return (
        <div className='w-full h-[20%] flex flex-col justify-center items-center'>
            <button
                onClick={handleSignUp}
                className="w-full text-center mt-8 bg-white text-black font-outfit font-semibold text-3xl/13 rounded-md cursor-pointer hover:-translate-y-0.5 transition-transform duration-200 ease-in-out"
            >
                Sign Up
            </button>
            <p className="text-sm text-green-300 mt-2">{status}</p>
            <button
                onClick={() => setMode('login')}
                className="font-outfit font-regular text-[1rem] mt-2 text-[#717171] cursor-pointer hover:underline transition-all"
            >
                Already have an account? <span className="text-white">Log in</span>
            </button>
        </div>
    );
}
