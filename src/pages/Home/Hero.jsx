export default function Hero(){
    return (
        <>
            <section className=" h-screen flex justify-center">
                <div className=" h-170 w-340 mt-15 flex justify-between items-center">
                    <div className="h-140 w-200 flex justify-center items-center flex-col">
                        <div className=" h-4/6 w-full flex flex-col items-start">
                            <p className="font-outfit font-bold text-6xl/18  text-[#F3F3EE] mt-5">Master Japanese — <br/>One Lesson at a Time</p>
                            <p className="font-outfit font-regular text-[2.3rem] text-[#F3F3EE] mt-3">Learn Japanese Scripts, time <br/>expressions, and more through <br/>fun quizzes & puzzles for free.</p>
                        </div>
                        <div className="h-1/6 w-full flex font-outfit text-3xl">
                            <button className="mt-3 text-[#F3F3EE] font-bold bg-[#141414] border-2 border-amber-50 h-15 w-70 rounded-xl cursor-pointer transform transition hover:-translate-y-1">START LESSON</button>
                        </div> 
                    </div>
                    <div className="w-130 h-140 bg-[url('https://res.cloudinary.com/dykzzd9sy/image/upload/ramen-shop_caqgsz.png')] bg-contain bg-no-repeat bg-center animate-float"></div>
                </div>
            </section>
        </>
    )
}