import { useNavigate } from "react-router-dom";

export default function KanjiLevels() {
    const navigate = useNavigate();

    return (
        <div className="flex gap-[20px] h-full">
            <div className="grow bg-[#e1f7d5] cursor-pointer transition-all rounded-lg"
                onClick={() => navigate("/quiz/kanji/1")}>
                1
            </div>
            <div className="grow bg-[#ffbdbd] cursor-pointer transition-all rounded-lg"
                onClick={() => navigate("/quiz/kanji/2")}>
                2
            </div>
            <div className="grow bg-[#c9c9ff] cursor-pointer transition-all rounded-lg"
                onClick={() => navigate("/quiz/kanji/3")}>
                3
            </div>
            <div className="grow bg-[#ffffff] cursor-pointer transition-all rounded-lg"
                onClick={() => navigate("/quiz/kanji/4")}>
                4
            </div>
            <div className="grow bg-[#f1cbff] cursor-pointer transition-all rounded-lg"
                onClick={() => navigate("/quiz/kanji/5")}>
                5
            </div>
        </div>
    );
}
