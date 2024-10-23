/* Componente para el marcado de los productos (validación de cantidades físicas y lógicas y asignación del código) */

import { React, useState, useRef } from 'react';

import '../css/formatoExterno.css';
import '../css/formatoInterno.css';

import RegresarAPP from '../componentes/RegresarAPP';

function RegistrarMarcado () {

  const[codTienda, setCodTienda] = useState('');
  const[codReserva, setCodReserva] = useState('');
  const[fechaFacturacion, setFechaFacturacion] = useState('');

  // Creamos una variable para almacenar los mensajes enviados por el servidor(API) y el perfil del usuario.
  let message = " ";
  let rolUsuario = localStorage.getItem("rolUsuario");
  let permitir = true;

  // Constante para la limpieza del formulario.
  const limpiarFormulario = useRef();

  // Validar el perfil del usuario.
  if (rolUsuario != 'Marcador' && rolUsuario != 'Administrador') {
    alert('Usuario no cumple con el perfil.');
    permitir = false;
    return;
  }

  const generarLista = (data) => {

    console.log(data);
    // Definir el contexto del formulario.
    const cuerpoTabla = document.getElementById('cuerpoTabla1');

    let data1 = [];
    
    data1 = data.filter(reserva => reserva.fechaFacturacion == fechaFacturacion);

    data1.forEach((reserva) => {

      let nuevaFila = document.createElement('tr');
      nuevaFila.innerHTML = `<th scope="row"> ${reserva.codReserva} </th>`;
      cuerpoTabla.appendChild(nuevaFila);

    })

  }

  // Función para recuperar las reservas hechas por la tienda en una determinada fecha.
  const buscarReservas = async (e) => {
    e.preventDefault();

    // Validamos que todos los datos sean ingresados.
    if (!codTienda || !fechaFacturacion){
      alert('Ingrese todos los datos necesarios');
      return;
    }

    await fetch(`http://localhost:3001/cargarProductos/${codTienda}`)
    .then((response) => response.json())
    .then((data) => {
      if(data.message) {
        message = data.message;
        alert(message);
      } else {
        generarLista(data);
      }

      limpiarFormulario.current.reset();
    })
  }

  // Función para cargar los productos de la reserva.
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
        console.log(data);

        data.forEach((prod) => {
          
          let nuevaFila = document.createElement('tr');
          let columnaCheck = document.createElement('th');
          let nuevoCheck = document.createElement('div');

          nuevaFila.innerHTML = `<th scope="row"> ${prod.codProducto}  </th>
                                 <th scope="col"> ${prod.codReserva} </th>
                                 <th scope="col"> ${prod.nombreProducto} </th>
                                 <th scope="col"> ${prod.cantidadProducto} </th>`

          nuevoCheck.innerHTML = `<div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                                    <label class="form-check-label" for="flexCheckDefault">
                                      Marcado
                                    </label>
                                  </div>`                   

          columnaCheck.appendChild(nuevoCheck);
          nuevaFila.appendChild(columnaCheck);
          cuerpoTabla.appendChild(nuevaFila);

        })
      }
    })
  }

  return (
    (permitir) ?
    <main className = "container-fluid fondoUsuarios">
      <section className = "row formatoUsuarios">
        <form className="row g-3 text-center needs-validation" ref = {limpiarFormulario}>
          <h3> REGISTRAR MARCADO </h3>

          <p>
            <em>
              * Ingrese el código de la tienda y la fecha de facturación. <br/> 
            </em>
          </p>

          <div className="col-md-4">
            <label htmlFor="codigoTienda" className="form-label">Código tienda</label>
            <input type="text" className="form-control" id="codigoTienda" onChange = {(e)=> setCodTienda(e.target.value)} required />
          </div>
          <div className="col-md-4">
            <label htmlFor="fechaFacturacion" className="form-label">Fecha de facturación</label>
            <input type="date" className="form-control" id="fechaFacturacion" onChange = {(e) => setFechaFacturacion(e.target.value)} required />
          </div>
          <div className="col-md-4">
            <button className="btn btn-primary margenBoton" type="submit" onClick = {buscarReservas} >Buscar reservas</button>
          </div>
        </form>
      </section>

      <section className = "row formatoUsuarios">
          <p> <strong> Códigos de las reservas </strong> </p>
          <div className="table-responsive ">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col"> Código reserva </th>
                </tr>
              </thead>
              <tbody id = "cuerpoTabla1">

              </tbody>
            </table>
          </div> 
      </section>

      <section className = "row formatoUsuarios">
        <form className="row g-3 text-center needs-validation" ref = {limpiarFormulario}> 
          <div className="col-md-4">
            <label htmlFor="codigoReserva" className="form-label">Código reserva</label>
            <input type="text" className="form-control" id="codigoReserva" onChange = {(e)=> setCodReserva(e.target.value)} required />
          </div>
          <div className="col-md-4">
            <button className="btn btn-primary margenBoton" type="submit" onClick = {buscarProductos} >Cargar productos</button>
          </div> 
        </form> 
      </section>

      <section className = "row formatoUsuarios"> 
        <p> <strong> Información de los productos </strong> </p>
        <div className="table-responsive tablaProductos">
          <table className="table">
            <thead>
              <tr>
                <th scope="col"> Código del producto</th>
                <th scope="col"> Código de la reserva</th>
                <th scope="col"> Nombre del producto </th>
                <th scope="col"> Cantidad </th>
                <th scope="col"> Acciones </th>
              </tr>
            </thead>
            <tbody id = "cuerpoTabla">
              
            </tbody>
          </table>
        </div>
      </section>
      < RegresarAPP />
    </main> : null
  )
};

export default RegistrarMarcado;