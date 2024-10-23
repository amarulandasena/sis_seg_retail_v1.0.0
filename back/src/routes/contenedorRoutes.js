const { Router } = require ('express');

const { crearEtiqueta, actualizarEtiqueta, eliminarEtiqueta, leerEtiqueta } = require('../controllers/contenedorControllers');

const router = Router();

// Petición POST.
router.post('/', crearEtiqueta);

// Petición PUT.
router.put('/:codContenedor', actualizarEtiqueta);

// Petición DELETE.
router.delete('/:codContenedor', eliminarEtiqueta);

// Petición GET.
router.get('/:codContenedor', leerEtiqueta);

module.exports = router;