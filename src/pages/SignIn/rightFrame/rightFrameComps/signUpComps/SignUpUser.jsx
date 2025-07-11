import React, { useEffect, useState } from 'react';

export default function SignUpUser({ username, setUsername }) {
    const [error, setError] = useState('');
    const [available, setAvailable] = useState(null);

    useEffect(() => {
        const trimmed = username.trim();

        if (trimmed === '') {
            setError('');
            setAvailable(null);
            return;
        }

        if (trimmed.length < 3 || trimmed.length > 20) {
            setError('Username must be between 3 and 20 characters');
            setAvailable(null);
            return;
        }

        // Only letters allowed
        if (!/^[a-zA-Z]+$/.test(trimmed)) {
            setError('Username must contain only letters');
            return;
        }

        const delay = setTimeout(async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/check-username/${trimmed.toLowerCase()}`);
                const data = await res.json();

                if (data.exists) {
                    setError('Username already taken');
                    setAvailable(false);
                } else {
                    setError('');
                    setAvailable(true);
                }
            } catch (err) {
                console.error('Username check error:', err);
                setError('Error checking username');
                setAvailable(null);
            }
        }, 600);

        return () => clearTimeout(delay);
    }, [username]);

    return (
        <div className='w-full h-[20%] flex flex-col justify-center items-start'>
            <h2 className='font-outfit font-medium text-[1.5rem] text-white cursor-default mb-1'>Username</h2>
            <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full px-4 py-3 rounded-md bg-[#1A1A1A] text-white focus:outline-none focus:ring-2 ${available === false
                    ? 'focus:ring-red-500'
                    : available === true
                        ? 'focus:ring-[#8FD14F]'
                        : 'focus:ring-white'
                    }`}
            />
            {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
            {!error && available && (
                <p className="text-[#8FD14F] text-sm mt-1">Username is available</p>
            )}
        </div>
    );
}
