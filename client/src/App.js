import React, { useContext } from 'react';
import './App.css'; 
import ThemeProvider, {ThemeContext} from './ctx/ThemeContext';
import SidebarProvider, {SidebarContext} from './ctx/SidebarContext';
import { CodeBlock } from './components/code';
import { PythonContext } from './ctx/PythonContext';

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
        <h1>Picross</h1>
        <PythonContext>
        <CodeBlock language={`python`} code={`print("Hello")`}></CodeBlock>
        </PythonContext>
      </div>
    </div>
  )
}

export default App;