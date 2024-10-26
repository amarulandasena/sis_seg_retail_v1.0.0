/* Componente que permite agregar los productos que incluye la resserva */

import { React, useState } from 'react';

import '../css/formatoExterno.css';
import '../css/formatoInterno.css';

function ProductosReservas () {

  // Hooks.
  const[codReserva, setCodReserva] = useState('');
  const[codProducto, setCodProducto] = useState('');
  const[nombreProducto, setNombreProducto] = useState('');
  const[cantidadProducto, setCantidadProducto] = useState(0);

  // Creamos una variable para almacenar los mensajes enviados por el servidor(API) y el perfil del usuario.
  let message = " ";

  // Objeto para almacenar los productos en el arreglo.
  let detalleProducto = {
    'codProducto' : codProducto,
    'codReserva' : codReserva,
    'nombreProducto' : nombreProducto,
    'cantidadProducto' : cantidadProducto
  }

  // Función para generar las filas de la tabla.
    async function crearTabla () {

    // Definir el contexto del formulario.
    const cuerpoTabla = document.getElementById('cuerpoTabla');

    let nuevaFila = document.createElement('tr');

    await fetch(`http://localhost:3001/productosReserva/${codReserva}`)
    .then((response) => response.json())
    .then((data) => {
      if(data.message){
        message = data.message;  
        alert(message);
      } else {

        data.forEach((prod) => {

          nuevaFila.innerHTML = `<th scope="row"> ${prod.codProducto}  </th>
                                 <th scope="col"> ${prod.codReserva} </th>
                                 <th scope="col"> ${prod.nombreProducto} </th>
                                 <th scope="col"> ${prod.cantidadProducto} </th>`

          cuerpoTabla.appendChild(nuevaFila);

        })
      }
    })
  } 

  
  // Función para enviar los productos a la BBDD.
  const enviarLista = async (e) => {
    e.preventDefault();
    
    // Validamos que todos los datos sean ingresados.
    if (!codReserva || !codProducto || !nombreProducto || !cantidadProducto){
      alert('Ingrese todos los datos del producto.');
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
      crearTabla();
    });  
  }


  return (
    <main className = "container-fluid fondoUsuarios">
      <section className = "row formatoUsuarios">
        <form className="row g-3 text-center needs-validation">
          <h3> INGRESAR PRODUCTOS </h3>

          <p>
            <em>
               * Ingrese primero todos los productos incluidos dentro de la reserva.
            </em>
          </p>

          <div className="col-md-4">
            <label htmlFor="codigoReserva" className="form-label">Código reserva</label>
            <input type="text" className="form-control" id="codigoReserva" onChange = {(e)=> setCodReserva(e.target.value)} required />
          </div>
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
          <div className="col-md-4">
            <button className="btn btn-primary margenBoton" type="submit" onClick = {enviarLista}>Agregar</button>
          </div>
        </form>
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
    </main>
  )
};

export default ProductosReservas;