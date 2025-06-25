import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import React from 'react'
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

function GoogleLogin({ formOn, setFormOn, setSuccess }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const responseGoogle = async (authResult) => {
    try {
      console.log(authResult);
      if (authResult?.error) {
        setFormOn(true)
      }
      else {
        setSuccess(true)
      }
      if (authResult['code']) {
        const resp = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/user/google?code=${authResult.code}`, { withCredentials: true });
        // console.log(resp.data.data.user);
        dispatch(login({
          userData: resp.data.data.user
        }))
        setTimeout(() => {
          navigate('/')
        }, 500)
      }
    } catch (error) {
      console.error(authResult);
      setFormOn(true)
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
      onClick={e => {
        setFormOn(false);
        googleLogin(e)
      }}
      className={`w-full mt-4 flex items-center justify-center gap-2 py-2 px-4 rounded font-semibold transition
    ${formOn ? 'bg-white text-black hover:bg-emerald-800 hover:text-white' : 'bg-white text-black opacity-40 cursor-not-allowed'}`}
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
        alt="Google logo"
        className="w-5 h-5"
      />
      Login with Google
    </button>

  )
}

export default GoogleLogin