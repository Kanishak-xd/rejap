export default function Hero() {
    return (
        <section className="min-h-screen flex flex-col md:flex-row justify-center items-center px-4 sm:px-6 md:px-10 gap-8 md:gap-24 bg-black pb-24">
            <div className="flex flex-col max-w-[700px]">
                <p className="font-outfit font-bold text-5xl 2xl:text-6xl/17 text-[#F3F3EE] cursor-default leading-tight">
                    Master Japanese — <br />One Lesson at a Time
                </p>
                <p className="font-outfit font-regular text-2xl 2xl:text-4xl/12 text-[#F3F3EE] mt-1 cursor-default leading-snug">
                    Learn Japanese Scripts, time <br />
                    expressions, and more through <br />
                    fun quizzes & puzzles for free.
                </p>
                <a href="#scriptsSection">
                    <button className="mt-8 text-[#F3F3EE] font-bold bg-[#141414] border-2 border-amber-50 text-xl 2xl:text-2xl px-6 py-3 rounded-xl transition hover:scale-105">
                        GET STARTED
                    </button>
                </a>
            </div>
            <div className="flex justify-center items-center max-w-[300px] max-h-[300px]">
                <img
                    src="https://res.cloudinary.com/dykzzd9sy/image/upload/v1748898722/ramen-shop_caqgsz.png"
                    alt="Ramen shop illustration"
                    className="w-full h-auto object-contain"
                />
            </div>
        </section>
    );
}