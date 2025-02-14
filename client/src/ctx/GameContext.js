import React, { createContext, useContext, useState } from 'react';

const GameContext = createContext();

export const useGameContext = () => {
    return useContext(GameContext);
};

export const GameProvider = ({ children }) => {
    const [solver, setSolver] = useState(false);
    const [data, setData] = useState(null);
    const [gridDim, setGridDim] = useState({ rows: 0, cols: 0 });
    const [bools, setBools] = useState([]);
    const [mistakes, setMistakes] = useState(0);


    return (
        <GameContext.Provider value={{ solver, setSolver, gridDim, setGridDim, mistakes, setMistakes }}>
            {children}
        </GameContext.Provider>
    );
};