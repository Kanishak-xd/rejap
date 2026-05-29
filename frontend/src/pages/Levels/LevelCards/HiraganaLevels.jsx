import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext.jsx";

export default function HiraganaLevels({ chapter }) {
    const { user } = useAuth();
    const [attemptedLevels, setAttemptedLevels] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProgress = async () => {
            if (!user?.uid) return;
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${user.uid}`);
                const data = await res.json();
                const progress = data.progress || {};
                const levels = progress[chapter] || [];

                // Convert all values to numbers to prevent mismatch
                const normalized = levels.map((lvl) => Number(lvl));
                setAttemptedLevels(normalized);
            } catch (err) {
                console.error("Failed to fetch progress:", err);
            }
        };

        fetchProgress();
    }, [user, chapter]);

    return (
        <div className="w-full">
            <div className="flex h-14 sm:h-16 md:h-18 gap-3 sm:gap-4 mb-4">
                <img src="https://res.cloudinary.com/dykzzd9sy/image/upload/v1751840508/torii_sbc71f.webp"
                    className="h-9 sm:h-14 w-9 sm:w-14 mt-1" alt="Torii gate" />
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 mt-1.5" id="hiragana">Chapter 1: Hiragana</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
                {[...Array(10)].map((_, i) => {
                    const level = i + 1;
                    const attempted = attemptedLevels.includes(level);

                    return (
                        <div
                            key={level}
                            onClick={() => navigate(`/levels/${chapter}/${level}`)}
                            className={`cursor-pointer rounded-xl sm:rounded-2xl p-2 bg-neutral-900 hover:bg-neutral-800 hover:scale-105 transition-all duration-200 shadow-md`}
                        >
                            <div className="pl-2 sm:pl-3">
                                <p className="text-xl sm:text-2xl font-semibold mb-1">Level {level}</p>
                                <p className={`text-[1rem] sm:text-[0.8rem] xl:text-xl ${attempted ? 'text-[#BFECFF] transition duration-1000' : 'text-neutral-500 transition duration-1000'}`}>
                                    {attempted ? 'Completed' : 'Not Attempted'}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}