










// Crear la Query para insertar un usuario.
const insertQuery = `INSERT INTO usuario(tipoIdentificacion, numIdentificacion, nombres, apellidos, rol, contrasegna) VALUES("cedula ciudadanía", "71388303", "Andres Felipe", "Marulanda Patiño", "Administrador", "afm8303adm");`;
conexion.query(insertQuery, (err, res) => {
    if (err) throw err;
    console.log(('Usuario ingresado con éxito', res));
})

// Query para consultar los usuarios.
const getQuery = `SELECT * FROM usuario;`;
conexion.query(getQuery, (err, res) => {
    if (err) throw err;
    console.log("Usuario consultado con éxito", res);
})



// Crear una Query de práctica.
// const querySQL = 'SHOW TABLES;';
// conexion.query(querySQL, (err, res) => {
//     if (err) throw err;
//     console.log('respuesta SQl', res)
// })


