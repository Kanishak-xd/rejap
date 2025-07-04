import { useParams, useNavigate } from "react-router-dom";
import syllableData from "../../data/syllableData"

export default function LevelIntro() {
    const { chapterId, levelId } = useParams();
    const navigate = useNavigate();
    const levelData = syllableData[chapterId]?.[levelId];

    if (!levelData) {
        return <div className="p-6 text-red-500">Level not found</div>;
    }

    return (
        <div className="min-h-screen p-6 bg-black flex flex-col gap-6 text-white pt-20">
            <h1 className="text-2xl font-bold">
                Chapter: {chapterId.toUpperCase()} | Level {levelId}
            </h1>
            <div className="bg-gray-900 p-4 rounded shadow">
                <h2 className="text-xl font-semibold mb-4 ">Syllables to Learn:</h2>

                <div className="flex flex-wrap gap-4">
                    {levelData.syllables.map((syl, index) => (
                        <div
                            key={index}
                            className="w-24 h-24 flex flex-col items-center justify-center bg-[#1C1C1C] border-2 border-gray-300 rounded-lg shadow"
                        >
                            <span className="text-3xl font-bold text-white">
                                {syl}
                            </span>
                            {levelData.romaji && levelData.romaji[index] && (
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

            <button
                className="self-start bg-green-500 px-6 py-2 rounded hover:bg-green-600"
                onClick={() => navigate("quiz")}
            >
                Start Quiz
            </button>
        </div>
    );
}
