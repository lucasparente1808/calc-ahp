import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AhpClassico from './pages/AhpClassico';


function App() {
  return (
    <Router>
      <div className="App" style={{ backgroundColor: '#f2f3f5' }}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/AhpClassico" element={<AhpClassico/>} />
          {/* Adicione mais rotas conforme necessário */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
