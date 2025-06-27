import React from 'react';
import { useSelector } from 'react-redux';
import getAvatar from '../utils/getAvatar';

function MPFinalScore({ scoreData = [], isHost = false, socket, roomCode }) {
    const onRestart = () => {
        socket.emit('start-game', roomCode);
    };
    
    const auth = useSelector(state => state.auth)
    const winner = scoreData[0];
    const medals = ['🥇', '🥈', '🥉'];
    const myUsername = auth.userData.username;
    return (
        <div className="min-h-screen w-full bg-black text-white flex flex-col items-center justify-start px-4 py-5">
            <h1 className="text-3xl font-bold text-emerald-400 mb-10 tracking-wide">🏁 Final Scores</h1>

            <div className="w-full max-w-2xl flex flex-col gap-4">
                {scoreData.map((user, index) => {
                    const isTop = index === 0;
                    const me = myUsername === user.username
                    return (
                        <div
                            key={user.username}
                            className={`
                flex items-center justify-between px-5 py-4 rounded-xl border-2 shadow-sm
                transition-all duration-300
                ${isTop ? 'bg-neutral-900 border-yellow-500 ring-4 ring-yellow-500' : me ? 'bg-neutral-900 border-emerald-500 ring-2 ring-emerald-500' : 'bg-neutral-800 border-neutral-700'}
              `}
                        >
                            {/* Left: Avatar and Info */}
                            <div className="flex items-center gap-4">
                                <div className="text-xl w-6 text-center">
                                    {medals[index] || `#${index + 1}`}
                                </div>
                                <img
                                    src={getAvatar(user)}
                                    alt="Avatar"
                                    className={`w-10 h-10 rounded-full border ${isTop ? 'border-emerald-500' : 'border-gray-600'
                                        }`}
                                />
                                <div>
                                    <p className="font-semibold text-base">
                                        {user.username}{' '}
                                        {user.isHost && (
                                            <span className="text-yellow-400 text-sm ml-1">(Host)</span>
                                        )}
                                    </p>
                                    <p className="text-sm text-gray-400">Progress: {user.progress}%</p>
                                </div>
                            </div>

                            {/* Right: Progress bar */}
                            <div className="w-40 h-2 bg-neutral-700 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-emerald-500 transition-all duration-300 rounded-full"
                                    style={{ width: `${user.progress}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Host Controls */}
            {isHost ? (
                <button
                    onClick={onRestart}
                    className="mt-10 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-lg shadow-lg"
                >
                    🔁 Restart Game
                </button>
            ) : (
                <p className="mt-10 text-yellow-300 animate-pulse text-sm italic">
                    ⏳ Waiting for host to restart the game...
                </p>
            )}
        </div>
    );
}

export default MPFinalScore;
