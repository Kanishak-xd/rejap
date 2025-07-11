import React, { useState, useEffect } from 'react';

export default function SignUpPwd({ password, setPassword }) {
    const [touched, setTouched] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!touched) return;
        const trimmed = password.trim();
        if (trimmed === '') {
            setMessage("Password cannot be empty");
            return;
        }
        const rules = {
            length: trimmed.length >= 8,
            upper: /[A-Z]/.test(trimmed),
            lower: /[a-z]/.test(trimmed),
            number: /[0-9]/.test(trimmed),
            special: /[^A-Za-z0-9]/.test(trimmed),
            noSpace: /^\S+$/.test(trimmed)
        };
        if (!rules.length) setMessage("At least 8 characters");
        else if (!rules.upper) setMessage("At least 1 uppercase letter");
        else if (!rules.lower) setMessage("At least 1 lowercase letter");
        else if (!rules.number) setMessage("At least 1 number");
        else if (!rules.special) setMessage("At least 1 special character");
        else if (!rules.noSpace) setMessage("No spaces allowed");
        else setMessage(""); // All good
    }, [password, touched]);

    return (
        <div className='w-full h-[20%] flex flex-col justify-start items-start'>
            <h2 className='font-outfit font-medium text-[1.5rem] text-white cursor-default mb-1'>Password</h2>
            <input
                type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setTouched(true)} onFocus={() => setTouched(true)}
                className="w-full px-4 py-3 rounded-md bg-[#1A1A1A] text-white focus:outline-none focus:ring-2 focus:ring-white"
            />
            {message && (
                <p className="text-red-400 text-sm mt-2 font-outfit">
                    {message}
                </p>
            )}
        </div>
    );
}
