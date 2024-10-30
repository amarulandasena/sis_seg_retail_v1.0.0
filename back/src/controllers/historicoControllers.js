const database = require('../config/database');
const mysql2 = require('mysql2');
const asyncHandler = require('express-async-handler');


const leerHistorico = asyncHandler (async(req, res, next) => {

  const { codTienda } = req.params;

  const leerConsulta = `SELECT codReserva FROM reserva WHERE codTienda = ?;`;
  const consulta = await mysql2.format(leerConsulta, [codTienda]);

  database.query(consulta, (err, result) => {
    if (err) throw err;

    if (result.length !== 0) {
      res.json(result);
    } else {
      res.json({ message : 'Tienda no registra historial.'})
    }
  });
});


const eliminarHistorico = asyncHandler (async(req, res, next) => {

  const { codTienda } = req.params;

  const eliminarConsulta = `DELETE FROM reserva WHERE codTienda = ?;`;
  const consulta = await mysql2.format(eliminarConsulta, [codTienda]);

  database.query(consulta, (err, result) => {
    if (err) {
      next(err);
      res.json({message : 'Reservas no encontradas.'});
    } else {
      res.json({ message: 'Reservas eliminadas correctamente.' });
    }
    
  })
});


module.exports = {
  eliminarHistorico,
  leerHistorico
}