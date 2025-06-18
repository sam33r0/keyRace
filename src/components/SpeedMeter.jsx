import React from 'react';

function SpeedMeter({ wpm }) {
    const maxWPM = 120;
    const percent = Math.min(wpm / maxWPM, 1) * 100;

    return (
        <div className="w-full my-4 bg-neutral-800 rounded-full h-3 overflow-hidden border border-neutral-700">
            <div
                className="h-full bg-gradient-to-r from-emerald-400 to-green-500 transition-[width] ease-out duration-500"
                style={{
                    width: `${percent}%`,
                    willChange: 'width',
                }}
            ></div>
        </div>
    );
}

export default SpeedMeter;
