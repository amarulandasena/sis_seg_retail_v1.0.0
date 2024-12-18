// Implementaremos el CRUD.

const database = require('../config/database');
const mysql2 = require('mysql2');
const asyncHandler = require('express-async-handler');


const crearUsuario = asyncHandler (async(req, res, next) => {
  const { tipoIdentificacion, numIdentificacion, nombres, apellidos, rol, contrasegna } = req.body;

  const crearConsulta = `INSERT INTO usuario(tipoIdentificacion, numIdentificacion, nombres, apellidos, rol, contrasegna) 
                        VALUES(?, ?, ?, ?, ?, ?);`;
  const consulta = await mysql2.format(crearConsulta, [tipoIdentificacion, numIdentificacion, nombres, apellidos, rol, contrasegna]);

   database.query(consulta, (err, result) => {
      if (err)  {
          res.send({message: "Usuario ya existe."})
          next(err);
      } else{
          res.send({message: 'Usuario creado correctamente.'}); 
      }     
  });
});


const actualizarUsuario = asyncHandler (async(req, res, next) => {
    
  const { numIdentificacion } = req.params;
  const { tipoIdentificacion, nombres, apellidos, rol, contrasegna } = req.body;

  const actualizarConsulta = `UPDATE usuario SET tipoIdentificacion = ?,  nombres = ?, apellidos = ?, rol = ?, contrasegna = ? 
                              WHERE numIdentificacion = ?;`;
  const consulta = await mysql2.format(actualizarConsulta, [tipoIdentificacion, nombres, apellidos, rol, contrasegna, numIdentificacion]);

   database.query(consulta, (err, result) => {
    if (err) {
      res.send({message : "Usuario no encontrado."});
      next(err);
    } else {
      res.send({message: "Usuario actualizado correctamente."});
    } 
  });
});


const leerUsuario = asyncHandler (async(req, res, next) => {   

  const { numIdentificacion } = req.params;

  const leerConsulta = `SELECT * FROM usuario WHERE numIdentificacion = ?;`;
  const consulta = await mysql2.format(leerConsulta, [numIdentificacion]);

   database.query(consulta, (err, result) => {
    if (err) throw err;

    if (result[0] !== undefined) {
      res.json(result[0]);
    } else {
      res.json({ message: 'Usuario no registrado.' });
    }
  });
}); 


const eliminarUsuario = asyncHandler (async(req, res, next) => {
    
  const { numIdentificacion } = req.params;

  const eliminarConsulta = `DELETE FROM usuario WHERE numIdentificacion = ?;`;
  const consulta = await mysql2.format(eliminarConsulta, [numIdentificacion]);

   database.query(consulta, (err, result) => {
      if (err) {
        res.json({message : 'Usuario no encontrado.'});
        next(err);
      } else {
        res.json({ message: 'Usuario eliminado.' });
      }  
  })
});

module.exports = {
    crearUsuario,
    leerUsuario,
    actualizarUsuario,
    eliminarUsuario
}

