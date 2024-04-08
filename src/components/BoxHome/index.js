import React from 'react';
import './box-home.css';

const BoxHome = () => {
    return (
        <div className='box-home'>
            <div className='box-principal'>
                <span className='texto-home' >Métodos de Apoio a Decisão</span>
                <div className='metodos-ahp'>
                    <a href='/AhpClassico'>
                        <button> AHP Clássico </button>   {/* Crie novos butões com os novos metodos AHP*/}
                    </a>
                </div>
                     
            </div>
        </div>
    );
};

export default BoxHome;