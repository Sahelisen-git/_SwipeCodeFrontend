
import React, { useEffect } from 'react'
import NavBar from './NavBar'
import Sidebar from './Sidebar'
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios';
import { BASE_URL } from '../utils/Constants'
import { addUser } from '../utils/userSlice'
import { useDispatch, useSelector } from 'react-redux';
const Body = () => {
     const dispatch = useDispatch(); //dispatch actions to redux store
     const navigate= useNavigate();
     const location = useLocation();
     const userData= useSelector((store)=>store.user); //gives u the info about user from redux store

     const fetchUser=async()=>{ //fetch me the profile details
      if(userData){
        return; //if user data is already present in redux store then no need to fetch again
      }
      try {
        const res=await axios.get(BASE_URL +"/profile/view",{
          withCredentials:true});
          dispatch(addUser(res.data)); //update the redux store
      }
       catch (error) { 
        if(error.status===401){
          // Only redirect to login if not already on login, signup or landing page
          if(location.pathname !== '/login' && location.pathname !== '/signup' && location.pathname !== '/'){
            navigate("/login");
          }
        }
        console.error(error);
      }

     };

     useEffect(() => {
      fetchUser();
     }, []); //first load  of the component  this hook will be called

  // Check if we should show the sidebar (not on landing, login, signup pages)
  const showSidebar = userData && location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/signup';

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex flex-1">
        {showSidebar && <Sidebar />}
        <main className={`flex-1 ${showSidebar ? '' : ''}`}>
          <Outlet />
        </main>
      </div>
      <Footer />

      {/* Mobile Bottom Navigation */}
      {showSidebar && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 z-50">
          <div className="flex justify-around items-center h-16">
            <Link to="/feed" className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${location.pathname === '/feed' ? 'text-blue-400' : 'text-gray-400'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span className="text-[10px] mt-1">Feed</span>
            </Link>
            <Link to="/connections" className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${location.pathname === '/connections' ? 'text-blue-400' : 'text-gray-400'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
              <span className="text-[10px] mt-1">Connections</span>
            </Link>
            <Link to="/requests" className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${location.pathname === '/requests' ? 'text-blue-400' : 'text-gray-400'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="text-[10px] mt-1">Requests</span>
            </Link>
            <Link to="/profile" className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${location.pathname === '/profile' ? 'text-blue-400' : 'text-gray-400'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-[10px] mt-1">Profile</span>
            </Link>
          </div>
        </nav>
      )}
    </div>
  )
}

export default Body