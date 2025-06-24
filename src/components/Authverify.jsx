import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

function Authverify({ children }) {
    const auth = useSelector(state => state.auth);
      return (
        <>
            {auth.status ? children : <Navigate to={'/login'} />}
        </>
    )
}

export default Authverify