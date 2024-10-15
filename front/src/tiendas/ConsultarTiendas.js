/* Módulo para consultar, eliminar o modificar una tienda */

import { React, useState, useRef } from 'react';
import '../css/formatoExterno.css';
import '../css/formatoInterno.css';

import RegresarAPP from '../componentes/RegresarAPP';

function ConsultarTiendas () {

  //Creamos los hooks.
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
   if (rolUsuario == 'Segregador' || rolUsuario == 'Marcador') {
    alert('Usuario no cumple con el perfil.');
    permitir = false;
    return;
  }


  const consultarTienda = async (e) => {
    e.preventDefault();

    if (!codTienda) {
      alert('Ingrese el código de la tienda.');
      return;
    }

    await fetch(`http://localhost:3001/tienda/${codTienda}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          message = data.message;  
          alert(message);
        } else {
          setNit(data.nit);
          setNombreTienda(data.nombreTienda);
          setCiudad(data.ciudad);
          setDireccion(data.direccion);
          setTelefono(data.telefono); 
          setNombreAdmin(data.nombreAdmin);
          setTelefonoAdmin(data.telefonoAdmin);
        }
    })

    limpiarFormulario.current.reset();
    
  };

  return (

    <section className = "container-fluid fondoUsuarios">
      <article className = "row formatoUsuarios">

        <form className = "row g-3 text-center needs-validation" ref = {limpiarFormulario}>
          <h3>CONSULTAR TIENDA</h3>

          <p>
            <em>
              * Ingrese el código de la tienda que desea consultar. <br/>
            </em>
          </p>
    
          <div className ="col-md-6">
            <label htmlFor="codigoTienda" className="form-label">Código tienda</label>
            <input type="text" className="form-control" id="codigoTienda" onChange = {(e) => setCodTienda(e.target.value)} required placeholder = "Como registra en la base de datos" />
          </div>
          <div className="col-md-6">
            <button className="btn btn-primary botonVertical" type="submit" onClick={consultarTienda} >CONSULTAR</button>
          </div>
        </form>

        <div className = "row">
          <p> <strong> Datos de la tienda </strong> </p>
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col"> Código de la tienda </th>
                  <th scope="col"> Nit </th>
                  <th scope="col"> Nombre de la tienda </th>
                  <th scope="col"> Ciudad </th>
                  <th scope="col"> Direccíon </th>
                  <th scope="col"> Teléfono </th>
                  <th scope="col"> Nombre del administrador </th>
                  <th scope="col"> Teléfono del administrador </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row"> {codTienda} </th>
                  <th scope="col"> {nit} </th>
                  <th scope="col"> {nombreTienda} </th>
                  <th scope="col"> {ciudad} </th>
                  <th scope="col"> {direccion} </th>
                  <th scope="col"> {telefono} </th>
                  <th scope="col"> {nombreAdmin} </th>
                  <th scope="col"> {telefonoAdmin} </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </article>
      <RegresarAPP />
    </section>
    
  )
};

export default ConsultarTiendas;