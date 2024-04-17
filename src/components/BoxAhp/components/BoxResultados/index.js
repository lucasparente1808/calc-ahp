import React from 'react';
import * as math from 'mathjs';
import Fraction from 'fraction.js';
import './box-resultados.css';
import { usePDF } from 'react-to-pdf';

const BoxResultados = ({ matrizNormalizadaCriterios, vetorPrioridadesCriterios, indiceConsistenciaCriterios, comparacoesCriterios, matrizesAlternativas, alternativas, criterios }) => {

    const { toPDF, targetRef } = usePDF({filename: 'resultados.pdf'});

    const arredondarDecimal = (numero) => {
        if (Number.isInteger(numero)) {
            // Se for, retorna o número
            return numero
        } else if (typeof numero === 'string' && numero.includes('/')) {
            // Se o número for uma string contendo uma fração, retorna o número sem alterações
            return numero;
        } else {
            let decimal = Number(math.round(numero, 2));
            return decimal;
        }   
    }
    
    const decimalParaFracao = (numero) => {
        // Verifica se o número é um número inteiro
        if (Number.isInteger(numero)) {
            // Se for, retorna o número
            return numero;
        } else {
            // Se não for, converte o número em uma fração
            let fracao = new Fraction(numero);
            // Se a fração for um número inteiro, retorna como um número, não uma string
            if (fracao.d === 1) {
                return fracao.n;
            } else {
                return fracao.n + '/' + fracao.d;
            }
        }
    };

    const matrizFracao = (matriz, rotulo, paritaria) => {
        for(let i = 0; i < matriz.length; i++){
            for(let k = 0; k < matriz[i].length; k++){
                if (paritaria){
                    if (i <= k) {
                        if (!Number.isInteger(matriz[i][k])){
                            matriz[i][k] = decimalParaFracao(matriz[i][k])
                        } 
                    } else {
                        if (typeof matriz[k][i] === 'string'){
                            let [numerador, denominador] = matriz[k][i].split('/').map(Number);
                            matriz[i][k] = 1 / (numerador / denominador);
                        } else {
                            matriz[i][k] = `1/${matriz[k][i]}`;
                        }
                    }
                }else {
                    let aux = arredondarDecimal(matriz[i][k])
                    matriz[i][k] = decimalParaFracao(aux);
                }
            }
        }
        return imprimirMatriz(matriz, rotulo); 
    }
    
    const imprimirMatriz = (matriz, rotulo) => {
        return (
            <table>
                <thead>
                    <tr>
                        <th></th> 
                        {rotulo.map((r, i) => (
                            <th key={i}>{r}</th> 
                        ))}
                    </tr>
                </thead>
                <tbody className='resultados'>
                    {matriz.map((row, i) => (
                        <tr key={i}>
                            <td>{rotulo[i]}</td> 
                            {row.map((cell, j) => (
                                <td key={j}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };
    
    const imprimirVetor = (vetor, rotulo) => {
        return (
            <table>
                <tbody>
                    {vetor.map((value, i) => (
                        <tr key={i}>
                            <td>{rotulo[i]}</td>
                            <td>{arredondarDecimal(value)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };
    
    const imprimirPontuacaoGlobal = (pontuacoesGlobais) => {
        return (
            <table>
                <tbody>
                    {pontuacoesGlobais.map((value, i) => (
                        <tr key={i}>
                            <td>{value[0]}</td>
                            <td>{value[1]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };
    

    const calcularPontuacaoGlobal = () => {
        let pontuacoesGlobais = {};
    
        // Inicializando as pontuações globais para cada alternativa
        for (let i = 0; i < matrizesAlternativas["matrizAlternativa0"].vetorPrioridades.length; i++) {
            pontuacoesGlobais[i] = 0;
        }

        let l = 0;
    
        for (let chave in matrizesAlternativas) {
            let criterio = matrizesAlternativas[chave];
            // Calculando o produto do vetor de prioridades da alternativa pelo vetor de prioridades dos critérios
            for (let i = 0; i < criterio.vetorPrioridades.length; i++) {
                let produto = criterio.vetorPrioridades[i] * vetorPrioridadesCriterios[l];
                // Somando o produto ao valor atual da pontuação global da alternativa
                pontuacoesGlobais[i] += produto;
            }
            l++;
        }
    
        // Ordenar as pontuações globais em ordem decrescente
        let pontuacoesOrdenadas = Object.entries(pontuacoesGlobais).sort((a, b) => b[1] - a[1]);

        for (let i = 0; i < pontuacoesOrdenadas.length ; i++){
            pontuacoesOrdenadas[i][0] = alternativas[pontuacoesOrdenadas[i][0]];
            let aux = arredondarDecimal(pontuacoesOrdenadas[i][1]) * 100;
            aux = Math.round(aux * 100) / 100;
            pontuacoesOrdenadas[i][1] = aux.toString() + '%';
        }
    
        return pontuacoesOrdenadas;
    };
    
    
    let pontuacoesGlobais = calcularPontuacaoGlobal();


    const chaves = Object.keys(matrizesAlternativas);

    return (
        <>
            <div ref={targetRef}>
                <div className='container-pontuacao-global'>
                    <div className='individual-pontuacao-global'>
                        <h1>Pontuação Global</h1>
                        {imprimirPontuacaoGlobal(pontuacoesGlobais)}
                    </div>
                </div>
                <div  className='borda-inferior'></div>
                <div>
                    {chaves.map(chave => (
                        <div key={chave} className='container-geral'>
                            <div>
                                <h2>Critério: {matrizesAlternativas[chave].criterio}</h2>
                            </div>
                            <div className='matrizes'>
                                <div className='individual'>
                                    <h3>Matriz:</h3>
                                    {matrizFracao(matrizesAlternativas[chave].matriz, alternativas, true)}
                                </div>
                                <div className='individual'>
                                    <h3>Matriz Normalizada:</h3>
                                    {matrizFracao(matrizesAlternativas[chave].matrizNormalizada, alternativas, false)}
                                </div>
                                <div className='individual'>
                                    <h3>Vetor de Prioridades:</h3>
                                    {imprimirVetor(matrizesAlternativas[chave].vetorPrioridades, alternativas)}
                                </div>
                                {matrizesAlternativas[chave].indiceConsistencia ? (
                                    <div className='individual'>
                                        <h3>Razão de Consistência:</h3>
                                        {(Math.round(arredondarDecimal(matrizesAlternativas[chave].indiceConsistencia) * 100) * 100) / 100}%
                                    </div>
                                ) : 
                                    <div className='individual'>
                                        <h3>Razão de Consistência:</h3>
                                        0%
                                    </div>
                                }
                            </div>
                            <div  className='borda-inferior'></div>
                        </div>
                    ))}
                </div>
                <div className='container-geral'>
                    <div>
                        <h2>Resultados da comparação dos critérios</h2>
                    </div>
                    <div className='matrizes'>
                        <div className='individual'>
                            <h3>Comparações Critérios:</h3>
                            {matrizFracao(comparacoesCriterios, criterios, true)}
                        </div>
                        <div className='individual'>
                            <h3>Matriz Normalizada Critérios:</h3>
                            {matrizFracao(matrizNormalizadaCriterios, criterios, false)}
                        </div>
                        <div className='individual'>
                            <h3>Vetor de Prioridades Critérios:</h3>
                            {imprimirVetor(vetorPrioridadesCriterios, criterios)}
                        </div>
                        {indiceConsistenciaCriterios ? (
                            <div className='individual'>
                                <h3>Razão de Consistência Critérios:</h3>
                                {(Math.round(arredondarDecimal(indiceConsistenciaCriterios) * 100) * 100) / 100}%
                            </div>
                        ) :
                            <div className='individual'>
                                <h3>Razão de Consistência:</h3>
                                0%
                            </div>
                        }
                    </div>
                    <div  className='borda-inferior'></div>
                </div>
            </div>
            <div className='container-gerar-pdf'>
                <button className='gerar-pdf' onClick={toPDF}>Gerar PDF</button>    
            </div>
        </>
    );
};

export default BoxResultados;
