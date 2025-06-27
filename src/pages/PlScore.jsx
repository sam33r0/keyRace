import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ScoreDisplay from '../components/ScoreDisplay';

function PlScore() {
  const [scores, setScores] = useState([]);

  const retrieveData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/score/pastScore`,
        { withCredentials: true }
      );
      if (res.data?.data) {
        setScores(res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch scores:', err);
    }
  };

  useEffect(() => {
    retrieveData();
  }, []);

  return (
    <div className="h-[80vh] bg-black text-white px-4 py-10 flex justify-center">
      <div className="w-full max-w-4xl h-[80vh] overflow-y-auto space-y-6 pr-2 scroll-smooth">
        {scores.length > 0 ? (
          scores.map((score, i) => <ScoreDisplay key={i} score={score} />).reverse()
        ) : (
          <p className="text-center text-neutral-400">No past scores found.</p>
        )}
      </div>
    </div>
  );
}

export default PlScore;
