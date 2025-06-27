import getAvatar from "../utils/getAvatar";

function ProgressMP({ users }) {
    // Sort users by progress (descending)
    // console.log(users);

    const sortedUsers = users;//[...users].sort((a, b) => b.progress - a.progress);

    return (
        <div className="w-full max-w-2xl h-fit mx-auto space-y-6 pb-20">
            <h1 className="mt-5 lg:mt-0 w-full text-center">LEADERBOARD</h1>
            {sortedUsers.map((user, index) => {
                const isLeader = index === 0;
                const isFinished = user.progress >= 100;

                return (
                    <div
                        key={user.username}
                        className={
                            `flex items-center gap-4 px-4 py-3 rounded-lg border",
                            ${isLeader ? "border-yellow-500 bg-yellow-900/20 shadow-md animate-pulse" : "border-neutral-700 bg-neutral-800"}`
                        }
                    >
                        {/* Rank Medal */}
                        <div className="text-xl w-6">
                            {index === 0 && '🥇'}
                            {index === 1 && '🥈'}
                            {index === 2 && '🥉'}
                        </div>

                        {/* Avatar */}
                        <img
                            src={getAvatar(user)}
                            alt="avatar"
                            className="w-10 h-10 rounded-full border border-emerald-500"
                        />

                        {/* Name and Progress */}
                        <div className="flex-1">
                            <div className="flex justify-between text-sm text-gray-200 mb-1">
                                <span className={isLeader ? 'font-bold text-yellow-300 uppercase' : 'uppercase'}>
                                    {user.username}
                                </span>
                                <span>
                                    {isFinished ? '🏁 Finished' : `${user.progress}%`}
                                </span>
                            </div>
                            <div className="w-full bg-gray-700 h-2 rounded overflow-hidden">
                                <div
                                    className="h-2 bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-300"
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
