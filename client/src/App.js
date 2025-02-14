import React, { useState } from 'react';
import Sidebar from './main/sidebar';
import './App.css'; 

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for the sidebar

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="app-container">
      <button className="sidebar-toggle-button" onClick={toggleSidebar}>
        {isSidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
      </button>

      <Sidebar /> 

      <h1>Hello</h1>

    </div>
  );
};

export default App;