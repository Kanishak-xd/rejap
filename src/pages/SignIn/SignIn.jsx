import React from 'react';
import LeftFrame from './LeftFrame/LeftFrame.jsx';
import RightFrame from './rightFrame/RightFrame.jsx';

export default function SignIn() {
    return (
        <div className='w-full h-dvh flex flex-col sm:flex-row justify-center items-center gap-6 px-4 py-8'>
            {/* LeftFrame */}
            <div className="hidden xl:block xl:w-[54%] h-[88%] max-h-[800px]">
                <LeftFrame />
            </div>

            {/* RightFrame */}
            <div className="w-full sm:w-[75%] md:w-[65%] lg:w-[50%] xl:w-[30%] max-w-xl h-[88%] max-h-[900px]">
                <RightFrame />
            </div>
        </div>
    );
}