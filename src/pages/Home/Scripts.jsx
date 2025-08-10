export default function Scripts() {
    return (
        <section id="scriptsSection" className="min-h-screen py-10">
            <div className="mx-auto w-full max-w-[900px] sm:max-w-[900px] md:max-w-[1000px] xl:max-w-[1040px] px-4 sm:px-6 md:px-10 flex flex-col items-center">

                {/* Heading Section */}
                <div className="w-full text-center mb-10">
                    <p className="font-outfit font-regular text-2xl sm:text-3xl md:text-4xl text-amber-50 cursor-default">
                        Japanese language uses
                    </p>
                    <p className="font-outfit font-bold text-4xl sm:text-5xl md:text-6xl text-amber-50 cursor-default">
                        THREE SCRIPTS
                    </p>
                </div>

                {/* Scripts Frames Section */}
                <div className="w-full flex flex-col md:flex-row justify-center items-stretch gap-8 md:gap-12">

                    {/* Hiragana Frame */}
                    <div className="flex-1 flex flex-col items-center text-center">
                        <img
                            src="https://res.cloudinary.com/dykzzd9sy/image/upload/v1748874095/card-1_hghjn7.webp"
                            className="rounded-md w-full max-w-50 sm:max-w-50 md:max-w-400"
                            alt="Hiragana card"
                        />
                        <p className="font-outfit font-bold text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-amber-50 cursor-default mt-4">
                            HIRAGANA
                        </p>
                        <p className="font-outfit font-regular text-base sm:text-lg lg:text-xl text-amber-50 cursor-default mt-1 min-h-[3rem]">
                            used for native Japanese words
                        </p>
                    </div>

                    {/* Katakana Frame */}
                    <div className="flex-1 flex flex-col items-center text-center">
                        <img
                            src="https://res.cloudinary.com/dykzzd9sy/image/upload/v1748874096/card-2_ucxqzl.webp"
                            className="rounded-md w-full max-w-50 sm:max-w-50 md:max-w-400"
                            alt="Katakana card"
                        />
                        <p className="font-outfit font-bold text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-amber-50 cursor-default mt-4">
                            KATAKANA
                        </p>
                        <p className="font-outfit font-regular text-base sm:text-lg lg:text-xl text-amber-50 cursor-default mt-1 min-h-[3rem]">
                            used for foreign words
                        </p>
                    </div>

                    {/* Kanji Frame */}
                    <div className="flex-1 flex flex-col items-center text-center">
                        <img
                            src="https://res.cloudinary.com/dykzzd9sy/image/upload/v1748874096/card-3_g9gaml.webp"
                            className="rounded-md w-full max-w-50 sm:max-w-50 md:max-w-400"
                            alt="Kanji card"
                        />
                        <p className="font-outfit font-bold text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-amber-50 cursor-default mt-4">
                            KANJI
                        </p>
                        <p className="font-outfit font-regular text-base sm:text-lg lg:text-xl text-amber-50 cursor-default mt-1 min-h-[3rem]">
                            used for visual meaning and context
                        </p>
                    </div>

                </div>

                {/* Scroll Down Section */}
                <div className="w-full mt-10 md:mt-16 animate-float hidden md:block">
                    <div className="flex flex-col justify-center items-center">
                        <a href="#chaptersSection" className="text-center flex flex-col items-center">
                            <p className="font-bold text-amber-50 text-base sm:text-lg md:text-2xl mt-2">
                                SCROLL DOWN
                            </p>
                            <svg className="-translate-y-3 w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#e3e3e3">
                                <path d="M480-344 240-584l43-43 197 197 197-197 43 43-240 240Z" stroke="#e3e3e3" strokeWidth="30" />
                            </svg>
                        </a>
                    </div>
                </div>

            </div>
        </section>
    );
}