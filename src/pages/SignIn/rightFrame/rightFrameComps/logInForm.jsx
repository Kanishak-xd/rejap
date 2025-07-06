import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../../../firebase';
import { doc, getDoc } from "firebase/firestore";
import { useToast } from '../../../../context/ToastContext';

import LogInHeader from './logInComps/LogInHeader';
import LogInEmail from './logInComps/LogInEmail';
import LogInPwd from './logInComps/LogInPwd';
import LogInFooter from './logInComps/LogInFooter';


export default function LogInForm({ setMode }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');

    const navigate = useNavigate();
    const { showToast } = useToast();

    const handleLogin = () => {
        if (!email || !password) {
            setStatus('Please enter both email and password.');
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    showToast(`Welcome back, ${userData.username}!`);

                    // Update logs
                    await fetch("http://localhost:3001/api/logs", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            uid: user.uid,
                            username: userData.username || "Unknown",
                            action: "logged in"
                        }),
                    });
                }
                setStatus("Logged in successfully!");
                navigate("/");
            })
            .catch((error) => {
                if (error.code === 'auth/user-disabled') {
                    setStatus("This account has been disabled by an administrator.");
                } else {
                    setStatus(error.message);
                }
            });
    };

    return (
        <div className='w-2/3 h-160 flex flex-col'>
            <LogInHeader />
            <LogInEmail email={email} setEmail={setEmail} />
            <LogInPwd password={password} setPassword={setPassword} />
            <LogInFooter setMode={setMode} handleLogin={handleLogin} status={status} />
        </div>
    );
}
