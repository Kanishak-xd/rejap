import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { auth } from "../firebase.jsx";
import Sidebar from "./Sidebar";
import { FiMenu } from 'react-icons/fi';

export default function Navbar({ isSidebarOpen, setIsSidebarOpen }) {
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [profilePic, setProfilePic] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${user.uid}`);
                if (res.ok) {
                    const userData = await res.json();
                    setUsername(userData.username);
                    setEmail(userData.email);
                    setProfilePic(userData.profilePic?.trim() || "");
                }
            } else {
                setUsername(null);
                setEmail(null);
                setProfilePic(null);
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <>
            <nav className={`text-[#F3F3EE] font-outfit flex justify-between items-center px-4 sm:px-6 md:px-10 fixed top-0 right-0 h-[73px] z-40 bg-neutral-950 border-b border-neutral-800 transition-all duration-300 ${isSidebarOpen ? 'w-full xl:w-[calc(100%-18rem)]' : 'w-full'}`}>

                {/* Left Area (Only shows content here if Sidebar is closed, avoiding duplication) */}
                <div className="flex items-center">
                    <div className={`flex items-center gap-4 ${isSidebarOpen ? 'xl:hidden' : 'flex'}`}>
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className='text-2xl hover:text-gray-300 transition-colors'
                            aria-label="Toggle menu"
                        >
                            <FiMenu />
                        </button>
                        <span className="hidden sm:inline text-neutral-500 text-xl font-light">|</span>
                        <Link to="/" className="text-inherit sm:text-xl md:text-2xl font-semibold tracking-wide">
                            REJAP
                        </Link>
                    </div>
                </div>

                {/* Right Area Links */}
                <div className="flex items-center gap-4 sm:gap-8 md:gap-12">
                    <ul className="hidden md:flex sm:text-md md:text-lg font-semibold justify-between items-center gap-12">
                        <li><Link to="/levels" className="hover:text-neutral-300 transition-colors">CHAPTERS</Link></li>
                        <li><Link to="/rankings" className="hover:text-neutral-300 transition-colors">LEADERBOARD</Link></li>
                    </ul>
                </div>
            </nav>

            <Sidebar
                isOpen={isSidebarOpen}
                setIsOpen={setIsSidebarOpen}
                username={username}
                email={email}
                profilePic={profilePic}
            />
        </>
    );
}