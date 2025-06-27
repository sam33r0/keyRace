import getAvatar from "../../utils/getAvatar";

function AvatarRaceTrack({ users, selfSocketId }) {
    return (
        <div className="w-full max-w-5xl mx-auto">
            {/* Track Background */}
            <div className="relative h-16 bg-gradient-to-r from-neutral-800 via-neutral-900 to-neutral-800 rounded-full border-2 border-emerald-500 shadow-inner overflow-hidden">

                {/* Finish Line */}
                <div className="absolute right-5 top-0 bottom-0 w-2 bg-yellow-400 flex items-center justify-center">
                    <span className="text-lg animate-bounce">🏁</span>
                </div>

                {/* Avatars */}
                {users.map((user, i) => {
                    const progress = Math.min(user.progress, 100);
                    const isYou = user.socketId === selfSocketId;
                    const isLeader = i === 0;

                    return (
                        <div
                            key={user.socketId}
                            className="absolute top-1/3 transform -translate-y-1/2 transition-all duration-300 ease-in-out"
                            style={{
                                left: `calc(${progress}% - 24px)`,
                                zIndex: users.length - i,
                            }}
                        >
                            <div className="flex flex-col items-center gap-1 relative">
                                {/* Avatar Image */}
                                <img
                                    src={getAvatar(user)}
                                    alt={user.username}
                                    className={`w-9 h-9 rounded-full border-2 transition-all duration-200 
                    ${isLeader ? 'border-yellow-400' : 'border-emerald-500'} 
                    ${isYou ? 'ring-2 ring-emerald-400' : ''}
                  `}
                                />

                                {/* Username tag */}
                                <div className="absolute -bottom-6 bg-black bg-opacity-70 px-2 py-1 rounded text-xs text-white font-semibold whitespace-nowrap">
                                    {user.username}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default AvatarRaceTrack;
