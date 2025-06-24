import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { logout } from '../store/authSlice';
import Avatar from './Avatar';

function Navbar() {
  const auth = useSelector((state) => state.auth)
  // console.log(auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutFunc = async () => {
    try {
      dispatch(logout());
      const resp = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/user/logout`, {}, { withCredentials: true });
      // console.log(resp);
    } catch (error) {

    }
    navigate('/login')
  }
  return (
    <header className="w-full h-14 bg-neutral-900 border-b border-neutral-700 px-6 flex items-center justify-between shadow-sm">
      <Link to="/" className="text-emerald-400 text-xl font-bold tracking-wide">
        KeyRace
      </Link>

      <div className="flex items-center gap-6 text-sm text-neutral-300">
        {!auth.status && <>
          <Link to="/login" className="hover:text-white transition-colors">Login</Link>
          <Link to="/signup" className="hover:text-white transition-colors">Sign Up</Link>
        </>}
        {auth.status &&
          <>
          <Link to='/' className="hover:text-white transition-colors">multiplayer</Link>
            <Avatar auth={auth} logoutFunc={logoutFunc} />
          </>
        }
      </div>
    </header>
  );
}

export default Navbar;
