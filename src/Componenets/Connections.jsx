import axios from 'axios'
import React from 'react'
import { useEffect } from 'react';
import { BASE_URL } from '../utils/Constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';

const Connections = () => {

  const connections = useSelector((store) => store.connections);

  const dispatch = useDispatch();
    const fetchConnections =async () => {
      try{
        const res=await axios.get(BASE_URL + "/user/connections", {
          withCredentials: true,
        });
        
        dispatch(addConnections(res.data.data));
      }      
      catch(err){
        //Handle error
    }
  
};
    useEffect(() => {
      fetchConnections();
    }, []);
    if(!connections) return null;

    if(connections.length === 0) return (
      <div className="flex-1 min-h-screen bg-gray-950 flex flex-col items-center justify-center pb-24 md:pb-20 px-4">
        <h1 className="text-xl sm:text-2xl text-gray-400">No Connections Yet</h1>
        <p className="text-gray-500 mt-2">Start swiping to make connections!</p>
      </div>
    );

 return (
   <div className='flex-1 min-h-screen bg-gray-950 py-6 sm:py-10 px-3 sm:px-4 pb-24 md:pb-20'>
       <div className="max-w-2xl mx-auto">
         <h1 className='text-white text-2xl sm:text-3xl font-bold text-center'>Your Connections</h1>
         <p className='text-yellow-500 text-center text-sm mt-2 mb-6 sm:mb-8'>You have {connections.length} connection{connections.length !== 1 ? 's' : ''}</p>
         
         <div className="space-y-4">
           {connections.map((connection) => {
            const { _id, firstName, lastName, photoUrl, age, gender, About, skills } = connection;
            const skillsArray = skills ? (typeof skills === 'string' ? skills.split(',').map(s => s.trim()) : skills) : [];

            return (
              <div key={_id} className='flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-700 transition-colors'>
                <img 
                  alt="photo" 
                  className='w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover ring-2 ring-gray-700 flex-shrink-0' 
                  src={photoUrl} 
                />
                <div className='flex-1 min-w-0'>
                  <h2 className='font-semibold text-white text-base sm:text-lg'>{firstName} {lastName}</h2>
                  {age && gender && <p className='text-gray-400 text-xs sm:text-sm'>{age}, {gender}</p>}
                  {About && <p className='text-yellow-500 text-xs sm:text-sm mt-1 line-clamp-1'>{About}</p>}
                  {skillsArray.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2">
                      {skillsArray.slice(0, 3).map((skill, index) => (
                        <span key={index} className="px-2 py-0.5 bg-gray-800 border border-gray-700 rounded-full text-xs text-blue-400">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <button className="px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors flex-shrink-0">
                  Message
                </button>
              </div>
            );
          })}
         </div>
       </div>
   </div>
 );
  };
export default Connections;
