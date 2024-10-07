import React from 'react';
import CrearModTiendas from './CrearModTiendas';
import RegresarAPP from '../componentes/RegresarAPP';
import EliConsTiendas from './EliConsTiendas';

import '../css/formatoExterno.css';

function Tiendas () {
  return (
    <section className = "container-fluid fondoUsuarios">
      < CrearModTiendas />
      < EliConsTiendas />
      < RegresarAPP />
    </section>

  )
};

export default Tiendas;