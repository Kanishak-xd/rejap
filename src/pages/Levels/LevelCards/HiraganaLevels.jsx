import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export default function HiraganaLevels({ chapter }) {
    const { user } = useAuth();
    const [attemptedLevels, setAttemptedLevels] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProgress = async () => {
            if (!user?.uid) return;
            try {
                const res = await fetch(`http://localhost:3001/api/users/${user.uid}`);
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
            <div className="flex h-18 gap-4 mb-4">
                <img src="https://res.cloudinary.com/dykzzd9sy/image/upload/v1751840508/torii_sbc71f.webp"
                    className="h-14 w-14 mt-1" />
                <h2 className="w-9/10 text-5xl font-bold mb-6 mt-1.5" id="hiragana">Chapter 1: Hiragana</h2></div>
            <div className="grid grid-cols-5 grid-rows-2 gap-4">
                {[...Array(10)].map((_, i) => {
                    const level = i + 1;
                    const attempted = attemptedLevels.includes(level);

                    return (
                        <div
                            key={level}
                            onClick={() => navigate(`/levels/${chapter}/${level}`)}
                            className={`cursor-pointer rounded-2xl p-2 bg-neutral-900 hover:bg-neutral-800 hover:scale-103 transition shadow-md`}
                        >
                            <div className="pl-3">
                                <p className="text-2xl font-semibold mb-1">Level {level}</p>
                                <p className={`text-lg ${attempted ? 'text-[#BFECFF] transition duration-1000' : 'text-neutral-500 transition duration-1000'}`}>
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
