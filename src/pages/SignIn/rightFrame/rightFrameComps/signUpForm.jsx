import React from 'react'
import SignUpHeader from './signUpComps/signUpHeader'
import SignUpEmail from './signUpComps/signUpEmail'
import SignUpUser from './signUpComps/signUpUser'
import SignUpPwd from './signUpComps/signUpPwd'
import SignUpFooter from './signUpComps/signUpFooter'

export default function SignUpForm({ setMode }) {
    return (
        <div className='w-2/3 h-160 flex flex-col'>
            <SignUpHeader />
            <SignUpUser />
            <SignUpEmail />
            <SignUpPwd />
            <SignUpFooter setMode={setMode} />
        </div>
    )
}
