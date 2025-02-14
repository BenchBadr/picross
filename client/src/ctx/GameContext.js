import React, { createContext, useContext, useState } from 'react';

const GameContext = createContext();

export const useGameContext = () => {
    return useContext(GameContext);
};

export const GameProvider = ({ children }) => {
    const [solver, setSolver] = useState(false);
    const [data, setData] = useState(null);
    const [gridDim, setGridDim] = useState(5);
    const [bools, setBools] = useState([]);
    const [mistakes, setMistakes] = useState(0);
    const [pokemon, setPokemon] = useState(null);


    return (
        <GameContext.Provider value={{ solver, setSolver, gridDim, setGridDim, mistakes, setMistakes, data, setData, pokemon, setPokemon }}>
            {children}
        </GameContext.Provider>
    );
};