const database = require('../config/database');
const mysql2 = require('mysql2');

const { Router } = require ('express');

const leerLogin = (req, res, next) => {
    const { numIdentificacion, contrasegna } = req.body;

    const crearConsulta = `SELECT * FROM usuario WHERE numIdentificacion = ? AND contrasegna = ?;`;
    const consulta = mysql2.format(crearConsulta, [numIdentificacion, contrasegna]);

    database.query(consulta, (err, result) => {
        if (err) throw err;

        if (result[0] !== undefined) {
            res.json(result[0]);
        } else {
            res.json({ logueado : true})
        }
    });
};

const router = Router();

// Petición POST.
router.post('/', leerLogin);

module.exports = router;

/* module.exports = { leerLogin }; */