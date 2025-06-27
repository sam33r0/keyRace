import getAvatar from "../../utils/getAvatar";

function ProgressMP({ users }) {
    const sortedUsers = users;

    return (
        <div className="w-full max-w-2xl mx-auto space-y-5 pb-16">
            <h1 className="text-center text-xl font-semibold text-emerald-400 tracking-wide mb-2">🏁 Live Leaderboard</h1>

            {sortedUsers.map((user, index) => {
                const isLeader = index === 0;
                const isFinished = user.progress >= 100;

                return (
                    <div
                        key={user.username}
                        className={`flex items-center gap-4 px-4 py-3 rounded-xl border transition-all duration-200
                        ${isLeader ? "border-yellow-400 bg-yellow-900/10 shadow-md" : "border-neutral-700 bg-neutral-800 hover:bg-neutral-700/50"}`}
                    >
                        {/* Medal */}
                        <div className="text-2xl w-6 text-center">
                            {index === 0 && '🥇'}
                            {index === 1 && '🥈'}
                            {index === 2 && '🥉'}
                        </div>

                        {/* Avatar */}
                        <img
                            src={getAvatar(user)}
                            alt="avatar"
                            className={`w-10 h-10 rounded-full border-2 ${isLeader ? "border-yellow-400" : "border-emerald-500"}`}
                        />

                        {/* Username and Progress */}
                        <div className="flex-1">
                            <div className="flex justify-between items-center text-sm text-gray-200 mb-1">
                                <span className={`font-medium ${isLeader ? "text-yellow-300" : "text-white"}`}>
                                    {user.username.toUpperCase()}
                                </span>
                                <span className={isFinished ? "text-emerald-400" : "text-gray-400"}>
                                    {isFinished ? "🏁 Finished" : `${user.progress}%`}
                                </span>
                            </div>
                            <div className="w-full bg-gray-700/60 h-2 rounded overflow-hidden">
                                <div
                                    className={`h-2 rounded bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-300`}
                                    style={{ width: `${Math.min(user.progress, 100)}%` }}
                                />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default ProgressMP;
