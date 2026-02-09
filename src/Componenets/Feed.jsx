import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/Constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import Usercard from './Usercard'

const Feed = () => {
  const feed = useSelector((store) => store.feed); //reading feed from the store
  const dispatch = useDispatch(); //dispatch function to send actions to the store
  const [totalUsers, setTotalUsers] = useState(0);

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + '/feed', { withCredentials: true });
      console.log('API Response:', res.data); // Debug log
      dispatch(addFeed(res.data));
      setTotalUsers(res.data.length);
    } catch (err) {
      console.error('Feed Error:', err);
      dispatch(addFeed([])); // Set empty array on error so it doesn't stay loading
    }
  };

  useEffect(() => {
    getFeed();
  }, []);//run when component mounts

  const currentIndex = totalUsers - (feed?.length || 0) + 1;

  return (
    <div className="flex-1 flex flex-col items-center justify-start py-4 px-2 min-h-screen bg-gray-950 pb-20">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-white">Discover Developers</h1>
        <p className="text-yellow-500 mt-2">Find your next collaborator or coding buddy</p>
      </div>

      {/* User Card */}
      {!feed ? (
        <div className="flex items-center justify-center h-64">
          <span className="loading loading-spinner loading-lg text-blue-500"></span>
        </div>
      ) : feed.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <p className="text-xl text-gray-400 mb-4">No more developers to discover!</p>
          <p className="text-gray-500">Check back later for new profiles</p>
        </div>
      ) : (
        <>
          <Usercard user={feed[0]} />
          {/* Counter */}
          <p className="text-blue-400 text-sm mt-6">
            {currentIndex} of {totalUsers} developers
          </p>
        </>
      )}
    </div>
  );
};

export default Feed;