import React from 'react'

export default function SignUpUser() {
    return (
        <div className='w-full h-[20%] flex flex-col justify-center items-start'>
            <h2 className='font-outfit font-medium text-[1.5rem] text-white cursor-default mb-1'>Username</h2>
            <input
                type="text" placeholder="Enter your username"
                className="w-full px-4 py-3 rounded-md bg-[#1A1A1A] text-white focus:outline-none focus:ring-2 focus:ring-white"
            />
        </div>
    )
}
