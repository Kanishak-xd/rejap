import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useToast } from "../context/ToastContext";

export default function AdminRoute({ children }) {
    const { user, loading } = useAuth();
    const [checkingRole, setCheckingRole] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [unauthorized, setUnauthorized] = useState(false);

    const { showToast } = useToast();

    useEffect(() => {
        const fetchUserRole = async () => {
            if (!user) {
                setCheckingRole(false);
                return;
            }

            try {
                const res = await fetch(`http://localhost:3001/api/users/${user.uid}`);
                if (!res.ok) throw new Error("User fetch failed");

                const data = await res.json();
                if (data.role === "admin" || data.role === "Admin") {
                    setIsAdmin(true);
                } else {
                    setUnauthorized(true);
                }
            } catch (err) {
                console.error("Failed to verify admin:", err);
                setUnauthorized(true);
            } finally {
                setCheckingRole(false);
            }
        };

        fetchUserRole();
    }, [user]);

    // Show loader
    if (loading || checkingRole) {
        return (
            <div className="text-white text-center font-bold text-9xl w-screen h-screen flex justify-center items-center">
                <p>Checking access...</p>
            </div>
        )
    }

    // Show toast once for unauthorized access
    if (unauthorized) {
        showToast("Access Denied: Admins only", "error");
        return <Navigate to="/" />;
    }

    return children;
}
