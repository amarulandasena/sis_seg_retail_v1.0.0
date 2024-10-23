/* Funcionalidad que permite asignar el número al contenedor o caja que lleva la reserva de cada tienda */

import { React, useState, useRef } from 'react';
import '../css/formatoExterno.css';
import '../css/formatoInterno.css';

import RegresarAPP from '../componentes/RegresarAPP';
import BuscarReservasDia from './BuscarReservasDia';

function AsignarNumero () {

  //Hooks.
  const[codContenedor, setCodContenedor] = useState('');
  const[codSalida, setCodSalida] = useState('');
  const[fechaFacturacion, setFechaFacturacion] = useState('');
  const[codTienda, setCodTienda] = useState('');
  const[codReserva, setCodReserva] = useState('');

  // Creamos una variable para almacenar los mensajes enviados por el servidor(API) y el perfil del usuario.
  let message = " ";
  let rolUsuario = localStorage.getItem("rolUsuario");
  let permitir = true;

  // Constante para la limpieza del formulario.
  const limpiarFormulario = useRef();

  // Validar el perfil del usuario.
  if (rolUsuario != 'Segregador' && rolUsuario != 'Administrador') {
    alert('Usuario no cumple con el perfil.');
    permitir = false;
    return;
  }

  // Función para crear la etiqueta.
  const guardarEtiqueta = async (e) => {
    e.preventDefault();

    // Validamos que todos los datos sean ingresados.
    if (!codReserva || !codTienda || !codContenedor | !fechaFacturacion || !codSalida){
      alert('Ingrese todos los datos de la reserva.');
      return;
    }

    let datosEtiqueta = {
      'codContenedor' : codContenedor,
      'codSalida' : codSalida,
      'fechaFacturacion' : fechaFacturacion,
      'codTienda' : codTienda,
      'codReserva' : codReserva
    }

    await fetch(`http://localhost:3001/contenedores/`, {
      method : 'POST',
      headers : {
        'Content-type' : 'application/json',
      },
      body : JSON.stringify(datosEtiqueta),
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
      < BuscarReservasDia />
      <section className = "row formatoUsuarios">
        <form className="row g-3 text-center needs-validation" ref = {limpiarFormulario}>
          <h3> ASIGNAR NÚMERO DE CONTENEDOR </h3>

          <p>
            <em>
              * Ingrese todos los datos de la etiqueta que desea registrar, recuerde el consecutivo. <br/> 
            </em>
          </p>

          <div className="col-md-4">
            <label htmlFor="codigoContenedor" className="form-label">Código contenedor</label>
            <input type="text" className="form-control" id="codigoContenedor" onChange = {(e)=> setCodContenedor(e.target.value)} required />
          </div>
          <div className="col-md-4">
            <label htmlFor="codigoSalida" className="form-label">Código salida</label>
            <input type="text" className="form-control" id="codigoSalida" onChange = {(e)=> setCodSalida(e.target.value)} required />
          </div>
          <div className="col-md-4">
            <label htmlFor="fechaFacturacion" className="form-label">Fecha de facturación</label>
            <input type="date" className="form-control" id="fechaFacturacion" onChange = {(e) => setFechaFacturacion(e.target.value)} required />
          </div>
          <div className="col-md-4">
            <label htmlFor="codigoTienda" className="form-label">Código tienda</label>
            <input type="text" className="form-control" id="codigoTienda" onChange = {(e)=> setCodTienda(e.target.value)} required />
          </div>
          <div className="col-md-4">
            <label htmlFor="codigoReserva" className="form-label">Código reserva</label>
            <input type="text" className="form-control" id="codigoReserva" onChange = {(e)=> setCodReserva(e.target.value)} required />
          </div>

          <div className="col-md-4">
            <button className="btn btn-primary margenBoton" type="submit" onClick = {guardarEtiqueta} >Guardar</button>
          </div>
        </form>
      </section>
      < RegresarAPP />
    </main> : null
  )
};

export default AsignarNumero;