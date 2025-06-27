import React from 'react'

function Notifications({ notifications }) {
    return (
        <div className="fixed top-18 right-6 z-50 space-y-2">
            {notifications.map((msg, index) => (
                <div
                    key={index}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-lg animate-slide-in"
                >
                    {msg}
                </div>
            ))}
        </div>
    )
}

export default Notifications