import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

function Multiplayer() {
  const [view, setView] = useState(null); const [notifications, setNotifications] = useState([]);


  const [roomCode, setRoomCode] = useState('');
  const [inputCode, setInputCode] = useState('');
  const [error, setError] = useState('');
  const [usersInRoom, setUsersInRoom] = useState([]);
  const [isHost, setIsHost] = useState(false);
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const socket = useMemo(() => io(import.meta.env.VITE_BACKEND_URL_SOCKET), []);

  useEffect(() => {
    socket.on('room-update', (data) => {
      setUsersInRoom(data.users);
      const me = data.users.find((u) => u.socketId === socket.id);
      setIsHost(me?.isHost || false);

      // Add message to notification queue
      setNotifications((prev) => [...prev, data.message]);

      // Remove it after 3 seconds
      setTimeout(() => {
        setNotifications((prev) => prev.slice(1));
      }, 3000);
    });

    socket.on('game-start', () => {
      //   navigate('/game'); // Or however your game route is structured
    });

    socket.on('error-message', (msg) => {
      setError(msg);
    });

    return () => {
      socket.disconnect();
      socket.off();
    };
  }, []);

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
    <div className="min-h-screen bg-black flex items-center justify-center text-white px-4 py-10">
      {/* Toast Notifications (top-right) */}
      <div className="fixed top-18 right-6 z-50 space-y-2">
        {notifications.map((msg, index) => (
          <div
            key={index}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-lg animate-slide-in"
          >
            {msg}
          </div>
        ))}
      </div>

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
    </div>
  );
}

export default Multiplayer;


// import React, { useEffect, useMemo, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { io } from 'socket.io-client';

// function Multiplayer() {
//     const [view, setView] = useState(null);
//     const [usersInRoom, setUsersInRoom] = useState([]);
//     const [isHost, setIsHost] = useState(false);
//     const [roomCode, setRoomCode] = useState('');
//     const [inputCode, setInputCode] = useState('');
//     const [error, setError] = useState('');
//     const [roomUsers, setRoomUsers] = useState([]);
//     const auth = useSelector(state => state.auth);

//     const socket = useMemo(() => io(import.meta.env.VITE_BACKEND_URL_SOCKET), []);
//     const handleStartGame = () => {
//         socket.emit('start-game', roomCode);
//     };
//     useEffect(() => {
//         socket.on('room-update', (data) => {
//             console.log('Room update:', data.message);

//             setUsersInRoom(data.users);

//             const me = data.users.find(u => u.socketId === socket.id);
//             setIsHost(me?.isHost || false);
//             setRoomUsers(data.users || []);
//         });

//         return () => {
//             socket.disconnect();
//             socket.off();
//         };
//     }, []);

//     const generateRoomCode = () =>
//         Math.random().toString(36).substring(2, 6).toUpperCase();

//     const handleCreate = () => {
//         const newRoom = generateRoomCode();
//         setRoomCode(newRoom);
//         setView('create');
//         setError('');
//         socket.emit('create-room', {
//             roomCode: newRoom,
//             userData: auth.userData
//         });
//     };

//     const handleJoin = (e) => {
//         e.preventDefault();
//         if (!inputCode || inputCode.length < 4) {
//             setError('Please enter a valid room code.');
//             return;
//         }
//         const upperCode = inputCode.toUpperCase();
//         setRoomCode(upperCode);
//         setView('join');
//         setError('');
//         socket.emit('join-room', {
//             roomCode: upperCode,
//             userData: auth.userData
//         });
//     };

//     return (
//         <div className="min-h-screen bg-black flex items-center justify-center text-white px-4 py-10">
//             <div className="w-full max-w-md bg-neutral-900 border border-neutral-700 rounded-2xl p-8 shadow-lg text-center">
//                 <h1 className="text-3xl font-bold text-emerald-400 mb-6">🎮 Multiplayer KeyRace</h1>

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
//                             {error && <p className="text-red-400 text-sm">{error}</p>}
//                         </form>
//                     </div>
//                 )}

//                 {(view === 'create' || view === 'join') && (
//                     <div className="animate-fade-in mt-4">
//                         <p className="text-lg text-gray-300 mb-2">
//                             {view === 'create' ? 'Share this room code:' : 'Joining Room:'}
//                         </p>
//                         <p className="text-4xl font-mono bg-white text-black inline-block px-6 py-2 rounded-xl tracking-widest">
//                             {roomCode}
//                         </p>

//                         <p className="mt-4 text-emerald-400 text-sm">🧑‍🤝‍🧑 Players in Room:</p>
//                         <ul className="mt-3 text-sm text-neutral-300 space-y-2 max-h-48 overflow-y-auto border border-neutral-700 p-2 rounded bg-neutral-800">
//                             {roomUsers.length > 0 ? (
//                                 roomUsers.map((u, i) => (
//                                     <li key={i} className="flex items-center gap-3">
//                                         <img
//                                             src={u.avatar}
//                                             alt="avatar"
//                                             className="w-8 h-8 rounded-full border border-emerald-400"
//                                         />
//                                         <span className="text-emerald-300 font-medium">{u.username}</span>
//                                     </li>
//                                 ))
//                             ) : (
//                                 <li className="text-neutral-500 italic">Waiting for others...</li>
//                             )}
//                         </ul>{usersInRoom.length > 0 && (
//                             <div className="mt-6">
//                                 <h2 className="text-lg mb-2 text-neutral-400">Players in Room:</h2>
//                                 <ul className="text-sm text-white space-y-1">
//                                     {usersInRoom.map(user => (
//                                         <li key={user.socketId} className="flex items-center gap-2">
//                                             <img src={user.avatar} className="w-6 h-6 rounded-full border" />
//                                             {user.username} {user.isHost && <span className="text-yellow-400">(Host)</span>}
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         )}

//                         {isHost && (
//                             <button
//                                 onClick={handleStartGame}
//                                 className="mt-4 px-6 py-2 bg-emerald-600 hover:bg-emerald-700 rounded text-white font-semibold"
//                             >
//                                 🚀 Start Game
//                             </button>
//                         )}
//                         {usersInRoom.length > 0 && (
//                             <div className="mt-6">
//                                 <h2 className="text-lg mb-2 text-neutral-400">Players in Room:</h2>
//                                 <ul className="text-sm text-white space-y-1">
//                                     {usersInRoom.map(user => (
//                                         <li key={user.socketId} className="flex items-center gap-2">
//                                             <img src={user.avatar} className="w-6 h-6 rounded-full border" />
//                                             {user.username} {user.isHost && <span className="text-yellow-400">(Host)</span>}
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         )}

//                         {isHost && (
//                             <button
//                                 onClick={handleStartGame}
//                                 className="mt-4 px-6 py-2 bg-emerald-600 hover:bg-emerald-700 rounded text-white font-semibold"
//                             >
//                                 🚀 Start Game
//                             </button>
//                         )}

//                         <p className={`mt-4 ${view === 'create' ? 'text-yellow-400' : 'text-green-400'} animate-pulse text-sm`}>
//                             {view === 'create' ? '⏳ Waiting for opponent...' : '🔌 Connecting...'}
//                         </p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default Multiplayer;

