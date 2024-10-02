// Módulo para la creación de las tiendas.

import React from 'react';
import '../css/formatoUsuarios.css';

function CrearTiendas () {

  return (
    <article className = "row formatoUsuarios">
      <form className="row g-3 text-center needs-validation">
        <h3>CREAR TIENDA</h3>
        <p>
          <em>
              *Ingrese los datos de la tienda como registran en cámara de comercio o en el rut.
          </em>
        </p>
          <div className="col-md-4">
            <label htmlFor="codigoTienda" className="form-label">Código tienda</label>
            <input type="text" className="form-control" id="codigoTienda" required placeholder = "Según el consecutivo" />
          </div>
          <div className="col-md-4">
            <label htmlFor="nitTienda" className="form-label">Nit tienda</label>
            <input type="text" className="form-control" id="nitTienda" required />
          </div>
          <div className="col-md-4">
            <label htmlFor="nombreTienda" className="form-label">Nombre tienda</label>
            <input type="text" className="form-control" id="nombreTienda" required />
          </div>
          <div className="col-md-4">
            <label htmlFor="ciudadTienda" className="form-label">Ciudad de ubicación</label>
            <select className="form-select" id="ciudadTienda" required>
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
              <input type="text" className="form-control" id="direccionTienda" required />
          </div>
          <div className="col-md-4">
              <label htmlFor="telefonoTienda" className="form-label">Teléfono tienda</label>
              <input type="text" class="form-control" id="telefonoTienda" required />
          </div>
          <div className="col-md-4">
              <label htmlFor="nombreAdministrador" className="form-label">Nombre del administrador</label>
              <input type="text" className="form-control" id="nombreAdministrador" required placeholder = "Como registra en el documento de identidad" />
          </div>
          <div className="col-md-4">
              <label htmlFor="telAdministrador" className="form-label">Teléfono del administrador</label>
              <input type="text" className="form-control" id="telAdministrador" required />
          </div>
          <div className="col-md-4">
              <button className="btn btn-primary margenBoton" type="submit">Crear</button>
          </div>
      </form>  
    </article>
  )
};

export default CrearTiendas;
