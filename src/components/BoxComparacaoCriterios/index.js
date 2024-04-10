import React, { useState } from 'react';
import './comparacao-criterios.css';
import { multiply, sum } from 'mathjs';

const BoxComparacaoCriterios = ({ criterios, comparacoes, onComparacaoChange, onAhpCalculation }) => {

    const [inversoState, setInversoState] = useState();

    const handleComparacaoChange = (index, valor, inverso) => {
        valor = parseFloat(valor);
        if (valor < 1 || valor > 9) {
            alert('O valor deve estar entre 1 e 9.');
            return;
        }
        setInversoState(inverso)
        const novasComparacoes = [...comparacoes];
        novasComparacoes[index] = inversoState ? 1 / valor : valor;
        onComparacaoChange(novasComparacoes);
    };

    // Cria uma lista de todos os pares possíveis de critérios
    const paresDeCriterios = [];
    for (let i = 0; i < criterios.length; i++) {
        for (let j = i + 1; j < criterios.length; j++) {
            paresDeCriterios.push([criterios[i], criterios[j]]);
        }
    }

    const vetorParaMatriz = (vetor) => {
        let matriz = [];
        for(let i = 0; i < vetor.length; i++) {
            matriz[i] = [];
            for(let j = 0; j < vetor.length; j++) {
                if(i === j) {
                    matriz[i][j] = 1; // o elemento na diagonal principal é sempre 1
                } else if(j > i) {
                    matriz[i][j] = vetor[i * vetor.length + j - ((i + 1) * (i + 2)) / 2];
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
            alert(`A consistência é maior que 0.1 e seu valor é ${indiceConsistencia}`);
            return;
        }
    
        onAhpCalculation(matrizNormalizada, vetorPrioridades, indiceConsistencia, matriz);
    };

    return (
        <div>
            {paresDeCriterios.map((par, index) => (
                <div key={index} className='container-comparacao'>
                    <label className='pares'>{par[0]} vs {par[1]}</label>
                    <select className='select-valor' onChange={(e) => handleComparacaoChange(index, e.target.value, e.target.value === par[1])}>
                        <option value={par[0]}>{par[0]}</option>
                        <option value={par[1]}>{par[1]}</option>
                    </select>
                    <input
                        className='input-valor'
                        type="number"
                        min="1"
                        max="9"
                        value={comparacoes[index] < 1 ? 1 / comparacoes[index] : comparacoes[index] || ''}
                        onChange={(e) => handleComparacaoChange(index, e.target.value, e.target.value === par[1])}
                    />
                </div>
            ))}
            <button className='proximo' onClick={calcularAHP}>Próximo</button>
        </div>
    );
};

export default BoxComparacaoCriterios;


const normalizarMatriz = (matriz) => {
    const somasDasColunas = matriz[0].map((_, colIndex) => matriz.reduce((soma, linhaAtual) => soma + linhaAtual[colIndex], 0));
    return matriz.map(linha => linha.map((valor, index) => valor / somasDasColunas[index]));
};

const calcularVetorPrioridades = (matrizNormalizada) => {
    return matrizNormalizada.map(linha => linha.reduce((soma, valor) => soma + valor, 0) / matrizNormalizada.length);
};

const calcularConsistencia = (matriz, vetorPrioridades) => {
    const n = matriz.length;
    const lambdaMax = sum(multiply(matriz, vetorPrioridades));
    const CI = (lambdaMax - n) / (n - 1);

    // Índices aleatórios para n = 1 até 10
    const indicesAleatorios = [0, 0, 0.58, 0.9, 1.12, 1.24, 1.32, 1.41, 1.45, 1.49];
    const RI = indicesAleatorios[n - 1];


    const CR = CI / RI;
    return CR;
};
