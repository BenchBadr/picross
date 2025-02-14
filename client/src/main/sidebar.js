import React, { useState, useEffect } from 'react';
import './sidebar.css';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    localStorage.setItem('theme', currentTheme);
    document.body.classList.toggle('dark-theme', currentTheme === 'dark');
  }, [currentTheme]);

  const handleThemeToggle = () => {
    setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-content">
          <button className="theme-toggle" onClick={handleThemeToggle}>
            {currentTheme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </button>
          <ul className="nav-list">
            <li className="nav-item">Home</li>
            <li className="nav-item">About</li>
            <li className="nav-item">Services</li>
            <li className="nav-item">Contact</li>
          </ul>
        </div>
      </aside>
      <div className={`overlay ${isSidebarOpen ? 'open' : ''}`} onClick={handleSidebarToggle} />
    </>
  );
};

export default Sidebar;