/* Funcionalidad que permite a marcadores y segregadores actualizar el estado de la reserva */

import { React, useState, useRef } from 'react';
import '../css/formatoExterno.css';
import '../css/formatoInterno.css';

import RegresarAPP from '../componentes/RegresarAPP';

function CambiarEstadoReserva () {

// Declaramos los Hooks.
const[codReserva, setCodReserva] = useState('');
const[estadoReserva, setEstadoReserva] = useState('');

// Constante para la limpieza del formulario.
const limpiarFormulario = useRef();

// Creamos una variable para almacenar los mensajes enviados por el servidor(API) y el perfil del usuario.
let message = " ";
let rolUsuario = localStorage.getItem("rolUsuario");
let permitir = true;

// Validar el perfil del usuario.
if (rolUsuario != 'Marcador' && rolUsuario != 'Administrador' && rolUsuario != 'Segregador') {
  alert('Usuario no cumple con el perfil.');
  permitir = false;
  return;
}

// Función para cambiar el estado de la reserva.
const editarEstado = async (e) => {
  e.preventDefault();

  // Validamos que todos los datos sean ingresados.
  if (!codReserva || !estadoReserva){
    alert('Ingrese código y estado.');
    return;
  }

  let datosEdicion = {
    'codReserva' : codReserva,
    'estadoReserva' : estadoReserva
  }

  await fetch(`http://localhost:3001/reserva/${codReserva}`, {
    method : 'PUT',
    headers : {
      'Content-type' : 'application/json',
    },
    body : JSON.stringify(datosEdicion),
  })
  .then((response) => response.json())
  .then((data) => {
    message = data.message;
    alert(message);
  });

  limpiarFormulario.current.reset();

}

  return (
    (permitir) ?
    <main className = "container-fluid fondoUsuarios">
      <section className = "row formatoUsuarios">
        <form className="row g-3 text-center needs-validation" ref = {limpiarFormulario}>
          <h3> CAMBIAR ESTADO </h3>

          <p>
            <em>
              * Ingrese el código de la reserva que desea cambiar. <br/> 
            </em>
          </p>  

          <div className="col-md-4">
            <label htmlFor="codigoReserva" className="form-label">Código reserva</label>
            <input type="text" className="form-control" id="codigoReserva" onChange = {(e)=> setCodReserva(e.target.value)} required />
          </div>    
          <div className="col-md-4">
            <label htmlFor="estadoReserva" className="form-label">Estado de la reserva</label>
            <select className="form-select" id="estadoReserva" onChange = {(e) => setEstadoReserva(e.target.value)} required>
              <option selected disabled value="">Seleccione el estado</option>
              <option>MARCADA</option>
              <option>SEGREGADA</option>
            </select>
          </div>
          <div className="col-md-4">
            <button className="btn btn-primary margenBoton" type="submit" onClick = {editarEstado}>Editar</button>
          </div> 
        </form>
        <RegresarAPP />
      </section>
    </main> : null

  )
};

export default CambiarEstadoReserva;