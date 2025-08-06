import React from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import syllableData from "../../data/syllableData.jsx";

export default function LevelIntro() {
    const { chapterId, levelId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [completed, setCompleted] = useState(false);

    const levelData = syllableData[chapterId]?.[levelId];

    useEffect(() => {
        if (user) {
            fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/progress/${user.uid}`)
                .then(res => res.json())
                .then(data => {
                    const userProgress = data.progress?.[chapterId] || [];
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
        <div className="min-h-screen bg-neutral-950 flex flex-col gap-6 text-white pt-22 px-10 font-outfit">
            <div className="w-full h-35 relative flex items-center justify-center">
                <img src="https://res.cloudinary.com/dykzzd9sy/image/upload/v1752022256/sakura-3_l8klit.webp" className="w-full h-full object-cover rounded-t-2xl" alt="Sakura background" />
                <h1 className="text-7xl font-bold absolute text-shadow-lg bottom-10">
                    {chapterId.toUpperCase()} LEVEL {levelId}
                </h1>
            </div>
            <div className="flex">
                <div className="ml-20 rounded shadow w-1/2">
                    <div className="flex flex-wrap gap-5">
                        {levelData.syllables.map((syl, index) => (
                            <div key={index}
                                className="w-60 h-60 flex flex-col items-center justify-center bg-neutral-900 rounded-3xl shadow"
                            >
                                <span className={`${chapterId === "time" ? "text-7xl text-center" : "text-9xl"} font-shippori font-bold text-white`}>
                                    {syl}
                                </span>
                                {levelData.romaji?.[index] && (
                                    <span className={`${chapterId === "time" ? "text-xl text-center" : "text-3xl"} mt-1 text-white`}>
                                        {levelData.romaji[index]}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-neutral-900 mr-15 rounded-3xl shadow px-10 w-1/2 pb-10">
                    <p className="mt-8 text-neutral-300 text-4xl font-bold">BEFORE YOU BEGIN</p>
                    <p className="mt-1.5 text-neutral-300 text-3xl/11 font-extralight">
                        Remember these characters carefully.<br />
                        Take your time to get familiar with<br />
                        them and click the button below to<br /> start your quiz when you are ready.
                    </p>
                    <div className="divider py-4"></div>
                    <div className="flex gap-2">
                        <p className="text-2xl font-semibold">Status:</p>
                        <p className={`font-semibold text-left text-2xl ${completed ? "text-[#A0C878]" : "text-neutral-400"}`}>
                            {completed ? "Completed!" : "Not Attempted"}
                        </p>
                    </div>
                    <div className="grid grid-cols-2 grid-rows-1 gap-3 pt-6 w-5/7 text-neutral-950 font-bold text-2xl">
                        <button className="self-start bg-[#BFECFF] py-3 rounded-l-lg hover:bg-[#ACBCFF] hover:cursor-pointer hover:scale-101" onClick={() => navigate("quiz")}>
                            Start Quiz
                        </button>
                        <button className="flex gap-1 py-3 justify-center bg-[#FFF6E3] rounded-r-lg hover:bg-[#E1AEFF] hover:cursor-pointer transition hover:scale-101" onClick={goToNextLevel}>
                            Next Level
                            <svg className="w-7 h-7 mt-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeWidth="3" d="m9 5 7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
