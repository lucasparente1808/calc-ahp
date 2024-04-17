import React from 'react';
import { FaHome } from 'react-icons/fa'; 
import './menu.css'; // Importando o arquivo CSS

const Menu = () => {

    return (
        <nav className="container-menu">
            <ul className='itens-menu'>
                <div class="hamburger-menu">
                    <input id="menu__toggle" type="checkbox" />
                    <label class="menu__btn" for="menu__toggle">
                    <span></span>
                    </label>

                    <ul class="menu__box">
                        <li><a class="menu__item" href="/">Analytic Hierarchy Process (AHP)</a></li>
                        <li><a class="menu__item disabled" href="/Electre">Métodos ELECTRE</a></li>
                        <li><a class="menu__item disabled" href="/Promethee">Promethee</a></li>
                        <li><a class="menu__item disabled" href="/Maut">Multiattribute Utility Theory (MAUT)</a></li>
                    </ul>
                </div>
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
