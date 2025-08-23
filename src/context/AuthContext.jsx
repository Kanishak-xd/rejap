import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe = () => {};
    Promise.all([import('../firebase.jsx'), import('firebase/auth')])
      .then(([{ auth }, { onAuthStateChanged }]) => {
        unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
          setUser(currentUser);
          setLoading(false);

          if (currentUser) {
            let username = currentUser.displayName; // only use if provided

            try {
              const payload = {
                uid: currentUser.uid,
                email: currentUser.email || "",
                profilePic: currentUser.photoURL || "",
              };
              if (username) payload.username = username;

              const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/upsert`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
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
      })
      .catch((err) => {
        console.warn("Failed to load Firebase for auth:", err);
        setLoading(false);
      });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
