import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from '../../../../firebase.jsx';
import { useToast } from '../../../../context/ToastContext.jsx';
import { useNavigate } from 'react-router-dom';

import SignUpHeader from './signUpComps/SignUpHeader.jsx';
import SignUpEmail from './signUpComps/SignUpEmail.jsx';
import SignUpUser from './signUpComps/SignUpUser.jsx';
import SignUpPwd from './signUpComps/SignUpPwd.jsx';
import SignUpFooter from './signUpComps/SignUpFooter.jsx';

export default function SignUpForm({ setMode }) {
    const navigate = useNavigate();
    const { showToast } = useToast();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');

    const handleSignUp = () => {
        if (!username || !email || !password) {
            setStatus("All fields are required");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;

                // Store in Firestore
                await setDoc(doc(db, "users", user.uid), {
                    username,
                    email: user.email,
                    createdAt: new Date()
                });

                // Store in MongoDB
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
        <div className='w-2/3 h-160 flex flex-col'>
            <SignUpHeader />
            <SignUpUser username={username} setUsername={setUsername} />
            <SignUpEmail email={email} setEmail={setEmail} />
            <SignUpPwd password={password} setPassword={setPassword} />
            <SignUpFooter handleSignUp={handleSignUp} setMode={setMode} status={status} />
        </div>
    );
}
