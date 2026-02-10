import React from 'react'
import EditProfile from './EditProfile';
import { useSelector } from 'react-redux';

const Profile = () => {
  const user= useSelector((store) => store.user); //get the user data from the redux store since its should be prefill
  return user && (
    <div className="flex-1 min-h-screen bg-gray-950 pb-24 md:pb-20">
      <EditProfile user={user} />
    </div>
  )
}

export default Profile