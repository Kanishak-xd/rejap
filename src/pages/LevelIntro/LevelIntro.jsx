import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import syllableData from "../../data/syllableData";

export default function LevelIntro() {
    const { chapterId, levelId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [completed, setCompleted] = useState(false);

    const levelData = syllableData[chapterId]?.[levelId];

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:3001/api/users/progress/${user.uid}`)
                .then(res => res.json())
                .then(data => {
                    console.log("Progress from backend:", data);
                    const userProgress = data.progress?.[chapterId] || [];
                    console.log("Chapter Progress:", userProgress);
                    console.log("Current levelId:", levelId);
                    if (userProgress.includes(levelId.toString())) {
                        setCompleted(true);
                    } else {
                        setCompleted(false);
                    }
                })
                .catch(err => console.error("Progress fetch error:", err));
        }
    }, [user, chapterId, levelId]);

    const goToNextLevel = () => {
        const nextLevel = parseInt(levelId) + 1;
        if (syllableData[chapterId]?.[nextLevel]) {
            navigate(`/levels/${chapterId}/${nextLevel}`);
        } else {
            alert("No more levels!");
        }
    };

    if (!levelData) {
        return <div className="p-6 text-red-500">Level not found</div>;
    }

    return (
        <div className="min-h-screen p-6 bg-black flex flex-col gap-6 text-white pt-20">
            <h1 className="text-2xl font-bold">
                Chapter: {chapterId.toUpperCase()} | Level {levelId}
            </h1>

            <div className="bg-gray-900 p-4 rounded shadow">
                <h2 className="text-xl font-semibold mb-4">Syllables to Learn:</h2>
                <div className="flex flex-wrap gap-4">
                    {levelData.syllables.map((syl, index) => (
                        <div key={index}
                            className="w-24 h-24 flex flex-col items-center justify-center bg-[#1C1C1C] border-2 border-gray-300 rounded-lg shadow"
                        >
                            <span className="text-3xl font-bold text-white">{syl}</span>
                            {levelData.romaji?.[index] && (
                                <span className="text-sm mt-1 text-white">
                                    {levelData.romaji[index]}
                                </span>
                            )}
                        </div>
                    ))}
                </div>

                <p className="mt-8 text-gray-200 text-base leading-relaxed">
                    Remember these characters carefully.
                    Take your time to get familiar with them.
                    When you're ready, click the button below to start your quiz.
                </p>
            </div>

            <button className="self-start bg-green-500 px-6 py-2 rounded hover:bg-green-600" onClick={() => navigate("quiz")}>
                Start Quiz
            </button>

            <button className={`text-white font-bold py-2 px-4 rounded ${completed ? "bg-green-600" : "bg-gray-500"}`}>
                {completed ? "Completed!" : "Not Attempted"}
            </button>

            <button className="px-6 py-2 bg-blue-600 rounded hover:bg-blue-700 transition" onClick={goToNextLevel}>
                Next Level
            </button>
        </div>
    );
}
