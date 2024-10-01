import React from 'react';
import '../css/componentesComunes.css';

function Certificaciones (props) {
    return (
        <div className = "container-fluid text-center">
            <div className = "row contenedorCertificaciones">
                <img src = {require (`../imagenes/${props.certificacion1}`)} alt = "certifcacion Basc" className = "col-3 col-md-1 formatoCertificaciones" />
                <img src = {require (`../imagenes/${props.certificacion2}`)}  atl = "certificacion Bunny" className = "col-3 col-md-1 formatoCertificaciones" />
                <img src = {require (`../imagenes/${props.certificacion3}`)} alt = "operador económico" className = "col-3 col-md-1 formatoCertificaciones" />
                <img src = {require (`../imagenes/${props.certificacion4}`)} alt = "iso 9001" className = "col-3 col-md-1 formatoCertificaciones" />
            </div>
        </div>
    )
};

export default Certificaciones;