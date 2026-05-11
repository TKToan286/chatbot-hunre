import React, { useState, useEffect } from 'react';
import { Menu, Moon, Sun, ChevronDown, MoreVertical } from 'lucide-react';
import { useAppStore } from '../../../store/useAppStore';

export const ChatHeader: React.FC = () => {
  const { toggleSidebar, startNewChat, isSidebarOpen } = useAppStore();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleDarkMode = () => {
    const root = document.documentElement;
    root.classList.toggle('dark');
    const darkModeActive = root.classList.contains('dark');
    setIsDark(darkModeActive);
    localStorage.setItem('theme', darkModeActive ? 'dark' : 'light');
  };

  return (
    <header className="w-full h-16 flex items-center justify-between px-4 bg-white dark:bg-[#121212] sticky top-0 z-[50] transition-all duration-200 border-b border-gray-100 dark:border-gray-800">
      
      {/* Cụm bên trái: Nút Menu + Tên Bot */}
      <div className="flex items-center">
        
        {!isSidebarOpen && (
          <button 
            onClick={toggleSidebar} 
            className="p-2 md:p-2.5 hover:bg-hunre-light/30 dark:hover:bg-hunre-dark/20 rounded-full text-gray-600 dark:text-gray-300 transition-all active:scale-90 animate-fadeIn shrink-0"
            title="Mở trình đơn"
          >
            <Menu size={24} />
          </button>
        )}

        <div 
          onClick={startNewChat}
          className={`
            flex items-center gap-1 px-2 md:px-3 py-1.5 rounded-xl hover:bg-hunre-light/30 dark:hover:bg-hunre-dark/20 cursor-pointer transition-all group
            ${isSidebarOpen ? 'ml-0 md:ml-2' : 'ml-1 md:ml-2'}
          `}
        >
          {/* Đổi màu chữ sang xanh HUNRE */}
          <span className="text-lg md:text-xl font-bold tracking-tight text-hunre-green dark:text-hunre-green whitespace-nowrap">
            HUNRE Advisor
          </span>
          <ChevronDown size={16} className="text-gray-400 mt-0.5 group-hover:text-hunre-green transition-colors shrink-0" />
        </div>
      </div>
      
      {/* Cụm bên phải: DarkMode, Profile */}
      <div className="flex items-center gap-1 md:gap-2">
        
        <button 
          onClick={toggleDarkMode} 
          className="p-2 hover:bg-hunre-light/30 dark:hover:bg-hunre-dark/20 rounded-full text-gray-500 dark:text-gray-400 transition-colors"
          title="Đổi giao diện"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button className="sm:hidden p-2 text-gray-500">
          <MoreVertical size={20} />
        </button>

        {/* Avatar Profile: Đổi hover ring sang xanh HUNRE */}
        <button className="p-0.5 hover:ring-2 hover:ring-hunre-green dark:hover:ring-hunre-green rounded-full transition-all ml-1 shrink-0 overflow-hidden">
          <img 
            src="/assets/logo_hunre.png" 
            alt="HUNRE Logo" 
            className="w-8 h-8 rounded-full object-cover shadow-sm bg-white"
          />
        </button>
      </div>
    </header>
  );
};