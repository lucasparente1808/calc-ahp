import React from 'react';
import './box-contato.css';

const BoxContato = () => {
    return (
        <div className='box-home'>
            <div className='box-principal'>
                <h2 className='titulo-principal'> Contato </h2>
                <h3 className='titulo-pessoas'> Responsáveis</h3>
                <ol className='container-nomes'>
                    <li className='nome-individual'>Lucas Parente Gonçalves - (21)99123-5798</li>
                    <li className='nome-individual'>Marcilene de Fátima Dianin Vianna - (22)99212-4471</li>
                </ol>

                <h3 className='titulo-pessoas'> Desenvolvedores</h3>
                <ol className='container-nomes'>
                    <li className='nome-individual'>Lucas Parente Gonçalves  - (21)99123-5798</li>
                </ol>
            </div>
        </div>
    );
};

export default BoxContato;