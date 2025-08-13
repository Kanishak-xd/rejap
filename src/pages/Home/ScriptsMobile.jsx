import React from 'react'

export default function ScriptsMobile() {
    return (
        <section id="scriptsMobileSection" className="m-4 md:m-8 text-gray-200 min-h-screen flex justify-center items-center pb-0 md:pb-20">
            <div className="mx-auto w-full max-w-[900px] sm:max-w-[900px] md:max-w-[1000px] xl:max-w-[1040px] px-0 sm:px-6 md:px-10 flex flex-col items-center">
                <div className="container mx-auto p-4 my-6 space-y-1 text-center text-gray-200">
                    <p className="font-outfit font-regular text-xl sm:text-3xl md:text-4xl cursor-default">Japanese language uses</p>
                    <p className="font-outfit font-bold text-3xl sm:text-5xl md:text-6xl cursor-default">THREE SCRIPTS</p>
                </div>
                <div className="container mx-auto grid justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="flex flex-col items-center p-4">
                        <p className="text-3xl sm:text-4xl md:text-5xl font-bold font-shippori">
                            ひらがな
                        </p>
                        <p className="my-2 text-2xl sm:text-3xl md:text-4xl font-semibold font-outfit">HIRAGANA</p>
                        <div className="space-y-1 leading-tight text-center max-w-xs font-outfit">
                            <p>Fundamental script for native Japanese words and grammar. Contains 46 basic characters.</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center p-4">
                        <p className="text-3xl sm:text-4xl md:text-5xl font-bold font-shippori">
                            カタカナ
                        </p>
                        <p className="my-2 text-2xl sm:text-3xl md:text-4xl font-semibold font-outfit">KATAKANA</p>
                        <div className="space-y-1 leading-tight text-center max-w-xs font-outfit">
                            <p>Used for foreign words and emphasis. Same 46 characters as hiragana but with angular strokes.</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center p-4">
                        <p className="text-3xl sm:text-4xl md:text-5xl font-bold font-shippori">
                            漢字
                        </p>
                        <p className="my-2 text-2xl sm:text-3xl md:text-4xl font-semibold font-outfit">KANJI</p>
                        <div className="space-y-1 leading-tight text-center max-w-xs font-outfit">
                            <p>Chinese characters that convey meaning visually. Provide context and reduce character count.</p>
                        </div>
                    </div>
                </div>
                {/* Scroll Down Section */}
                <div className="w-full mt-10 md:mt-16 animate-float">
                    <div className="flex flex-col justify-center items-center">
                        <a href="#chaptersSection" className="text-center flex flex-col items-center">
                            <p className="font-semibold text-gray-200 text-base sm:text-lg md:text-2xl mt-2">
                                SCROLL DOWN
                            </p>
                            <svg className="-translate-y-3 w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#e3e3e3">
                                <path d="M480-344 240-584l43-43 197 197 197-197 43 43-240 240Z" stroke="#e3e3e3" strokeWidth="20" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
