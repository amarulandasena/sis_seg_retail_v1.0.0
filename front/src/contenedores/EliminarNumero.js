/* Funcionalidad que permite eliminar una etiqueta de la base de datos */

import { React, useState, useRef } from 'react';
import '../css/formatoExterno.css';
import '../css/formatoInterno.css';

import RegresarAPP from '../componentes/RegresarAPP';

function EliminarNumero () {

  //Hooks.
  const[codContenedor, setCodContenedor] = useState('');

  // Creamos una variable para almacenar los mensajes enviados por el servidor(API) y el perfil del usuario.
  let message = " ";
  let rolUsuario = localStorage.getItem("rolUsuario");
  let permitir = true;

  // Constante para la limpieza del formulario.
  const limpiarFormulario = useRef();

  // Validar el perfil del usuario.
  if (rolUsuario != 'Auxiliar de operaciones' && rolUsuario != 'Supervisor' && rolUsuario != 'Administrador') {
    alert('Usuario no cumple con el perfil.');
    permitir = false;
    return;
  }

  // Función para eliminar la etiqueta.
  const eliminarEtiqueta = async (e) => {
    e.preventDefault();

    // Validamos que todos los datos sean ingresados.
    if (!codContenedor){
      alert('Ingrese todos los datos de la reserva.');
      return;
    }

    await fetch(`http://localhost:3001/contenedores/${codContenedor}`, {
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
    (permitir) ?
    <main className = "container-fluid fondoUsuarios">
      <section className = "row formatoUsuarios">
        <form className="row g-3 text-center needs-validation" ref = {limpiarFormulario}>
          <h3> ELIMINAR NÚMERO DE CONTENEDOR </h3>

          <p>
            <em>
              * Ingrese el código de la etiqueta que desea eliminar. <br/>
            </em>
          </p>

          <div className="col-md-4">
            <label htmlFor="codigoContenedor" className="form-label">Código contenedor</label>
            <input type="text" className="form-control" id="codigoContenedor" onChange = {(e)=> setCodContenedor(e.target.value)} required />
          </div>
          <div className="col-md-4">
            <button className="btn btn-primary margenBoton" type="submit" onClick = {eliminarEtiqueta} >Eliminar</button>
          </div>
        </form> 
      </section>
      < RegresarAPP />
    </main> :null
  )
}

export default EliminarNumero;