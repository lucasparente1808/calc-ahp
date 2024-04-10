import React, { useState, useEffect } from 'react';
import './box-ahp.css';
import BoxName from '../BoxName/index';
import BoxAlternativasCriterios from '../BoxAlternativasCriterios';
import BoxComparacaoCriterios from '../BoxComparacaoCriterios';

const BoxAhp = () => {
    const [nomeAnalise, setNomeAnalise] = useState('');
    const [alternativas, setAlternativas] = useState([]);
    const [criterios, setCriterios] = useState([]);
    const [boxHeight, setBoxHeight] = useState('calc(100vh - 5rem - 6.125rem)');
    const [step, setStep] = useState('nome');
    const [comparacoesCriterios, setComparacoesCriterios] = useState([]);
    const [matrizNormalizadaCriterios, setMatrizNormalizadaCriterios] = useState([]);
    const [vetorPrioridadesCriterios, setVetorPrioridadesCriterios] = useState([]);
    const [indiceConsistenciaCriterios, setIndiceConsistenciaCriterios] = useState(0);

    useEffect(() => {
        const calculateBoxHeight = () => {
            const minHeight = 'calc(100vh - 5rem - 6.125rem)';
            const dynamicHeight = `calc(${minHeight} + ${Math.max(alternativas.length, criterios.length) * 70}px)`;
            setBoxHeight(dynamicHeight);
        };
        calculateBoxHeight();
    }, [alternativas, criterios]);

    const handleConfirm = (nome) => {
        setNomeAnalise(nome);
        setStep('alternativas');
    };

    const handleAlternativasChange = (list) => {
        setAlternativas(list);
        setStep('criterios'); 
    };

    const handleCriteriosChange = (list) => {
        setCriterios(list);
        setStep('comparacao-criterios')
    };

    const handleBackClick = () => {
        if (step === 'criterios') {
            setStep('alternativas'); 
        }
    };

    // const handleComparacaoChange = (list) => {
        
    // };

    const imprimirMatriz = (matriz) => {
        let str = '';
        for(let i = 0; i < matriz.length; i++) {
            str += '[' + matriz[i].join(', ') + ']\n';
        }
        return str;
    };

    const handleAhpCalculation = (matrizNormalizadaCriterios, vetorPrioridadesCriterios, indiceConsistenciaCriterios, comparacoes) => {
        setMatrizNormalizadaCriterios(matrizNormalizadaCriterios);
        setVetorPrioridadesCriterios(vetorPrioridadesCriterios);
        setIndiceConsistenciaCriterios(indiceConsistenciaCriterios);
        setComparacoesCriterios(comparacoes);
        setStep('comparacao-alternativas'); 
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
                {step === 'nome' && <BoxName onConfirm={handleConfirm}/>}
            </div>
            
            {step === 'alternativas' && <BoxAlternativasCriterios type="Alternativas" onListChange={handleAlternativasChange} onBackClick={handleBackClick} list={alternativas}/>}
            
            {step === 'criterios' && <BoxAlternativasCriterios type="Critérios" onListChange={handleCriteriosChange} onBackClick={handleBackClick} list={criterios}/>}
            
            {step === 'comparacao-criterios' && criterios.length > 1 && <BoxComparacaoCriterios criterios={criterios} 
            comparacoes={comparacoesCriterios} onComparacaoChange={setComparacoesCriterios} onAhpCalculation={handleAhpCalculation}/>}

            {alternativas.length > 0 && <div>{JSON.stringify(alternativas)}</div>}
            {criterios.length > 0 && <div>{JSON.stringify(criterios)}</div>}

            {step === 'comparacao-alternativas' && matrizNormalizadaCriterios && vetorPrioridadesCriterios && indiceConsistenciaCriterios && comparacoesCriterios &&
                <div>
                    <h3>Matriz Normalizada</h3>
                    <pre>{imprimirMatriz(matrizNormalizadaCriterios)}</pre>
                    <h3>Vetor de Prioridades</h3>
                    <pre>{imprimirMatriz([vetorPrioridadesCriterios])}</pre> {/* Vetor de prioridades é um vetor unidimensional, então nós o colocamos em um array para imprimi-lo como uma matriz */}
                    <h3>Índice de Consistência</h3>
                    <pre>{indiceConsistenciaCriterios}</pre> {/* Índice de consistência é um número, então nós o imprimimos diretamente */}
                    <h3>Comparações Atualizadas</h3>
                    <pre>{imprimirMatriz(comparacoesCriterios)}</pre>
                </div>
            }
        </div>
    );
};

export default BoxAhp;
