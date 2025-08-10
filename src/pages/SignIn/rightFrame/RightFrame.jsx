import React, { useState } from 'react';
import SignUpForm from './rightFrameComps/SignUpForm.jsx';
import LogInForm from './rightFrameComps/LogInForm.jsx';

export default function RightFrame() {
  const [mode, setMode] = useState('login');

  return (
    <div className="w-full h-full bg-black border-2 border-white rounded-xl flex flex-col justify-center items-center p-4 sm:p-6">
      {mode === 'login' ? <LogInForm setMode={setMode} /> : <SignUpForm setMode={setMode} />}
    </div>
  );
}