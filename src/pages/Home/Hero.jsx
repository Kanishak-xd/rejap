export default function Hero() {
    return (
        <section className="min-h-screen flex flex-col-reverse sm:flex-col-reverse md:flex-row xl:flex-row justify-center items-center px-4 sm:px-6 md:px-10 gap-8 md:gap-24 pt-10 sm:pt-0 pb-12 sm:pb-24">
            <div className="flex flex-col max-w-[700px]">
                <p className="font-outfit font-bold text-2xl sm:text-2xl md:text-4xl xl:text-5xl 2xl:text-6xl/17 mt-10 sm:mt-10 md:mt-0 xl:mt-0 text-center sm:text-center md:text-left xl:text-left 2xl:text-left text-[#F3F3EE] cursor-default leading-tight">
                    Master Japanese — <br />One Lesson at a Time
                </p>
                <p className="font-outfit font-regular mt-[0.25rem] text-[1.15rem] sm:text-[1.15rem] md:text-2xl xl:text-2xl 2xl:text-4xl/12 text-center sm:text-center md:text-left xl:text-left 2xl:text-left text-[#F3F3EE] cursor-default leading-snug">
                    Learn Japanese Scripts, time <br />
                    expressions, and more through <br />
                    fun quizzes & puzzles for free.
                </p>
                <div className="flex justify-center sm:justify-center md:justify-start xl:justify-start">
                    <a href="#chaptersSection">
                        <button className="mt-4 sm:mt-4 md:mt-5 xl:mt-8 2xl:mt-8 text-[#F3F3EE] font-bold bg-[#141414] border-2 border-amber-50 text-[1.2rem] sm:text-[1.2rem] md:text-[1.2rem] xl:text-xl 2xl:text-2xl px-3 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 xl:px-6 xl:py-3 2xl:px-6 2xl:py-3 rounded-[8px] sm:rounded-[8px] md:rounded-[12px] xl:rounded-[12px] transition hover:scale-105">
                            GET STARTED
                        </button>
                    </a>
                </div>
            </div>
            <div className="flex justify-center items-center max-w-[200px] sm:max-w-[200px] md:max-w-[200px] xl:max-w-[280px] max-h-[200px] sm:max-h-[200px] md:max-h-[200px] xl:max-h-[280px]">
                <img
                    src="https://res.cloudinary.com/dykzzd9sy/image/upload/v1748898722/ramen-shop_caqgsz.png"
                    alt="Ramen shop illustration"
                    className="w-full h-auto object-contain"
                />
            </div>
        </section>
    );
}