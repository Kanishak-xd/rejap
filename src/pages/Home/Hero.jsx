export default function Hero() {
    return (
        <>
            <section className=" h-screen flex justify-center">
                <div className=" h-170 w-340 mt-15 flex justify-between items-center">
                    <div className="h-140 w-200 flex justify-center items-center flex-col ml-20">
                        <div className=" h-3/6 w-full flex flex-col items-start">
                            <p className="font-outfit font-bold text-left text-5xl/14  text-[#F3F3EE] cursor-default">Master Japanese — <br />One Lesson at a Time</p>
                            <p className="font-outfit font-regular text-4xl/11 text-[#F3F3EE] mt-4 cursor-default">Learn Japanese Scripts, time <br />expressions, and more through <br />fun quizzes & puzzles for free.</p>
                        </div>
                        <div className="h-1/6 w-full flex font-outfit text-3xl">
                            <a href="#scriptsSection">
                                <button className="mt-4 text-[#F3F3EE] font-bold bg-[#141414] border-2 border-amber-50 h-15 w-70 rounded-xl cursor-pointer transform transition hover:-translate-y-1">START LESSON</button>
                            </a>
                        </div>
                    </div>
                    <div className="w-130 h-140 bg-[url('https://res.cloudinary.com/dykzzd9sy/image/upload/ramen-shop_caqgsz.png')] bg-contain bg-no-repeat bg-center animate-float"></div>
                </div>
            </section>
        </>
    )
}