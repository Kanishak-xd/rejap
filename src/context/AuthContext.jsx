import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            setLoading(false);

            if (currentUser) {
                let username = currentUser.displayName || "";

                // If displayName is empty, fetch from Firestore
                if (!username) {
                    try {
                        const res = await fetch(
                            `https://firestore.googleapis.com/v1/projects/rejap-0909/databases/(default)/documents/users/${currentUser.uid}`
                        );
                        const data = await res.json();
                        username = data.fields?.username?.stringValue || "Anonymous";
                    } catch (err) {
                        console.warn("Couldn't fetch Firestore username:", err);
                        username = "Anonymous";
                    }
                }

                // Send to MongoDB
                try {
                    await fetch("http://localhost:3001/api/users/upsert", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            uid: currentUser.uid,
                            email: currentUser.email || "",
                            username,
                            profilePic: currentUser.photoURL || "",
                        }),
                    });
                    console.log("User upserted to MongoDB");
                } catch (err) {
                    console.error("Failed to upsert user:", err);
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
