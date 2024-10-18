const database = require('../config/database');
const mysql2 = require('mysql2');


const leerHistorico = (req, res, next) => {

  const { codTienda } = req.params;

  const leerConsulta = `SELECT codReserva FROM reserva WHERE codTienda = ?;`;
  const consulta = mysql2.format(leerConsulta, [codTienda]);

  database.query(consulta, (err, result) => {
    if (err) throw err;

    if (result.length !== 0) {
      res.json(result);
    } else {
      res.json({ message : 'Tienda no registra historial.'})
    }
  });
};


const eliminarHistorico = (req, res, next) => {

  const { codTienda } = req.params;

  const eliminarConsulta = `DELETE FROM reserva WHERE codTienda = ?;`;
  const consulta = mysql2.format(eliminarConsulta, [codTienda]);

  database.query(consulta, (err, result) => {
    if (err) {
      res.json({message : 'Reservas no encontradas.'});
      next(err);
    } else
    res.json({ message: 'Reservas eliminadas correctamente.' });
  })
}


const eliminarProductosReserva = (req, res, next) => {

  const { codReserva } = rq.params;

  const eliminarConsulta = `DELETE FROM productosreserva WHERE codReserva = ?;`;
  const consulta = mysql2.format(eliminarConsulta, [codReserva]);

  database.query(consulta, (err, result) => {
    if (err) {
      res.json({message : 'Productos no encontrados.'});
      next(err);
    } else
    res.json({ message: 'Productos eliminados correctamente.' });
  })

}


module.exports = {
  eliminarHistorico,
  leerHistorico,
  eliminarProductosReserva
}