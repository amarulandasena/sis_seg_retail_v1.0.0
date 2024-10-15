// Módulo para la creación de las tiendas.

import { React, useState, useRef } from 'react';
import '../css/formatoExterno.css';
import '../css/formatoInterno.css';

import RegresarAPP from '../componentes/RegresarAPP';

function ModificarTiendas () {

  // Hooks.
  const[codTienda, setCodTienda] = useState('');
  const[nit, setNit] = useState('');
  const[nombreTienda, setNombreTienda] = useState('');
  const[ciudad, setCiudad] = useState('');
  const[direccion, setDireccion] = useState('');
  const[telefono, setTelefono] = useState('');
  const[nombreAdmin, setNombreAdmin] = useState('');
  const[telefonoAdmin, setTelefonoAdmin] = useState('');

  // Creamos una variable para almacenar los mensajes enviados por el servidor(API).
  let message = " ";
  let rolUsuario = localStorage.getItem("rolUsuario");
  let permitir = true;

  // Constante para la limpieza del formulario.
  const limpiarFormulario = useRef();

  // Validar el perfil del usuario.
  if (rolUsuario != 'Administrador' && rolUsuario != 'Gerente' && rolUsuario != 'Gerente retail') {
    alert('Usuario no cumple con el perfil.');
    permitir = false;
    return;
  }
  
  
  const modificarTienda = async (e) => {
    e.preventDefault();

    // Validamos que todos los datos sean ingresados.
    if (!codTienda || !nit || !nombreTienda || !ciudad || !direccion || !telefono || !nombreAdmin ||!telefonoAdmin){
      alert('Ingrese todos los datos de la tienda a registrar.');
      return;
    }

    let datosTienda = {'codTienda' : codTienda, 
      'nit' : nit, 
      'nombreTienda' : nombreTienda, 
      'ciudad' : ciudad, 
      'direccion' : direccion, 
      'telefono' : telefono,
      'nombreAdmin' : nombreAdmin,
      'telefonoAdmin' : telefonoAdmin}

      await fetch(`http://localhost:3001/tienda/${codTienda}`, {
        method : 'PUT',
        headers : {
          'Content-type' : 'application/json',
        },
        body : JSON.stringify(datosTienda),
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
    <section className = "container-fluid fondoUsuarios">
      <article className = "row formatoUsuarios">
        <form className="row g-3 text-center needs-validation" ref = {limpiarFormulario}>
          <h3>ACTUALIZAR TIENDA</h3>
          <p>
            <em>
                * Ingrese los datos de la tienda como registran en cámara de comercio o en el rut. <br/>
                * Para craer o actualizar una tienda, <strong> seleccione o de clic en el botón correspondiente.</strong> 
            </em>
          </p>
          <div className="col-md-4">
            <label htmlFor="codigoTienda" className="form-label">Código tienda</label>
            <input type="text" className="form-control" id="codigoTienda" onChange = {(e)=> setCodTienda(e.target.value)} required placeholder = "Según el consecutivo" />
          </div>
          <div className="col-md-4">
            <label htmlFor="nitTienda" className="form-label">Nit tienda</label>
            <input type="text" className="form-control" id="nitTienda" onChange = {(e) => setNit(e.target.value)} required />
          </div>
          <div className="col-md-4">
            <label htmlFor="nombreTienda" className="form-label">Nombre tienda</label>
            <input type="text" className="form-control" id="nombreTienda" onChange = {(e) => setNombreTienda(e.target.value)} required />
          </div>
          <div className="col-md-4">
            <label htmlFor="ciudadTienda" className="form-label">Ciudad de ubicación</label>
            <select className="form-select" id="ciudadTienda" onChange = {(e) => setCiudad(e.target.value)} required>
              <option selected disabled value="">Seleccione la ciudad</option>
              <option>Santa fé de Bogotá</option>
              <option>Arauca</option>
              <option>Armenia</option>
              <option>Barranquilla</option>
              <option>Cali</option>
              <option>Cúcuta</option>
              <option>Cartagena</option>
              <option>Envigado</option>
              <option>Manizales</option>
              <option>Medellín</option>
              <option>Montería</option>
              <option>Neiva</option>
              <option>Pasto</option>
              <option>Pereira</option>
              <option>Popayán</option>
              <option>Quibdó</option>
              <option>Rioacha</option>
              <option>Santa Marta</option>
              <option>Sincelejo</option>
              <option>Tunja</option>
              <option>Valledupar</option>
              <option>Villavicencio</option>
              <option>Yopal</option>
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="direccionTienda" className="form-label">Dirección</label>
            <input type="text" className="form-control" id="direccionTienda" onChange = {(e) => setDireccion(e.target.value)} required />
          </div>
          <div className="col-md-4">
            <label htmlFor="telefonoTienda" className="form-label">Teléfono tienda</label>
            <input type="text" class="form-control" id="telefonoTienda" onChange = {(e) => setTelefono(e.target.value)} required />
          </div>
          <div className="col-md-4">
            <label htmlFor="nombreAdministrador" className="form-label">Nombre del administrador</label>
            <input type="text" className="form-control" id="nombreAdministrador" onChange = {(e) => setNombreAdmin(e.target.value)} required placeholder = "Como registra en el documento de identidad" />
          </div>
          <div className="col-md-4">
            <label htmlFor="telAdministrador" className="form-label">Teléfono del administrador</label>
            <input type="text" className="form-control" id="telAdministrador" onChange = {(e) => setTelefonoAdmin(e.target.value)} required />
          </div>
 
          <div className="col-md-4">
            <button className="btn btn-primary margenBoton" type="submit" onClick = {modificarTienda} >Actualizar</button>
          </div>
            
        </form>  
      </article>
      < RegresarAPP />
    </section> : null
    
  )
};

export default ModificarTiendas;
