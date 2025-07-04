import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../../../firebase';

export default function LogInPwd({ password, setPassword }) {
  const [showModal, setShowModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleReset = async () => {
    if (!resetEmail) {
      setStatus('Please enter your email.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setStatus('Reset link sent to your email.');
    } catch (err) {
      setStatus(err.message);
    }
  };

  return (
    <>
      <div className='w-full h-[26%] flex flex-col justify-start items-start'>
        <h2 className='font-outfit font-medium text-[1.5rem] text-white cursor-default mb-1'>Password</h2>
        <input
          type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-md bg-[#1A1A1A] text-white focus:outline-none focus:ring-2 focus:ring-white"
        />
        <h3 onClick={() => setShowModal(true)} className='font-outfit font-regular text-[1rem] mt-2 text-[#717171] cursor-pointer hover:underline'>
          Forgot password?
        </h3>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-60">
          <div className="bg-[#121212] text-white p-6 rounded-lg w-80 shadow-lg relative">
            <h2 className="text-lg font-semibold mb-2">Reset Password</h2>
            <input type="email" placeholder="Enter your email" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)}
              className="w-full px-3 py-2 rounded bg-[#1A1A1A] text-white focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button onClick={handleReset} className="w-full mt-4 bg-white hover:bg-neutral-300 text-black font-bold hover:cursor-pointer py-2 rounded transition">
              Send Reset Link
            </button>
            <p className="text-sm text-green-400 mt-2">{status}</p>
            <button onClick={() => {
              setShowModal(false);
              setResetEmail('');
              setStatus('');
            }}
              className="absolute top-2 right-3 text-gray-400 hover:text-white text-lg"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}
