import axios from 'axios';
import { BASE_URL } from '../utils/Constants';
import React from 'react'
import { removeUserFromFeed } from '../utils/feedSlice';
import { useDispatch } from 'react-redux';

const Usercard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, About, skills, pronouns } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      console.log("Sending request with userId:", userId);

      const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, {
        withCredentials: true
      });
      dispatch(removeUserFromFeed(userId));

    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  // Parse skills if it's a string, or use as array
  const skillsArray = skills
    ? (typeof skills === 'string' ? skills.split(',').map(s => s.trim()) : skills)
    : [];

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl w-full max-w-[340px]">
      {/* Profile Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={photoUrl}
          alt={`${firstName}'s photo`}
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/30 to-transparent"></div>

        {/* User Info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <h2 className="text-2xl font-bold text-white">
              {firstName}{age ? `, ${age}` : ''}
            </h2>
            {pronouns && (
              <span className="px-2.5 py-1 bg-gray-800/80 backdrop-blur-sm rounded text-xs text-gray-200 font-medium">
                {pronouns}
              </span>
            )}
            {gender && !pronouns && (
              <span className="px-2.5 py-1 bg-gray-800/80 backdrop-blur-sm rounded text-xs text-gray-200 font-medium">
                {gender}
              </span>
            )}
          </div>

          {/* Skills Tags */}
          {skillsArray.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {skillsArray.slice(0, 4).map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-800/90 backdrop-blur-sm rounded text-sm font-medium text-white"
                >
                  {skill}
                </span>
              ))}
              {skillsArray.length > 4 && (
                <span className="px-3 py-1 bg-gray-800/90 backdrop-blur-sm rounded text-sm font-medium text-white">
                  +{skillsArray.length - 4}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* About Section */}
      <div className="p-5">
        {About && (
          <p className="text-sm text-gray-300 leading-relaxed line-clamp-3 mb-4">
            {About}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center items-center gap-6 mt-4">
          {/* Ignore Button */}
          <button
            onClick={() => handleSendRequest("ignored", _id)}
            className="w-14 h-14 rounded-full bg-gray-800/80 border border-gray-700 hover:bg-gray-700 text-gray-300 flex items-center justify-center transition-all duration-200 hover:scale-110"
            title="Pass"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Interested Button */}
          <button
            onClick={() => handleSendRequest("interested", _id)}
            className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center transition-all duration-200 shadow-lg shadow-blue-500/30 hover:scale-110"
            title="Connect"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Usercard;