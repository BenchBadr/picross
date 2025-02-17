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
    console.log(temp)
    const lastLine = temp[temp.length - 1]
    if (lastLine.startsWith('click ')) {
      const coords = [parseInt(lastLine.split(' ')[1]), parseInt(lastLine.split(' ')[2])]
      const temp = [...bools];
      temp[coords[0]] = [...temp[coords[0]]];
      temp[coords[0]][coords[1]] = 1;
      setBools(temp);

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
