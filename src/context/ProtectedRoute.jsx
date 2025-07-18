import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) return null;

    return user ? children : <Navigate to="/sign-in" />;
}
