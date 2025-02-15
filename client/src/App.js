import React, { useContext } from 'react';
import './App.css'; 
import ThemeProvider, {ThemeContext} from './ctx/ThemeContext';
import SidebarProvider, {SidebarContext} from './ctx/SidebarContext';
import { CodeBlock } from './components/code';
import { PythonWrapper } from './ctx/PythonContext';
import Accordion from './components/spoiler/accordion';
import { GameProvider, useGameContext } from './ctx/GameContext';
import Grid from './util/grid.js'

const App = () => {

  return (
    <ThemeProvider>
       <GameProvider>
    <SidebarProvider>
     <MainContent />
    </SidebarProvider>
    </GameProvider>
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
        <Accordion title={'Use Game solver'} id={1}>

        <h2>Game Solver</h2>

        <PythonWrapper>
        <CodeBlock language={`python`} code={`import time\nfor i in range(10):\n  print(i)\n`}
        ></CodeBlock>
        </PythonWrapper>
        </Accordion>

        <Grid/>
      </div>
    </div>
  )
}

export default App;