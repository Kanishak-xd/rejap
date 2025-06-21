import React from 'react'
import SignUpForm from './rightFrameComps/signUpForm'
// import LogInForm from './rightFrameComps/LogInForm'

export default function RightFrame() {
    return (
        <div className='w-[30%] h-[88%] mt-12 border-2 border-white rounded-xl flex justify-center items-center'>
            <SignUpForm />
            {/* <LogInForm /> */}
        </div>
    )
}
