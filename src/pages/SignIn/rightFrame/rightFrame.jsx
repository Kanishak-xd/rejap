import React, { useState } from 'react';
import SignUpForm from './rightFrameComps/SignUpForm';
import LogInForm from './rightFrameComps/logInForm';

export default function RightFrame() {
  const [mode, setMode] = useState('login');

  return (
    <div className="w-[30%] h-[88%] mt-12 border-2 border-white rounded-xl flex flex-col justify-center items-center px-4 py-6">
      {mode === 'login' ? <LogInForm setMode={setMode} /> : <SignUpForm setMode={setMode} />}
    </div>
  );
}
