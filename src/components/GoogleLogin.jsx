import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import React from 'react'
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

function GoogleLogin({ formOn }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const responseGoogle = async (authResult) => {
    try {
      console.log(authResult);
      if (authResult['code']) {
        const resp = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/user/google?code=${authResult.code}`);
        console.log(resp.data.data.user);
        dispatch(login({
          userData: resp.data.data.user
        }))
        setTimeout(() => {
        navigate('/')
      }, 1500)
      }
    } catch (error) {
      console.error(authResult);
    }
  }
  const googleLogin = useGoogleLogin({
    onError: responseGoogle,
    onSuccess: responseGoogle,
    flow: 'auth-code'
  })
  return (
    <button
      disabled={!formOn}
      onClick={googleLogin}
      className="bg-white w-full mt-4 disabled:opacity-40 cursor-pointer hover:text-white hover:bg-emerald-600 text-black font-semibold py-2 rounded transition"
    >
      Login with google
    </button>
  )
}

export default GoogleLogin