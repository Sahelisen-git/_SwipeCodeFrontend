

import React from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/Constants';
import { Link , useNavigate} from 'react-router-dom';
import { removeUser } from '../utils/userSlice';


const NavBar = () => {

  const user =useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());//remove user from redux store
      navigate("/login"); //navigate to login page
    } catch (error) {
      console.error("Logout failed:", error);
    }

  };
  return (
    <div className="navbar bg-gray-900 border-b border-gray-800 shadow-sm px-4">
      <div className="flex-1">
        <Link to={user ? "/feed" : "/"} className="flex items-center gap-2 text-xl font-semibold">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">&lt;/&gt;</span>
          </div>
          <span className="text-white">Swipe<span className="text-blue-500">Code</span></span>
        </Link>
      </div>
      <div className="flex gap-2">
        {user && (
          <div className="dropdown dropdown-end mx-1 sm:mx-2 flex items-center">
            <p className="hidden sm:block px-4 py-2 text-gray-300">Welcome, {user.firstName}</p>
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full ring-2 ring-gray-700">
                <img
                  alt="user photo"
                  src={user.photoUrl && user.photoUrl.startsWith('http') ? user.photoUrl : BASE_URL + user.photoUrl}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-gray-800 border border-gray-700 rounded-xl z-[100] w-52 p-2 shadow-xl absolute top-full right-0 mt-2">
              <li>
                <Link to="/profile" className="text-gray-300 hover:bg-gray-700 hover:text-white justify-between">
                  Profile
                  <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded">New</span>
                </Link>
              </li>
              <li><Link to="/connections" className="text-gray-300 hover:bg-gray-700 hover:text-white">Connections</Link></li>
              <li><Link to="/requests" className="text-gray-300 hover:bg-gray-700 hover:text-white">Requests</Link></li>
              <li>
                <a onClick={handleLogout} className="text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer">Logout</a></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default NavBar
