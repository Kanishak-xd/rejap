import { Link } from "react-router-dom";

export default function Chapters() {
    return (
        <>
            <section id="chaptersSection" className="w-full h-screen mt-50 flex justify-center items-center text-white font-outfit">
                <div className="flex flex-col h-[65vh] w-11/12 max-w-6xl mx-auto gap-4">
                    {/* 1 */}
                    <div
                        className="h-1/6 flex items-center xl:hidden"
                    >
                        <p className="text-[2.48rem] sm:text-[4.9rem] md:text-[5.67rem] font-bold text-white">
                            THE CHAPTERS
                        </p>
                    </div>

                    {/* Main content: Left image + Right 3-column block */}
                    <div className="flex flex-1 flex-col xl:flex-row gap-4 h-auto">
                        {/* Left image block [2] */}
                        <div className="xl:w-4/8 hidden xl:block flex items-center justify-center text-2xl font-bold">
                            <img src="https://res.cloudinary.com/dykzzd9sy/image/upload/v1748874111/getStarted_xmbz2h.webp"
                                className="object-cover w-full h-full rounded-4xl">
                            </img>
                        </div>

                        {/* Right side */}
                        <div className="flex-auto xl:flex-1 flex flex-col gap-4 xl:w-4/8 w-5/5 ">

                            {/* 3 */}
                            <div className="xl:h-1/4 hidden xl:block flex">
                                <p className="text-[4.7rem] font-bold text-white">
                                    THE CHAPTERS
                                </p>
                            </div>

                            {/* Two columns + archive block */}
                            <div className="xl:h-3/4 h-2/4 sm:h-4/4 flex gap-4">

                                {/* Hiragana + Kanji column */}
                                <div className="flex flex-col flex-1 gap-4">
                                    {/* Hiragana block [4] */}
                                    <div className="flex-1 bg-neutral-900 flex items-center justify-center rounded-2xl sm:rounded-3xl md:rounded-3xl xl:rounded-4xl">
                                        4
                                    </div>
                                    {/* Kanji block [6] */}
                                    <div className="flex-1 bg-neutral-900 flex items-center justify-center rounded-2xl sm:rounded-3xl md:rounded-3xl xl:rounded-4xl">
                                        6
                                    </div>
                                </div>

                                {/* Katakana + Time column */}
                                <div className="flex flex-col flex-1 gap-4">
                                    {/* Katakana block [5] */}
                                    <div className="flex-1 bg-neutral-900 flex items-center justify-center rounded-2xl sm:rounded-3xl md:rounded-3xl xl:rounded-4xl">
                                        5
                                    </div>
                                    {/* Time block [7] */}
                                    <div className="flex-1 bg-neutral-900 flex items-center justify-center rounded-2xl sm:rounded-3xl md:rounded-3xl xl:rounded-4xl">
                                        7
                                    </div>
                                </div>

                                {/* Archive block [8] */}
                                <div className="w-1/4 flex flex-col">
                                    <div className="flex-1 bg-neutral-900 flex items-center justify-center rounded-2xl sm:rounded-3xl md:rounded-3xl xl:rounded-4xl">
                                        <img src="https://res.cloudinary.com/dykzzd9sy/image/upload/v1748874109/archiveImg_qigpzp.webp"
                                            className="object-cover w-full h-full rounded-4xl">
                                        </img>
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