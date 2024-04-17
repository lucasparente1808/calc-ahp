import React, { useState } from 'react';
import { FaHome, FaBars } from 'react-icons/fa'; 
import './menu.css'; // Importando o arquivo CSS

const Menu = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="menu">
            <ul>
                <FaBars className = "icon-dropdown" style={{ fontSize: isOpen ? '20px' : '30px', color:'#f2f3f5', transition: 'font-size 0.3s ease' }} onClick={() => setIsOpen(!isOpen)} />
                {isOpen && (
                    <div className="dropdown-menu">
                        <a href="/">
                            <button className='primeiro-botao'>AHP (Analytic Hierarchy Process)</button>
                        </a>
                        <a href="/promethee">
                            <button disabled >PROMETHEE (Preference Ranking Organization METHod for Enrichment Evaluations)</button>
                        </a>
                        <a href="/electre">
                            <button disabled>ELECTRE (ELimination Et Choix Traduisant la REalité)</button>
                        </a>
                        <a href="/topsis">
                            <button className='ultimo-botao' disabled>TOPSIS (Technique for Order of Preference by Similarity to Ideal Solution)</button>
                        </a>
                    </div>
                )}
                <a href="/"><li className="icon-home"><FaHome style={{ fontSize:'30px', color:'#f2f3f5' }} /></li></a>
                <li><span>DecisionMaker</span></li>
                <div className="group-right">
                    <li className='sobre-home'><a href="/sobre">Sobre</a></li>
                    <li className='contato-home'><a href="/contato">Contato</a></li>
                </div>
            </ul>
        </nav>
    );
};

export default Menu;
