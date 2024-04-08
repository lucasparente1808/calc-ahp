import React from 'react';
import Menu from '../../components/Menu/index';
import Footer from '../../components/Footer/index';
import BoxAhp from '../../components/BoxAhp';


function AhpClassico() {
  return (
    <div>
      <Menu />
      <BoxAhp />
      {/* Outros componentes da HomePage vão aqui */}
      <Footer />
    </div>
  );
}

export default AhpClassico;