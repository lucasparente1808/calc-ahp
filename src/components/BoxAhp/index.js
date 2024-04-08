import React, { useState } from 'react';
import './box-ahp.css';
import BoxName from '../BoxName/index';

const BoxAhp = () => {
    return (
        <div className='box-ahp'>
            <div className='container-ahp' >
                <BoxName/>
            </div>
        </div>
    );
};

export default BoxAhp;
