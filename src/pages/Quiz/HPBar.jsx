export default function HPBar({ lives }) {
    const activeColor = 'bg-[#BFECFF]';
    const inactiveColor = 'bg-[#1f1f1f]';

    const hpSegments = [
        lives >= 100 ? activeColor : inactiveColor,
        lives >= 200 ? activeColor : inactiveColor,
        lives === 300 ? activeColor : inactiveColor
    ];

    return (
        <div className="relative w-full">
            <img src="/quizpage/hpbar-bg.svg" className="w-full h-full object-contain" alt="HP bar background" />
            <p className="absolute bottom-0 left-2 text-white font-semibold italic" style={{ fontSize: 'clamp(0.6rem, 2vw, 1rem)' }}>
                HP: {lives}/300
            </p>
            <div className='absolute bottom-[40%] sm:bottom-[38%] flex w-full justify-center h-[45%] sm:h-[50%] gap-[1.2%] sm:gap-[1.5%]'>
                <div className={`${hpSegments[0]} w-[31%] h-full rounded-l-sm sm:rounded-l-md`}></div>
                <div className={`${hpSegments[1]} w-[31%] h-full`}></div>
                <div className={`${hpSegments[2]} w-[31%] h-full rounded-r-sm sm:rounded-r-md`}></div>
            </div>
        </div>
    );
}