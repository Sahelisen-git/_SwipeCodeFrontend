import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const LandingPage = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleStartSwiping = () => {
    if (user) {
      navigate('/feed');
    } else {
      navigate('/login');
    }
  };

  const handleSetUpProfile = () => {
    if (user) {
      navigate('/profile');
    } else {
      navigate('/signup');
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">&lt;/&gt;</span>
          </div>
          <span className="text-white text-xl font-semibold">Swipe<span className="text-blue-500">Code</span></span>
        </div>
        
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-gray-300">Welcome, {user.firstName}</span>
              <Link to="/feed" className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors">
                Go to Feed
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-gray-300 hover:text-white transition-colors">
                Login
              </Link>
              <Link to="/signup" className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Sidebar - Desktop only */}
      <div className="flex">
        <aside className={`hidden lg:flex flex-col ${isCollapsed ? 'w-16' : 'w-56'} min-h-screen bg-gray-900 border-r border-gray-800 p-4 transition-all duration-300`}>
          {/* Collapse Button and Home Button */}
          <div className={`p-3 border-b border-gray-800 ${isCollapsed ? 'flex flex-col items-center gap-2' : ''}`}>
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="flex items-center gap-2 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              title={isCollapsed ? 'Expand' : 'Collapse'}
            >
              <svg 
                className={`w-5 h-5 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
              {!isCollapsed && <span className="text-sm font-medium">Collapse</span>}
            </button>
            
            {/* Home Button */}
            <Link
              to="/"
              className={`flex items-center gap-2 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors ${isCollapsed ? 'justify-center' : 'w-full'}`}
              title={isCollapsed ? 'Home' : ''}
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              {!isCollapsed && <span className="text-sm font-medium">Home</span>}
            </Link>
          </div>

          <nav className="space-y-2 mt-4">
            <Link to="/feed" className={`flex items-center gap-3 px-3 py-2.5 text-blue-400 bg-blue-500/10 rounded-lg ${isCollapsed ? 'justify-center' : ''}`} title={isCollapsed ? 'Feed' : ''}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              {!isCollapsed && <span>Feed</span>}
            </Link>
            <Link to="/connections" className={`flex items-center gap-3 px-3 py-2.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors ${isCollapsed ? 'justify-center' : ''}`} title={isCollapsed ? 'Connections' : ''}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
              {!isCollapsed && <span>Connections</span>}
            </Link>
            <Link to="/requests" className={`flex items-center gap-3 px-3 py-2.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors ${isCollapsed ? 'justify-center' : ''}`} title={isCollapsed ? 'Requests' : ''}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {!isCollapsed && <span>Requests</span>}
            </Link>
          </nav>

          {/* User Profile at Bottom */}
          {user && (
            <div className="mt-auto pt-4 border-t border-gray-800">
              <Link to="/profile" className={`flex items-center gap-3 p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors ${isCollapsed ? 'justify-center' : ''}`} title={isCollapsed ? `${user.firstName} ${user.lastName}` : ''}>
                <div className={`${isCollapsed ? 'w-8 h-8' : 'w-10 h-10'} rounded-full overflow-hidden flex-shrink-0`}>
                  <img 
                    src={user.photoUrl || 'https://via.placeholder.com/40'} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                {!isCollapsed && (
                  <div>
                    <p className="text-white font-medium text-sm">{user.firstName} {user.lastName}</p>
                    <p className="text-gray-400 text-xs">View profile</p>
                  </div>
                )}
              </Link>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Hero Section */}
          <section className="flex flex-col items-center justify-center text-center px-6 py-12 lg:py-20">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">&lt;/&gt;</span>
              </div>
              <span className="text-white text-2xl font-semibold">Swipe<span className="text-blue-500">Code</span></span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Where Developers
            </h1>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-yellow-400 mb-6">
              Connect & Build
            </h2>
            
            <p className="text-gray-400 max-w-2xl mb-8 text-lg">
              SwipeCode is the modern way for developers to find collaborators, co-founders, and
              coding buddies. Discover talented devs who match your stack and start building
              together.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleStartSwiping}
                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                Start Swiping
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <button 
                onClick={handleSetUpProfile}
                className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium transition-colors border border-gray-700"
              >
                Set Up Profile
              </button>
            </div>
          </section>

          {/* Features Section */}
          <section className="px-6 py-16 bg-gray-900/50">
            <h3 className="text-white text-xl font-semibold text-center mb-12">
              Built for developers, by developers
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {/* Feature 1 */}
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors">
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h4 className="text-white font-semibold mb-2">Connect with Developers</h4>
                <p className="text-gray-400 text-sm">
                  Find like-minded developers who share your tech stack and interests.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors">
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h4 className="text-white font-semibold mb-2">Showcase Your Skills</h4>
                <p className="text-gray-400 text-sm">
                  Highlight your expertise, projects, and the technologies you love.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors">
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h4 className="text-white font-semibold mb-2">Discover Collaborators</h4>
                <p className="text-gray-400 text-sm">
                  Swipe through profiles to find your next co-founder or coding buddy.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors">
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="text-white font-semibold mb-2">Instant Connections</h4>
                <p className="text-gray-400 text-sm">
                  When interest is mutual, start building together right away.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="px-6 py-20 text-center">
            <h3 className="text-white text-2xl md:text-3xl font-bold mb-4">
              Ready to find your next collaborator?
            </h3>
            <p className="text-gray-400 mb-8">
              Join the community of developers building the future together.
            </p>
            <button 
              onClick={handleStartSwiping}
              className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
            >
              Explore Developers
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </section>

          {/* Footer */}
          <footer className="border-t border-gray-800 px-6 py-8">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">&lt;/&gt;</span>
                </div>
                <span className="text-white font-semibold">Swipe<span className="text-blue-500">Code</span></span>
              </div>
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} SwipeCode. All rights reserved.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default LandingPage;
