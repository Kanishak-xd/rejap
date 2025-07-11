import { useEffect, useState, useRef } from "react";
import { useAuth } from '../../context/AuthContext.jsx';

export default function Leaderboard() {
    const [leaders, setLeaders] = useState([]);
    const { user } = useAuth();
    const hasLoggedRef = useRef(false);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/leaderboard`)
            .then((res) => res.json())
            .then(data => {
                const sorted = [...data].sort((a, b) => b.levelsCompleted - a.levelsCompleted);
                setLeaders(sorted);
            })
            .catch((err) => console.error("Failed to fetch leaderboard:", err));

        if (user && !hasLoggedRef.current) {
            hasLoggedRef.current = true;
            fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${user.uid}`)
                .then(res => res.json())
                .then(data => {
                    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/logs`, {
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
        <div className="pt-24 px-6 min-h-screen bg-black text-white flex items-center flex-col">
            <h1 className="text-5xl font-bold font-outfit mb-8 text-center">LEADERBOARD</h1>
            <div className="max-w-5xl w-3/4 border-1 border-neutral-900 rounded-lg">
                <table className="table w-full overflow-hidden">
                    <thead className="bg-neutral-900 text-white">
                        <tr>
                            <th className="px-4 py-3 text-left">Rank</th>
                            <th className="px-4 py-3 text-left">Player</th>
                            <th className="px-4 py-3 text-center">Lessons Completed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaders.map((user, idx) => (
                            <tr key={user._id || idx} className="bg-neutral-950 hover:bg-neutral-900 transition">
                                <td className="px-4 py-3">
                                    {idx === 0 ? (
                                        <img src="https://res.cloudinary.com/dykzzd9sy/image/upload/v1752079455/1st_oweekr.png" alt="1st place medal" className="w-8 h-8" />
                                    ) : idx === 1 ? (
                                        <img src="https://res.cloudinary.com/dykzzd9sy/image/upload/v1752079455/2nd_yai1xx.png" alt="2nd place medal" className="w-8 h-8" />
                                    ) : idx === 2 ? (
                                        <img src="https://res.cloudinary.com/dykzzd9sy/image/upload/v1752079455/3rd_pbxj9v.png" alt="3rd place medal" className="w-8 h-8" />
                                    ) : (
                                        <span className="text-2xl font-bold text-white text-center ml-2.5">{idx + 1}</span>
                                    )}
                                </td>
                                <td className="px-1 py-3 flex items-center gap-4">
                                    <div className="rounded-xl flex justify-center items-center w-14 h-14 bg-black">
                                        <img
                                            src={user.profilePic || "/default-avatar.webp"}
                                            alt="User avatar"
                                            className="w-12 h-12 rounded-md object-cover"
                                        />
                                    </div>
                                    <span className="text-lg font-semibold">{user.username || "Unnamed"}</span>
                                </td>
                                <td className="px-4 py-3 text-center text-white text-xl font-medium">
                                    {user.levelsCompleted}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
