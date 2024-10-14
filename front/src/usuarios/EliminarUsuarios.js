/* Componente que permitirá modificar, consultar o eliminar un usuario, según el evento y los props que reciba. */

import { React, useState, useRef } from 'react';
import '../css/formatoExterno.css';
import '../css/formatoInterno.css';

import RegresarAPP from '../componentes/RegresarAPP';

function EliminarUsuarios () {

  // Creamos los hooks.
  const [tipoIdentificacion, setTipoIdentificacion] = useState('');
  const [numeroIdentificacion, setNumeroIdentificacion] = useState('');

  // Creamos una variable para almacenar los mensajes enviados por el servidor(API).
  let message = " ";
  let rolUsuario = localStorage.getItem("rolUsuario");
  let permitir = true;
  
  // Constante para la limpieza del formulario.
  const limpiarFormulario = useRef();

  // Validar el perfil del usuario.
  if (rolUsuario != 'Administrador') {
    alert('Usuario no cumple con el perfil.');
    permitir = false;
    return;
  }

  // Función Eliminar.
  const eliminarUsuario = async (e) => {
    e.preventDefault();

    if (!tipoIdentificacion || !numeroIdentificacion) {
      alert('Ingrese todos los datos del empleado a eliminar.');
      return;
    }

    await fetch(`http://localhost:3001/usuario/${numeroIdentificacion}`, {
      method : 'DELETE',
    })
    .then((response) => response.json()) 
    .then((data) => {
        message = data.message;    
    })

    alert(message);
    limpiarFormulario.current.reset();
  };

  
  
  return (
    (permitir) ? 
    <section className = "container-fluid fondoUsuarios">
      <article className = "row formatoUsuarios" id = "eliminarYConsultar">
        
        <form className="row g-3 text-center needs-validation centrado" ref = {limpiarFormulario}>
          <h3>ELIMINAR USUARIO</h3>
          <p>
            <em>
                * Ingrese el tipo y el número de identificación del colaborador que desea eliminar.
            </em>    
          </p>
          <div className ="col-md-4">
            <label htmlFor = "tipoIdentificacion" className = "form-label">Tipo de identificación</label>
            <select className ="form-select" id="tipoIdentificacion" onChange = {(e) => setTipoIdentificacion(e.target.value)} required>
              <option selected disabled value="">Seleccione el documento</option>
              <option>Cédula de ciudadanía</option>
              <option>Cédula de extranjería</option>
              <option>PEP</option>
              <option>Permiso por protección temporal</option>
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="numeroIdentificacion" className="form-label">Número de identificación</label>
            <input type="text" className="form-control" id="numeroIdentificacion"  onChange = {(e) => setNumeroIdentificacion(e.target.value)} required placeholder="Sin puntos ni comas" />
          </div>

          <div className="col-md-4">
            <button className="btn btn-primary" type="submit" onClick = {eliminarUsuario}>Eliminar</button>
          </div>  
        </form> 
      </article>
      < RegresarAPP />
    </section> : null
  )
};

export default EliminarUsuarios;