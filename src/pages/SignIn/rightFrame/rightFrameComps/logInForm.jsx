import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../../../firebase';
import { doc, getDoc } from "firebase/firestore";

import LogInHeader from './logInComps/LogInHeader';
import LogInEmail from './logInComps/LogInEmail';
import LogInPwd from './logInComps/LogInPwd';
import LogInFooter from './logInComps/LogInFooter';

export default function LogInForm({ setMode }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');

    const handleLogin = () => {
        if (!email || !password) {
            setStatus('❗ Please enter both email and password.');
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    console.log("👤 Username:", userData.username);
                }
                setStatus('Logged in successfully!');
            })
            .catch((error) => {
                setStatus(error.message);
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
