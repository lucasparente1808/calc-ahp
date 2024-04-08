import React, { useState } from 'react';
import './box-name.css';

const BoxName = () => {
    const [nomeAnalise, setNomeAnalise] = useState('');
    const [inputTemp, setInputTemp] = useState(''); // estado temporário para o input

    const confirmarNome = () => {
        setNomeAnalise(inputTemp); // atualiza nomeAnalise com o valor de inputTemp quando o botão é clicado
    };

    return (
        <>
        {nomeAnalise && <h2>{nomeAnalise}</h2>}
        {nomeAnalise ? (
            <button>Próximo</button>
        ) : (
            <div className='input-text'>
                <input 
                    type="text" 
                    value={inputTemp} 
                    onChange={(e) => setInputTemp(e.target.value)} // atualiza inputTemp quando o input muda
                />
                <button onClick={confirmarNome}>Confirmar Nome</button>
            </div>
        )}
        </>  
    );
};

export default BoxName;
