import { React, useState, useRef } from 'react';
import InfoReserva from './InfoReserva';
import ProductosReservas from './ProductosReservas';
import RegresarAPP from '../componentes/RegresarAPP';

import '../css/formatoExterno.css';
import '../css/formatoInterno.css';

function CrearReservas () {

  let rolUsuario = localStorage.getItem("rolUsuario");
  let permitir = true;

  // Validar el perfil del usuario.
  if (rolUsuario != 'Administrador' && rolUsuario != 'Digitador') {
    alert('Usuario no cumple con el perfil.');
    permitir = false;
    return;
  } 

  return ( 
    (permitir) ?
    <section className = "container-fluid fondoUsuarios">
      < InfoReserva />
      < ProductosReservas />
      < RegresarAPP />
    </section> : null
  )
};

export default CrearReservas;