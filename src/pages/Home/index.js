import React from 'react';
import Menu from '../../components/Menu/index';
import Footer from '../../components/Footer/index';
import BoxHome from '../../components/BoxHome/index';


function Home() {
  return (
    <div>
      <Menu />
      <BoxHome/>
      {/* Outros componentes da HomePage vão aqui */}
      <Footer />
    </div>
  );
}

export default Home;