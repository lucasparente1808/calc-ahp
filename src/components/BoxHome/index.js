import React from 'react';
import './box-home.css';

const BoxHome = () => {
    return (
        <div className='box-home'>
            <div className='box-principal'>
                <p> A DecisionMaker é uma calculadora do método <strong>Analytic Hierarchy Process (AHP)</strong>, projetada para auxiliar na tomada de decisões complexas.
                    Essa nova calculadora oferecerá uma plataforma flexível e abrangente para lidar com uma variedade de problemas. Começando com o AHP Clássico 
                    e expandindo para incluir outros métodos, nosso compromisso é capacitar os tomadores de decisão com ferramentas poderosas e insights valiosos. 
                    Acreditamos que essa abordagem aprimorada ajudará a enfrentar os desafios da tomada de decisão de maneira mais eficaz e informada.
                </p>
                <div className='metodos-ahp'>
                    <span>Métodos de Apoio a Decisão</span>
                    <a href='/AhpClassico'>
                        <button> AHP Clássico </button>   
                    </a>
                    <a className='disabled' href='/AhpEmGrupo'>
                        <button disabled> AHP Em Grupo </button>   
                    </a>
                    <a className='disabled' href='/AhpFuzzy'>
                        <button disabled> AHP Fuzzy </button>   
                    </a>
                    <a className='disabled' href='/AhpRating'>
                        <button disabled> AHP Rantings </button>   
                    </a>
                </div>
            </div>
        </div>
    );
};

export default BoxHome;