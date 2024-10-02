// Módulo de usuarios.

import React from 'react';
import '../css/formatoUsuarios.css';

function CrearUsuarios () {

    return (
        
      <article className = "row formatoUsuarios">
        <form className ="row g-3 text-center needs-validation">   
          <h3>CREAR USUARIO</h3>
          <p>
            <em>
                *Ingrese el número de identificación, los nombres y apellidos como registran en el documento de identidad.<br/>
                *Para la contraseña, asigne una de mínimo 5 caracteres.
            </em>    
          </p>

          <div className="col-md-4">
            <label htmlFor="tipoIdentificacion" className="form-label">Tipo de identificación</label>
            <select className="form-select" id="tipoIdentificacion" required>
              <option selected disabled value="">Seleccione el documento</option>
              <option>Cédula de ciudadanía</option>
              <option>Cédula de extranjería</option>
              <option>PEP</option>
              <option>Permiso por protección temporal</option>
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="numeroIdentificacion" className="form-label">Número de identificación</label>
            <input type="text" className="form-control" id="numeroIdentificacion" required />
          </div>
          <div className="col-md-4">
            <label htmlFor="nombreUsuario" className="form-label">Nombres</label>
            <input type="text" className="form-control" id="nombreUsuario" required />
          </div>
          <div className="col-md-4">
            <label htmlFor="apellidosUsuario" className="form-label">Apellidos</label>
            <input type="text" className="form-control" id="apellidosUsuario" required />
          </div>
          <div className="col-md-4">
            <label htmlFor="rol" className="form-label">Rol o cargo</label>
            <select className="form-select" id="rol" required>
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
            <input type="password" class="form-control" id="contrasegna" required />
          </div>
          <div className="col-12">
            <button className="btn btn-primary" type="submit">Crear</button>
          </div>
        </form>
      </article>
        
    )
};

export default CrearUsuarios;