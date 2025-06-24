import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Avatar({ auth, logoutFunc }) {
    const [showMenu, setShowMenu] = useState(false);
    const dropdownRef = useRef(null);

    const src =
        auth.userData?.avatar ||
        `https://api.dicebear.com/7.x/thumbs/svg?seed=${auth.userData?.fullName || 'User'}`;

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <div
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-2 cursor-pointer hover:text-white"
            >
                <img
                    src={src}
                    alt="avatar"
                    className="w-8 h-8 rounded-full object-cover border border-emerald-400"
                />
                <span className="text-sm font-medium text-white">
                    {auth.userData?.fullName || auth.userData?.username || 'User'}
                </span>
            </div>

            {showMenu && (
                <div className="absolute right-0 mt-3 w-56 bg-neutral-800 rounded-md shadow-lg border border-neutral-700 z-50">
                    {/* <div className="p-4 border-b border-neutral-700 text-sm text-white"> */}
                        {/* Recent Scores:
                        <ul className="mt-2 space-y-1 max-h-32 overflow-y-auto text-neutral-300">
                            {auth.userData?.previousScores?.length ? (
                                auth.userData.previousScores.slice(0, 5).map((score, idx) => (
                                    <li key={idx} className="flex justify-between text-xs">
                                        <span>🏁 {score.finalScore}%</span>
                                        <span>⌛ {score.averageWpm} WPM</span>
                                    </li>
                                ))
                            ) : (
                                <li className="text-xs text-neutral-500">No scores</li>
                            )}

                            

                        </ul> */}
                        
                    {/* </div> */}
                    <button className="block w-full px-4 py-2 text-left text-red-400 hover:bg-neutral-700 hover:text-white transition">

                            <Link to="/pl-scores" className="block w-fulltext-sm text-emerald-400 hover:underline transition">View My Scores</Link>
                        </button>
                    <button
                        onClick={logoutFunc}
                        className="block w-full px-4 py-2 text-left text-red-400 hover:bg-neutral-700 hover:text-white transition"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}

export default Avatar;
