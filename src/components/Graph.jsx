import React from 'react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from 'recharts';
function Graph({wpmData}) {
    return (
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
    )
}

export default Graph