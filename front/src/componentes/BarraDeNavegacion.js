import React from 'react';
import '../css/componentesComunes.css';

import { Link } from 'react-router-dom';

function BarraDeNavegacion ({ banderaBarra, imagen }) {
    return (
        (banderaBarra) ? <nav className="navbar navbar-expand-xl barraNavegacion">
            <div className="container-fluid">
                <img src = {require(`../imagenes/${imagen}`)} alt = "logo belcorp" className = "formatoLogoBarra" />
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 formatoMenu">
                         
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                              Supervisar retail
                            </a>
                            <ul className="dropdown-menu">
								<li><Link to = "" className="dropdown-item formatoMenu">Salida</Link></li>
                              	<li><Link to = "" className="dropdown-item formatoMenu">Gestionar informes</Link></li>
                              	<li><Link to = "" className="dropdown-item formatoMenu">Equipo</Link></li>
                              	<li><a className="dropdown-item formatoMenu" href="#">Estado producto</a></li>
                            </ul>
                        </li>

                        <li className="nav-item">
                            <Link to = "" className="nav-link" aria-current="page">Administrar usuarios</Link>
                        </li>

                        <li className="nav-item">
                            <Link to = "" className="nav-link" aria-current="page">Administrar datos de tienda</Link>
                        </li>

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                              Administrar reservas
                            </a>
                            <ul className="dropdown-menu">
                              <li><Link to = "" className="dropdown-item formatoMenu">Crear reserva</Link></li>
                              <li><Link to = "" className="dropdown-item formatoMenu">Editar reserva</Link></li>
                              <li><Link to = "" className="dropdown-item formatoMenu">Eliminar reserva</Link></li>
                            </ul>
                        </li>

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                              Cargar productos
                            </a>
                            <ul className="dropdown-menu">
                              <li><Link to = "" className="dropdown-item formatoMenu">Validar reserva</Link></li>
                              <li><Link to = "" className="dropdown-item formatoMenu">Estados de la reserva</Link></li>
                              <li><Link to = "" className="dropdown-item formatoMenu">Registrar marcado</Link></li>
                              <li><Link to = "" className="dropdown-item formatoMenu">Ingresar segregados</Link></li>
                            </ul>
                        </li>

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                              Contenedores
                            </a>
                            <ul className="dropdown-menu">
                              <li><Link to = "" className="dropdown-item formatoMenu">Asignar número contenedor</Link></li>
                              <li><Link to = "" className="dropdown-item formatoMenu">Modificar número contenedor</Link></li>
                              <li><Link to = "" className="dropdown-item formatoMenu">Eliminar número contenedor</Link></li>
                              <li><Link to = "" className="dropdown-item formatoMenu">Consultar número contenedor</Link></li>
                            </ul>
                        </li>

                        <li className="nav-item">
                            <Link to = "" className="nav-link" aria-current="page">Ayuda</Link>
                        </li>

                        <li className="nav-item">
                            <Link to = "Login" className="nav-link" aria-current="page">Cerrar Sesión</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav> : null
    )
};

export default BarraDeNavegacion;