import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import GoogleLogin from '../components/GoogleLogin';
import { GoogleOAuthProvider } from '@react-oauth/google';

function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [formOn, setFormOn] = useState(true);
  const navigate = useNavigate();
  const loginFunc = async (e) => {
    e.preventDefault(); // prevents page reload
    setFormOn(false);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/user/login`, {
        email,
        password
      }, { withCredentials: true });
      console.log(response.data.data.user);
      dispatch(login({ userData: response.data.data.user }))
      setSuccess(true)
      setError(false)
      setTimeout(() => {
        navigate('/')
      }, 500)
      // maybe redirect or store token
    } catch (err) {
      console.error(err);
      setError(true);
      setSuccess(false)
      setFormOn(true)
    }
  };

  const GoogleAuthWrapper = () => {
    return (<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <GoogleLogin formOn={formOn} setFormOn={setFormOn} setSuccess={setSuccess}></GoogleLogin>
    </GoogleOAuthProvider>)
  }
  console.log(email, password);
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-neutral-900 p-8 rounded-xl shadow-md w-full max-w-md border border-neutral-700">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Login to KeyRace</h2>
        {error && (
          <div className="mb-4 px-4 py-2 bg-red-800 text-red-200 rounded-md text-sm text-center border border-red-600">
            Invalid credentials
          </div>
        )}
        {success && (
          <div className="mb-4 px-4 py-2 bg-emerald-800 text-emerald-200 rounded-md text-sm text-center border border-emerald-600">
            Login successful!
          </div>
        )}

        <form className="flex flex-col gap-4" onSubmit={loginFunc}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            disabled={!formOn}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            className="px-4 py-2 rounded disabled:opacity-40 bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            disabled={!formOn}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            className="px-4 py-2 rounded bg-neutral-800 disabled:opacity-40 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="submit"
            disabled={!formOn}
            className="bg-emerald-500 disabled:opacity-40 hover:bg-emerald-600 text-white font-semibold py-2 rounded transition"
          >
            Login
          </button>

        </form>
        {/* <GoogleLogin formOn={formOn} /> */}
        <GoogleAuthWrapper/>
        <p className="text-sm text-neutral-400 mt-4 text-center">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-emerald-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
