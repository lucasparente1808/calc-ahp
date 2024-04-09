import React, { useState } from 'react';
import './box-alternativas.css';

const BoxAlternativas = ({ onListChange }) => {
    const [inputList, setInputList] = useState(["", ""]);

    const handleInputChange = (e, index) => {
        const { value } = e.target;
        const list = [...inputList];
        list[index] = value;
        setInputList(list);
    };

    const handleAddClick = () => {
        setInputList([...inputList, ""]);
    };

    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    const handleNextClick = () => {
        onListChange(inputList);
    };

    return (
        <div className='box-alternativas'>
            <span>Escolha suas Alternativas</span>
            {inputList.map((x, i) => {
                return (
                    <div className="box">
                        <input
                            name="text"
                            value={x}
                            onChange={e => handleInputChange(e, i)}
                        />
                    </div>
                );
            })}
            <div className="btn-box">
                <div>
                    <button onClick={handleAddClick}>Adicionar</button>
                    {inputList.length > 2 && <button
                        className="mr10"
                        onClick={() => handleRemoveClick(inputList.length - 1)}>Remover</button>}
                </div>
                <button className='proximo' onClick={handleNextClick}>Próximo</button>
            </div>
        </div>
    );
};

export default BoxAlternativas;
