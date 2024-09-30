// Archivo de configuración de la BBDD.

// Importamos los paquetes que necesitamos.
const mysql2 = require('mysql2');

// Creamos la conexión a la BBDD.
const database = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sis_seg_retail'
});

// Exportamos la conexion.
module.exports = database;