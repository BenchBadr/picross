import { useEffect } from "react";
import { useGameContext } from "../ctx/GameContext";
import { getRandomPicture } from "./pokemon";
import './grid.css';

const Grid = () => {
    const { data, setData, gridDim, setPokemon, pokemon } = useGameContext();

    useEffect(() => {
        const fetchData = async () => {
            const response = await getRandomPicture(gridDim);
            console.log(response)
            setData(response[0]);
            setPokemon(response[1]);
        }
        fetchData();
    }, [gridDim])
    return (
        <>
        {data && pokemon ? (
            <>
            <h2>Pokémon: {pokemon}</h2>
            <div>
            {data.map((row, y) => (
            <div style={{display:'flex'}} key={y} className="row-container">
                {row.map((pixel, x) => (
                <div key={x} style={{background:pixel}} className="cell"></div>
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