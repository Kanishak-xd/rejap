import React from 'react'
import LeftFrame from './leftFrame/LeftFrame.jsx'
import RightFrame from './rightFrame/RightFrame.jsx'

export default function SignIn() {
    return (
        <div className='w-full h-dvh flex flex-row justify-center items-center'>
            <LeftFrame />
            <RightFrame />
        </div>
    )
}
