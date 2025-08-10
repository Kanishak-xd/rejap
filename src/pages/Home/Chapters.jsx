import { Link } from "react-router-dom";

export default function Chapters() {
    return (
        <>
            <section id="chaptersSection" className="w-full h-screen mt-50 flex justify-center items-center text-white font-outfit">
                <div className="flex flex-col h-[70vh] w-11/12 max-w-6xl mx-auto gap-4">
                    {/* 1 */}
                    <div
                        className="h-1/6 bg-pink-100 border-2 border-pink-200 flex items-center justify-center text-2xl font-bold text-pink-800 rounded-lg xl:hidden"
                    >
                        1
                    </div>

                    {/* Main content: Left Image + Right 3-column block */}
                    <div className="flex flex-1 flex-col xl:flex-row gap-4 h-auto">
                        {/* 2 */}
                        <div className="xl:w-2/5 hidden xl:block bg-blue-100 border-2 border-blue-200 flex items-center justify-center text-2xl font-bold text-blue-800 rounded-lg">
                            2
                        </div>

                        {/* Right side */}
                        <div className="flex-auto xl:flex-1 flex flex-col gap-4 xl:w-3/5 w-5/5 ">

                            {/* 3 */}
                            <div className="xl:h-1/4 hidden xl:block bg-green-100 border-2 border-green-200 flex items-center justify-center text-2xl font-bold text-green-800 rounded-lg">
                                3
                            </div>

                            {/* Two rows + archive */}
                            <div className="xl:h-3/4 h-2/4 sm:h-4/4 flex gap-4">

                                {/* Left block */}
                                <div className="flex flex-col flex-1 gap-4">
                                    {/* 4 */}
                                    <div className="flex-1 bg-yellow-100 border-2 border-yellow-200 flex items-center justify-center text-xl font-bold text-yellow-800 rounded-xl">
                                        4
                                    </div>
                                    {/* 6 */}
                                    <div className="flex-1 bg-teal-100 border-2 border-teal-200 flex items-center justify-center text-xl font-bold text-teal-800 rounded-xl">
                                        6
                                    </div>
                                </div>

                                {/* Middle block */}
                                <div className="flex flex-col flex-1 gap-4">
                                    {/* 5 */}
                                    <div className="flex-1 bg-purple-100 border-2 border-purple-200 flex items-center justify-center text-xl font-bold text-purple-800 rounded-xl">
                                        5
                                    </div>
                                    {/* 7 */}
                                    <div className="flex-1 bg-orange-100 border-2 border-orange-200 flex items-center justify-center text-xl font-bold text-orange-800 rounded-xl">
                                        7
                                    </div>
                                </div>

                                {/* Right block: 8 */}
                                <div className="w-1/4 flex flex-col">
                                    <div className="flex-1 bg-indigo-100 border-2 border-indigo-200 flex items-center justify-center text-2xl font-bold text-indigo-800 rounded-xl">
                                        8
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}