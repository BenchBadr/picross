import React, { useContext } from 'react';
import './App.css'; 
import ThemeProvider, {ThemeContext} from './ctx/ThemeContext';
import SidebarProvider, {SidebarContext} from './ctx/SidebarContext';

const App = () => {

  return (
    <ThemeProvider>
    <SidebarProvider>
     <MainContent />
    </SidebarProvider>
  </ThemeProvider>
  );
};

const MainContent = () => {
  const {theme, toggleTheme} = useContext(ThemeContext);
  const {isSidebarOpen} = useContext(SidebarContext);
  return (
    <div className={`app ${theme}`}>
      <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <h1>Hello</h1>
      </div>
    </div>
  )
}

export default App;