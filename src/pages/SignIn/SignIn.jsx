import React from 'react'
import LeftFrame from './leftFrame/LeftFrame'
import RightFrame from './rightFrame/RightFrame'

export default function SignIn() {
    return (
        <div className='w-full h-dvh flex flex-row justify-center items-center'>
            <LeftFrame />
            <RightFrame />
        </div>
    )
}
