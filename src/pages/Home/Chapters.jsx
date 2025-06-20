export default function Chapters() {
    return (
        <>
            <section id="chaptersSection" className="h-screen flex justify-center items-center mt-50">
                <div id="chaptersPage" className="w-[85%] h-[80%] flex flex-row">
                    <div id="chapLeft" className="h-full w-[45%] flex items-center">
                        <div className="w-[100%] h-[100%] bg-[url('https://res.cloudinary.com/dykzzd9sy/image/upload/v1748958693/chapLeft_hoegrp.webp')] bg-cover font-outfit text-white flex flex-col justify-end">
                            <p className="font-bold text-7xl ml-10 text-shadow-lg cursor-default">GET STARTED</p>
                            <p className="font-light text-3xl mb-8 ml-10 text-shadow-lg cursor-default">START WITH CHAPTER ONE</p>
                        </div>
                    </div>
                    <div id="chapRight" className="h-full w-[55%] flex flex-col">
                        <div id="theChaptersTitle" className="w-full h-[20%]">
                            <p className="font-outfit font-bold text-white text-[6.15rem] leading-none mt-2 ml-6 cursor-default">THE CHAPTERS</p>
                        </div>
                        <div id="theChaptersButtons" className="w-full h-[80%] flex flex-row animate-float mt-15">
                            <div id="chapterButtons" className="h-full w-[55%] flex flex-col ml-1">
                                <div id="chapOneTwoBtns" className="w-full h-[48%] flex flex-row justify-between items-start ml-6">
                                    <a href="#" className="group bg-[#1F1F1F] rounded-[10%] h-[93%] p-12 flex flex-col justify-center hover:bg-white transition-colors duration-200">
                                        <img className="h-35 w-35" src="https://res.cloudinary.com/dykzzd9sy/image/upload/v1748874109/ch1ico_kfuyz7.webp"></img>
                                        <p className="font-outfit font-bold text-2xl text-white text-shadow-lg mt-4 group-hover:text-black">CHAPTER 1</p>
                                        <p className="font-outfit font-light text-2xl text-white text-shadow-lg group-hover:text-black">HIRAGANA</p>
                                    </a>
                                    <a href="#" className="group bg-[#1F1F1F] rounded-[10%] h-[93%] p-12 flex flex-col justify-center hover:bg-white transition-colors duration-200">
                                        <img className="h-35 w-35" src="https://res.cloudinary.com/dykzzd9sy/image/upload/v1748874110/ch2ico_dmx7mg.webp"></img>
                                        <p className="font-outfit font-bold text-2xl text-white text-shadow-lg mt-4 group-hover:text-black">CHAPTER 2</p>
                                        <p className="font-outfit font-light text-2xl text-white text-shadow-lg group-hover:text-black">KATAKANA</p>
                                    </a>
                                </div>
                                <div id="chapThreeFourBtns" className="w-full h-[48%] flex flex-row items-start justify-between ml-6">
                                    <a href="#" className="group bg-[#1F1F1F] rounded-[10%] h-[93%] p-12 flex flex-col justify-center hover:bg-white transition-colors duration-200">
                                        <img className="h-35 w-35 pr-5" src="https://res.cloudinary.com/dykzzd9sy/image/upload/v1748874110/ch3ico_rdnmzq.webp"></img>
                                        <p className="font-outfit font-bold text-2xl text-white text-shadow-lg mt-4 group-hover:text-black">CHAPTER 3</p>
                                        <p className="font-outfit font-light text-2xl text-white text-shadow-lg group-hover:text-black">KANJI</p>
                                    </a>
                                    <a href="#" className="group bg-[#1F1F1F] rounded-[10%] h-[93%] p-12 flex flex-col justify-center hover:bg-white transition-colors duration-200">
                                        <img className="h-35 w-35 pl-3" src="https://res.cloudinary.com/dykzzd9sy/image/upload/v1748874110/ch4ico_nkrxm1.webp"></img>
                                        <p className="font-outfit font-bold text-2xl text-white text-shadow-lg mt-4 group-hover:text-black">CHAPTER 4</p>
                                        <p className="font-outfit font-light text-2xl text-white text-shadow-lg group-hover:text-black">TIME</p>
                                    </a>
                                </div>
                            </div>
                            <div id="archiveButton" className="h-[96%] w-[25%] ml-12">
                                <div className="h-full w-full">
                                    <a href="#" className="bg-[url('https://res.cloudinary.com/dykzzd9sy/image/upload/v1748962013/archiveButton_tjjimm.png')] bg-cover h-[96%] w-[94%] flex justify-center items-end group">
                                        <div className="font-outfit text-white flex flex-col mb-6 mr-6 group-hover:text-black">
                                            <p className="font-bold text-3xl text-shadow-lg text-center">ARCHIVE</p>
                                            <p className="font-light text-2xl text-shadow-lg text-center">RESOURCES</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}