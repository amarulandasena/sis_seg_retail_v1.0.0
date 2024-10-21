const { Router } = require ('express');

const { crearProductosReserva, eliminarProductosReserva, leerProducto } = require('../controllers/productosControllers');

const router = Router();

// Petición POST.
router.post('/', crearProductosReserva);

// Petición DELETE productos de la reserva.
router.delete('/:codReserva', eliminarProductosReserva);

// Petición GET.
router.get('/:codReserva', leerProducto);

module.exports = router;

