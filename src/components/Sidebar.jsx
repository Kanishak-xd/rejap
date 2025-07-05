import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

export default function Sidebar({ isOpen, setIsOpen, username, email }) {
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
        await signOut(auth);
        setIsOpen(false);
    };

    return (
        <div
            className={`fixed top-0 right-0 h-full w-64 bg-[#111] text-white z-99 transform ${isOpen ? "translate-x-0" : "translate-x-full"
                } transition-transform duration-300 ease-in-out shadow-lg p-6`}
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">{username}</h2>
                <button onClick={() => setIsOpen(false)} className="text-xl cursor-pointer">×</button>
            </div>

            <p className="text-sm text-gray-400 mb-4">{email}</p>

            <Link to="/profile"
                className="block w-full pl-3 text-white text-left py-2 rounded-md mb-4 hover:bg-neutral-800 transition"
                onClick={() => setIsOpen(false)}
            >
                Your Profile
            </Link>

            {isAdmin && (
                <Link to="/admin-dashboard"
                    className="block w-full pl-3 text-white text-left py-2 rounded-md mb-4 hover:bg-neutral-800 transition"
                    onClick={() => setIsOpen(false)}
                >
                    Admin Dashboard
                </Link>
            )}

            <button
                onClick={handleLogout}
                className="w-full pl-3 text-white text-left py-2 rounded-md hover:bg-neutral-800 hover:cursor-pointer transition"
            >
                Log Out
            </button>
        </div>
    );
}
