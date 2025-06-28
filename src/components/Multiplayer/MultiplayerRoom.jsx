import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import getAvatar from '../../utils/getAvatar';
import CopySvg from '../../assets/CopySvg';
import HideOnMobile from '../HideOnMobile'
function MultiplayerRoom({ socket, error, setError, usersInRoom, isHost, roomCode, setRoomCode }) {
    const [view, setView] = useState(null);
    const [copied, setCopied] = useState(false);
    const [inputCode, setInputCode] = useState('');
    const auth = useSelector((state) => state.auth);
    const generateRoomCode = () => Math.random().toString(36).substring(2, 6).toUpperCase();

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

    const copyToClipboard = () => {
        navigator.clipboard.writeText(roomCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    // return (
    //     <div className="w-full h-screen bg-black text-white flex items-center justify-center p-8">
    //         <div className="max-w-5xl w-full flex gap-10 bg-neutral-900 border border-neutral-700 rounded-2xl p-8 shadow-lg">

    //             {/* Left Section: Controls */}
    //             <div className="flex-1">
    //                 <h1 className="text-3xl font-bold text-emerald-400 mb-6">🕹️ Multiplayer KeyRace</h1>

    //                 {!view && (
    //                     <div className="flex flex-col gap-6">
    //                         <button
    //                             onClick={handleCreate}
    //                             className="w-full py-3 rounded-lg font-semibold bg-emerald-600 hover:bg-emerald-700 transition"
    //                         >
    //                             ➕ Create Room
    //                         </button>

    //                         <form onSubmit={handleJoin} className="flex flex-col gap-3">
    //                             <input
    //                                 type="text"
    //                                 maxLength={6}
    //                                 value={inputCode}
    //                                 onChange={(e) => setInputCode(e.target.value)}
    //                                 placeholder="Enter Room Code"
    //                                 className="w-full text-center py-2 rounded bg-neutral-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
    //                             />
    //                             <button
    //                                 type="submit"
    //                                 className="w-full py-3 rounded-lg font-semibold bg-blue-600 hover:bg-blue-700 transition"
    //                             >
    //                                 🔗 Join Room
    //                             </button>
    //                             {error && <p className="text-red-400 text-sm text-center">{error}</p>}
    //                         </form>
    //                     </div>
    //                 )}

    //                 {view && (
    //                     <div className="space-y-4 mt-4">
    //                         <p className="text-lg text-neutral-300">Room Code</p>
    //                         <div className="flex items-center gap-3">
    //                             <div
    //                                 onClick={copyToClipboard}
    //                                 className={`flex items-center gap-2 cursor-pointer border px-4 py-2 rounded-lg transition-all duration-200 ${copied ? 'bg-green-500 text-white' : 'bg-white text-black hover:bg-gray-100'
    //                                     }`}
    //                                 title="Click to copy"
    //                             >
    //                                 <CopySvg />
    //                                 <span className="font-mono tracking-wider text-lg">
    //                                     {copied ? 'Copied!' : roomCode}
    //                                 </span>
    //                             </div>
    //                         </div>


    //                         {(isHost && usersInRoom.length > 1) && (
    //                             <button
    //                                 onClick={handleStartGame}
    //                                 className="mt-6 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 rounded text-white font-semibold w-full"
    //                             >
    //                                 🚀 Start Game
    //                             </button>
    //                         )}
    //                         {usersInRoom.length < 2 && (
    //                             <p className="text-yellow-300 animate-pulse text-sm mt-4">⏳ Waiting for players to join...</p>
    //                         )}
    //                         {!isHost && (
    //                             <p className="text-yellow-300 animate-pulse text-sm mt-4">⏳ Waiting for host to start...</p>
    //                         )}
    //                     </div>
    //                 )}
    //             </div>

    //             {/* Right Section: Players */}
    //             {view && (
    //                 <div className="w-80">
    //                     <h2 className="text-lg font-semibold text-neutral-300 mb-4">👥 Players</h2>
    //                     <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
    //                         {usersInRoom.map((user) => (
    //                             <div
    //                                 key={user.socketId}
    //                                 className="flex items-center justify-between bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700"
    //                             >
    //                                 <div className="flex items-center gap-3">
    //                                     <img
    //                                         src={getAvatar(user)}
    //                                         alt="avatar"
    //                                         className="w-8 h-8 rounded-full border"
    //                                     />
    //                                     <span className="font-medium">
    //                                         {user.username}
    //                                         {user.isHost && (
    //                                             <span className="ml-2 text-yellow-400 text-xs font-semibold">(Host)</span>
    //                                         )}
    //                                     </span>
    //                                 </div>
    //                                 {user.socketId === socket.id && (
    //                                     <span className="text-xs text-gray-400">You</span>
    //                                 )}
    //                             </div>
    //                         ))}
    //                     </div>
    //                 </div>
    //             )}
    //         </div>
    //     </div>
    // );
    return (
        <div className="w-full h-screen bg-black text-white flex items-center justify-center p-6">
            <HideOnMobile />

            <div className={`max-w-6xl ${view ? 'w-full' : 'lg:w-1/3'}  flex gap-10 bg-neutral-900 border border-neutral-700 rounded-2xl p-8 shadow-xl`}>

                {/* Left Section */}
                <div className="flex-1 flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-center text-emerald-400 mb-6">🎮 Multiplayer KeyRace</h1>

                        {!view && (
                            <div className=" flex flex-col gap-6">
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
                                    {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                                </form>
                            </div>
                        )}

                        {view && (
                            <div className="space-y-4 mt-4">
                                <p className="text-sm text-neutral-400">Room Code:</p>
                                <div
                                    onClick={copyToClipboard}
                                    className={`flex w-1/3 items-center justify-center gap-2 cursor-pointer border px-4 py-2 rounded-lg transition-all duration-200 ${copied ? 'bg-green-500 text-white' : 'bg-white text-black hover:bg-gray-100'}`}
                                    title="Click to copy"
                                >
                                    <CopySvg />
                                    <span className="font-mono tracking-widest text-lg">
                                        {copied ? 'Copied!' : roomCode}
                                    </span>
                                </div>

                                <div className="mt-6">
                                    {(isHost && usersInRoom.length > 1) && (
                                        <button
                                            onClick={handleStartGame}
                                            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 rounded-lg font-semibold text-white transition"
                                        >
                                            🚀 Start Game
                                        </button>
                                    )}
                                    {usersInRoom.length < 2 && (
                                        <p className="text-yellow-300 animate-pulse text-sm mt-4">⏳ Waiting for players to join...</p>
                                    )}
                                    {!isHost && (
                                        <p className="text-yellow-300 animate-pulse text-sm mt-4">⏳ Waiting for host to start...</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Section: Players List */}
                {view && (
                    <div className="w-1/3 border-l border-neutral-800 pl-6">
                        <h2 className="text-lg font-semibold text-neutral-300 mb-3">👥 Players in Room</h2>
                        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1 custom-scroll">
                            {usersInRoom.map((user) => (
                                <div
                                    key={user.socketId}
                                    className="flex items-center justify-between px-3 py-2 rounded-md bg-neutral-800 border border-neutral-700 hover:bg-neutral-700 transition"
                                >
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={getAvatar(user)}
                                            alt="avatar"
                                            className={`w-9 h-9 rounded-full border-2 ${user.isHost ? 'border-yellow-400' : 'border-neutral-600'}`}
                                        />
                                        <div>
                                            <p className="text-sm font-medium">
                                                {user.username}
                                                {user.isHost && (
                                                    <span className="ml-2 text-yellow-400 text-xs font-semibold">(Host)</span>
                                                )}
                                            </p>
                                            {user.socketId === socket.id && (
                                                <p className="text-xs text-gray-400">You</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

}

export default MultiplayerRoom;
