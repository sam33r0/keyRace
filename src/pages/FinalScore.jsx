import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from 'recharts';
import { updateAverageWpm } from '../store/scoreSlice';

function FinalScore() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(updateAverageWpm());
    }, []);
    const score = useSelector((state) => state.score);

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
                            {score.averageWpn}
                        </p>
                    </div>
                </div>

                {/* Line Chart */}
                <div className="w-full h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={wpmData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                            <XAxis
                                dataKey="progress"
                                domain={[0, 100]}
                                ticks={[0, 25, 50, 75, 100]}
                                tickFormatter={(tick) => `${tick}%`}
                                stroke="#aaa"
                            />
                            <YAxis stroke="#aaa" />
                            <Tooltip
                                formatter={(value, name) => [`${value} WPM`, 'Speed']}
                                labelFormatter={(label) => `Progress: ${label}%`}
                                contentStyle={{ backgroundColor: '#111', borderColor: '#444' }}
                                labelStyle={{ color: '#0f0' }}
                                itemStyle={{ color: '#0f0' }}
                            />
                            <Line
                                type="monotone"
                                dataKey="wpm"
                                stroke="#10B981"
                                strokeWidth={2}
                                activeDot={{ r: 5 }}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default FinalScore;