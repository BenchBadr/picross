import React, { useState, useEffect, createContext } from 'react';
import { usePython, usePythonConsole } from 'react-py';
import { useGameContext } from './GameContext';

export const PythonContext = createContext(null);

export const PythonWrapper = ({children}) => {
  const [output, setOutput] = useState([]);
  const [outputErr, setOutputErr] = useState([]);
  const [num, setNum] = useState(0);
  const { runPython, stdout, stderr, isLoading, isRunning, isReady }  = usePython();
  const { bools, setBools } = useGameContext();


  const runPythonFunc = (code, i) => {
    setNum(i)
    runPython(code)
  }

  const updateOut = () => {
    let temp = output;
    temp[num] = stdout || '';
    setOutput(temp)
    const lines = stdout.split('\n')
    console.log(lines, 'lines')
    for (const line of lines) {
      console.log(line, 'line')
      if (line.startsWith('click ')) {
        const coords = [parseInt(line.split(' ')[1]), parseInt(line.split(' ')[2])]
        const tempBools = [...bools];
        tempBools[coords[0]] = [...tempBools[coords[0]]];
        tempBools[coords[0]][coords[1]] = 1;
        setBools(tempBools);
      }
    }
  }

  const updateErr = () => {
    let temp2 = outputErr;
    temp2[num] = stderr || '';
    setOutputErr(temp2)
  }


  useEffect(() => {
    updateOut()
    updateErr()
  }, [stdout, stderr])



  return (
    <PythonContext.Provider
    value={{runPythonFunc, isLoading, isRunning, isReady, num, setNum, output, outputErr, stdout, stderr}}
    >
      {children}
    </PythonContext.Provider>
  )
}
