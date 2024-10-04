/* Componente que permitirá modificar, consultar o eliminar un usuario, según el evento y los props que reciba. */

import { React, useState, useRef } from 'react';
import '../css/formatoExterno.css';
import '../css/formatoInterno.css';

import MensajeIngresoDatos from '../componentes/MensajeIngresoDatos';

function EliConsUsuario () {

  // Creamos los hooks.
  const [tipoIdentificacion, setTipoIdentificacion] = useState('');
  const [numeroIdentificacion, setNumeroIdentificacion] = useState('');
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [apellidosUsuario, setApellidosUsuario] = useState('');
  const [rol, setRol] = useState('');

  // Creamos una variable para almacenar los mensajes enviados por el servidor(API).
  let message = " ";

  // Constante para la limpieza del formulario.
  const limpiarFormulario = useRef();

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

  // Función Consultar.
  const consultarUsuario =  async (e) => {
    e.preventDefault();

    if (!tipoIdentificacion || !numeroIdentificacion) {
      alert('Ingrese todos los datos del empleado a consultar.');
      return;
    }

    await fetch(`http://localhost:3001/usuario/${numeroIdentificacion}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          message = data.message;  
          alert(message);
        } else {
          setNombreUsuario(data.nombres);
          setApellidosUsuario(data.apellidos);
          setRol(data.rol);
        }
    })

    limpiarFormulario.current.reset();
  };
  
  return (
  <article className = "row formatoUsuarios" id = "eliminarYConsultar">
    <form className="row g-3 text-center needs-validation centrado" ref = {limpiarFormulario}>
      <h3>CONSULTAR Y/O ELIMINAR USUARIO</h3>
      < MensajeIngresoDatos />
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

      <div className = "col-md-2 formatoBotonesVerticales">
        <div className="botonVertical">
          <button className="btn btn-primary" type="submit" onClick = {eliminarUsuario}>Eliminar</button>
        </div>
        <div className="botonVertical">
          <button className="btn btn-primary" type="submit" onClick = {consultarUsuario}>Consultar</button>
        </div>
      </div>
    </form>
    <div className = "row">
      <p> <strong> Datos colaborador </strong> </p>
      <div class="table-responsive">
        <table class="table">
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
              <th scope="row"> {tipoIdentificacion} </th>
              <th scope="col"> {numeroIdentificacion} </th>
              <th scope="col"> {nombreUsuario} </th>
              <th scope="col"> {apellidosUsuario} </th>
              <th scope="col"> {rol} </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </article>
  )
};

export default EliConsUsuario;