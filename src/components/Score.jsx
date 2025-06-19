import { useSelector } from "react-redux";
import SpeedMeter from "./SpeedMeter";
import { XCircle, Percent } from "lucide-react"; // optional icons

function Score({ wpm }) {
    const score = useSelector((state) => state.score);

    return (
        <div className="bg-neutral-900 text-white px-6 py-5 rounded-2xl shadow-lg border border-neutral-700 w-full max-w-md mx-auto">
            {/* Header */}
            <div className="text-sm text-neutral-400 tracking-widest uppercase mb-2">
                Typing Performance
            </div>

            {/* WPM */}
            <div className="flex items-end gap-2">
                <div className="text-5xl font-extrabold text-emerald-400">{wpm}</div>
                <span className="text-xl text-white font-medium mb-1">WPM</span>
            </div>

            {/* Visual Meter */}
            <SpeedMeter wpm={wpm} />

            {/* Stats */}
            <div className="mt-4 flex justify-between text-sm text-neutral-300">
                <div className="flex items-center gap-1">
                    <XCircle size={16} className="text-red-500" />
                    <span>Mistypes:</span>
                    <span className="font-bold text-white">{score.mistypes}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Percent size={16} className="text-blue-400" />
                    <span>Accuracy:</span>
                    <span className="font-bold text-white">{score.accuracy}%</span>
                </div>
            </div>
        </div>
    );
}

export default Score;
