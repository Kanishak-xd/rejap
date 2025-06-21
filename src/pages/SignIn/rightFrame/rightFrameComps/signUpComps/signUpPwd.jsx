import React from 'react'

export default function SignUpPwd() {
    return (
        <div className='w-full h-[20%] flex flex-col justify-start items-start'>
            <h2 className='font-outfit font-medium text-[1.5rem] text-white cursor-default mb-1'>Password</h2>
            <input
                type="text" placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-md bg-[#1A1A1A] text-white focus:outline-none focus:ring-2 focus:ring-white"
            />
            <h3 className='font-outfit font-regular text-[1rem] mt-2 text-[#717171] cursor-default'>Must be at least 8 characters</h3>
        </div>
    )
}
