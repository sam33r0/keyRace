
// function Score({ wpm }) {
//     return (
//         <div className='text-white'>{wpm}</div>
//     )

import SpeedMeter from "./SpeedMeter";

// }
function Score({ wpm }) {
    return (
        <div className="bg-neutral-900 text-white px-6 py-4 rounded-2xl shadow-lg border border-neutral-700">
            <div className="text-xs text-neutral-400 tracking-wide uppercase mb-1">Typing Speed</div>
            <div className="text-5xl font-extrabold text-emerald-400">{wpm} <span className="text-xl font-medium text-white">WPM</span></div>
            <SpeedMeter wpm={wpm} />
        </div>
    );
}


export default Score