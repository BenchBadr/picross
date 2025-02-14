import React, { createContext, useState, useContext } from 'react';
import {ThemeContext} from './ThemeContext';

export const SidebarContext = createContext();

const SidebarProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevIsSidebarOpen) => !prevIsSidebarOpen);
  };

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      <Sidebar/>
      {children}
    </SidebarContext.Provider>
  );
};


const Sidebar = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { isSidebarOpen, toggleSidebar } = useContext(SidebarContext);
  
    return (
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className='sidebar-content'>
            <div style={{background:'red',color:'white',padding:'10px'}}
            onClick={toggleTheme}>test</div>
            <div className='bottom-box'>
                Hello
            </div>
        </div>
      </aside>
    );
};  

export default SidebarProvider;