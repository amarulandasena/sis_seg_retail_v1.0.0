/* Instanciamos la variable para realizar las consultas*/
const request = require('supertest');

/* Importamos el conjunto de endpoints que vamos a probar*/ 
const app = require('../src/config/app');

describe('Probaremos las consultas que se hacen sobre el histórico desde el módulo de tiendas', () => {

    /* Histórico de tienda */
    test('Debería consultar el histórico de una tienda', async() => {

        const response = await request (app)
        .get('/historico/CAL001')

        expect(response.status).toBe(200);
    })

    /*Histórico de tienda inexistente */
    test('Debería informar que la tienda no registra ningún histórico', async() => {

        const response = await request (app)
        .get('/historico/CAL002')

        expect(response.status).toBe(200);
        expect(response.body).toEqual({message:'Tienda no registra historial.'})
    })

     /* Eliminar histórico de una tienda */
     test('Debería eliminar el histórico de reservas de una tienda', async () => {

        const response = await request (app).delete('/historico/MED001');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Reservas eliminadas correctamente' });
    })

    /* Eliminar histórico de una tienda inexistente */
    test('Debería inidcar que la tienda no registra reservas', async () => {

        const response = await request (app).delete('/historico/MED001');

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ message: 'Reservas no encontradas.' });
    })
})