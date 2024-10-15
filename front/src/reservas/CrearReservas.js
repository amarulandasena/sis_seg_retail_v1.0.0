import { React, useState, useRef } from 'react';
import InfoReserva from './InfoReserva';
import ProductosReservas from './ProductosReservas';
import RegresarAPP from '../componentes/RegresarAPP';

import '../css/formatoExterno.css';
import '../css/formatoInterno.css';

function CrearReservas () {

  return ( 
      <section className = "container-fluid fondoUsuarios">
        < InfoReserva />
        < ProductosReservas />
        < RegresarAPP />
      </section>  
  )
};

export default CrearReservas;