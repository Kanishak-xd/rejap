export default function Scripts(){
    return (
        <>
            <section id="scriptsSection" className="h-screen flex justify-center">
                <div className="h-[90%] w-[70%] mt-22 flex flex-col">
                    <div className="w-full h-[92%] flex flex-col">
                        <div className="scriptsHeading w-full h-[15%] flex flex-col justify-center items-center">
                            <p className="font-outfit font-regular text-4xl text-amber-50">Japanese language uses</p>
                            <p className="font-outfit font-bold text-6xl text-amber-50">THREE SCRIPTS</p>
                        </div>
                        <div className="scriptsFrames w-full h-[85%] flex flex-row justify-between items-center">
                            <div className="hiraganaFrame w-110 h-full flex flex-col justify-between items-center">
                                <img src="https://res.cloudinary.com/dykzzd9sy/image/upload/v1748874095/card-1_hghjn7.webp" className="rounded-xl h-150 w-90"/>
                                <p className="font-outfit font-bold text-4xl text-amber-50">HIRAGANA</p>
                                <p className="font-outfit font-regular text-3xl/8 text-amber-50 text-center">used for native Japanese<br/>words</p>
                            </div>
                            <div className="katakanaFrame w-110 h-full flex flex-col justify-between items-center">
                                <img src="https://res.cloudinary.com/dykzzd9sy/image/upload/v1748874096/card-2_ucxqzl.webp" className="rounded-xl h-150 w-90"/>
                                <p className="font-outfit font-bold text-4xl text-amber-50">KATAKANA</p>
                                <p className="font-outfit font-regular text-3xl/8 text-amber-50 text-center">used for foreign<br/>words</p>
                            </div>
                            <div className="hiraganaFrame w-110 h-full flex flex-col justify-between items-center">
                                <img src="https://res.cloudinary.com/dykzzd9sy/image/upload/v1748874096/card-3_g9gaml.webp" className="rounded-xl h-150 w-90"/>
                                <p className="font-outfit font-bold text-4xl text-amber-50">KANJI</p>
                                <p className="font-outfit font-regular text-3xl/8 text-amber-50 text-center">used for visual meaning<br/>and context</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-[8%]">
                        <a href="#chaptersSection" className="flex flex-col justify-center items-center animate-float mt-3">
                            <p className="font-bold text-amber-50 text-2xl mt-2">SCROLL DOWN</p>
                            <svg className="-translate-y-3" xmlns="http://www.w3.org/2000/svg" width="48px" viewBox="0 -960 960 960" fill="#e3e3e3"><path d="M480-344 240-584l43-43 197 197 197-197 43 43-240 240Z" stroke="#e3e3e3" stroke-width="30"/></svg>
                        </a>
                    </div>
                </div>
            </section>
        </>
    )
}