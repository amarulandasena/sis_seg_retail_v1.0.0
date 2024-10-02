/* Componente que permitirá modificar, consultar o eliminar un usuario, según el evento y los props que reciba. */

import React from 'react';
import '../css/formatoUsuarios.css';

function ModEliConsUsuario ({ funcionalidad, accionBoton }) {
     return (
      <article className = "row formatoUsuarios">
        <form className="row g-3 text-center needs-validation">
          <h3>{funcionalidad}</h3>
          <div className ="col-md-5">
            <label htmlFor = "tipoIdentificacion" className = "form-label">Tipo de identificación</label>
            <select className ="form-select" id="tipoIdentificacion" required>
              <option selected disabled value="">Seleccione el documento</option>
              <option>Cédula de ciudadanía</option>
              <option>Cédula de extranjería</option>
              <option>PEP</option>
              <option>Permiso por protección temporal</option>
            </select>
          </div>
          <div className="col-md-5">
            <label htmlFor="numeroIdentificacion" className="form-label">Número de identificación</label>
            <input type="text" className="form-control" id="numeroIdentificacion" required placeholder="Sin puntos ni comas" />
          </div>
          <div className="col-md-2">
            <button className="btn btn-primary" type="submit">{accionBoton}</button>
          </div>
        </form>
      </article>
     )
};

export default ModEliConsUsuario;