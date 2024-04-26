import React, { useState, useEffect } from 'react';
import './box-alternativas-criterios.css';

const BoxAlternativasCriterios = ({ type, onListChange, onBackClick, list }) => {
    const [inputList, setInputList] = useState(list);

    useEffect(() => {
        if (type === 'Alternativas' && list.length === 0) {
            setInputList(["", ""]);
        } else if (type === 'Critérios' && list.length === 0) {
            setInputList([""]);
        } else {
            setInputList(list);
        }
    }, [type, list]);

    const handleInputChange = (e, index) => {
        const { value } = e.target;
        const list = [...inputList];
        list[index] = value;
        setInputList(list);
    };

    const handleAddClick = () => {
        if(inputList.length < 9) {
            setInputList([...inputList, ""]);
        }
    };

    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    const handleNextClick = () => {
        onListChange(inputList);
    };

    const handleApenasCriterios = () => {
        const list = [];
        onListChange(list);
    }

    const isNextDisabled = () => {
        if (type === 'Alternativas' && inputList.filter(i => i !== "").length < 2) {
            return true;
        }
        if (type === 'Critérios' && inputList.filter(i => i !== "").length < 1) {
            return true;
        }
        return false;
    };

    return (
        <>
            <div className={`box-alternativas-criterios`}>
                <span>{type}</span>
                {inputList.map((x, i) => {
                    return (
                        <div className="box">
                            <input
                                name="text"
                                value={x}
                                onChange={e => handleInputChange(e, i)}
                                placeholder={type === 'Alternativas' ? `Alternativa ${i + 1}` : `Critério ${i + 1}`}
                            />
                        </div>
                    );
                })}
                <div className="btn-box">
                    <div>
                        {inputList.length < 9 && <button onClick={handleAddClick}>Adicionar</button>}
                        {inputList.length > 2 && type !== 'Critérios' && <button
                            className="mr10"
                            onClick={() => handleRemoveClick(inputList.length - 1)}>Remover</button>}
                        {inputList.length > 1 && type === 'Critérios' && <button
                            className="mr10"
                            onClick={() => handleRemoveClick(inputList.length - 1)}>Remover</button>}
                    </div>
                    {type === 'Critérios' && <button className='voltar' onClick={onBackClick}>Voltar</button>}
                    <button className={`proximo ${isNextDisabled() ? 'proximo-disabled' : 'proximo-enabled'}`} onClick={handleNextClick} disabled={isNextDisabled()}>Próximo</button>
                </div>
            </div>
            {type === 'Alternativas' && inputList.filter(i => i !== "").length < 2 ? <button className='apenas-criterios' onClick={handleApenasCriterios}>Comparar apenas critérios</button> : null}
        </>
    );
};

export default BoxAlternativasCriterios;
