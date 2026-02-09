
import React, { useEffect } from 'react'
import NavBar from './NavBar'
import Sidebar from './Sidebar'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
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
    </div>
  )
}

export default Body