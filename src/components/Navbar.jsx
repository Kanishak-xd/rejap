import React from 'react';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase.jsx";
import { signOut } from 'firebase/auth';
import { useAuth } from '../context/AuthContext.jsx';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.jsx";
import Sidebar from "./Sidebar";

export default function Navbar() {
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [profilePic, setProfilePic] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${user.uid}`);
                if (res.ok) {
                    const userData = await res.json();
                    setUsername(userData.username);
                    setEmail(userData.email);
                    setProfilePic(userData.profilePic);
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
            <nav className="text-[#F3F3EE] font-outfit flex justify-between items-center px-10 py-4 fixed top-0 left-0 w-full z-50">
                <Link to="/" className="text-inherit sm:text-xl md:text-2xl xl:text-2xl font-semibold">
                    REJAP
                </Link>
                <ul className="sm:text-md md:text-lg xl:text-lg font-semibold flex justify-between items-center gap-12">
                    <li><Link to="/levels">CHAPTERS</Link></li>
                    <li><Link to="/rankings">LEADERBOARD</Link></li>
                    {username ? (
                        <li>
                            <button onClick={() => setIsSidebarOpen(true)} className="hover:cursor-pointer uppercase">
                                {username}
                            </button>
                        </li>
                    ) : (
                        <li><Link to="/sign-in">SIGN IN</Link></li>
                    )}
                </ul>
            </nav>

            {username && (<Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} username={username} email={email} profilePic={profilePic} />)}
        </>
    );
}
