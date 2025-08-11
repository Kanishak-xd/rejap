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

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [chapterId, levelId]);

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

    // Split syllables into two rows with maximum 3 per row
    const maxPerRow = 3;
    const firstRow = levelData.syllables.slice(0, maxPerRow);
    const secondRow = levelData.syllables.slice(maxPerRow, maxPerRow * 2);

    return (
        <div className="min-h-screen bg-neutral-950 flex flex-col gap-6 text-white pt-20 px-4 sm:px-6 md:px-8 lg:px-10 pb-10 sm:pb-15 xl:pb-0 font-outfit">
            <div className="w-full h-20 sm:h-30 md:h-40 relative flex items-center justify-center">
                <img src="https://res.cloudinary.com/dykzzd9sy/image/upload/v1752022256/sakura-3_l8klit.webp" className="w-full h-full object-cover rounded-t-xl sm:rounded-t-2xl" alt="Sakura background" />
                <h1 className="text-2xl sm:text-5xl md:text-6xl font-bold absolute text-center bottom-5 sm:bottom-8 md:bottom-12 px-4">
                    {chapterId.toUpperCase()} LEVEL {levelId}
                </h1>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 px-2 lg:px-0">
                {/* Syllable Cards - Always 2 rows */}
                <div className="flex-shrink-0">
                    {/* First row */}
                    <div className="flex justify-center lg:justify-start gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4">
                        {firstRow.map((syl, index) => (
                            <div key={`first-${index}`}
                                className="w-24 sm:w-28 md:w-32 lg:w-40 xl:w-48 aspect-square flex flex-col items-center justify-center bg-neutral-900 rounded-xl sm:rounded-2xl md:rounded-3xl shadow flex-shrink-0"
                            >
                                <span className={`${chapterId === "time" ? "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center" : "text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"} font-shippori font-bold text-white`}>
                                    {syl}
                                </span>
                                {levelData.romaji?.[index] && (
                                    <span className={`${chapterId === "time" ? "text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-center" : "text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl"} mt-1 text-white`}>
                                        {levelData.romaji[index]}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Second row */}
                    <div className="flex justify-center lg:justify-start gap-2 sm:gap-3 md:gap-4">
                        {secondRow.map((syl, index) => {
                            const globalIndex = index + maxPerRow;
                            return (
                                <div key={`second-${index}`}
                                    className="w-24 sm:w-28 md:w-32 lg:w-40 xl:w-48 aspect-square flex flex-col items-center justify-center bg-neutral-900 rounded-xl sm:rounded-2xl md:rounded-3xl shadow flex-shrink-0"
                                >
                                    <span className={`${chapterId === "time" ? "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center" : "text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"} font-shippori font-bold text-white`}>
                                        {syl}
                                    </span>
                                    {levelData.romaji?.[globalIndex] && (
                                        <span className={`${chapterId === "time" ? "text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-center" : "text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl"} mt-1 text-white`}>
                                            {levelData.romaji[globalIndex]}
                                        </span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Before You Begin Card */}
                <div className="bg-neutral-900 rounded-2xl sm:rounded-3xl shadow px-4 sm:px-6 md:px-8 lg:px-10 py-5 sm:py-6 flex-1 min-w-0">
                    <p className="sm:mt-4 text-neutral-300 text-base sm:text-xl md:text-2xl font-bold text-center lg:text-left">BEFORE YOU BEGIN</p>
                    <p className="mt-1 text-neutral-300 text-[0.8rem] sm:text-lg md:text-xl lg:text-2xl leading-relaxed" style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                    }}>
                        Remember these characters carefully. Take your time to get familiar with them and click the button below to start your quiz when you are ready.
                    </p>
                    <div className="divider py-0 xl:py-3 my-1 sm:my-2 xl:my-4"></div>
                    <div className="flex flex-col gap-y-0 gap-x-2 sm:flex-row sm:items-center justify-center lg:justify-start">
                        <p className="text-base sm:text-xl xl:text-2xl font-semibold">Status:</p>
                        <p className={`font-regular text-left text-base sm:text-xl xl:text-2xl ${completed ? "text-[#A0C878]" : "text-neutral-400"}`}>
                            {completed ? "Completed!" : "Not Attempted"}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 pt-4 sm:pt-6 w-full sm:w-5/6 mx-auto lg:mx-0">
                        <button className="bg-[#BFECFF] py-1 sm:py-3 rounded-lg hover:bg-[#ACBCFF] hover:cursor-pointer hover:scale-105 transition-all duration-200 text-neutral-950 font-bold text-base sm:text-2xl lg:text-[1.1rem]/8 xl:text-2xl" onClick={() => navigate("quiz")}>
                            Start Quiz
                        </button>
                        <button className="flex gap-1 py-1 sm:py-3 px-1 lg:px-4 justify-center bg-[#FFF6E3] rounded-lg hover:bg-[#E1AEFF] hover:cursor-pointer hover:scale-105 transition-all duration-200 text-neutral-950 font-bold text-base sm:text-2xl lg:text-[1.1rem]/8 xl:text-2xl" onClick={goToNextLevel}>
                            <p className='w-full ml-5'>Next Level</p>
                            <svg className="w-5 sm:w-7 h-5 sm:h-7 mt-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeWidth="3" d="m9 5 7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}