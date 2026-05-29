import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.jsx";
import { Link } from "react-router-dom";
import { FiMenu } from 'react-icons/fi';

export default function Sidebar({ isOpen, setIsOpen, username, profilePic }) {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const user = auth.currentUser;
        if (!user) {
            setIsAdmin(false);
            return;
        }

        const checkAdmin = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${user.uid}`);
                const data = await res.json();
                setIsAdmin(data.role === "Admin");
            } catch (err) {
                console.error("Error checking admin role:", err);
                setIsAdmin(false);
            }
        };

        checkAdmin();
    }, [username]);

    const handleLogout = async () => {
        const user = auth.currentUser;
        if (user) {
            await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/logs`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    uid: user.uid,
                    username,
                    action: "logged out"
                }),
            });
        }
        await signOut(auth);
        if (window.innerWidth < 1280) setIsOpen(false);
    };

    return (
        <div
            className={`fixed top-0 left-0 h-screen w-72 bg-neutral-950 text-white z-50 transform transition-transform duration-300 ease-in-out shadow-xl flex flex-col justify-between border-r border-neutral-800 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
            <div className="flex flex-col w-full">

                {/* Unified Sidebar Header - EXACTLY 73px to align with Navbar */}
                <div className="flex items-center gap-4 px-6 h-[73px] border-b border-neutral-800 w-full shrink-0 bg-neutral-950">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className='text-2xl hover:text-gray-300 transition-colors'
                        aria-label="Toggle menu"
                    >
                        <FiMenu />
                    </button>
                    <span className="text-neutral-500 text-xl font-light">|</span>
                    <Link
                        to="/"
                        onClick={() => window.innerWidth < 1280 && setIsOpen(false)}
                        className="text-xl md:text-2xl font-semibold tracking-wide"
                    >
                        REJAP
                    </Link>
                </div>

                {/* Links */}
                <nav className="flex flex-col gap-2 px-6 py-4">
                    {username && (
                        <Link
                            to="/profile"
                            onClick={() => window.innerWidth < 1280 && setIsOpen(false)}
                            className="py-2 rounded-md hover:bg-neutral-800 items-center justify-start flex flex-row gap-3 px-2 transition-colors"
                        >
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeWidth="2" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                            <p>Your profile</p>
                        </Link>
                    )}

                    <Link
                        to="/rankings"
                        onClick={() => window.innerWidth < 1280 && setIsOpen(false)}
                        className="py-2 rounded-md hover:bg-neutral-800 items-center justify-start flex flex-row gap-3 px-2 transition-colors"
                    >
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                        </svg>
                        <p>Leaderboard</p>
                    </Link>

                    <Link
                        to="/levels"
                        onClick={() => window.innerWidth < 1280 && setIsOpen(false)}
                        className="py-2 rounded-md hover:bg-neutral-800 items-center justify-start flex flex-row gap-3 px-2 transition-colors"
                    >
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.03v13m0-13c-2.819-.831-4.715-1.076-8.029-1.023A.99.99 0 0 0 3 6v11c0 .563.466 1.014 1.03 1.007 3.122-.043 5.018.212 7.97 1.023m0-13c2.819-.831 4.715-1.076 8.029-1.023A.99.99 0 0 1 21 6v11c0 .563-.466 1.014-1.03 1.007-3.122-.043-5.018.212-7.97 1.023" />
                        </svg>
                        <p>Chapters</p>
                    </Link>

                    {isAdmin && (
                        <Link
                            to="/admin-dashboard"
                            onClick={() => window.innerWidth < 1280 && setIsOpen(false)}
                            className="py-2 rounded-md hover:bg-neutral-800 items-center justify-start flex flex-row gap-3 px-2 transition-colors"
                        >
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1M5 12h14M5 12a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1m-2 3h.01M14 15h.01M17 9h.01M14 9h.01" />
                            </svg>
                            <p>Dashboard</p>
                        </Link>
                    )}
                </nav>
            </div>

            {/* Footer Auth */}
            <div className="w-full border-t border-neutral-800 p-5 bg-neutral-950 mt-auto shrink-0">
                {username ? (
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="avatar">
                                <div className="h-10 w-10 rounded-xl overflow-hidden border border-neutral-700">
                                    <img
                                        src={profilePic?.trim() ? profilePic.trim() : "/default-avatar.webp"}
                                        alt="User Avatar"
                                        onError={(e) => {
                                            e.target.src = "/default-avatar.webp";
                                            e.onError = null;
                                        }}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            </div>
                            <span className="font-semibold text-sm truncate max-w-[120px]">{username}</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="p-2 text-neutral-400 hover:text-red-400 transition-colors rounded-md hover:bg-neutral-900"
                            title="Log out"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2" />
                            </svg>
                        </button>
                    </div>
                ) : (
                    <Link
                        to="/sign-in"
                        onClick={() => window.innerWidth < 1280 && setIsOpen(false)}
                        className="flex items-center gap-3 hover:bg-neutral-800 p-2 -mx-2 rounded-lg transition-colors"
                    >
                        <div className="avatar">
                            <div className="h-10 w-10 rounded-xl bg-neutral-800 flex items-center justify-center border border-neutral-700">
                                <svg className="w-6 h-6 text-neutral-400" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14a7 7 0 00-7 7h14a7 7 0 00-7-7zM16 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                        </div>
                        <span className="font-semibold text-sm">Sign in</span>
                    </Link>
                )}
            </div>
        </div>
    );
}