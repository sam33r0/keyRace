import { useSelector } from "react-redux";
import SpeedMeter from "./SpeedMeter";
import { XCircle, Percent } from "lucide-react";

function Score({ wpm }) {
    const score = useSelector((state) => state.score);

    return (
        <div className="bg-neutral-900 text-white px-4 sm:px-6 py-5 rounded-2xl shadow-lg border border-neutral-700 w-full max-w-md mx-auto h-fit">
            {/* Header */}
            <div className="text-xs sm:text-sm text-neutral-400 tracking-widest uppercase mb-2 text-center">
                Typing Performance
            </div>

            {/* WPM */}
            <div className="flex items-end justify-center sm:justify-start gap-2 sm:gap-3">
                <div className="text-4xl sm:text-5xl font-extrabold text-emerald-400">{wpm}</div>
                <span className="text-lg sm:text-xl text-white font-medium mb-1">WPM</span>
            </div>

            {/* Visual Meter */}
            <div className="mt-4 sm:mt-6">
                <SpeedMeter wpm={wpm} />
            </div>

            {/* Stats */}
            <div className="mt-5 flex flex-col sm:flex-row justify-between items-center sm:items-start text-sm text-neutral-300 gap-2">
                <div className="flex items-center gap-2">
                    <XCircle size={16} className="text-red-500" />
                    <span>Mistypes:</span>
                    <span className="font-bold text-white">{score.mistypes}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Percent size={16} className="text-blue-400" />
                    <span>Accuracy:</span>
                    <span className="font-bold text-white">{score.accuracy}%</span>
                </div>
            </div>
        </div>
    );
}

export default Score;
