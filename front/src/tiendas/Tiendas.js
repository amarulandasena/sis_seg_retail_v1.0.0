import React from 'react';
import CrearTiendas from './CrearTiendas';
import RegresarAPP from '../componentes/RegresarAPP';
import ModEliConsTiendas from './ModEliConsTiendas';
import MensajeIngresoDatos from '../componentes/MensajeIngresoDatos';

import '../css/formatoUsuarios.css';

function Tiendas () {
  return (
    <section class = "container-fluid fondoUsuarios">
      < CrearTiendas />
      < MensajeIngresoDatos />
      < ModEliConsTiendas 
        funcionalidad = 'ACTUALIZAR TIENDAS'
        accionBoton = 'Actualizar'/>
      < ModEliConsTiendas 
        funcionalidad = 'ELIMINAR TIENDAS'
        accionBoton = 'Eliminar'/>
      < ModEliConsTiendas 
        funcionalidad = 'CONSULTAR TIENDAS'
        accionBoton = 'Consultar'/>
      < ModEliConsTiendas
        funcionalidad = 'ELIMINAR HISTÓRICO DE TIENDA'
        accionBoton = 'Eliminar Histórico' />
      < ModEliConsTiendas
        funcionalidad = 'CONSULTAR HISTÓRICO DE TIENDA'
        accionBoton= 'Consultar Histórico' />

      < RegresarAPP />
    </section>

  )
};

export default Tiendas;