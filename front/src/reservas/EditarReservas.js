/* Componente que en conjunto permite editar la información de las reservas */

import { React } from 'react';

import '../css/formatoExterno.css';
import '../css/formatoInterno.css';

import EditarEstados from './EditarEstado';
import AgregarProductosReserva from './AgregarProductosReserva';
import EliminarProductosReservas from './EliminarProductosReservas';
import RegresarAPP from '../componentes/RegresarAPP';

function EditarReservas () {

  let rolUsuario = localStorage.getItem("rolUsuario");
  let permitir = true;

  // Validar el perfil del usuario.
  if (rolUsuario != 'Administrador' && rolUsuario != 'Digitador' && rolUsuario != 'Supervisor') {
    alert('Usuario no cumple con el perfil.');
    permitir = false;
    return;
  } 

  return(
    (permitir) ? 
    <section className = "container-fluid fondoUsuarios">
      < EditarEstados />
      < AgregarProductosReserva />
      < EliminarProductosReservas />
      < RegresarAPP />
    </section> : null
  )
};

export default EditarReservas;