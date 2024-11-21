/* Instanciamos la variable para realizar las consultas*/
const request = require('supertest');

/* Importamos el conjunto de endpoints que vamos a probar*/ 
const app = require('../src/config/app');

describe('Probaremos el CRUD para el módulo de reservas', () => {

    /* Crear reserva */
    test('Debería permitir crear una nueva reserva', async () => {

        const crearReserva = {
            codReserva: "R001CAL001",
            codTienda: "CAL001", 
            nombreTienda: "JARDÍN PLAZA",
            fechaFacturacion: "2024-11-21",
            estadoReserva: "FRACCIONADA"
        }

        const response = await request (app)
        .post('/reserva/')
        .send(crearReserva);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({message: 'Reserva creada correctamente.'});

    })
        

    /* Crear una reserva que ya existe */
    test('Debería indicar que la reserva ya existe', async () => {

        const crearReserva = {
            codReserva: "R001CAL001",
            codTienda: "CAL001", 
            nombreTienda: "JARDÍN PLAZA",
            fechaFacturacion: "2024-11-21",
            estadoReserva: "FRACCIONADA"
        }

        const response = await request (app)
        .post('/reserva/')
        .send(crearReserva);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({message: "Reserva ya existe."});

    })
        

    /* Editar el estado de una reserva */
    test('Debería editar el estado de una reserva', async () => {

        const editarReserva = {
            estadoReserva: "MARCADA"
        }

        const response = await request (app)
        .put('/reserva/R001CAL001')
        .send(editarReserva);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({message: "Estado actualizado correctamente."});
    })

    

    /* Editar el estado de una reserva que no existe */
    test('No se debería actualizar el estado de ninguna reserva', async () => {

        const editarReserva = {
            estadoReserva: "MARCADA"
        }

        const response = await request (app)
        .put('/reserva/R002CAL001')
        .send(editarReserva);

        expect(response.status).toBe(404);
    })
        

    /* Eliminar reserva */
    test('Debería permitir eliminar una reserva', async () => {

        const response = await request (app).delete('/reserva/R001CAL001');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Reserva eliminada.' });
    })
        
    

    /* Eliminar reserva inexistente */
    test('No debería eliminar ninguna reserva, ya que no existe', async () => {

        const response = await request (app).delete('/reserva/R001CAL001');

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ message: 'Reserva no encontrada.' });
    })

    

    /* Consultar reserva */
    test('Debería permitir consultar la información de los productos de una reserva', async () => {

        const response = await request (app)
        .get('/productosReserva/R001BOG001')

        expect(response.status).toBe(200);
    })

    

    /* Consultar reserva inexistente */
    test('No debería consultar la información de los productos de ninguna reserva', async () => {

        const response = await request (app)
        .get('/productosReserva/R001MED003')

        expect(response.status).toBe(404);
    })



    /* Validar reserva */
    test('Debería permitir consultar la información principal de la reserva', async () => {

        const consultarReserva = {
            codReserva: "R002BOG001",
            codTienda: "BOG001", 
            nombreTienda: "SANTA FÉ",
            fechaFacturacion: "2024-10-22",
            estadoReserva: "FRACCIONADA"
        }

        const response = await request (app)
        .get('/reserva/R002BOG001');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(consultarReserva);
    })

    

    /* Validar reserva inexistente */
    test('No debería consultar la información de ninguna reserva.', async () => {

        const response = await request (app)
        .get('/reserva/R005BOG001');

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ message: 'Reserva no registrada.' });
    })

    

   

})