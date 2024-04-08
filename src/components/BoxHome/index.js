import React from 'react';
import './box-home.css';

const BoxHome = () => {
    return (
        <div className='box-home'>
            <div className='box-principal'>
                <span className='texto-home' >Métodos de Apoio a Decisão</span>
                <div className='metodos-ahp'>
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