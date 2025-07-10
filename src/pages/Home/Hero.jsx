export default function Hero() {
    return (
        <>
            <section className="h-screen flex justify-center mt-10">
                <div className="h-3/4 w-2/4 flex justify-between items-center">
                    <div className="h-5/6 w-4/5 flex justify-center items-center flex-col pl-33">
                        <div className=" h-3/6 w-full flex flex-col items-start">
                            <p className="font-outfit font-bold text-left text-5xl/14  text-[#F3F3EE] cursor-default">Master Japanese — <br />One Lesson at a Time</p>
                            <p className="font-outfit font-regular text-4xl/11 text-[#F3F3EE] mt-4 cursor-default">Learn Japanese Scripts, time <br />expressions, and more through <br />fun quizzes & puzzles for free.</p>
                        </div>
                        <div className="h-1/6 w-full flex font-outfit text-3xl">
                            <a href="#scriptsSection">
                                <button className="mt-4 text-[#F3F3EE] font-bold bg-[#141414] border-2 border-amber-50 h-2/3 w-full px-6 rounded-xl cursor-pointer transform transition hover:scale-102">
                                    GET STARTED
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="w-1/4 h-3/4 flex items-center">
                    <img src="https://res.cloudinary.com/dykzzd9sy/image/upload/v1748898722/ramen-shop_caqgsz.png" className="h-3/4 w-3/4">
                    </img>
                </div>
            </section>
        </>
    )
}