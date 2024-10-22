/* Componente que permite eliminar una reserva de la base de datos */

import { React, useState, useRef } from 'react';

import '../css/formatoExterno.css';
import '../css/formatoInterno.css';

import RegresarAPP from '../componentes/RegresarAPP';

function EliminarReservas () {

  // Hooks.
  const[codReserva, setCodReserva] = useState('');

  // Creamos una variable para almacenar los mensajes enviados por el servidor(API) y el perfil del usuario.
  let message = " ";
  let rolUsuario = localStorage.getItem("rolUsuario");
  let permitir = true;

  // Constante para la limpieza del formulario.
  const limpiarFormulario = useRef();

   // Validar el perfil del usuario.
   if (rolUsuario != 'Administrador' && rolUsuario != 'Digitador' && rolUsuario != 'Supervisor') {
    alert('Usuario no cumple con el perfil.');
    permitir = false;
    return;
  } 

  //Función para eliminar la reserva de la base de datos.
  const eliminarReserva = async (e) => {
    e.preventDefault();

    // Validamos que todos los datos sean ingresados.
    if (!codReserva){
      alert('Ingrese todos los datos.');
    return;
    }

    await fetch(`http://localhost:3001/reserva/${codReserva}`, {
      method : 'DELETE',
    })
    .then((response) => response.json()) 
    .then((data) => {
        message = data.message; 
        alert(message);  
    })

    limpiarFormulario.current.reset();
  }

  return (
    <main className = "container-fluid fondoUsuarios">
      <section className = "row formatoUsuarios">
        <form className="row g-3 text-center needs-validation" ref = {limpiarFormulario}>
          <h3> ELIMINAR RESERVA </h3>

          <div className="col-md-4">
            <label htmlFor="codigoReserva" className="form-label">Código reserva</label>
            <input type="text" className="form-control" id="codigoReserva" onChange = {(e)=> setCodReserva(e.target.value)} required />
          </div>
          <div className="col-md-4">
            <button className="btn btn-primary margenBoton" type="submit" onClick = {eliminarReserva}>Eliminar</button>
          </div>
        </form>
      </section>
      < RegresarAPP />
    </main>
  )
};

export default EliminarReservas;