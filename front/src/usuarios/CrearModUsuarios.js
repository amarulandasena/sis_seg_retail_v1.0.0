// Módulo de usuarios.

import { React, useRef, useState } from 'react';
import '../css/formatoExterno.css';
import '../css/formatoInterno.css';

function CrearModUsuarios () {

  // Creamos los Hooks para administrar los cambios en los inputs.
  const [tipoIdentificacion, setTipoIdentificacion] = useState('');
  const [numeroIdentificacion, setNumeroIdentificacion] = useState('');
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [apellidosUsuario, setApellidosUsuario] = useState('');
  const [rol, setRol] = useState('');
  const [contrasegna, setContrasegna] = useState('');

  // Creamos una variable para almacenar los mensajes enviados por el servidor(API).
  let message = " ";

  // Constante para la limpieza del formulario.
  const limpiarFormulario = useRef();
   
  // Función Crear
  const crearUsuario = async (e) => {
    e.preventDefault();

    // Validamos que todos los datos sean ingresados.
    if (!tipoIdentificacion || !numeroIdentificacion || !nombreUsuario || !apellidosUsuario || !rol || !contrasegna){
      alert('Ingrese todos los datos del empleado a registrar.');
      return;
    }

    let datosUsuario = {'tipoIdentificacion' : tipoIdentificacion, 
      'numIdentificacion' : numeroIdentificacion, 
      'nombres' : nombreUsuario, 
      'apellidos' : apellidosUsuario, 
      'rol' : rol, 
      'contrasegna' : contrasegna}

    await fetch('http://localhost:3001/usuario/', {
      method : 'POST',
      headers : {
        'Content-type' : 'application/json',
      },
      body : JSON.stringify(datosUsuario),
    })
      .then((response) => response.json())
      .then((data) => {
        message = data.message;
      });

    alert(message);
    limpiarFormulario.current.reset();
    };

  // Función Actualizar.
  const modificarUsuario = async (e) => {
    e.preventDefault();

    // Validamos el ingreso de los datos.
    if (!tipoIdentificacion || !numeroIdentificacion || !nombreUsuario || !apellidosUsuario || !rol || !contrasegna){
      alert('Ingrese todos los datos del empleado que desea modificar.');
      return;
    }

    let datosUsuario = {'tipoIdentificacion' : tipoIdentificacion,
      'nombres' : nombreUsuario, 
      'apellidos' : apellidosUsuario, 
      'rol' : rol, 
      'contrasegna' : contrasegna}

    await fetch(`http://localhost:3001/usuario/${numeroIdentificacion}`, {
      method : 'PUT',
      headers : {
        'Content-type' : 'application/json',
      },
      body : JSON.stringify(datosUsuario),
    })
      .then((response) => response.json())
      .then((data) => {
      message = data.message;
      alert(message);
      });

    limpiarFormulario.current.reset();
  }

  return (
      
    <article className = "row formatoUsuarios">
      <form className ="row g-3 text-center needs-validation" id = "crearModUsuario" ref = {limpiarFormulario} >   
        <h3>CREAR Y/O ACTUALIZAR USUARIO</h3>
        <p>
          <em>
              * Ingrese el número de identificación, los nombres y apellidos como registran en el documento de identidad.<br/>
              * Para la contraseña, asigne una de mínimo 5 caracteres. <br/>
              * Para craer o actualizar un usuario, <strong> seleccione o de clic en el botón correspondiente. </strong>
          </em>    
        </p>

        <div className="col-md-4">
          <label htmlFor="tipoIdentificacion" className="form-label">Tipo de identificación</label>
          <select className="form-select" id="tipoIdentificacion" onChange = {(e) => setTipoIdentificacion(e.target.value)} required>
            <option selected disabled>Seleccione el documento</option>
            <option>Cédula de ciudadanía</option>
            <option>Cédula de extranjería</option>
            <option>PEP</option>
            <option>Permiso por protección temporal</option>
          </select>
        </div>
        <div className="col-md-4">
          <label htmlFor="numeroIdentificacion" className="form-label">Número de identificación</label>
          <input type="text" className="form-control" id="numeroIdentificacion" onChange = {(e) => setNumeroIdentificacion(e.target.value)} required />
        </div>
        <div className="col-md-4">
          <label htmlFor="nombreUsuario" className="form-label">Nombres</label>
          <input type="text" className="form-control" id="nombreUsuario" onChange = {(e) => setNombreUsuario(e.target.value) } required />
        </div>
        <div className="col-md-4">
          <label htmlFor="apellidosUsuario" className="form-label">Apellidos</label>
          <input type="text" className="form-control" id="apellidosUsuario" onChange = {(e) => setApellidosUsuario(e.target.value)} required />
        </div>
        <div className="col-md-4">
          <label htmlFor="rol" className="form-label">Rol o cargo</label>
          <select className="form-select" id="rol" onChange = {(e) => setRol(e.target.value)} required>
            <option selected disabled value="">Seleccione el cargo</option>
            <option>Gerente</option>
            <option>Gerente retail</option>
            <option>Supervisor</option>
            <option>Digitador</option>
            <option>Auxiliar de operaciones</option>
            <option>Segregador</option>
            <option>Marcador</option>
          </select>
        </div>
        <div className="col-md-4">
          <label htmlFor="contrasegna" className="form-label">Contraseña</label>
          <input type="password" class="form-control" id="contrasegna" onChange = {(e) => setContrasegna(e.target.value)} required />
        </div>

        <div className = "row formatoBotones">
          <div className="col-md-6">
            <button className="btn btn-primary" type="submit" onClick = {crearUsuario}>Crear</button>
          </div>
          <div className="col-md-6">
            <button className="btn btn-primary" type="submit" onClick = {modificarUsuario}>Actualizar</button>
          </div>
        </div>     
      </form>
    </article>
      
  )
};

export default CrearModUsuarios;