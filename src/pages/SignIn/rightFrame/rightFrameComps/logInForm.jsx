import React from 'react'
import LogInHeader from './logInComps/LogInHeader'
import LogInEmail from './logInComps/LogInEmail'
import LogInPwd from './logInComps/LogInPwd'
import LogInFooter from './logInComps/LogInFooter'

export default function LogInForm({ setMode }) {
    return (
        <div className='w-2/3 h-160 flex flex-col'>
            <LogInHeader />
            <LogInEmail />
            <LogInPwd />
            <LogInFooter setMode={setMode} />
        </div>
    )
}
