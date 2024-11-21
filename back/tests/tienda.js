/* Instanciamos la variable para realizar las consultas*/
const request = require('supertest');

/* Importamos el conjunto de endpoints que vamos a probar*/ 
const app = require('../src/config/app');

describe('Probaremos el CRUD para el moódulo de tiendas', () => {

    /* Crear tienda */
    test('Debería permitir crear una nueva tienda', async () => {

        const crearTienda = {
            codTienda: "BAR002", 
            nit: "99887766", 
            nombreTienda: "BUENAVISTA", 
            ciudad: "Barranquilla", 
            direccion: "CALLE 98 No. 52 - 115", 
            telefono: "6025309181", 
            nombreAdmin: "PEPITO PEREZ", 
            telefonoAdmin: "3176031010"
        }

        const response = await request (app)
        .post('/tienda/')
        .send(crearTienda);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({message: 'Tienda creada correctamente.'});
    })

    /*Crear tienda que ya existe*/
    test('No debería permitir crear una nueva tienda', async () => {

        const crearTienda = {
            codTienda: "BAR002", 
            nit: "99887766", 
            nombreTienda: "BUENAVISTA", 
            ciudad: "Barranquilla", 
            direccion: "CALLE 98 No. 52 - 115", 
            telefono: "6025309181", 
            nombreAdmin: "PEPITO PEREZ", 
            telefonoAdmin: "3176031010"
        }

        const response = await request (app)
        .post('/tienda/')
        .send(crearTienda);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({message: 'Tienda ya existe.'});
    })

    /* Modificar tienda existente */
    test('Debería permitir modificar la información de una tienda', async () => {

        const actualizarTienda = {
            nit: "99887766", 
            nombreTienda: "BUENAVISTA 2", 
            ciudad: "Barranquilla", 
            direccion: "CALLE 98A No. 52 - 115", 
            telefono: "6025309181", 
            nombreAdmin: "PEPITO PEREZ ARENAS", 
            telefonoAdmin: "3176031010"
        }

        const response = await request (app)
        .put('/tienda/BAR002')
        .send(actualizarTienda);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({message: "Tienda actualizada correctamente."});
    })

    /* Modificar tienda inexistente */
    test('No debería permitir modificar la información de una tienda, ya que no existe', async () => {

        const actualizarTienda = {
            nit: "22558844", 
            nombreTienda: "BUENAVISTA 4", 
            ciudad: "Barranquilla", 
            direccion: "CARRERA 12 No. 25 - 69", 
            telefono: "6025023689", 
            nombreAdmin: "PATRICIA TORRES", 
            telefonoAdmin: "3025896418"
        }

        const response = await request (app)
        .put('/tienda/BAR003')
        .send(actualizarTienda);

        expect(response.status).toBe(404);
    })

    /* Consultar tienda existente */
    test('Debería permitir consultar la información de una tienda', async () => {

        const consultarTienda = {
            codTienda: "BAR002",
            nit: "99887766", 
            nombreTienda: "BUENAVISTA 2", 
            ciudad: "Barranquilla", 
            direccion: "CALLE 98A No. 52 - 115", 
            telefono: "6025309181", 
            nombreAdmin: "PEPITO PEREZ ARENAS", 
            telefonoAdmin: "3176031010"
        }

        const response = await request (app)
        .get('/tienda/BAR002')

        expect(response.status).toBe(200);
        expect(response.body).toEqual(consultarTienda);
    })

    /* Consultar tienda inexistente */
    test('Debería inidcar que no se encontró la tienda', async () => {

        const response = await request (app).get('/tienda/BAR003')

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Tienda no encontrada.' });
    })

    /* Eliminar tienda */
    test('Debería permitir eliminar una tienda', async () => {

        const response = await request (app).delete('/tienda/BAR002')

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Tienda eliminada.' });
    })

    /* Eliminar tienda inexistente*/
    test('No debería eliminar la tienda, ya que no existe', async () => {

        const response = await request (app).delete('/tienda/BAR003')

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Tienda no encontrada.' });
    })
})