import './App.css';

import PieDePagina from './componentes/PieDePagina';
import BarraDeNavegacion from './componentes/BarraDeNavegacion';
import Certificaciones from './componentes/Certificaciones';
import Login from './componentes/Login';
import PaginaPrincipal from './componentes/PaginaPrincipal';

import CrearUsuarios from './usuarios/CrearUsuarios';
import ModificarUsuarios from './usuarios/ModificarUsuarios';
import ConsultarUsuarios from './usuarios/ConsultarUsuarios';
import EliminarUsuarios from './usuarios/EliminarUsuarios';

import CrearTiendas from './tiendas/CrearTiendas';
import ModificarTiendas from './tiendas/ModificarTiendas';
import EliminarTiendas from './tiendas/EliminarTiendas';
import ConsultarTiendas from './tiendas/ConsultarTiendas';
import EliminarHistoricoTienda from './tiendas/EliminarHistoricoTienda';
import ConsultarHistoricoTiendas from './tiendas/ConsultarHistoricoTiendas';

import CrearReservas from './reservas/CrearReservas';
import EditarReservas from './reservas/EditarReservas';
import EliminarReservas from './reservas/EliminarReservas';

import ValidarReservas from './cargarProductos/ValidarReserva';
import ConsultarReservas from './cargarProductos/ConsultarReservas';
import RegistrarMarcado from './cargarProductos/RegistrarMarcado';
import CambiarEstadoReserva from './cargarProductos/CambiarEstadoReserva';

import { Routes, Route} from "react-router-dom";
import { useState } from 'react';

function App() {

  const [banderaBarra, setBanderaBarra] = useState(true);

  return (
    <div className="App">

      <BarraDeNavegacion 
        banderaBarra = {banderaBarra}
        imagen = 'logo_belcorp.png' />
      
      <Routes>
        <Route path = '/' element = {< Login  
          imagen = 'logo_belcorp.png'
          funcion = {setBanderaBarra} />} />

        <Route path = '/PaginaPrincipal' element = {< PaginaPrincipal 
          imageFundacionBelcorp = 'fundacionBelcorp3.jpeg'
          imagenEsika = 'esika.jpg'
          imagenCyzone = 'cyzone.jpg'
          imagenLbel = 'lbel1.jpg'
          colaborador1 = 'colaborador1.jpg'
          colaborador2 = 'colaborador2.jpg'
          colaborador3 = 'colaborador3.jpg'
          />} />

        <Route path = '/CrearUsuarios' element = {< CrearUsuarios />} />
        <Route path = '/ModificarUsuarios' element = {< ModificarUsuarios />} />
        <Route path = '/ConsultarUsuarios' element = {< ConsultarUsuarios />} />
        <Route path = '/EliminarUsuarios' element = {< EliminarUsuarios />} />

        <Route path = '/CrearTiendas' element = {< CrearTiendas />} />
        <Route path = '/ModificarTiendas' element = {< ModificarTiendas />} />
        <Route path = '/EliminarTiendas' element = {< EliminarTiendas />} />
        <Route path = '/ConsultarTiendas' element = {< ConsultarTiendas />} />
        <Route path = '/EliminarHistorico' element = { < EliminarHistoricoTienda />} />
        <Route path = '/ConsultarHistorico' element = { < ConsultarHistoricoTiendas />} />

        <Route path = '/CrearReservas' element = { < CrearReservas />} />
        <Route path = '/EditarReservas' element = { < EditarReservas />} />
        <Route path = '/EliminarReservas' element = { < EliminarReservas />} />

        <Route path = '/ValidarReservas' element = {< ValidarReservas />} />
        <Route path = 'ConsultarReservas' element = { < ConsultarReservas />} />
        <Route path = '/RegistrarMarcado' element = { < RegistrarMarcado />} />
        <Route path = '/CambiarEstado' element = { < CambiarEstadoReserva />} />

      </Routes>
      
      < Certificaciones 
        certificacion1 = 'certificacionBasc1.jpeg'
        certificacion2 = 'certifcacionBunny1.jpeg'
        certificacion3 = 'operadorEconomico1.jpeg'
        certificacion4 = 'iso9901.png'/>

      < PieDePagina />

    </div>
  );
}

export default App;
