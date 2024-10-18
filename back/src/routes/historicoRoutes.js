const { Router } = require ('express');

const { eliminarHistorico, leerHistorico, eliminarProductosReserva } = require ('../controllers/historicoControllers');

const router = Router();

// Petición DELETE Historial.
router.delete('/:codTienda', eliminarHistorico);

// Petición GET Historial.
router.get('/:codTienda', leerHistorico);

// Petición DELETE productos de la reserva.
router.delete('/:codReserva', eliminarProductosReserva);

module.exports = router;

