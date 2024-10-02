// Importamos la conexión y la app.
const app = require ('./app');
const database = require('./database');

const main = () => {

    // Conexión a la BBDD.
    database.connect((err) => {
        if (err) throw err;
        console.log('BBDD conectada');
    })

    // Crear una constante para hacer el puerto dinámico.
    const PUERTO = process.env.PUERTO || 3001;

    app.listen(PUERTO, () => {
        console.log(`Servidor encendido y escuchando en el puerto ${PUERTO}...`);
    });
};

main();



