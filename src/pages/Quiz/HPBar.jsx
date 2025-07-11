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
            <img src="/quizpage/hpbar-bg.svg" className="w-full" alt="HP bar background" />
            <p className="absolute bottom-0 text-lg left-4 text-white font-semibold italic">
                HP: {lives}/300
            </p>
            <div className='absolute bottom-[38%] flex w-full justify-center h-[50%] gap-[1.5%]'>
                <div className={`${hpSegments[0]} w-[31%] h-full rounded-l-md`}></div>
                <div className={`${hpSegments[1]} w-[31%] h-full`}></div>
                <div className={`${hpSegments[2]} w-[31%] h-full rounded-r-md`}></div>
            </div>
        </div>
    );
}
