import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.jsx";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            setLoading(false);

            if (currentUser) {
                let username = currentUser.displayName || "Anonymous";

                // Send to MongoDB
                try {
                    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/upsert`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            uid: currentUser.uid,
                            email: currentUser.email || "",
                            username,
                            profilePic: currentUser.photoURL || "",
                        }),
                    });

                    if (response.ok) {
                        console.log("User upserted to MongoDB");
                    } else if (response.status === 409) {
                        // User already exists
                    } else {
                        console.warn("Failed to upsert user:", response.status, response.statusText);
                    }
                } catch (err) {
                    console.warn("Failed to upsert user:", err.message);
                }
            }
        });

        return () => unsub();
    }, []);


    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
