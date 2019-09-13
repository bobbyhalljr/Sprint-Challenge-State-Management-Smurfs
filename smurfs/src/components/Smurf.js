import React, { useContext } from 'react';
import { SmurfContext } from '../contexts/SmurfContext';

const Smurf = () => {
    const smurf = useContext(SmurfContext);

    return (
        <div>
            <h2>{smurf.name}</h2>
            <h4>{smurf.age}</h4>
            <h5>{smurf.height}</h5>
        </div>
    )
}

export default Smurf;