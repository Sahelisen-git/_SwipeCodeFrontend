import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/Constants';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '', agree: false });
  const [showPassword, setShowPassword] = useState(false); // show/hide password
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!form.agree) {
      setError('Please agree to the terms and conditions');
      return;
    }

    try {
      await axios.post(
        BASE_URL + '/signup',
        {
          firstName: form.name.split(' ')[0],
          lastName: form.name.split(' ').slice(1).join(' ') || '',
          EmailId: form.email,
          password: form.password,
        },
        { withCredentials: true }
      );
      
      // Redirect to login page after successful signup
      navigate('/login');
    } catch (err) {
      setError(err?.response?.data || err.message || 'Signup failed');
      console.error(err?.response?.data || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-start justify-center pt-16 pb-8 px-4">
      <form className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-sm shadow-2xl p-6" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-5 text-center text-white">Sign Up</h2>
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 py-2.5 mb-4 border border-gray-700 bg-gray-800 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
          onClick={() => {
            window.location.href = `${BASE_URL}/auth/google/signup`;
          }}
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5 text-white" /> Sign up with Google
        </button>
        <div className="flex items-center my-3">
          <hr className="flex-grow border-gray-700" />
          <span className="mx-3 text-sm text-gray-500">or</span>
          <hr className="flex-grow border-gray-700" />
        </div>
        <div className="space-y-3">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-1.5">Your Name</label>
            <input 
              name="name" 
              type="text" 
              value={form.name} 
              onChange={handleChange} 
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors" 
              placeholder="Enter your full name" 
              required 
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-1.5">Your E-mail</label>
            <input 
              name="email" 
              type="email" 
              value={form.email} 
              onChange={handleChange} 
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors" 
              placeholder="Enter your email" 
              required 
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-1.5">Password</label>
            <div className="relative flex items-center">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 pr-10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="At least 8 characters"
                minLength={8}
                required
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
        <div className="mt-3 flex items-start">
          <input name="agree" type="checkbox" checked={form.agree} onChange={handleChange} className="mt-1 mr-2 w-4 h-4" required />
          <span className="text-sm text-gray-400">I agree to all the <Link to="#" className="text-blue-400 hover:text-blue-300 underline">Terms</Link>, <Link to="#" className="text-blue-400 hover:text-blue-300 underline">Privacy Policy</Link> and <Link to="#" className="text-blue-400 hover:text-blue-300 underline">Fees</Link>.</span>
        </div>
        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
        <button type="submit" className="w-full mt-5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors">Continue</button>
        <div className="mt-5 text-center text-sm text-gray-400">
          Have an account? <Link to="/login" className="text-blue-400 hover:text-blue-300 underline">Log in</Link>
        </div>
      </form>
    </div>
  );
}
