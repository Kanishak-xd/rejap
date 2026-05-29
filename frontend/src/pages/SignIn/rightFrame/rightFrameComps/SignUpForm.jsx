import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signOut } from 'firebase/auth';
import { auth } from '../../../../firebase.jsx';
import { useToast } from '../../../../context/ToastContext.jsx';

import SignUpHeader from './signUpComps/SignUpHeader.jsx';
import SignUpUser from './signUpComps/SignUpUser.jsx';
import SignUpEmail from './signUpComps/SignUpEmail.jsx';
import SignUpPwd from './signUpComps/SignUpPwd.jsx';
import SignUpFooter from './signUpComps/SignUpFooter.jsx';

export default function SignUpForm({ setMode }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');

    const { showToast } = useToast();

    const handleSignUp = () => {
        if (!username || !email || !password) {
            setStatus('Please fill in all fields.');
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;

                // Store in MongoDB only
                await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/upsert`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        uid: user.uid,
                        username,
                        email: user.email,
                        profilePic: ""
                    })
                });

                // Update logs
                await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/logs`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        uid: user.uid,
                        username,
                        action: "signed up"
                    }),
                });

                // Sign out user
                await signOut(auth);

                // Show toast & switch to login
                showToast("Account created. Please log in.");
                setMode('login');
            })
            .catch((err) => {
                console.error("Sign-up error:", err);
                setStatus(err?.message || "Sign-up failed");

                err.json?.().then(data => {
                    if (data?.error) setStatus(data.error);
                });
            });
    };

    return (
        <div className='w-full max-w-xs flex flex-col mx-auto gap-y-2 sm:gap-y-3 xl:gap-y-2'>
            <SignUpHeader />
            <SignUpUser username={username} setUsername={setUsername} />
            <SignUpEmail email={email} setEmail={setEmail} />
            <SignUpPwd password={password} setPassword={setPassword} />
            <SignUpFooter handleSignUp={handleSignUp} setMode={setMode} status={status} />
        </div>
    );
}
