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
        <div className="pt-24 px-4 sm:px-5 md:px-8 lg:px-10 xl:px-6 min-h-screen bg-black text-white flex items-center flex-col">
            <div className="w-full max-w-5xl">
                {/* Heading */}
                <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold font-outfit mb-6 text-center">
                    LEADERBOARD
                </h1>

                {/* Table wrapper */}
                <div className="overflow-x-auto border border-neutral-900 rounded-lg mb-20">
                    <table className="table w-full">
                        <thead className="bg-neutral-900 text-white">
                            <tr>
                                <th className="px-2 py-2 text-center text-[0.8125rem] sm:text-sm md:text-base whitespace-nowrap">
                                    Rank
                                </th>
                                <th className="px-2 py-2 text-left text-[0.8125rem] sm:text-sm md:text-base whitespace-nowrap">
                                    Player
                                </th>
                                <th className="px-2 py-2 text-center text-[0.8125rem] sm:text-sm md:text-base whitespace-nowrap">
                                    Lessons
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaders.map((user, idx) => (
                                <tr key={user._id || idx} className="bg-neutral-950 hover:bg-neutral-900 transition">
                                    {/* Rank */}
                                    <td className="px-2 py-2 text-center">
                                        {idx < 3 ? (
                                            <div className="flex justify-center items-center w-full h-8 sm:h-9">
                                                <img
                                                    src={
                                                        idx === 0
                                                            ? "https://res.cloudinary.com/dykzzd9sy/image/upload/v1752079455/1st_oweekr.png"
                                                            : idx === 1
                                                                ? "https://res.cloudinary.com/dykzzd9sy/image/upload/v1752079455/2nd_yai1xx.png"
                                                                : "https://res.cloudinary.com/dykzzd9sy/image/upload/v1752079455/3rd_pbxj9v.png"
                                                    }
                                                    alt={`${idx + 1} place medal`}
                                                    className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
                                                />
                                            </div>
                                        ) : (
                                            <div className="flex justify-center items-center w-full h-8 sm:h-9">
                                                <span className="text-[0.8125rem] sm:text-sm md:text-xl font-bold text-white">
                                                    {idx + 1}
                                                </span>
                                            </div>
                                        )}
                                    </td>

                                    {/* Player */}
                                    <td className="px-2 py-2 flex items-center gap-2 sm:gap-3">
                                        <div className="rounded-lg flex justify-center items-center w-8 h-8 sm:w-10 md:w-14 sm:h-10 md:h-14 bg-black border border-neutral-800">
                                            <img
                                                src={user.profilePic || "/default-avatar.webp"}
                                                alt="User avatar"
                                                className="w-6 h-6 sm:w-8 md:w-12 sm:h-8 md:h-12 rounded-md object-cover"
                                            />
                                        </div>
                                        <span className="text-[0.8125rem] sm:text-sm md:text-lg font-semibold truncate max-w-[80px] sm:max-w-[110px] md:max-w-none">
                                            {user.username || "Unnamed"}
                                        </span>
                                    </td>

                                    {/* Lessons */}
                                    <td className="px-2 py-2 text-center text-white text-[0.8125rem] sm:text-sm md:text-xl font-medium">
                                        {user.levelsCompleted}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}