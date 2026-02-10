
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/Constants';
import { addUser } from '../utils/userSlice';
import Usercard from './Usercard';

const EditProfile = ({user}) => {
    const [firstName, setFirstName] = useState(user.firstName || ''); //first name field to set a state and useState hook
        const [lastName, setLastName] = useState(user.lastName || ''); //last name field to set a state and useState hook
        const [photoUrl, setPhotoUrl] = useState(user.photoUrl || '');
        const [age, setAge] = useState(user.age || '');
        const [gender, setGender] = useState(user.gender || '');
            const [About, setAbout] = useState(user.About || '');
            const [error, setError] = useState(""); //to show error message
            const dispatch = useDispatch();
            const [showToast, setShowToast] = useState(false);
            const [uploading, setUploading] = useState(false);

            const handleImageChange = async (e) => {
              const file = e.target.files[0];
              if (file) {
                // Check file size (limit to 5MB)
                if (file.size > 5 * 1024 * 1024) {
                  setError("Image size should be less than 5MB");
                  return;
                }

                setUploading(true);
                setError("");

                try {
                  // Upload directly to Cloudinary
                  const formData = new FormData();
                  formData.append('file', file);
                  formData.append('upload_preset', 'SwipeCode_unsigned');
                  
                  const response = await fetch(
                    'https://api.cloudinary.com/v1_1/dv6odbiv9/image/upload',
                    {
                      method: 'POST',
                      body: formData
                    }
                  );
                  
                  const data = await response.json();
                  
                  if (data.secure_url) {
                    setPhotoUrl(data.secure_url); // This is a valid HTTPS URL
                  } else {
                    throw new Error('Upload failed');
                  }
                } catch (err) {
                  setError("Failed to upload image. Please try again.");
                  console.error(err);
                } finally {
                  setUploading(false);
                }
              }
            };

            const saveProfile = async() => { 
                //clear the error message before making the API call
                setError("");
                try{
                     const response = await axios.patch(BASE_URL + "/profile/edit", {
                      firstName,
                      lastName,
                      photoUrl,
                      age,
                      gender,
                      About
                    },{
                        withCredentials: true // Include credentials such as cookies
                    }

            );
            dispatch(addUser(response?.data?.data)); // Dispatch action to add user to Redux store
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds
        }
                catch(err){
                    setError(err?.response?.data || err.message);
                    console.error(err?.response?.data || "Something went wrong");
                }

            
            };
  return (
    <>
    <div className='flex justify-center items-center min-h-screen bg-gray-950 py-6 sm:py-10 px-3 sm:px-4 pb-24 md:pb-20'>
      <div className='w-full max-w-md'>
        <div className="bg-gray-950 border border-gray-800 rounded-2xl p-5 sm:p-8 shadow-2xl">
          <h2 className="text-white text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">Edit Profile</h2>
          
          {/* Profile Picture Upload */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img 
                src={photoUrl || 'https://via.placeholder.com/120'} 
                alt="Profile" 
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-700"
              />
              <label 
                htmlFor="profile-upload" 
                className={`absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {uploading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </label>
              <input 
                id="profile-upload"
                type="file" 
                accept="image/*"
                onChange={handleImageChange}
                disabled={uploading}
                className="hidden"
              />
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            {/* First Name & Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-white text-sm font-medium block mb-2">First Name</label>
                <input 
                  type="text"
                  value={firstName} 
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors" 
                  placeholder="Jamie"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-white text-sm font-medium block mb-2">Last Name</label>
                <input 
                  type="text"
                  value={lastName} 
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors" 
                  placeholder="Developer"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            {/* Age & Gender */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-white text-sm font-medium block mb-2">Age</label>
                <input 
                  type="number"
                  value={age} 
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors" 
                  placeholder="25"
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div>
                <label className="text-white text-sm font-medium block mb-2">Gender</label>
                <select 
                  value={gender} 
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer" 
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* About */}
            <div>
              <label className="text-white text-sm font-medium block mb-2">About</label>
              <textarea 
                value={About} 
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none" 
                placeholder="Tell us about yourself"
                rows="4"
                maxLength="400"
                onChange={(e) => setAbout(e.target.value)}
              />
              <p className="text-gray-500 text-xs mt-1 text-right">{About.length}/400 characters</p>
            </div>
          </div>

          {error && <p className='text-red-500 text-sm text-center mt-4'>{error}</p>}
          
          {/* Save Button */}
          <button 
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-lg mt-6 transition-colors" 
            onClick={saveProfile}
          >
            Save Profile
          </button>
        </div>
      </div>
    </div>
    
    {showToast && (
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
          <span>Profile saved successfully.</span>
        </div>
      </div>
    )}
    </>
  );
};


export default EditProfile;
