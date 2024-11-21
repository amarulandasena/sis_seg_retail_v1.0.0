/* Instanciamos la variable para realizar las consultas*/
const request = require('supertest');

/* Importamos el conjunto de endpoints que vamos a probar*/ 
const app = require('../src/config/app');

describe('Probaremos el CRUD para el módulo de contenedores', () => {

    /* Crear etiqueta */
    test('debería permitir crear un nuevo contenedor', async () => {

        const crearContenedor = {
            codContenedor: "CONBOG001", 
            codSalida: "SAL001BOG",
            codReserva: "R001BOG001", 
            codTienda: "BOG001", 
            fechaFacturacion: "2024-10-15"
        }

        const response = await request (app)
        .post('/contenedores/')
        .send(crearContenedor);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({message: 'Etiqueta creada correctamente.'});
    }) 
        
    

    /* Crear etiqueta que ya existe */
    test('No debería crear un nuevo contenedor', async () => {

        const crearContenedor = {
            codContenedor: "CONBOG001", 
            codSalida: "SAL001BOG",
            codReserva: "R001BOG001", 
            codTienda: "BOG001", 
            fechaFacturacion: "2024-10-15"
        }

        const response = await request (app)
        .post('/contenedores/')
        .send(crearContenedor);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({message: 'Etiqueta ya existe.'});
    })

    

    /* Modificar etiqueta */
    test('Debería permitir editar una etiqueta', async () => {

        const crearContenedor = {
            codSalida: "SAL001BOG",
            codReserva: "R002BOG001", 
            codTienda: "BOG001", 
            fechaFacturacion: "2024-10-15"
        }

        const response = await request (app)
        .put('/contenedores/CONBOG001')
        .send(crearContenedor);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({message: "Etiqueta actualizada correctamente."});
    })

    

    /* Modificar etiqueta que no existe */
    test('No debería editar ninguna etiqueta', async () => {

        const crearContenedor = {
            codSalida: "SAL001BOG",
            codReserva: "R002BOG001", 
            codTienda: "BOG001", 
            fechaFacturacion: "2024-10-15"
        }

        const response = await request (app)
        .put('/contenedores/CONBOG002')
        .send(crearContenedor);

        expect(response.status).toBe(404);
        expect(response.body).toEqual({message: "Etiqueta no encontrada."});
    })

    

    /* Consultar etiqueta */
    test('Debería permitir consultar una etiqueta', async () => {

        const response = await request (app).get('/contenedores/CONBOG001');

        expect(response.status).toBe(200);
    })

    

    /* Consultar etiqueta que no existe */
    test('No debería consultar ninguna etiqueta', async() => {

        const response = await request (app).get('/contenedores/CONBOG002');

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ message: 'Etiqueta no registrada.' });
    })

    

    /* Eliminar etiqueta */
    test('Debería permitir eliminar una etiqueta', async() => {

        const response = await request (app).delete('/contenedores/CONBOG001');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Etiqueta eliminada.' });
    })

    

    /* Eliminar etiqueta que no existe */
    test('Debería permitir eliminar una etiqueta', async() => {

        const response = await request (app).delete('/contenedores/CONBOG001');

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ message : 'Etiqueta no encontrada.'});
    })
})