import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/Constants';

const Login = () => {

    const [emailId, setEmailId] = React.useState('Karsanhita@gmail.com'); //emailid feild to set a state and usesate hook
    const [password, setPassword] = React.useState('Karsan!k234'); //password feild to set a state and usesate hook
      const [error, setError] = React.useState(""); //to show error message
      const [showPassword, setShowPassword] = React.useState(false); // show/hide password
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Hook to programmatically navigate

    const handleLogin = async () => {

      try{
        const response = await axios.post(BASE_URL + "/login", {
          EmailId: emailId,
          password,
        },
        { withCredentials: true } // Include credentials such as cookies
      );
        dispatch(addUser(response.data)); // Dispatch action to add user to Redux store
        navigate('/feed'); // Navigate to feed on successful login
      } catch (err) {
        setError(err?.response?.data || err.message);
        console.error(err?.response?.data || "Something went wrong");
      }
    }; //function to handle login api call, to make a api call we will bw using a npm package called axios
  return (
    <div className="min-h-screen bg-gray-950 flex items-start justify-center pt-12 pb-8 px-4">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-sm shadow-2xl">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-5 text-center text-white">Login</h2>
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 py-2.5 mb-4 border border-gray-700 bg-gray-800 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
            onClick={() => {
              window.location.href = `${BASE_URL}/auth/google/login`;
            }}
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5 text-white" /> Login with Google
          </button>
          <div className="flex items-center my-3">
            <hr className="flex-grow border-gray-700" />
            <span className="mx-3 text-sm text-gray-500">or</span>
            <hr className="flex-grow border-gray-700" />
          </div>
          <div className="space-y-3">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1.5">Email ID</label>
              <input type="text"
                value={emailId} 
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors" 
                placeholder="Enter your email"
                onChange={(e) => setEmailId(e.target.value)} />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1.5">Password</label>
                <div className="relative flex items-center">
                  <input
                    value={password}
                    type={showPassword ? "text" : "password"}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 pr-10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    className="absolute right-3 cursor-pointer select-none text-gray-400 hover:text-white"
                    onClick={() => setShowPassword((prev) => !prev)}
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 2.25 12c2.036 3.807 6.07 6.75 9.75 6.75 1.563 0 3.06-.362 4.396-1.01M6.53 6.53A10.45 10.45 0 0 1 12 5.25c3.68 0 7.714 2.943 9.75 6.75a10.49 10.49 0 0 1-4.018 4.522M6.53 6.53l10.94 10.94M6.53 6.53l-2.55 2.55m13.49 8.39l2.55-2.55" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12S5.25 5.25 12 5.25 21.75 12 21.75 12 18.75 18.75 12 18.75 2.25 12 2.25 12z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                      </svg>
                    )}
                  </span>
                </div>
            </div>
          </div>
          {error && <p className='text-red-500 text-sm mt-3'>{error}</p>}
          <div className="mt-5">
            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium py-2.5 rounded-lg transition-colors" onClick={handleLogin}>Login</button>
          </div>
          <div className="mt-5 text-center text-sm text-gray-400">
            Don't have an account? <Link to="/signup" className="text-blue-400 hover:text-blue-300 underline">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;