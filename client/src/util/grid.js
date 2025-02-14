import { useEffect } from "react";
import { useGameContext } from "../ctx/GameContext";
import { getRandomPicture } from "./pokemon";

const Grid = () => {
    const { data, setData, gridDim, setPokemon, pokemon } = useGameContext();

    useEffect(() => {
        const fetchData = async () => {
            const response = await getRandomPicture(gridDim);
            console.log(response)
            setData(response[1]);
            setPokemon(response[0]);
        }
        fetchData();
    }, [gridDim])
    return (
        <>
        {data && pokemon ? <h1>{pokemon}</h1> : <div className="spinner"/>}
        </>
    )
}

export default Grid;