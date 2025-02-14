import React, {useContext} from 'react';
import { useGameContext } from '../../ctx/GameContext';

const Stats = () => {
    const {mistakes} = useGameContext();

    return (
        <div style={{paddingTop:'150px'}}>
            <hr></hr>
            <a>Progress</a>
            <div className='stats'>0%</div>
            <hr></hr>
            Mistakes
            <div className='stats'>{mistakes}</div>
            <hr></hr>
        </div>
    )
}

export default Stats;