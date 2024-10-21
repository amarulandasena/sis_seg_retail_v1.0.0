const { Router } = require ('express');

const { crearProductosReserva, eliminarProductosReserva } = require('../controllers/productosControllers');

const router = Router();

// Petición POST.
router.post('/', crearProductosReserva);

// Petición DELETE productos de la reserva.
router.delete('/:codReserva', eliminarProductosReserva);

module.exports = router;

