import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from '../../../../firebase';
import { useToast } from '../../../../context/ToastContext';
import { useNavigate } from 'react-router-dom';

import SignUpHeader from './signUpComps/signUpHeader';
import SignUpEmail from './signUpComps/signUpEmail';
import SignUpUser from './signUpComps/SignUpUser';
import SignUpPwd from './signUpComps/SignUpPwd';
import SignUpFooter from './signUpComps/SignUpFooter';

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
            .then((userCredential) => {
                const user = userCredential.user;

                // Store username in Firestore
                return setDoc(doc(db, "users", user.uid), {
                    username: username,
                    email: user.email,
                    createdAt: new Date()
                }).then(() => {
                    // Sign out user after storing username
                    return signOut(auth);
                });
            })
            .then(() => {
                showToast("Account created. Please log in.");
                setMode('login');
            })
            .catch((err) => {
                setStatus(err.message);
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
