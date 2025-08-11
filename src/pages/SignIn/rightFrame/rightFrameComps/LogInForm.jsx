import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../../firebase.jsx';
import { useToast } from '../../../../context/ToastContext.jsx';

import LogInHeader from './logInComps/LogInHeader.jsx';
import LogInEmail from './logInComps/LogInEmail.jsx';
import LogInPwd from './logInComps/LogInPwd.jsx';
import LogInFooter from './logInComps/LogInFooter.jsx';

export default function LogInForm({ setMode }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const [resetStatus, setResetStatus] = useState('');

    const navigate = useNavigate();
    const { showToast } = useToast();

    const handleLogin = async () => {
        if (!email || !password) {
            setStatus('Please enter both email and password.');
            return;
        }

        setIsLoading(true);
        setStatus('');

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${user.uid}`);
                if (res.ok) {
                    const userData = await res.json();
                    showToast(`Welcome back, ${userData.username}!`);

                    await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/logs`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            uid: user.uid,
                            username: userData.username || "Unknown",
                            action: "logged in"
                        }),
                    });
                }
            } catch (err) {
                console.warn("Failed to fetch user data:", err);
            }

            setStatus("Logged in successfully!");

            setTimeout(() => {
                navigate("/");
            }, 100);

        } catch (error) {
            console.error("Login error:", error);
            if (error.code === 'auth/user-disabled') {
                setStatus("This account has been disabled by an administrator.");
            } else if (error.code === 'auth/user-not-found') {
                setStatus("No account found with this email address.");
            } else if (error.code === 'auth/wrong-password') {
                setStatus("Incorrect password.");
            } else if (error.code === 'auth/invalid-email') {
                setStatus("Invalid email address.");
            } else {
                setStatus("Login failed. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Handle password reset
    const handleReset = async () => {
        if (!resetEmail) {
            setResetStatus('Please enter your email.');
            return;
        }

        try {
            await sendPasswordResetEmail(auth, resetEmail);
            setResetStatus('Reset link sent to your email.');
        } catch (err) {
            setResetStatus(err.message);
        }
    };

    return (
        <div className='w-full max-w-xs flex flex-col mx-auto gap-y-6 sm:gap-y-10 xl:gap-y-9'>
            <LogInHeader />
            <LogInEmail email={email} setEmail={setEmail} />
            <LogInPwd password={password} setPassword={setPassword} setShowModal={setShowModal} />
            <LogInFooter setMode={setMode} handleLogin={handleLogin} status={status} isLoading={isLoading} setShowModal={setShowModal} />

            {/* Shared Modal */}
            {showModal && (
                <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-60">
                    <div className="bg-[#121212] text-white p-5 sm:p-6 rounded-lg w-80 shadow-lg relative">
                        <h2 className="text-lg font-semibold mb-2">Reset Password</h2>
                        <input type="email" placeholder="Enter your email" value={resetEmail}
                            onChange={(e) => setResetEmail(e.target.value)}
                            className="w-full px-3 py-2 rounded bg-[#1A1A1A] text-white focus:outline-none focus:ring-2 focus:ring-white text-sm"
                        />
                        <button onClick={handleReset}
                            className="w-full mt-4 bg-white hover:bg-neutral-300 text-black font-bold py-2 rounded transition text-sm"
                        >
                            Send Reset Link
                        </button>
                        <p className="text-xs text-green-400 mt-2">{resetStatus}</p>
                        <button
                            onClick={() => {
                                setShowModal(false);
                                setResetEmail('');
                                setResetStatus('');
                            }}
                            className="absolute top-2 right-3 text-gray-400 hover:text-white text-lg"
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}