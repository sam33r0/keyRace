import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [formOn, setFormOn] = useState(true);
  const navigate = useNavigate();
  const signupFunc = async (e) => {
    e.preventDefault(); // prevents page reload
    setFormOn(false);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/user/register`, {
        email,
        password,
        username,
        fullName: username,
        // avatar: 'email'
      }, { withCredentials: true });
      // console.log(response);
      setSuccess(true);
      setError(false)
      setTimeout(() => {
        navigate('/login')
      }, 1500)
      // maybe redirect or store token
    } catch (err) {
      setError(true);
      setSuccess(false)
      setFormOn(true)
      console.error(err);
    }
  };
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-neutral-900 p-8 rounded-xl shadow-md w-full max-w-md border border-neutral-700">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Create Your KeyRace Account</h2>
        {error && (
          <div className="mb-4 px-4 py-2 bg-red-800 text-red-200 rounded-md text-sm text-center border border-red-600">
            Invalid Details
          </div>
        )}
        {success && (
          <div className="mb-4 px-4 py-2 bg-emerald-800 text-emerald-200 rounded-md text-sm text-center border border-emerald-600">
            Register successful!
          </div>
        )}
        <form className="flex flex-col gap-4" onSubmit={signupFunc}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            disabled={!formOn}
            onChange={(e) => { setUsername(e.target.value) }}
            className="px-4 py-2 rounded bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            disabled={!formOn}
            onChange={(e) => { setEmail(e.target.value) }}
            className="px-4 py-2 rounded bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <input
            type="password"
            placeholder="Password"
            disabled={!formOn}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            value={password}
            className="px-4 py-2 rounded bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="submit"
            disabled={!formOn}
            className="bg-emerald-500 disabled:opacity-40 hover:bg-emerald-600 text-white font-semibold py-2 rounded transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-neutral-400 mt-4 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-emerald-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
