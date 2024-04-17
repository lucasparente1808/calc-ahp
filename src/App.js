import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AhpClassico from './pages/AhpClassico';
import Sobre from './pages/Sobre';
import Contato from './pages/Contato';
import './index.css';


function App() {
  return (
    <Router>
      <div className="App" style={{ backgroundColor: '#f2f3f5', overflow: 'hidden' , height: '100%', width: '100%'}}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/AhpClassico" element={<AhpClassico/>} />
          <Route path="/Sobre" element={<Sobre/>} />
          <Route path="/Contato" element={<Contato/>} />
          {/* Adicione mais rotas conforme necessário */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
