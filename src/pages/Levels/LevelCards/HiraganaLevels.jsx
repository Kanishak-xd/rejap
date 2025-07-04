import { useNavigate } from "react-router-dom";

const levels = [
    { level: 1, bg: "#e1f7d5" },
    { level: 2, bg: "#ffbdbd" },
    { level: 3, bg: "#c9c9ff" },
    { level: 4, bg: "#ffffff" },
    { level: 5, bg: "#f1cbff" },
    { level: 6, bg: "#e1f7d5" },
    { level: 7, bg: "#ffbdbd" },
    { level: 8, bg: "#c9c9ff" },
    { level: 9, bg: "#ffffff" },
    { level: 10, bg: "#f1cbff" },
];

export default function HiraganaLevels() {
    const navigate = useNavigate();

    return (
        <div className="flex gap-[20px] h-full">
            {levels.map(({ level, bg }) => (
                <div
                    key={level}
                    className="grow cursor-pointer transition-all rounded-lg"
                    style={{ backgroundColor: bg }}
                    onClick={() => navigate(`/levels/hiragana/${level}`)}
                >
                    <div className="w-full h-full flex items-center justify-center text-2xl font-bold">
                        {level}
                    </div>
                </div>
            ))}
        </div>
    );
}
