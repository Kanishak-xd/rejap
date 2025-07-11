import React, { useEffect, useState } from 'react';

export default function SignUpEmail({ email, setEmail }) {
    const [error, setError] = useState('');
    const [checking, setChecking] = useState(false);

    useEffect(() => {
        const trimmed = email.trim();
        if (trimmed === '') {
            setError('');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmed)) {
            setError('Invalid email address');
            return;
        }
        // Debounced uniqueness check
        const delay = setTimeout(async () => {
            try {
                setChecking(true);
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/check-email?email=${encodeURIComponent(trimmed.toLowerCase())}`);
                const data = await res.json();
                setChecking(false);
                if (data.exists) {
                    setError("Email already in use");
                } else {
                    setError("");
                }
            } catch (err) {
                console.error("Email check error:", err);
                setError("Error checking email");
                setChecking(false);
            }
        }, 500);
        return () => clearTimeout(delay);
    }, [email]);

    return (
        <div className='w-full h-[20%] flex flex-col justify-center items-start'>
            <h2 className='font-outfit font-medium text-[1.5rem] text-white cursor-default mb-1'>Email</h2>
            <input
                type="text" placeholder="Enter your email" value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 mb-1 py-3 rounded-md bg-[#1A1A1A] text-white focus:outline-none focus:ring-2 focus:ring-white"
            />
            {checking ? (
                <p className="text-blue-300 text-sm mt-1">Checking...</p>
            ) : error && (
                <p className="text-red-400 text-sm mt-1">{error}</p>
            )}
        </div>
    );
}
