import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Navbar() {
    const [username, setUsername] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const docRef = doc(db, "users", user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setUsername(docSnap.data().username || "User");
                    } else {
                        setUsername("User");
                    }
                } catch (err) {
                    console.error("Failed to fetch username:", err);
                    setUsername("User");
                }
            } else {
                setUsername(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        setUsername(null);
    };

    return (
        <nav className="text-[#F3F3EE] font-outfit flex justify-between items-center px-10 py-4 fixed top-0 left-0 w-full z-50 bg-[#000]">
            <Link to="/" className="text-inherit text-4xl font-semibold">
                REJAP
            </Link>
            <ul className="text-xl font-semibold flex justify-between items-center gap-12">
                <li><Link to="/chapters">CHAPTERS</Link></li>
                <li><Link to="/resources">RESOURCES</Link></li>
                {username ? (
                    <li className="flex items-center gap-4">
                        <span>{username}</span>
                    </li>
                ) : (
                    <li><Link to="/sign-in">SIGN IN</Link></li>
                )}
            </ul>
        </nav>
    );
}
