/* Implementar el CRUD para las tiendas */

const database = require('../config/database');
const mysql2 = require('mysql2');

const crearTienda = (req, res, next) => {
    const {codTienda, nit, nombreTienda, ciudad, direccion, telefono, nombreAdmin, telefonoAdmin} = req.body;

    const crearConsulta = `INSERT INTO tienda(codTienda, nit, nombreTienda, ciudad, direccion, telefono, nombreAdmin, telefonoAdmin) 
                           VALUES(?, ?, ?, ?, ?, ?, ?, ?);`;
    const consulta = mysql2.format(crearConsulta, [codTienda, nit, nombreTienda, ciudad, direccion, telefono, nombreAdmin, telefonoAdmin]);

    database.query(consulta, (err, result) => {
      if (err)  {
          res.send({message: "Tienda ya existe."})
          next(err);
      } else{
          res.send({message: 'Tienda creada correctamente.'}); 
      }     
    });

}

const actualizarTienda = (req, res, next) => {
    const {codTienda} = req.params;
    const {nit, nombreTienda, ciudad, direccion, telefono, nombreAdmin, telefonoAdmin} = req.body;

    const actualizarConsulta = `UPDATE tienda SET nit = ?, nombreTienda = ?, ciudad = ?, direccion = ?, telefono = ?, 
                                nombreAdmin = ?, telefonoAdmin = ? WHERE codTienda = ?;`;
    const consulta = mysql2.format(actualizarConsulta, [nit, nombreTienda, ciudad, direccion, telefono, nombreAdmin, telefonoAdmin, codTienda]);

    database.query(consulta, (err, result) => {
      if (err) throw err;
      res.send({message: "Tienda actualizada correctamente."});
      
    });
}

const leerTienda = (req, res, next) => {

    const {codTienda} = req.params;

    const leerConsulta = `SELECT * FROM tienda WHERE codTienda = ?;`;
    const consulta = mysql2.format(leerConsulta, [codTienda]);

    database.query(consulta, (err, result) => {
      if (err) throw err;
  
      if (result[0] !== undefined) {
        res.json(result[0]);
      } else {
        res.json({ message: 'Tienda no encontrada.' });
      }
    });
}

const eliminarTienda = (req, res, next) => {

    const { codTienda } = req.params;

    const eliminarConsulta = `DELETE FROM tienda WHERE codTienda = ?;`;
    const consulta = mysql2.format(eliminarConsulta, [codTienda]);

    database.query(consulta, (err, result) => {
      if (err) {
        res.json({message : 'Tienda no encontrada.'});
        next(err);
      } else
      res.json({ message: 'Tienda eliminada.' });
    })
};

/* Se deben conectar con los routes de las reservas 
const leerHistorico =  async (req, res, next) => {
 
};

*/

module.exports = {
  crearTienda,
  actualizarTienda,
  leerTienda,
  eliminarTienda
}