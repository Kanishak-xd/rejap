import React from 'react'
import { useLocation } from 'react-router-dom'
import SignUpForm from './rightFrameComps/signUpForm'
import LogInForm from './rightFrameComps/LogInForm'

export default function RightFrame() {
    const location = useLocation();
    const path = location.pathname;
    return (
        <div className='w-[30%] h-[88%] mt-12 border-2 border-white rounded-xl flex justify-center items-center'>
            {path === '/log-in' ? <LogInForm /> : <SignUpForm />}
        </div>
    )
}
