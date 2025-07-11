import { Link } from "react-router-dom";

export default function Chapters() {
    return (
        <>
            <section id="chaptersSection" className="w-full h-screen mt-50 flex justify-center items-center text-white font-outfit">
                <div className="grid w-8/10 h-9/12 grid-cols-6 grid-rows-4 gap-5 relative">
                    <div className="col-span-3 row-span-4">
                        <img src="https://res.cloudinary.com/dykzzd9sy/image/upload/v1748958693/chapLeft_hoegrp.webp" className="h-32/33 w-full" alt="Woman with red umbrella" />
                        <div className="absolute bottom-[8%] left-[2.5%] text-shadow-lg">
                            <p className="leading-none text-[clamp(1rem,4vw,5rem)] font-bold">GET STARTED</p><p className="text-[clamp(0.5rem,3vw,2rem)] leading-none">START WITH CHAPTER 1</p>
                        </div>
                    </div>
                    <div className="col-span-3 col-start-4"><p className="text-[clamp(2rem,5vw,6rem)] font-bold text-shadow-lg mt-5">THE CHAPTERS</p></div>
                    <div className="col-span-2 row-span-3 col-start-4 row-start-2">
                        <div className="grid grid-cols-2 grid-rows-2 gap-5 h-20/21 w-full">
                            <Link to="/levels" className="bg-neutral-800 rounded-4xl flex justify-center items-center group hover:bg-neutral-300 transition-colors"><div className="w-6/8 h-6/8 flex flex-col justify-end"><div className=" w-full flex items-center justify-center"><img src="https://res.cloudinary.com/dykzzd9sy/image/upload/v1751840508/torii_sbc71f.webp" className="w-10/16 h-8/9 mr-1" alt="Torii gate" /></div><p className="mt-2 text-2xl font-bold text-shadow-lg group-hover:text-black">CHAPTER: 1</p><p className="mt-1 text-2xl/4 text-shadow-lg group-hover:text-black">HIRAGANA</p></div></Link>
                            <Link to="/levels" className="bg-neutral-800 rounded-4xl flex justify-center items-center group hover:bg-neutral-300 transition-colors"><div className="w-6/8 h-6/8 flex flex-col justify-end"><div className=" w-full flex items-center justify-center"><img src="https://res.cloudinary.com/dykzzd9sy/image/upload/v1751840508/sushi_ss7txh.webp" className="w-10/16 h-8/9 mr-1" alt="Sushi" /></div><p className="mt-2 text-2xl font-bold text-shadow-lg group-hover:text-black">CHAPTER: 2</p><p className="mt-1 text-2xl/4 text-shadow-lg group-hover:text-black">KATAKANA</p></div></Link>
                            <Link to="/levels#kanji" className="bg-neutral-800 rounded-4xl flex justify-center items-center group hover:bg-neutral-300 transition-colors"><div className="w-6/8 h-6/8 flex flex-col justify-end"><div className=" w-full flex items-center justify-center"><img src="https://res.cloudinary.com/dykzzd9sy/image/upload/v1751840508/sensu_iusuf7.webp" className="w-10/16 h-8/9 mr-1" alt="Sensu fan" /></div><p className="mt-2 text-2xl font-bold text-shadow-lg group-hover:text-black">CHAPTER: 3</p><p className="mt-1 text-2xl/4 text-shadow-lg group-hover:text-black">KANJI</p></div></Link>
                            <Link to="/levels#time" className="bg-neutral-800 rounded-4xl flex justify-center items-center group hover:bg-neutral-300 transition-colors"><div className="w-6/8 h-6/8 flex flex-col justify-end"><div className=" w-full flex items-center justify-center"><img src="https://res.cloudinary.com/dykzzd9sy/image/upload/v1751840508/maneki-neko_cugqw9.webp" className="w-10/16 h-8/9 mr-1" alt="Maneki-neko" /></div><p className="mt-2 text-2xl font-bold text-shadow-lg group-hover:text-black">CHAPTER: 4</p><p className="mt-1 text-2xl/4 text-shadow-lg group-hover:text-black">TIME</p></div></Link>
                        </div>
                    </div>
                    <div className="row-span-3 col-start-6 row-start-2 relative group hover:text-black hover:cursor-pointer">
                        <img src="https://res.cloudinary.com/dykzzd9sy/image/upload/v1748962013/archiveButton_tjjimm.png" className="w-5/6 h-20/21" alt="Archive resources button" />
                        <div className="absolute bottom-[8%] left-[11%] hover:text-black">
                            <p className="font-bold text-shadow-lg text-2xl">ARCHIVE</p><p className="text-shadow-lg text-2xl">RESOURCES</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}