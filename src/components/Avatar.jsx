function Avatar({ auth, logoutFunc }) {
    let src = auth.userData?.avatar || `https://api.dicebear.com/7.x/thumbs/svg?seed=${auth.userData?.fullName || 'User'}`
    return (
        <div className="flex items-center gap-4">
            <img
                src= {src}
                alt="avatar"
                className="w-8 h-8 rounded-full object-cover border border-emerald-400"
            /><span className="text-sm font-medium text-white">
                {auth.userData?.fullName || auth.userData?.username || 'User'}
            </span>
            <span
                onClick={logoutFunc}
                className="hover:text-white cursor-pointer transition-colors"
            >
                Logout
            </span>
        </div>
    )
}

export default Avatar