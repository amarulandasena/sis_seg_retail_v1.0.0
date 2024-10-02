import React from 'react';
import CrearUsuarios from './CrearUsuarios';
import ModEliConsUsuario from './ModEliConsUsuario';
import RegresarAPP from '../componentes/RegresarAPP';

import '../css/formatoUsuarios.css';

function Usuarios (){
    return (
      <section className = "container-fluid fondoUsuarios">
        < CrearUsuarios />
        < ModEliConsUsuario 
          funcionalidad = 'MODIFICAR USUARIO'
          accionBoton = 'Modificar'/>
        < ModEliConsUsuario
          funcionalidad = 'ELIMINAR USUARIO'
          accionBoton = 'Eliminar' />
        < ModEliConsUsuario
          funcionalidad = 'CONSULTAR USUARIO'
          accionBoton = 'Consultar' />
        <RegresarAPP />
      </section>    
    )
};

export default Usuarios;