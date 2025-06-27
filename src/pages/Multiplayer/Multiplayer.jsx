import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import Notifications from '../../components/Multiplayer/Notifications';
import MultiplayerRoom from '../../components/Multiplayer/MultiplayerRoom';
import MPTypeTesting from '../../components/Multiplayer/MPTypeTesting';
import MPFinalScore from '../../components/Multiplayer/MPFinalScore';

function Multiplayer() {
  const [error, setError] = useState('');
  const [usersInRoom, setUsersInRoom] = useState([]);
  const [isHost, setIsHost] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [gameStart, setGameStart] = useState('notStarted');
  const [scoreData, setScoreData] = useState({})
  const [roomCode, setRoomCode] = useState('');

  const [data, setData] = useState({
    par: '',
    time: 0
  });
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
    
    socket.on('game-start', (data) => {
      // console.log('game start called');
      setData(data)
      setGameStart('started');

      // navigate('/game'); // Or however your game route is structured
    });

    socket.on('game-stop', (data) => {
      // console.log('server asked to stop the game', data)
      setScoreData(data);
      setGameStart('ended');
    })
    socket.on('error-message', (msg) => {
      setError(msg);
    });

    return () => {
      socket.disconnect();
      socket.off();
    };
  }, []);

  return (
    <div className="h-screen overflow-auto bg-black flex items-center justify-center text-white px-4 py-10">
      {/* Toast Notifications (top-right) */}
      <Notifications notifications={notifications} />
      {gameStart === 'notStarted' && <MultiplayerRoom roomCode={roomCode} setRoomCode={setRoomCode} socket={socket} error={error} setError={setError} usersInRoom={usersInRoom} isHost={isHost} />}
      {gameStart === 'started' && <MPTypeTesting par={[...data?.par]} time={data?.time} socket={socket} />}
      {gameStart === 'ended' && <MPFinalScore scoreData={scoreData} isHost={isHost} socket={socket} roomCode={roomCode} />}
    </div>
  );
}

export default Multiplayer;
