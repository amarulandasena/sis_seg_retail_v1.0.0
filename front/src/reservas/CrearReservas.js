import { React, useState, useRef } from 'react';
import RegresarAPP from '../componentes/RegresarAPP';

import '../css/formatoExterno.css';
import '../css/formatoInterno.css';

function CrearReservas () {

 // Hooks.
 const[codReserva, setCodReserva] = useState('');
 const[codTienda, setCodTienda] = useState('');
 const[nombreTienda, setNombreTienda] = useState('');
 const[fechaFacturacion, setFechaFacturacion] = useState('');
 const[estadoReserva, setEstadoReserva] = useState('');

 const[codProducto, setCodProducto] = useState('');
 const[nombreProducto, setNombreProducto] = useState('');
 const[cantidadProducto, setCantidadProducto] = useState(0);

  // Creamos una variable para almacenar los mensajes enviados por el servidor(API) y el perfil del usuario.
  let message = " ";
  let rolUsuario = localStorage.getItem("rolUsuario");


  // Constante para la limpieza del formulario.
  const limpiarFormulario = useRef();
  const limpiarFormulario1 = useRef();


  // Arreglo para agregar el detalle de los productos.
  let detalleProductos = [];


  // Objeto para almacenar los productos en el arreglo.
  let detalleProducto = {
    'codProducto' : codProducto,
    'codReserva' : codReserva,
    'nombreProducto' : nombreProducto,
    'cantidadProducto' : cantidadProducto
  }


  // Función para enviar la información a la BBDD.
  const crearReserva = async (e) => {
    e.preventDefault();

    // Validamos que todos los datos sean ingresados.
    if (!codReserva || !codTienda || !nombreTienda | !fechaFacturacion || !estadoReserva){
      alert('Ingrese todos los datos de la reserva.');
    return;
    }

    // Validar el perfil del usuario.
    if (rolUsuario == 'Administrador' || rolUsuario == 'Digitador') {
      alert('Producto agregado.');
    } else {
      alert('Usuario no cumple con el perfil.');
      return;
    } 

    let datosReserva = {
      'codReserva' : codReserva,
      'codTienda' : codTienda,
      'nombreTienda' : nombreTienda,
      'fechaFacturacion' : fechaFacturacion,
      'estadoReserva' : estadoReserva
    }

    await fetch('http://localhost:3001/reserva/', {
      method : 'POST',
      headers : {
        'Content-type' : 'application/json',
      },
      body : JSON.stringify(datosReserva),
    })
    .then((response) => response.json())
    .then((data) => {
      message = data.message;
      alert(message);
    });

    limpiarFormulario.current.reset();
    detalleProductos = [];

  }

  // Función para enviar los productos a la BBDD.
  const enviarLista = async () => {

      // Validamos que todos los datos sean ingresados.
      if (!codReserva || !codProducto || !nombreProducto || !cantidadProducto){
        alert('Ingrese todos los datos del producto.');
      return;
      }

      // Validar el perfil del usuario.
      if (rolUsuario == 'Administrador' || rolUsuario == 'Digitador') {
        alert('Usuario cumple con el perfil.');
      } else {
        alert('Usuario no cumple con el perfil.');
        return;
      }
      
      await fetch('http://localhost:3001/productosReserva/', {
        method : 'POST',
        headers : {
          'Content-type' : 'application/json',
        },
        body : JSON.stringify(detalleProducto),
      })
      .then((response) => response.json())
      .then((data) => {
        message = data.message;
        alert(message);
        limpiarFormulario.current.reset();
      });

     
  }

  // Función para generar las filas de la tabla.
  const crearTabla = () => {

    // Definir el contexto del formulario.
    const cuerpoTabla = document.getElementById('cuerpoTabla');

    detalleProductos.forEach((det) => {
      let nuevaFila = document.createElement('tr');
      nuevaFila.innerHTML = `<th scope="row"> ${det.codProducto}  </th>
                             <th scope="col"> ${det.codReserva} </th>
                             <th scope="col"> ${det.nombreProducto} </th>
                             <th scope="col"> ${det.cantidadProducto} </th>`
      
      let columnaBoton = document.createElement('th');
      let botonEliminar = document.createElement('button');
      botonEliminar.classList.add('btn', 'btn-danger', 'margenBoton', 'botonEliminar');
      botonEliminar.innerText = 'Eliminar';

      botonEliminar.onclick =() => {
        eliminarProductoLista(detalleProducto.codProducto);
      }

      columnaBoton.appendChild(botonEliminar)
      nuevaFila.appendChild(columnaBoton);
      cuerpoTabla.appendChild(nuevaFila);

    })
  }
  
  
  // Función para cargar productos en la tabla.
  const agregarALista = (e) => {
    e.preventDefault();

    detalleProductos.push(detalleProducto);

    crearTabla();
    
    limpiarFormulario1.current.reset();
    enviarLista();
  }

  
  // Función para eliminar los productos de la pantalla.
  const eliminarProductoLista = (codProd) => {
    detalleProductos = detalleProductos.filter((prod) => {
      if (codProd !== prod.codProducto){
        return prod;
      }
    });
    crearTabla();
  }
  
  return (
    <main className = "container-fluid fondoUsuarios">
      <section className = "row formatoUsuarios">
        <form className="row g-3 text-center needs-validation" ref = {limpiarFormulario}>
          <h3> CREAR RESERVA </h3>
          <p>
            <em>
              * Ingrese los datos completos de la reserva. <br/>
              * Recuerde agregar los productos antes de crear la reserva.
            </em>
          </p>  
          <div className="col-md-4">
            <label htmlFor="codigoReserva" className="form-label">Código reserva</label>
            <input type="text" className="form-control" id="codigoReserva" onChange = {(e)=> setCodReserva(e.target.value)} required />
          </div>  
          <div className="col-md-4">
            <label htmlFor="codigoTienda" className="form-label">Código tienda</label>
            <input type="text" className="form-control" id="codigoTienda" onChange = {(e)=> setCodTienda(e.target.value)} required />
          </div>
          <div className="col-md-4">
            <label htmlFor="nombreTienda" className="form-label">Nombre tienda</label>
            <input type="text" className="form-control" id="nombreTienda" onChange = {(e) => setNombreTienda(e.target.value)} required />
          </div>
          <div className="col-md-4">
            <label htmlFor="fechaFacturacion" className="form-label">Fecha de facturación</label>
            <input type="date" className="form-control" id="fechaFacturacion" onChange = {(e) => setFechaFacturacion(e.target.value)} required />
          </div>
          <div className="col-md-4">
            <label htmlFor="estadoReserva" className="form-label">Estado de la reserva</label>
            <select className="form-select" id="estadoReserva" onChange = {(e) => setEstadoReserva(e.target.value)} required>
              <option selected disabled value="">Seleccione el estado</option>
              <option>FRACCIONADA</option>
              <option>MARCADA</option>
              <option>SEGREGADA</option>
            </select>
          </div>
          <div className="col-md-4">
            <button className="btn btn-primary margenBoton" type="submit" onClick = {crearReserva} >Crear reserva</button>
          </div>
        </form>
      </section>


      <section className = "row formatoUsuarios">
        <form className="row g-3 text-center needs-validation" id="formularioProductos" ref = {limpiarFormulario}>
        <h3> INGRESAR PRODUCTOS </h3>
          <p>
            <em>
              <strong> * Ingrese primero todos los productos incluidos dentro de la reserva. </strong>
            </em>
          </p>
          <div className="col-md-4">
            <label htmlFor="codProducto" className="form-label">Código del producto</label>
            <select className="form-select" id="codProducto" onChange = {(e) => setCodProducto(e.target.value)} required>
              <option selected disabled value="">Seleccione el código</option>
              <option>20-0039855</option>
              <option>20-0060760</option>
              <option>20-0064310</option>
              <option>20-0064341</option>
              <option>20-0072913</option>
              <option>20-0078924</option>
              <option>20-0078932</option>
              <option>20-0082481</option>
              <option>20-0082678</option>
              <option>20-0082687</option>
              <option>20-0082688</option>
              <option>20-0082974</option>
              <option>20-0083916</option>
              <option>20-0083940</option>
              <option>20-0083952</option>
              <option>20-0084293</option>
              <option>20-0084882</option>
              <option>20-0085806</option>
              <option>20-0086107</option>
              <option>20-0086172</option>
              <option>20-0086399</option>
              <option>20-0086432</option>
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="nombreProducto" className="form-label">Nombre del producto</label>
            <select className="form-select" id="nombreProducto" onChange = {(e) => setNombreProducto(e.target.value)} required>
              <option selected disabled value="">Seleccione el producto</option>
              <option>CZ NITRO EDT 100 ML</option>
              <option>CZ NITRO AIR EDT 100 ML</option>
              <option>ES COMFORCE COL 120 ML</option>
              <option>ES COMFORCE SH 2 EN 1 300 ML</option>
              <option>ES COMFORCE XPLAS COL 120 ML</option>
              <option>ES EXPRESSION TAL PERF 140 G</option>
              <option>ES LIMAGE TALCO CC 140 G</option>
              <option>CZ SCORE EDT 50 ML</option>
              <option>ES MINI CHI COL RU D CC 120 ML</option>
              <option>ES MINI CHI DESE CC 200 ML</option>
              <option>ES MINI CHI SH TUTTI CC 300 ML</option>
              <option>LB DEV MGSED EDT 100 ML</option>
              <option>LB REVE SENSUELLE EDP 50 ML</option>
              <option>LB DEVOS MAGNETIC EDT 100 ML</option>
              <option>LB ID EDT UNISEX 100 ML</option>
              <option>LB PERF SBELTESSE G2 200 ML</option>
              <option>LB LIASSON PERFUME QUP 50 ML</option>
              <option>ES LIMAGE PARFUM 50 ML</option>
              <option>LB ESSENTIAL MICELAR 180 ML</option>
              <option>CY NITRO INTENSE EDT 100 ML</option>
              <option>LB MITHYKA EDP QUP 50 ML</option>
              <option>ES EXPRESSION EDP CC 50 ML</option>
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="cantidadProducto" className="form-label">Cantidad de producto</label>
            <input type="number" step ="1" className="form-control" id="cantidadProducto" onChange = {(e)=> setCantidadProducto(e.target.value)} required />
          </div>
          <div className="col-12">
            <button className="btn btn-primary margenBoton" type="submit" onClick = {agregarALista} >Agregar</button>
          </div>
        </form>
      </section>
        <div class="table-responsive">
          <table class="table">
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
      <section className = "row formatoUsuarios">

      </section>
      < RegresarAPP />
    </main>
    
  )
};

export default CrearReservas;