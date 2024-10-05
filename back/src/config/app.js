// Archivo de configuración de express.

// Importamos los paquetes que necesitamos.
const express = require('express');
const cors = require('cors');
const usuarioRoutes = require('../routes/usuarioRoutes');
const tiendaRoutes = require('../routes/tiendaRoutes');
const loginRoute = require('../routes/loginRoute');

// Creamos el servidor.
const app = express();

// Damos formato JSON a la información que recibimos del servidor.
app.use(express.json());
app.use(express.urlencoded({ extended : true}));
app.use(cors());

// Creamos los endpoint.
app.use('/login', loginRoute);
app.use('/usuario', usuarioRoutes);
app.use('/tienda', tiendaRoutes);

// Exportamos app.
module.exports = app;