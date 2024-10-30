const database = require('../config/database');
const mysql2 = require('mysql2');
const asyncHandler = require('express-async-handler');

const leerProducto = asyncHandler (async(req, res, next) => {

	const { codReserva } = req.params;
  
	const leerConsulta = 'SELECT * FROM productosreserva WHERE codReserva = ?;';
	const consulta = await mysql2.format(leerConsulta, [codReserva]);
  
	database.query(consulta, (err, result) => {
	  if (err) throw err;
  
	  if (result.length !== 0) {
		res.json(result);
	  } else {
		res.json({ message : 'Producto no registrado.'})
	  }
	});
  });


// Ingresar cada uno de los productos de la reserva en la BBDD.
const crearProductosReserva = asyncHandler (async(req, res, next) => {

	const { codReserva, codProducto, nombreProducto, cantidadProducto } = req.body;

	const crearConsultaProductos = `INSERT INTO productosreserva(codProducto, codReserva, nombreProducto, cantidadProducto) 
									VALUES(?, ?, ?, ?);`;
	const consulta = await mysql2.format(crearConsultaProductos, [codProducto, codReserva, nombreProducto, cantidadProducto]);

	database.query(consulta, (err, result) => {
		if (err)  {
      res.send({message: "Error en el registro del producto."})
      next(err);
		} else{
			res.send({message: 'Producto registrado correctamente.'}); 
		}     
	});

});

const eliminarProductosReserva = asyncHandler (async(req, res, next) => {

	const { codProducto, codReserva } = req.body;
  
	const eliminarConsulta = `DELETE FROM productosreserva WHERE codProducto = ? AND codReserva = ?;`;
	const consulta = await mysql2.format(eliminarConsulta, [codProducto, codReserva]);
  
	database.query(consulta, (err, result) => {
	  if (err) {
		res.json({message : 'Producto no encontrado.'});
		next(err);
	  } else {
		res.json({ message: 'Producto eliminado correctamente.' });
	  }
	  
	})
  
});

const eliminarReservaCompleta = asyncHandler (async(req, res, next) => {

	const { codReserva } = req.params;
  
	const eliminarConsulta = `DELETE FROM productosreserva WHERE codReserva = ?;`;
	const consulta = await mysql2.format(eliminarConsulta, [codReserva]);
  
	database.query(consulta, (err, result) => {
	  if (err) {
		res.json({message : 'Productos no encontrados.'});
		next(err);
	  } else {
		res.json({ message: 'Productos eliminados correctamente.' });
	  }
	  
	})
  
});

module.exports = {
  crearProductosReserva,
  eliminarProductosReserva,
  leerProducto,
  eliminarReservaCompleta
}