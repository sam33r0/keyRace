import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateAverageWpm } from '../store/scoreSlice';
import axios from 'axios';
import Graph from '../components/Graph';

function FinalScore() {
    const dispatch = useDispatch();
    const score = useSelector((state) => state.score);
    const sendScore = async () => {
        try {
            // console.log(avg, score.averageWpm);
            const wpmMeterKeys = Object.keys(score.wpmMeter)
            const averageWpm = Math.round(wpmMeterKeys.reduce((prev, elem) => {
                return prev += score.wpmMeter[elem];
            }, 0) / wpmMeterKeys.length);
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/score/addScore`, {
                accuracy: score.accuracy,
                mistypes: score.mistypes,
                finalScore: score.finalScore,
                averageWpm
            }, { withCredentials: true });
            // console.log(res);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        // console.log('testing', score);
        dispatch(updateAverageWpm());
        sendScore();
    }, []);


    const totalLength = Object.keys(score.wpmMeter).length;

    const wpmData = Object.entries(score.wpmMeter).map(([index, wpm]) => ({
        progress: Math.round(((Number(index) + 1) / totalLength) * 100), // x-axis in %
        wpm,
    }));

    return (
        <div className="min-h-screen bg-black text-white p-10 flex flex-col items-center gap-10">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-emerald-400">Final Score</h1>
                <p className="mt-2 text-sm text-neutral-400">Your performance summary</p>
            </div>

            <div className="w-full max-w-3xl bg-neutral-900 p-6 rounded-xl border border-neutral-700 shadow">
                <div className="grid grid-cols-4 text-center mb-6">
                    <div>
                        <h2 className="text-lg text-neutral-400">Accuracy</h2>
                        <p className="text-xl font-bold text-white">{score.accuracy}%</p>
                    </div>
                    <div>
                        <h2 className="text-lg text-neutral-400">Final Score</h2>
                        <p className="text-xl font-bold text-white">{score.finalScore}%</p>
                    </div>
                    <div>
                        <h2 className="text-lg text-neutral-400">Mistypes</h2>
                        <p className="text-xl font-bold text-white">{score.mistypes}</p>
                    </div>
                    <div>
                        <h2 className="text-lg text-neutral-400">Avg WPM</h2>
                        <p className="text-xl font-bold text-white">
                            {score.averageWpm}
                        </p>
                    </div>
                </div>

                {/* Line Chart */}
                <div className="w-full h-64">
                    <Graph wpmData={wpmData}/>
                </div>
            </div>
        </div>
    );
}

export default FinalScore;