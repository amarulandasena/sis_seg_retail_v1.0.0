const { Router } = require ('express');

const { crearProductosReserva, eliminarProductosReserva, leerProducto, eliminarReservaCompleta } = require('../controllers/productosControllers');

const router = Router();

// Petición POST.
router.post('/', crearProductosReserva);

// Petición DELETE productos de la reserva.
router.delete('/:codProducto', eliminarProductosReserva);

// Petición GET.
router.get('/:codReserva', leerProducto);

// Petición DELETE para todos los productos de la reserva.
router.delete('/producto/:codReserva', eliminarReservaCompleta);


module.exports = router;

