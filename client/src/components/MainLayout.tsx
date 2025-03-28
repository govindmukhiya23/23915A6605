import React, { useState } from 'react';
import { useLocation } from 'wouter';
import Sidebar from './Sidebar';
import Header from './Header';

interface MainLayoutProps {
  children: React.ReactNode;
  title: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, title }) => {
  const [location] = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <Sidebar 
        currentPath={location} 
        isOpen={isSidebarOpen} 
        onToggle={toggleSidebar}
      />
      
      {/* Main Content */}
      <div className="flex-grow">
        <Header title={title} onToggleSidebar={toggleSidebar} />
        
        {/* Page Container */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
