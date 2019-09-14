import React, { useContext } from 'react';
import { Card } from 'antd';

import { SmurfContext } from '../contexts/SmurfContext';

const Smurf = () => {
    const smurf = useContext(SmurfContext);

    return (
        <div>
            {smurf.map(item => {
                return (
                <>
                <div style={{ background: '#ECECEC', padding: '30px' }}>
                    <Card title={item.name} bordered={false} style={{ width: 300 }}>
                    <p>{item.age}</p>
                    <p>{item.height}</p>
                    </Card>
                </div>
                    {/* <h1>{item.name}</h1>
                    <h3>{item.age}</h3>
                    <h4>{item.height}</h4> */}
                </>
                )
            })}
        </div>
    )
}

export default Smurf;