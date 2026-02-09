import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const location = useLocation();
  const user = useSelector((store) => store.user);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Don't show sidebar if user is not logged in or on landing/login/signup pages
  if (!user || location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup') {
    return null;
  }

  // Sidebar Navigation Items
  const navItems = [
    { 
      name: 'Feed', 
      path: '/feed', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    { 
      name: 'Connections', 
      path: '/connections', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      )
    },
    { 
      name: 'Requests', 
      path: '/requests', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      )
    },
  ];

  return (
    <aside className={`${isCollapsed ? 'w-16' : 'w-56'} bg-gray-900 border-r border-gray-800 flex flex-col min-h-[calc(100vh-65px)] sticky top-0 transition-all duration-300`}>
      {/* Collapse Button */}
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

      <nav className="py-4 px-3 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              location.pathname === item.path
                ? 'text-blue-400 bg-blue-500/10'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            } ${isCollapsed ? 'justify-center' : ''}`}
            title={isCollapsed ? item.name : ''}
          >
            {item.icon}
            {!isCollapsed && item.name}
          </Link>
        ))}
      </nav>

      {/* Spacer to push profile to bottom */}
      <div className="flex-1"></div>

      {/* User Profile at bottom */}
      {user && (
        <div className="p-4 border-t border-gray-800">
          <Link 
            to="/profile" 
            className={`flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 transition-colors ${
              location.pathname === '/profile' ? 'bg-blue-500/10' : ''
            } ${isCollapsed ? 'justify-center' : ''}`}
            title={isCollapsed ? `${user.firstName} ${user.lastName}` : ''}
          >
            <div className={`${isCollapsed ? 'w-8 h-8' : 'w-10 h-10'} rounded-full overflow-hidden flex-shrink-0`}>
              <img
                src={user.photoUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium truncate ${location.pathname === '/profile' ? 'text-blue-400' : 'text-white'}`}>
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-gray-400">View profile</p>
              </div>
            )}
          </Link>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
