const { Router } = require ('express');

const { crearEtiqueta, actualizarEtiqueta } = require('../controllers/contenedorControllers');

const router = Router();

// Petición POST.
router.post('/', crearEtiqueta);

// Petición PUT.
router.put('/:codContenedor', actualizarEtiqueta);

module.exports = router;