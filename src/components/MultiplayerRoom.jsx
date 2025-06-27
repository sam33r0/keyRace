import React, { useState } from 'react'
import { useSelector } from 'react-redux';

function MultiplayerRoom({ socket, error, setError, usersInRoom, isHost,roomCode, setRoomCode }) {
    const [view, setView] = useState(null);
    const auth = useSelector((state) => state.auth);

    const [inputCode, setInputCode] = useState('');
    const generateRoomCode = () =>
        Math.random().toString(36).substring(2, 6).toUpperCase();
    const handleCreate = () => {
        const newRoom = generateRoomCode();
        setRoomCode(newRoom);
        setView('create');
        setError('');
        socket.emit('create-room', {
            roomCode: newRoom,
            userData: auth.userData,
        });
    };

    const handleJoin = (e) => {
        e.preventDefault();
        if (!inputCode || inputCode.length < 4) {
            setError('Please enter a valid room code.');
            return;
        }
        setRoomCode(inputCode.toUpperCase());
        setView('join');
        setError('');
        socket.emit('join-room', {
            roomCode: inputCode.toUpperCase(),
            userData: auth.userData,
        });
    };

    const handleStartGame = () => {
        socket.emit('start-game', roomCode);
    };
    return (
        <div className="w-full max-w-md bg-neutral-900 border border-neutral-700 rounded-2xl p-8 shadow-lg text-center">
            <h1 className="text-3xl font-bold text-emerald-400 mb-6">🎮 Multiplayer KeyRace</h1>

            {!view && (
                <div className="flex flex-col gap-6">
                    <button
                        onClick={handleCreate}
                        className="w-full py-3 rounded-lg font-semibold bg-emerald-600 hover:bg-emerald-700 transition"
                    >
                        ➕ Create Room
                    </button>

                    <form onSubmit={handleJoin} className="flex flex-col gap-3">
                        <input
                            type="text"
                            maxLength={6}
                            value={inputCode}
                            onChange={(e) => setInputCode(e.target.value)}
                            placeholder="Enter Room Code"
                            className="w-full text-center py-2 rounded bg-neutral-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        <button
                            type="submit"
                            className="w-full py-3 rounded-lg font-semibold bg-blue-600 hover:bg-blue-700 transition"
                        >
                            🔗 Join Room
                        </button>
                        {error && <p className="text-red-400 text-sm">{error}</p>}
                    </form>
                </div>
            )}

            {view && (
                <div className="animate-fade-in mt-4">
                    <p className="text-lg text-gray-300 mb-2">Room Code:</p>
                    <p className="text-3xl font-mono bg-white text-black inline-block px-6 py-2 rounded-xl tracking-widest">
                        {roomCode}
                    </p>

                    <div className="mt-6 text-left">


                        <h2 className="text-lg text-neutral-400 mb-2">👥 Players in Room:</h2>
                        <ul className="space-y-2">
                            {usersInRoom.map((user) => (
                                <li key={user.socketId} className="flex items-center gap-3">
                                    <img src={user.avatar} className="w-6 h-6 rounded-full border" alt="avatar" />
                                    <span>
                                        {user.username}
                                        {user.isHost && <span className="text-yellow-400 ml-1">(Host)</span>}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {(isHost && usersInRoom.length > 1) && (
                        <button
                            onClick={handleStartGame}
                            className="mt-6 px-6 py-2 bg-emerald-600 hover:bg-emerald-700 rounded text-white font-semibold"
                        >
                            🚀 Start Game
                        </button>
                    )}
                    {usersInRoom.length < 2 && (
                        <p className="mt-4 text-yellow-300 animate-pulse text-sm">⏳ Waiting for Players to Join...</p>
                    )}
                    {(!isHost) && (
                        <p className="mt-4 text-yellow-300 animate-pulse text-sm">⏳ Waiting for host to start...</p>
                    )}
                </div>
            )}
        </div>
    )
}

export default MultiplayerRoom