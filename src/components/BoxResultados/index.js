import React from 'react';

const BoxResultados = ({ matrizNormalizadaCriterios, vetorPrioridadesCriterios, indiceConsistenciaCriterios, comparacoesCriterios, matrizesAlternativas, alternativas }) => {
    // Você pode acessar os props diretamente aqui e usá-los como quiser.
    // Por exemplo, você pode renderizá-los diretamente ou realizar algum cálculo antes de renderizar.

    const imprimirMatriz = (matriz) => {
        let str = '';
        for(let i = 0; i < matriz.length; i++) {
            if(Array.isArray(matriz[i])) {
                str += '[' + matriz[i].join(', ') + ']\n';
            } else {
                str += matriz[i] + '\n';
            }
        }
        return str;
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
            pontuacoesOrdenadas[i][0] = alternativas[pontuacoesOrdenadas[i][0]]
        }
    
        return pontuacoesOrdenadas;
    };
    

    let pontuacoesGlobais = calcularPontuacaoGlobal();

    const chaves = Object.keys(matrizesAlternativas);

    return (
        <div>
            <div>
                {chaves.map(chave => (
                    <div key={chave}>
                        <h2>Critério: {matrizesAlternativas[chave].criterio}</h2>
                        <h3>Matriz:</h3>
                        <pre>{imprimirMatriz(matrizesAlternativas[chave].matriz)}</pre>
                        <h3>Matriz:</h3>
                        <pre>{imprimirMatriz(matrizesAlternativas[chave].matrizNormalizada)}</pre>
                        <h3>Vetor de Prioridades:</h3>
                        <pre>{imprimirMatriz(matrizesAlternativas[chave].vetorPrioridades)}</pre>
                        <h3>Índice de Consistência:</h3>
                        <pre>{matrizesAlternativas[chave].indiceConsistencia}</pre>
                    </div>
                ))}
            </div>
            <div>
                <h3>Matriz Normalizada Criterios</h3>
                <pre>{imprimirMatriz(matrizNormalizadaCriterios)}</pre>
                <h3>Vetor de Prioridades Criterios</h3>
                <pre>{imprimirMatriz([vetorPrioridadesCriterios])}</pre> 
                <h3>Índice de Consistência Criterios</h3>
                <pre>{indiceConsistenciaCriterios}</pre> 
                <h3>Comparações Atualizadas Criterios</h3>
                <pre>{imprimirMatriz(comparacoesCriterios)}</pre>
            </div>
            <div>
                <h3>Pontuações Globais</h3>
                <pre>{imprimirMatriz(pontuacoesGlobais)}</pre>
            </div>
        </div>
    );
};

export default BoxResultados;
