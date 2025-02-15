import { useEffect } from "react";
import { useGameContext } from "../ctx/GameContext";
import { getRandomPicture } from "./pokemon";
import './grid.css';

const Grid = () => {
    const { data, setData, gridDim, setPokemon, pokemon, lineData, setLineData, bools, setBools } = useGameContext();

    const dumpLineData = (data, base = '#ffffff') => {
        const regions = [];
        for (const row of data) {
          let count = 0;
          const acc = [];
          for (const cell of row) {
            if (cell !== base) {
              count++;
            } else if (count > 0) {
              acc.push(count);
              count = 0;
            }
          }
          if (count > 0) {
            acc.push(count);
          }
          regions.push(acc);
        }
        return regions;
      };
      
      const dumpColumnData = (data, base = '#ffffff') => {
        if (data.length === 0) return [];
        const numCols = data[0].length;
        const regions = [];
        
        for (let col = 0; col < numCols; col++) {
          let count = 0;
          const acc = [];
          for (let row = 0; row < data.length; row++) {
            const cell = data[row][col];
            if (cell !== base) {
              count++;
            } else if (count > 0) {
              acc.push(count);
              count = 0;
            }
          }
          if (count > 0) {
            acc.push(count);
          }
          regions.push(acc);
        }
        
        return regions;
      };
    useEffect(() => {
        const fetchData = async () => {
            const response = await getRandomPicture(gridDim);
            setData(response[0]);
            setPokemon(response[1]);
            setLineData([dumpColumnData(response[0]), dumpLineData(response[0])]);
            setBools(Array.from({ length: gridDim }, () => Array.from({ length: gridDim }, () => 0)))

        }
        fetchData();
    }, [gridDim])

    const clickCell = (y, x) => {
        setBools(prevBools => {
            return prevBools.map((row, rowIndex) =>
                rowIndex === y
                    ? row.map((cell, cellIndex) => (cellIndex === x ? true : cell))
                    : row
            );
        });
    };
    


    return (
        <>
        {data && pokemon ? (
            <>
            <h2>Pokémon: {pokemon}</h2>
            <div>
            <div key={-1} className="fake-cell"></div>
            {Array.from({ length: gridDim }).map((_, index) => (
            <div key={index} className="fake-cell i">{lineData[0][index] && lineData[0][index].join(',')}</div>
            ))}
            {data.map((row, y) => (
            <div style={{display:'flex'}} key={y} className="row-container">
                <div className="fake-cell">{lineData[1][y] && lineData[1][y].join(',')}</div>
                {row.map((pixel, x) => (
                <div key={x} style={{background:!bools[y][x] ? 'orange' : pixel, color:'red'}} className="cell" title={pixel} onClick={() => clickCell(y,x)}>{bools[y][x] && pixel === '#ffffff' ? 'X' : ''}</div>
                ))}
            </div>
            ))}
            </div>
            </>
        ) : <div className="spinner"/>}
        </>
    )
}

export default Grid;