import React from 'react';
import '../css/componentesComunes.css';

import { Link } from 'react-router-dom';

function BarraDeNavegacion({ banderaBarra, imagen }) {
  return (
    (banderaBarra) ? <nav className="navbar navbar-expand-xl barraNavegacion">
      <div className="container-fluid">
        <img src={require(`../imagenes/${imagen}`)} alt="logo belcorp" className="formatoLogoBarra" />
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 formatoMenu">

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle formatoTituloMenu" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Administrar datos de usuarios
              </a>
              <ul className="dropdown-menu">
                <li><Link to="/CrearUsuarios" className="dropdown-item formatoMenu">Crear usuario</Link></li>
                <li><Link to="/ModificarUsuarios" className="dropdown-item formatoMenu">Modificar usuario</Link></li>
                <li><Link to="/ConsultarUsuarios" className="dropdown-item formatoMenu">Consultar usuario</Link></li>
                <li><Link to="/EliminarUsuarios" className="dropdown-item formatoMenu">Eliminar usuario</Link></li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle formatoTituloMenu" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Administrar datos de tiendas
              </a>
              <ul className="dropdown-menu">
                <li><Link to="/CrearTiendas" className="dropdown-item formatoMenu">Crear tienda</Link></li>
                <li><Link to="/ModificarTiendas" className="dropdown-item formatoMenu">Actualizar tienda</Link></li>
                <li><Link to="/ConsultarTiendas" className="dropdown-item formatoMenu">Consultar tienda</Link></li>
                <li><Link to="/EliminarTiendas" className="dropdown-item formatoMenu">Eliminar tienda</Link></li>
                <li><Link to="/EliminarHistorico" className="dropdown-item formatoMenu">Eliminar histórico de tienda</Link></li>
                <li><Link to="/ConsultarHistorico" className="dropdown-item formatoMenu">Consultar histórico de tienda</Link></li>
              </ul>
            </li>


            <li className="nav-item dropdown formatoTituloMenu">
              <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Administrar reservas de tiendas
              </a>
              <ul className="dropdown-menu">
                <li><Link to="/CrearReservas" className="dropdown-item formatoMenu">Crear reserva</Link></li>
                <li><Link to="/EditarReservas" className="dropdown-item formatoMenu">Editar reserva</Link></li>
                <li><Link to="/EliminarReservas" className="dropdown-item formatoMenu">Eliminar reserva</Link></li>
                <li><Link to="/ConsultarReservas" className="dropdown-item formatoMenu">Consultar reserva</Link></li>
              </ul>
            </li>

            <li className="nav-item dropdown formatoTituloMenu">
              <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Cargar productos
              </a>
              <ul className="dropdown-menu">
                <li><Link to="/ValidarReservas" className="dropdown-item formatoMenu">Validar reserva</Link></li>
                <li><Link to="/CambiarEstado" className="dropdown-item formatoMenu">Cambiar estado reserva</Link></li>
                <li><Link to="/RegistrarMarcado" className="dropdown-item formatoMenu">Registrar marcado</Link></li>
                <li><Link to="/RegistrarSegregado" className="dropdown-item formatoMenu">Ingresar segregado</Link></li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle formatoTituloMenu" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Contenedores
              </a>
              <ul className="dropdown-menu">
                <li><Link to="/AsignarNumero" className="dropdown-item formatoMenu">Asignar número contenedor</Link></li>
                <li><Link to="/ModificarNumero" className="dropdown-item formatoMenu">Modificar número contenedor</Link></li>
                <li><Link to="/EliminarNumero" className="dropdown-item formatoMenu">Eliminar número contenedor</Link></li>
                <li><Link to="/ConsultarNumero" className="dropdown-item formatoMenu">Consultar número contenedor</Link></li>
              </ul>
            </li>

            <li className="nav-item">
              <Link to="" className="nav-link formatoTituloMenu" aria-current="page">Ayuda</Link>
            </li>

            <li className="nav-item">
              <Link to="/" className="nav-link formatoTituloMenu" aria-current="page">Cerrar Sesión</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav> : null
  )
};

export default BarraDeNavegacion;