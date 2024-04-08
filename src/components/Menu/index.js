import React from 'react';
import { FaHome } from 'react-icons/fa'; 
import './menu.css'; // Importando o arquivo CSS

const Menu = () => {
    return (
        <nav className="menu">
            <ul>
                <li className="icon-home"><a href="/"><FaHome style={{ fontSize:'30px', color:'#f2f3f5' }} /></a></li>
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
