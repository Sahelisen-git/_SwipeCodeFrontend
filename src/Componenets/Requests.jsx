import React from 'react'
import { useEffect } from 'react';
import axios from 'axios'
import { BASE_URL } from '../utils/Constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequests } from '../utils/requestSlice';


const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector((store) => store.requests);

    const reviewRequest = async (status,_id) => {
        try{
            const res=await axios.post(BASE_URL + "/request/review/" +status+"/"+_id, {}, {
              withCredentials: true,
            });
            dispatch(removeRequests(_id));
            //Optionally, you can refresh the requests list here
            } catch(err){
              //Handle error
            }
          };
    

     const fetchRequests =async () => {
       try{
         const res=await axios.get(BASE_URL + "/user/requests/received", {
           withCredentials: true,
         });
        
        dispatch(addRequests(res.data.data));
      }      
      catch(err){
        //Handle error
    }
  
};
    useEffect(() => {
      fetchRequests();
    }, []);

    if(!requests || requests.length === 0) return (
      <div className="flex-1 min-h-screen bg-gray-950 flex flex-col items-center justify-center pb-24 md:pb-20 px-4">
        <h1 className="text-xl sm:text-2xl text-gray-400">No Pending Requests</h1>
        <p className="text-gray-500 mt-2">Check back later for new connection requests!</p>
      </div>
    );

 return (
   <div className='flex-1 min-h-screen bg-gray-950 py-6 sm:py-10 px-3 sm:px-4 pb-24 md:pb-20'>
       <div className="max-w-2xl mx-auto">
         <h1 className='text-white text-2xl sm:text-3xl font-bold text-center'>Connection Requests</h1>
         <p className='text-yellow-500 text-center text-sm mt-2 mb-6 sm:mb-8'>You have {requests.length} pending request{requests.length !== 1 ? 's' : ''}</p>
         
         <div className="space-y-4">
           {requests.map((request) => {
            const {_id, firstName, lastName, photoUrl, age, gender, About, skills} = request.fromUserId;
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
                  {About && <p className='text-yellow-500 text-xs sm:text-sm mt-1 line-clamp-1 sm:line-clamp-2'>{About}</p>}
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
                <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                  <button 
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-800 border border-gray-700 hover:bg-red-500/20 hover:border-red-500 hover:text-red-500 text-gray-400 flex items-center justify-center transition-all" 
                    onClick={() => reviewRequest("rejected", request._id)}
                    title="Reject"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <button 
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center transition-all" 
                    onClick={() => reviewRequest("accepted", request._id)}
                    title="Accept"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
         </div>
       </div>
   </div>
 );
  };
export default Requests