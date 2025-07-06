import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

export default function Sidebar({ isOpen, setIsOpen, username, profilePic }) {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const user = auth.currentUser;
        if (!user) return;

        const checkAdmin = async () => {
            try {
                const res = await fetch(`http://localhost:3001/api/users/${user.uid}`);
                const data = await res.json();
                if (data.role === "Admin") {
                    setIsAdmin(true);
                }
            } catch (err) {
                console.error("Error checking admin role:", err);
            }
        };

        checkAdmin();
    }, []);

    const handleLogout = async () => {
        const user = auth.currentUser;
        if (user) {
            await fetch("http://localhost:3001/api/logs", {
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
        setIsOpen(false);
    };

    return (
        <div
            className={`fixed top-0 right-0 h-full w-72 bg-black border-l border-neutral-700 text-white z-50 transform ${isOpen ? "translate-x-0" : "translate-x-full"
                } transition-transform duration-300 ease-in-out shadow-lg p-6 rounded-l-2xl`}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <div className="avatar">
                        <div className="mask mask-squircle h-9 w-9">
                            <img
                                src={profilePic && profilePic.trim() !== "" ? profilePic : "public/default-avatar.webp"}
                                alt="User Avatar"
                            />
                        </div>
                    </div>
                    <h2 className="font-semibold truncate">{username}</h2>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-2xl font-bold cursor-pointer">×</button>
            </div>

            <div className="divider"></div>

            {/* Links */}
            <nav className="flex flex-col gap-2">
                <Link
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="py-1 rounded-sm hover:bg-neutral-800 items-center justify-start flex flex-row gap-3"
                >
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-width="2" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    <p>Your profile</p>
                </Link>

                <Link
                    to="/rankings"
                    onClick={() => setIsOpen(false)}
                    className="py-1 rounded-sm hover:bg-neutral-800 items-center justify-start flex flex-row gap-3"
                >
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                    </svg>
                    <p>Leaderboard</p>
                </Link>

                <Link
                    to="/levels"
                    onClick={() => setIsOpen(false)}
                    className="py-1 rounded-sm hover:bg-neutral-800 items-center justify-start flex flex-row gap-3"
                >
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.03v13m0-13c-2.819-.831-4.715-1.076-8.029-1.023A.99.99 0 0 0 3 6v11c0 .563.466 1.014 1.03 1.007 3.122-.043 5.018.212 7.97 1.023m0-13c2.819-.831 4.715-1.076 8.029-1.023A.99.99 0 0 1 21 6v11c0 .563-.466 1.014-1.03 1.007-3.122-.043-5.018.212-7.97 1.023" />
                    </svg>
                    <p>Chapters</p>
                </Link>

                {isAdmin && (
                    <Link
                        to="/admin-dashboard"
                        onClick={() => setIsOpen(false)}
                        className="py-1 rounded-sm hover:bg-neutral-800 items-center justify-start flex flex-row gap-3"
                    >
                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1M5 12h14M5 12a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1m-2 3h.01M14 15h.01M17 9h.01M14 9h.01" />
                        </svg>
                        <p>Dashboard</p>
                    </Link>
                )}

                <button
                    onClick={handleLogout}
                    className="py-1 flex flex-row gap-3 rounded-sm hover:bg-neutral-800 items-center justify-start text-left text-red-400 "
                >
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2" />
                    </svg>
                    <p>Log out</p>
                </button>
            </nav>
        </div>
    );
}
