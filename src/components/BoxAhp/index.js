import React, { useState, useEffect } from 'react';
import './box-ahp.css';
import BoxName from '../BoxName/index';
import BoxAlternativas from '../../components/BoxAlternativas';

const BoxAhp = () => {
    const [nomeAnalise, setNomeAnalise] = useState('');
    const [alternativas, setAlternativas] = useState([]);
    const [boxHeight, setBoxHeight] = useState('calc(100vh - 5rem - 6.125rem)');

    useEffect(() => {
        const calculateBoxHeight = () => {
            const minHeight = 'calc(100vh - 5rem - 6.125rem)';
            const dynamicHeight = `calc(${minHeight} + ${alternativas.length * 70}px)`; // Adjust the increment as needed
            setBoxHeight(dynamicHeight);
        };
        calculateBoxHeight();
    }, [alternativas]);

    const handleConfirm = (nome) => {
        setNomeAnalise(nome);
    };

    const handleListChange = (list) => {
        setAlternativas(list);
    };

    return (
        <div className='box-ahp' style={{ minHeight: boxHeight }}>
            <div className='title-container'>
                <div className='title-name'>
                    <span>Método AHP Clássico</span>
                </div>
                { nomeAnalise === '' ? null : 
                <div className='container-analise'>
                    <span>Nome da análise: </span>
                    <span>{nomeAnalise}</span>
                </div>
                }
            </div>
            <div className='box-name'>
                {nomeAnalise === '' ? <BoxName onConfirm={handleConfirm}/> : null}
            </div>
            
            {nomeAnalise !== '' && alternativas.length === 0 && <BoxAlternativas onListChange={handleListChange}/>}
            
            {alternativas.length > 0 && <div>{JSON.stringify(alternativas)}</div>}
        </div>
    );
};

export default BoxAhp;
