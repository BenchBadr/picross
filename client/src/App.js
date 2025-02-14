import React, { useContext } from 'react';
import './App.css'; 
import ThemeProvider, {ThemeContext} from './ctx/ThemeContext';
import SidebarProvider, {SidebarContext} from './ctx/SidebarContext';
import { CodeBlock } from './components/code';
import { PythonWrapper } from './ctx/PythonContext';

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
        <PythonWrapper>
        <CodeBlock language={`python`} code={`import time\nfor i in range(10):\n  print(i)\n  time.sleep(1)\nprint(code)`}></CodeBlock>
        </PythonWrapper>
      </div>
    </div>
  )
}

export default App;