/* Componente que permite ver la información completa de la reserva */

import { React, useState, useRef } from 'react';
import '../css/formatoExterno.css';
import '../css/formatoInterno.css';

import RegresarAPP from '../componentes/RegresarAPP';

function ConsultarReservas () {

  // Declaramos los Hooks.
  const[codReserva, setCodReserva] = useState('');
  const[codTienda, setCodTienda] = useState('');
  const[nombreTienda, setNombreTienda] = useState('');
  const[fechaFacturacion, setFechaFacturacion] = useState('');
  const[estadoReserva, setEstadoReserva] = useState('');

  // Constante para la limpieza del formulario.
  const limpiarFormulario = useRef();

  // Creamos una variable para almacenar los mensajes enviados por el servidor(API) y el perfil del usuario.
  let message = " ";

  // Función para validar la informació general de la reserva.
  const buscarReserva = async (e) => {
    e.preventDefault();

    // Validamos que todos los datos sean ingresados.
    if (!codReserva){
      alert('Ingrese todos los datos del producto.');
    return;
    }

    await fetch(`http://localhost:3001/reserva/${codReserva}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        message = data.message;  
        alert(message);
      } else {
        setCodTienda(data.codTienda);
        setNombreTienda(data.nombreTienda);
        setFechaFacturacion(data.fechaFacturacion);
        setEstadoReserva(data.estadoReserva);
      }
    })

    limpiarFormulario.current.reset();
  }
  
  const buscarProductos = async (e) => {
    e.preventDefault();

    // Definir el contexto del formulario.
    const cuerpoTabla = document.getElementById('cuerpoTabla');

    // Validamos que todos los datos sean ingresados.
    if (!codReserva){
      alert('Ingrese el código de la reserva.');
    return;
    }

    await fetch(`http://localhost:3001/productosReserva/${codReserva}`)
    .then((response) => response.json())
    .then((data) => {
      if(data.message){
        message = data.message;
        alert(message);
      } else {
        data.forEach((prod) => {
          let nuevaFila = document.createElement('tr');
          nuevaFila.innerHTML = `<th scope="row"> ${prod.codProducto}  </th>
                                 <th scope="col"> ${prod.codReserva} </th>
                                 <th scope="col"> ${prod.nombreProducto} </th>
                                 <th scope="col"> ${prod.cantidadProducto} </th>`
          cuerpoTabla.appendChild(nuevaFila);

        })
      }
    })
  }

  return (
    <main className = "container-fluid fondoUsuarios">
      <section className = "row formatoUsuarios">
        <form className="row g-3 text-center needs-validation" ref = {limpiarFormulario}>
          <h3> CONSULTAR RESERVA </h3>

          <p>
            <em>
              * Ingrese el código de la reserva que desea consultar. <br/> 
            </em>
          </p>

          <div className="col-md-4">
            <label htmlFor="codigoReserva" className="form-label">Código reserva</label>
            <input type="text" className="form-control" id="codigoReserva" onChange = {(e)=> setCodReserva(e.target.value)} required />
          </div>
          <div className="col-md-4">
            <button className="btn btn-primary margenBoton" type="submit" onClick = {buscarReserva} >Buscar</button>
          </div>
          <div className="col-md-4">
            <button className="btn btn-primary margenBoton" type="submit" onClick = {buscarProductos} >Cargar productos</button>
          </div>
        </form>
      </section>

      <section className = "row formatoUsuarios">
        <div className = "row tablaProductos">
          <p> <strong> Datos de la reserva </strong> </p>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col"> Código reserva </th>
                  <th scope="col"> Código tienda </th>
                  <th scope="col"> Nombre de la tienda </th>
                  <th scope="col"> Fecha de facturación </th>
                  <th scope="col"> Estado de la reserva </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row"> {codReserva} </th>
                  <th scope="col"> {codTienda} </th>
                  <th scope="col"> {nombreTienda} </th>
                  <th scope="col"> {fechaFacturacion} </th>
                  <th scope="col"> {estadoReserva} </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>        
      </section>

      <section className = "row formatoUsuarios"> 
        <div className="table-responsive tablaProductos">
          <table className="table">
            <thead>
              <tr>
                <th scope="col"> Código del producto</th>
                <th scope="col"> Código de la reserva</th>
                <th scope="col"> Nombre del producto </th>
                <th scope="col"> Cantidad </th>
              </tr>
            </thead>
            <tbody id = "cuerpoTabla">
              
            </tbody>
          </table>
        </div>
      </section> 
      < RegresarAPP />
    </main>
  )
};

export default ConsultarReservas;