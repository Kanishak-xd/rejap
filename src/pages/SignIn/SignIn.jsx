import React from 'react'
import LeftFrame from './leftFrame/leftFrame'
import RightFrame from './rightFrame/rightFrame'

export default function SignIn() {
    return (
        <div className='w-full h-dvh flex flex-row justify-center items-center'>
            <LeftFrame />
            <RightFrame />
        </div>
    )
}
