import { useNavigate } from 'react-router-dom';

function HideOnMobile() {
    const navigate = useNavigate()

    return (
        <div className="sm:hidden fixed top-0 left-0 w-full h-full bg-black text-white flex flex-col items-center justify-center z-50 px-6">
            <button
                onClick={() => navigate('/')}
                className="mb-6 px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition duration-300 shadow-md"
            >
                ⬅️ Back to Home
            </button>
            <h2 className="text-2xl font-bold mb-4 text-emerald-400">Desktop Only 🚫📱</h2>
            <p className="text-center text-sm text-neutral-300">
                Multiplayer mode is best experienced on a laptop or desktop device. Please switch to a larger screen to play!
            </p>
        </div>
    )
}

export default HideOnMobile