import { useEffect, useState, useRef } from "react";
import { useAuth } from '../../context/AuthContext';

export default function Leaderboard() {
    const [leaders, setLeaders] = useState([]);
    const { user } = useAuth();
    const hasLoggedRef = useRef(false);

    useEffect(() => {
        fetch("http://localhost:3001/api/users/leaderboard")
            .then((res) => res.json())
            .then(setLeaders)
            .catch((err) => console.error("Failed to fetch leaderboard:", err));

        if (user && !hasLoggedRef.current) {
            hasLoggedRef.current = true;
            fetch(`http://localhost:3001/api/users/${user.uid}`)
                .then(res => res.json())
                .then(data => {
                    fetch("http://localhost:3001/api/logs", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            uid: user.uid,
                            username: data.username || "Unnamed",
                            action: "visited leaderboard"
                        }),
                    });
                });
        }
    }, [user]);

    return (
        <div className="pt-24 px-6 min-h-screen bg-black text-white">
            <h1 className="text-3xl font-bold mb-8 text-center">Leaderboard</h1>

            <div className="flex flex-col gap-4 max-w-2xl mx-auto">
                {leaders.map((user, idx) => (
                    <div
                        key={idx}
                        className="flex items-center gap-4 bg-gray-900 p-4 rounded-lg shadow-md"
                    >
                        <img
                            src={user.profilePic || "/placeholder.png"}
                            alt="Profile"
                            className="w-14 h-14 rounded-full border-2 border-gray-700 object-cover"
                        />
                        <div>
                            <h2 className="text-xl font-semibold">{user.username || "(No username)"}</h2>
                            <p className="text-sm text-gray-300">
                                Levels completed: {user.levelsCompleted}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
