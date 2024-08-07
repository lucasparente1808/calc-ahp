import React, { useState } from 'react';
import './box-ahp.css';
import BoxName from '../BoxName/index';
import BoxAlternativasCriterios from '../BoxAlternativasCriterios';
import BoxComparacaoCriterios from './components/BoxComparacaoCriterios';
import BoxComparacaoAlternativas from './components/BoxComparacaoAlternativas';
import BoxResultados from './components/BoxResultados';

const BoxAhp = () => {
    const [nomeAnalise, setNomeAnalise] = useState('');
    const [alternativas, setAlternativas] = useState([]);
    const [criterios, setCriterios] = useState([]);
    const [step, setStep] = useState('nome');
    const [comparacoesCriterios, setComparacoesCriterios] = useState([]);
    const [matrizNormalizadaCriterios, setMatrizNormalizadaCriterios] = useState([]);
    const [vetorPrioridadesCriterios, setVetorPrioridadesCriterios] = useState([]);
    const [indiceConsistenciaCriterios, setIndiceConsistenciaCriterios] = useState(0);
    const [comparacoesAlternativas, setComparacoesAlternativas] = useState([]);
    const [matrizesAlternativas, setMatrizesAlternativas] = useState({});

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
        if (list.length <= 1) {
            setStep('comparacao-alternativas');
            setMatrizNormalizadaCriterios([[1]]);
            setVetorPrioridadesCriterios([1]);
            setIndiceConsistenciaCriterios(0);
            setComparacoesCriterios([[1]]);
        } else {
            setStep('comparacao-criterios');
        }
    };

    const handleBackClick = () => {
        if (step === 'criterios') {
            setStep('alternativas'); 
        }
    };

    const handleComparacaoCriteriosChange = (list) => {
        if (alternativas.length !== 0){
            setStep('comparacao-alternativas');
        } else {
            setStep('resultado');
        }
    };

    const handleComparacaoAlternativasChange = (list) => {
        setStep('resultado');
    };

    const handleAhpCalculation = (matrizNormalizadaCriterios, vetorPrioridadesCriterios, indiceConsistenciaCriterios, comparacoes) => {
            setMatrizNormalizadaCriterios(matrizNormalizadaCriterios);
            setVetorPrioridadesCriterios(vetorPrioridadesCriterios);
            setIndiceConsistenciaCriterios(indiceConsistenciaCriterios);
            setComparacoesCriterios(comparacoes);
        if (alternativas.length !== 0){
            setStep('comparacao-alternativas'); 
        } else {
            setMatrizesAlternativas({});
            setStep('resultado');
        }
        
    };

    const handleAhpCalculationAlternativas = (matrizes) => {
        setMatrizesAlternativas(matrizes)
        setStep('resultado');
    };

    return (
        <div className='box-ahp'>
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
            
            {step === 'comparacao-criterios' && criterios.length > 1 && <BoxComparacaoCriterios onListChange={handleComparacaoCriteriosChange} criterios={criterios} 
            comparacoes={comparacoesCriterios} onComparacaoChange={setComparacoesCriterios} onAhpCalculation={handleAhpCalculation}/>}

            {step === 'comparacao-alternativas' && alternativas.length !== 0 && <BoxComparacaoAlternativas onListChange={handleComparacaoAlternativasChange} criterios={criterios} alternativas={alternativas}
            comparacoes={comparacoesAlternativas} onComparacaoChange={setComparacoesAlternativas} onAhpCalculation={handleAhpCalculationAlternativas}/>}

            {step === 'resultado' &&
               <BoxResultados 
               matrizNormalizadaCriterios={matrizNormalizadaCriterios}
               vetorPrioridadesCriterios={vetorPrioridadesCriterios}
               indiceConsistenciaCriterios={indiceConsistenciaCriterios}
               comparacoesCriterios={comparacoesCriterios}
               matrizesAlternativas={matrizesAlternativas}
               alternativas = {alternativas}
               criterios = {criterios}
               nome = {nomeAnalise}
           />  
            }
        </div>
    );
};

export default BoxAhp;
