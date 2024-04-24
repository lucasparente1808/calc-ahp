import React, { useState } from 'react';
import './comparacao-criterios.css';
import { round } from 'mathjs';

const BoxComparacaoCriterios = ({ criterios, comparacoes, onComparacaoChange, onAhpCalculation }) => { 

    const paresDeCriterios = [];
    for (let i = 0; i < criterios.length; i++) {
        for (let j = i + 1; j < criterios.length; j++) {
            paresDeCriterios.push([criterios[i], criterios[j]]);
        }
    }
    
    const [inversoState, setInversoState] = useState(new Array(paresDeCriterios.length).fill(false));

    const handlePrioridadeComparacaoChange = (inverso, index) => {
        if (inverso === true){
            setInversoState(prevLista => {
                const novaLista = [...prevLista];
                novaLista[index] = true;
                return novaLista;
            })
        } else {
            setInversoState(prevLista => {
                const novaLista = [...prevLista];
                novaLista[index] = false;
                return novaLista;
            })
        }
        const novasComparacoes = [...comparacoes];
        novasComparacoes[index] = 0;
        onComparacaoChange(novasComparacoes);
    };
    
    const handleComparacaoChange = (index, valor) => {
        valor = parseFloat(valor);
        if (valor < 1 || valor > 9) {
            alert('O valor deve estar entre 1 e 9.');
            return;
        }
        const novasComparacoes = [...comparacoes];
    
        const inverso = inversoState[index];
        
        novasComparacoes[index] = inverso ? 1 / valor : valor;
        
        onComparacaoChange(novasComparacoes);
    };

    const isNextDisabled = () => {
        if (comparacoes.length === paresDeCriterios.length) {
            return false;
        }
        return true;
    };

    const vetorParaMatriz = (vetor) => {
        let matriz = [];
        let index = 0;
        for(let i = 0; i < criterios.length; i++) {
            matriz[i] = [];
            for(let j = 0; j < criterios.length; j++) {
                if(i === j) {
                    matriz[i][j] = 1; // o elemento na diagonal principal é sempre 1
                } else if(j > i) {
                    matriz[i][j] = vetor[index++];
                } else {
                    matriz[i][j] = 1 / matriz[j][i];
                }
            }
        }
        return matriz;
    }

    const calcularAHP = () => {
        const matriz = vetorParaMatriz(comparacoes);

        const matrizNormalizada = normalizarMatriz(matriz);
    
        const vetorPrioridades = calcularVetorPrioridades(matrizNormalizada);
    
        const indiceConsistencia = calcularConsistencia(matriz, vetorPrioridades);
        
        if (indiceConsistencia > 0.1) {
            let aux = round((round(indiceConsistencia, 2) * 100));
            alert(`A consistência é maior que 10% e seu valor é ${aux}%, reveja as comparações.`);
            return;
        }
    
        onAhpCalculation(matrizNormalizada, vetorPrioridades, indiceConsistencia, matriz);
    };

    return (
        <div className='principal'>
            <span className='titulo-comparacao-criterios'>Comparação de critérios</span>
            {paresDeCriterios.map((par, index) => (
                <div className='container-comparacao'>
                <label className='pares'>{par[0]} vs {par[1]}</label>
                <div className="prioridade-container">
                    <label className="prioridade-label">Prioridade</label>
                    <select className='select-valor' onChange={(e) => handlePrioridadeComparacaoChange(e.target.value === par[1], index)}>
                        <option value={par[0]}>{par[0]}</option>
                        <option value={par[1]}>{par[1]}</option>
                    </select>
                </div>
                <div className="peso-container">
                    <label className="peso-label">Peso</label>
                    <input
                        className='input-valor'
                        type="number"
                        min="1"
                        max="9"
                        value={comparacoes[index] < 1 ? 1 / comparacoes[index] : comparacoes[index] || ''}
                        onChange={(e) => handleComparacaoChange(index, e.target.value)}
                    />
                </div>
            </div>
            ))}
            <button className={`proximo-comparacao-criterios ${isNextDisabled() ? 'proximo-comparacao-criterios-disabled' : 'proximo-comparacao-criterios-enabled'}`} onClick={calcularAHP} disabled={isNextDisabled()}>Próximo</button>
        </div>
    );
};

export default BoxComparacaoCriterios;


const normalizarMatriz = (matriz) => {
    const somasDasColunas = matriz[0].map((_, colIndex) => matriz.reduce((soma, linhaAtual) => soma +  linhaAtual[colIndex], 0));
    return matriz.map(linha => linha.map((valor, index) => valor / somasDasColunas[index]));
};

const calcularVetorPrioridades = (matrizNormalizada) => {
    return matrizNormalizada.map(linha => linha.reduce((soma, valor) => soma + valor, 0) / matrizNormalizada.length);
};

const calcularConsistencia = (matriz, vetorPrioridades) => {
    const n = matriz.length;
    const somaColunas = []
    for (let i = 0; i < matriz.length; i++){
        let soma = 0
        for(let k = 0; k < matriz[i].length; k++){
            soma += matriz[k][i]
        }
        somaColunas.push(soma) 
    }
    const lambdaMax = somaColunas.reduce((sum, value, i) => {
        const roundedValue1 = value;
        const roundedValue2 = vetorPrioridades[i];
        return sum + roundedValue1 * roundedValue2;
    }, 0);
    const CI = (lambdaMax - n) / (n - 1);

    // Índices aleatórios para n = 1 até 10
    const indicesAleatorios = [0, 0, 0.58, 0.9, 1.12, 1.24, 1.32, 1.41, 1.45, 1.49];
    const RI = indicesAleatorios[n - 1];


    const CR = CI / RI;
    return CR;
};
