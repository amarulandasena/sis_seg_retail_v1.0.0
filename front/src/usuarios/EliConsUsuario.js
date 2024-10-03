/* Componente que permitirá modificar, consultar o eliminar un usuario, según el evento y los props que reciba. */

import { React, useState } from 'react';
import '../css/formatoUsuarios.css';

function EliConsUsuario () {

  // Creamos los hooks.
  const [tipoIdentificacion, setTipoIdentificacion] = useState('');
  const [numeroIdentificacion, setNumeroIdentificacion] = useState('');

  // Creamos una variable para almacenar los mensajes enviados por el servidor(API).
  let message = " ";

  // Función para insertar la tabla con los datos del empleado consultado.
  const insertarDatos = (datos) => {

    const tablaDatos = `<div>
      <p> Colaborador: ${nombres} ${apellidos} </p>
      <table class="table table-bordered border-primary">
        <thead>
          <tr>
            <th scope="col"> Tipo de identificación </th>
            <th scope="col"> Número de identificación </th>
            <th scope="col"> Nombres </th>
            <th scope="col"> Apellidos </th>
            <th scope="col"> Rol </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row"> ${datos.tipoIdentificacion} </th>
            <th scope="col"> ${datos.numIdentificacion} </th>
            <th scope="col"> ${nombres} </th>
            <th scope="col"> ${apellidos} </th>
            <th scope="col"> ${rol} </th>
          </tr>
        </tbody>
      </table>
    </div>`

    // Punto de referencia para el nuevo elemento.
    const formularioEliConsultar = document.getElementById(eliminarYConsultar);

    formularioEliConsultar.innerHTML = tablaDatos;
  }

  // Función Eliminar.
  const eliminarUsuario = (e) => {
    alert("Eliminando usuario");
  };

  // Función Consultar.
  const consultarUsuario =  async (e) => {
    e.preventDefault();

    if (!tipoIdentificacion || !numeroIdentificacion) {
      alert('Ingrese todos los datos del empleado a consultar.');
      return;
    }

    await fetch(`http://localhost:3001/${numeroIdentificacion}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        message = data.message;
      } else {
        insertarDatos(data);
      }
    })
  };
  
  return (
  <article className = "row formatoUsuarios" id = "eliminarYConsultar">
    <form className="row g-3 text-center needs-validation">
      <h3>{funcionalidad}</h3>
      <div className ="col-md-5">
        <label htmlFor = "tipoIdentificacion" className = "form-label">Tipo de identificación</label>
        <select className ="form-select" id="tipoIdentificacion" onChange = {(e) => setTipoIdentificacion(e.target.value)} required>
          <option selected disabled value="">Seleccione el documento</option>
          <option>Cédula de ciudadanía</option>
          <option>Cédula de extranjería</option>
          <option>PEP</option>
          <option>Permiso por protección temporal</option>
        </select>
      </div>
      <div className="col-md-5">
        <label htmlFor="numeroIdentificacion" className="form-label">Número de identificación</label>
        <input type="text" className="form-control" id="numeroIdentificacion"  onChange = {(e) => setNumeroIdentificacion(e.target.value)} required placeholder="Sin puntos ni comas" />
      </div>

      <div className = "row formatoUsuarios">
          <div className="col-md-6">
            <button className="btn btn-primary" type="submit" onClick = {eliminarUsuario}>Eliminar</button>
          </div>
          <div className="col-md-6">
            <button className="btn btn-primary" type="submit" onClick = {consultarUsuario}>Consultar</button>
          </div>
        </div>
    </form>
  </article>
  )
};

export default EliConsUsuario;