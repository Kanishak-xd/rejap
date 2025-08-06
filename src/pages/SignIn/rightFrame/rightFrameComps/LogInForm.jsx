import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
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

            // Get user data from backend instead of Firestore
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${user.uid}`);
                if (res.ok) {
                    const userData = await res.json();
                    showToast(`Welcome back, ${userData.username}!`);

                    // Update logs
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

            // Add a small delay to ensure AuthContext updates
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

    return (
        <div className='w-2/3 h-160 flex flex-col'>
            <LogInHeader />
            <LogInEmail email={email} setEmail={setEmail} />
            <LogInPwd password={password} setPassword={setPassword} />
            <LogInFooter setMode={setMode} handleLogin={handleLogin} status={status} isLoading={isLoading} />
        </div>
    );
}
