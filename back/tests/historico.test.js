/* Instanciamos la variable para realizar las consultas*/
const request = require('supertest');

/* Importamos el conjunto de endpoints que vamos a probar*/ 
const app = require('../src/config/app');

describe('Probaremos las consultas que se hacen sobre el histórico desde el módulo de tiendas', () => {

    /* Histórico de tienda */
    test('Debería consultar el histórico de una tienda', async() => {

        let resUno = {codReserva: "ROO1CAL001"};
        const consultarHistorico = [resUno];

        const response = await request (app)
        .get('/historico/CAL001')

        expect(response.status).toBe(200);
        expect(response.body).toEqual(consultarHistorico);
    })
})