import React from 'react';
import './box-ahp.css';
import BoxName from '../BoxName/index';

const BoxAhp = () => {
    return (
        <div className='box-ahp'>
        <div className='title-container'>
            <span>AHP Classico</span>
            <div className='container-ahp'>
                <BoxName/>
            </div>
        </div>
    </div>
    );
};

export default BoxAhp;
