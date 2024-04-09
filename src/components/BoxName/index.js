import React, { useState } from 'react';
import './box-name.css';

const BoxName = ({ onConfirm }) => {
    const [inputTemp, setInputTemp] = useState(''); // estado temporário para o input

    const confirmarNome = () => {
        onConfirm(inputTemp); // chama a função onConfirm passada como prop quando o botão é clicado
    };

    return (
        <>    
             <div className='container-input'>
                <span> De um nome a sua Análise: </span>
                <input
                    className='input-text' 
                    type="text" 
                    value={inputTemp} 
                    onChange={(e) => setInputTemp(e.target.value)} // atualiza inputTemp quando o input muda
                />
                <button className='button-confirma' onClick={confirmarNome}>Confirmar Nome</button>
            </div>
        </>  
    );
};

export default BoxName;