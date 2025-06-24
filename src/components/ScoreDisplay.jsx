function ScoreDisplay({ score }) {
  return (
    <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-700 shadow-md hover:shadow-lg transition">
      <div className="grid grid-cols-4 gap-4 text-center">
        <div>
          <h2 className="text-sm text-neutral-400">Accuracy</h2>
          <p className="text-xl font-semibold text-white">{score.accuracy}%</p>
        </div>
        <div>
          <h2 className="text-sm text-neutral-400">Final Score</h2>
          <p className="text-xl font-semibold text-white">{score.finalScore}%</p>
        </div>
        <div>
          <h2 className="text-sm text-neutral-400">Mistypes</h2>
          <p className="text-xl font-semibold text-white">{score.mistypes}</p>
        </div>
        <div>
          <h2 className="text-sm text-neutral-400">Avg WPM</h2>
          <p className="text-xl font-semibold text-white">{score.averageWpm}</p>
        </div>
      </div>

      {score.createdAt && (
        <p className="mt-4 text-sm text-neutral-500 text-right italic">
          Played on: {new Date(score.createdAt).toLocaleString()}
        </p>
      )}
    </div>
  );
}

export default ScoreDisplay;
