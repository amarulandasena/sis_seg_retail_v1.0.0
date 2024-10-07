const { Router } = require ('express');

const { crearProductosReserva } = require('../controllers/productosControllers');

const router = Router();

// Petición POST.
router.post('/', crearProductosReserva);

module.exports = router;

