import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function WelcomePage() {
  const auth = useSelector((state) => state.auth);
  const username = auth?.userData?.username || 'Racer';
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-3xl w-full text-center flex flex-col gap-8 items-center">
        {/* Greeting */}
        <div>
          <h1 className="text-4xl font-bold text-emerald-400 mb-2">Welcome, {username}! 👋</h1>
          <p className="text-lg text-neutral-400">
            Get ready to test your typing speed. Choose your mode to begin!
          </p>
        </div>

        {/* Mode Selection */}
        <div className="flex flex-col sm:flex-row gap-6 w-full justify-center">
          <button
            onClick={() => navigate('/solo')}
            className="flex-1 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 transition text-lg font-semibold"
          >
            🧑‍💻 Practice Solo
          </button>

          <button
            onClick={() => navigate('/multiplayer')}
            className="flex-1 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-lg font-semibold"
          >
            🧑‍🤝‍🧑 Play Multiplayer
          </button>
        </div>

        {/* Optional: Footer tip */}
        <p className="text-sm text-neutral-500 mt-4 italic">
          Tip: Multiplayer lets you race live with friends in real time!
        </p>
      </div>
    </div>
  );
}

export default WelcomePage;
