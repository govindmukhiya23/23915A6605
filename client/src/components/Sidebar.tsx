import React from 'react';
import { Link } from 'wouter';

interface SidebarProps {
  currentPath: string;
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPath, isOpen, onToggle }) => {
  return (
    <aside 
      className={`w-full md:w-64 bg-gray-800 text-white flex-shrink-0 md:h-screen overflow-y-auto transition-all duration-300 ${isOpen ? 'block' : 'hidden md:block'}`}
    >
      <div className="p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">SocialInsights</h1>
        <button id="mobile-menu-button" className="md:hidden" onClick={onToggle}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <nav id="sidebar-menu" className="p-2">
        <div className="space-y-2">
          <div className="px-4 py-2 text-sm text-gray-400 uppercase">Dashboard</div>
          
          {/* Navigation Links */}
          <Link href="/" className={`flex items-center px-4 py-3 rounded-lg ${currentPath === '/' ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'} transition-colors`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <span>Top Users</span>
          </Link>
          
          <Link href="/trending" className={`flex items-center px-4 py-3 rounded-lg ${currentPath === '/trending' ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'} transition-colors`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span>Trending Posts</span>
          </Link>
          
          <Link href="/feed" className={`flex items-center px-4 py-3 rounded-lg ${currentPath === '/feed' ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'} transition-colors`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
            <span>Real-time Feed</span>
          </Link>
        </div>
        
        <div className="mt-8 space-y-2">
          <div className="px-4 py-2 text-sm text-gray-400 uppercase">Settings</div>
          
          <a href="#" className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Preferences</span>
          </a>
          
          <a href="#" className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Help</span>
          </a>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
